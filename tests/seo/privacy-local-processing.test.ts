import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi, beforeAll } from 'vitest';
import { PDFDocument } from 'pdf-lib';
import { exportSignedPdf, downloadPdf } from '../../src/lib/pdf/PdfExporter';
import { assembleDocument } from '../../src/lib/pdf/PdfToolkit';

/**
 * Privacy verification for "no PDF upload to Sign X PDF servers".
 *
 * Layers:
 * 1. Static contract on processing modules (no FormData/fetch POST of PDF bodies)
 * 2. Instrumented fetch while running real export/assemble on a fixture PDF
 * 3. Browser network capture (tests/e2e/privacy-no-upload.mjs via npm run test:privacy)
 */

const FIXTURE_DIR = join(process.cwd(), 'tests', 'fixtures');
const FIXTURE_PATH = join(FIXTURE_DIR, 'privacy-fixture.pdf');
const FIXTURE_MARKER = 'SignXPDF-PRIVACY-FIXTURE-7f3a9c';

function walkTsFiles(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.svelte-kit' || name === 'build') continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkTsFiles(p, acc);
    else if (/\.(ts|js|svelte)$/.test(name)) acc.push(p);
  }
  return acc;
}

function read(path: string) {
  return readFileSync(path, 'utf8');
}

beforeAll(async () => {
  if (!existsSync(FIXTURE_DIR)) mkdirSync(FIXTURE_DIR, { recursive: true });
  if (!existsSync(FIXTURE_PATH)) {
    const doc = await PDFDocument.create();
    const page = doc.addPage([400, 500]);
    page.drawText(FIXTURE_MARKER, { x: 40, y: 400, size: 12 });
    writeFileSync(FIXTURE_PATH, await doc.save());
  }
});

describe('privacy / local PDF processing contract', () => {
  it('PDF processing modules do not POST multipart/form-data or upload APIs', () => {
    const roots = ['src/lib/pdf', 'src/lib/stores', 'src/lib/signatures', 'src/lib/text'];
    const files = roots.flatMap((r) => walkTsFiles(r));
    expect(files.length).toBeGreaterThan(10);

    const suspicious: string[] = [];
    for (const file of files) {
      const src = read(file);
      if (/new\s+FormData\s*\(/.test(src) && /fetch\s*\(/.test(src)) {
        suspicious.push(`${file}: FormData+fetch`);
      }
      if (/\.upload\s*\(/.test(src)) suspicious.push(`${file}: .upload(`);
      if (/navigator\.sendBeacon\s*\(/.test(src)) suspicious.push(`${file}: sendBeacon`);
      if (/fetch\s*\([^)]*method\s*:\s*['"]POST['"]/i.test(src)) {
        suspicious.push(`${file}: fetch POST`);
      }
    }
    expect(suspicious, suspicious.join('\n')).toEqual([]);
  });

  it('export helpers create local downloads rather than remote submit endpoints', () => {
    const exporter = read('src/lib/pdf/PdfExporter.ts');
    expect(exporter).toMatch(/createObjectURL|download|Blob/);
    expect(exporter).not.toMatch(/fetch\s*\(/);
    expect(exporter).not.toMatch(/XMLHttpRequest/);
  });

  it('public privacy copy matches verified local-processing claims', () => {
    const en = read('src/lib/seo/content/en.ts');
    expect(en).toMatch(/processed locally in your browser and is not uploaded to Sign X PDF servers/);
    expect(en).not.toMatch(/is 100% private|is completely anonymous|is unhackable/);
    expect(en).toMatch(/do not claim military-grade privacy/i);
    const zh = read('src/lib/seo/content/zh-hant.ts');
    expect(zh).toMatch(/本機處理|不會上傳至 Sign X PDF/);
  });

  it('runs fixture merge + signed export under instrumented fetch without PDF body egress', async () => {
    const fixtureBytes = new Uint8Array(readFileSync(FIXTURE_PATH));
    expect(fixtureBytes[0]).toBe(0x25); // %
    expect(fixtureBytes[1]).toBe(0x50); // P

    const calls: { url: string; method: string; bodyPreview: string }[] = [];
    const originalFetch = globalThis.fetch;

    async function previewBody(body: BodyInit | null | undefined): Promise<string> {
      if (body == null) return '';
      if (typeof body === 'string') return body.slice(0, 200);
      if (typeof FormData !== 'undefined' && body instanceof FormData) return '[FormData]';
      if (typeof URLSearchParams !== 'undefined' && body instanceof URLSearchParams) {
        return body.toString().slice(0, 200);
      }
      if (body instanceof ArrayBuffer) {
        const view = new Uint8Array(body, 0, Math.min(64, body.byteLength));
        return new TextDecoder().decode(view);
      }
      if (ArrayBuffer.isView(body)) {
        const view = body as ArrayBufferView;
        const bytes = new Uint8Array(view.buffer, view.byteOffset, Math.min(64, view.byteLength));
        return new TextDecoder().decode(bytes);
      }
      if (typeof Blob !== 'undefined' && body instanceof Blob) {
        const ab = await body.arrayBuffer();
        const view = new Uint8Array(ab, 0, Math.min(64, ab.byteLength));
        return new TextDecoder().decode(view);
      }
      return Object.prototype.toString.call(body);
    }

    globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const bodyPreview = await previewBody(init?.body ?? null);
      calls.push({
        url: String(input),
        method: (init?.method ?? 'GET').toUpperCase(),
        bodyPreview,
      });
      return new Response('{}', { status: 200 });
    }) as typeof fetch;

    try {
      // Operation 1: assemble/merge-style export of the fixture
      const sourceKey = 'fixture-a';
      const sources = new Map<string, Uint8Array>([[sourceKey, fixtureBytes]]);
      const pages = [
        { id: 'p0', sourceKey, pageIndex: 0 },
        { id: 'p1', sourceKey, pageIndex: 0 },
      ];
      const merged = await assembleDocument(pages, sources, []);
      expect(merged.byteLength).toBeGreaterThan(100);
      expect(new TextDecoder().decode(merged.slice(0, 5))).toContain('%PDF');

      // Operation 2: "sign" export with empty placements (still full pipeline)
      const signed = await exportSignedPdf({
        originalBytes: fixtureBytes,
        placements: [],
        signatures: new Map(),
      });
      expect(signed.byteLength).toBeGreaterThan(100);

      // Operation 3: local download helper
      const originalCreate = URL.createObjectURL;
      const originalRevoke = URL.revokeObjectURL;
      URL.createObjectURL = (() => 'blob:privacy-test') as typeof URL.createObjectURL;
      URL.revokeObjectURL = (() => {}) as typeof URL.revokeObjectURL;
      try {
        downloadPdf(signed, 'privacy-fixture.pdf');
      } catch {
        // jsdom may not implement navigation
      }
      URL.createObjectURL = originalCreate;
      URL.revokeObjectURL = originalRevoke;

      const leaked = calls.filter((c) => {
        const hay = `${c.url}\n${c.bodyPreview}`;
        return (
          hay.includes('%PDF') ||
          hay.includes(FIXTURE_MARKER) ||
          hay.includes('privacy-fixture') ||
          hay.includes('[FormData]') ||
          c.method === 'POST' ||
          c.method === 'PUT'
        );
      });
      expect(leaked, JSON.stringify(leaked, null, 2)).toEqual([]);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
