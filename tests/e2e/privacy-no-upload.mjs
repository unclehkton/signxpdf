#!/usr/bin/env node
/**
 * Browser privacy network test (Playwright).
 *
 * Privacy observation scope:
 * 1. Load page and allow normal assets
 * 2. Begin network observation
 * 3. Select fixture PDF
 * 4. Execute a supported operation
 * 5. Download the resulting file
 * 6. Fail if PDF body / fixture markers / file metadata leak via
 *    fetch, XHR, sendBeacon, WebSocket, service-worker, or analytics-like posts
 *
 * Usage: node tests/e2e/privacy-no-upload.mjs
 * Requires: npm run build first; playwright chromium installed.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { PDFDocument } from 'pdf-lib';
import {
  FIXTURE_NAME,
  MARKER,
  fixtureMeta,
  inspectPayload,
  isHookLeak,
  leakReason,
} from './privacy-leak-inspect.mjs';
import { launchChromium } from './launch-chromium.mjs';

const ROOT = process.cwd();
const BUILD = join(ROOT, 'build');
const FIXTURE_DIR = join(ROOT, 'tests', 'fixtures');
const FIXTURE = join(FIXTURE_DIR, FIXTURE_NAME);
const PORT = Number(process.env.PRIVACY_TEST_PORT ?? 4179);
const ORIGIN = `http://127.0.0.1:${PORT}`;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.mjs': 'text/javascript',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function fail(msg) {
  console.error('FAIL:', msg);
  process.exitCode = 1;
}

const FIXTURE_MULTI = join(FIXTURE_DIR, 'privacy-fixture-2p.pdf');

async function ensureFixture() {
  if (!existsSync(FIXTURE_DIR)) mkdirSync(FIXTURE_DIR, { recursive: true });
  if (!existsSync(FIXTURE)) {
    const doc = await PDFDocument.create();
    const page = doc.addPage([400, 500]);
    page.drawText(MARKER, { x: 40, y: 400, size: 12 });
    writeFileSync(FIXTURE, await doc.save());
  }
  if (!existsSync(FIXTURE_MULTI)) {
    const doc = await PDFDocument.create();
    const p1 = doc.addPage([400, 500]);
    p1.drawText(MARKER, { x: 40, y: 400, size: 12 });
    p1.drawText('PAGE-1', { x: 40, y: 360, size: 14 });
    const p2 = doc.addPage([400, 500]);
    p2.drawText(MARKER, { x: 40, y: 400, size: 12 });
    p2.drawText('PAGE-2', { x: 40, y: 360, size: 14 });
    writeFileSync(FIXTURE_MULTI, await doc.save());
  }
}

function startStaticServer() {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      try {
        let urlPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
        if (urlPath.endsWith('/')) urlPath += 'index.html';
        const filePath = join(BUILD, urlPath.replace(/^\//, ''));
        if (!filePath.startsWith(BUILD) || !existsSync(filePath)) {
          const notFound = join(BUILD, '404.html');
          res.writeHead(404, { 'content-type': 'text/html' });
          res.end(existsSync(notFound) ? readFileSync(notFound) : 'not found');
          return;
        }
        const ext = extname(filePath);
        res.writeHead(200, { 'content-type': MIME[ext] ?? 'application/octet-stream' });
        res.end(readFileSync(filePath));
      } catch (e) {
        res.writeHead(500);
        res.end(String(e));
      }
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
    server.on('error', reject);
  });
}

/**
 * Install page-level hooks that Playwright request events miss:
 * sendBeacon, WebSocket frames, ServiceWorker registration + fetch.
 */
async function installDeepNetworkHooks(page, findings, gate) {
  await page.exposeFunction('__privacyReport', (kind, detail) => {
    if (!gate.active) return;
    findings.push(`${kind}: ${detail}`);
  });

  await page.addInitScript(() => {
    const originalBeacon = navigator.sendBeacon?.bind(navigator);
    if (originalBeacon) {
      navigator.sendBeacon = (url, data) => {
        let preview = '';
        if (typeof data === 'string') preview = data.slice(0, 512);
        else if (data instanceof Blob) preview = `[Blob type=${data.type} size=${data.size}]`;
        else if (data instanceof ArrayBuffer) preview = `[ArrayBuffer ${data.byteLength}]`;
        else if (data != null) preview = String(data).slice(0, 512);
        window.__privacyReport?.('sendBeacon', `${url} body=${preview}`);
        try {
          return originalBeacon(url, data);
        } catch {
          return false;
        }
      };
    }

    const OriginalWS = window.WebSocket;
    window.WebSocket = class PrivacyWS extends OriginalWS {
      constructor(url, protocols) {
        super(url, protocols);
        window.__privacyReport?.('WebSocket-open', String(url));
      }
      send(data) {
        let preview = '';
        if (typeof data === 'string') preview = data.slice(0, 512);
        else if (data instanceof ArrayBuffer) preview = `[ArrayBuffer ${data.byteLength}]`;
        else if (ArrayBuffer.isView(data)) preview = `[View ${data.byteLength}]`;
        else preview = String(data).slice(0, 128);
        window.__privacyReport?.('WebSocket-send', `${this.url} data=${preview}`);
        return super.send(data);
      }
    };
    Object.assign(window.WebSocket, OriginalWS);
    window.WebSocket.prototype = OriginalWS.prototype;

    if (navigator.serviceWorker?.register) {
      const origRegister = navigator.serviceWorker.register.bind(navigator.serviceWorker);
      navigator.serviceWorker.register = async (...args) => {
        window.__privacyReport?.('serviceWorker.register', String(args[0]));
        return origRegister(...args);
      };
    }

    // Patch fetch so analytics-style calls missing from some resourceType paths still show bodies
    const origFetch = window.fetch.bind(window);
    window.fetch = async (input, init = {}) => {
      try {
        const url = typeof input === 'string' ? input : input?.url ?? String(input);
        const method = (init.method ?? (typeof input === 'object' && input?.method) ?? 'GET').toUpperCase();
        let bodyPreview = '';
        if (typeof init.body === 'string') bodyPreview = init.body.slice(0, 512);
        else if (init.body instanceof Blob) bodyPreview = `[Blob ${init.body.size}]`;
        else if (init.body instanceof FormData) bodyPreview = '[FormData]';
        if (method !== 'GET' && bodyPreview) {
          window.__privacyReport?.('fetch-body', `${method} ${url} body=${bodyPreview}`);
        }
      } catch {
        /* ignore hook errors */
      }
      return origFetch(input, init);
    };
  });
}

async function waitForEnabled(locator, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if ((await locator.count()) > 0 && (await locator.first().isEnabled())) {
      return locator.first();
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`timed out waiting for enabled control: ${locator}`);
}

async function runMergeFlow(page, findings, gate) {
  const label = 'merge-pdf';
  await page.goto(`${ORIGIN}/en/merge-pdf/`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);

  const inputs = page.locator('input[type="file"]');
  if ((await inputs.count()) === 0) {
    findings.push(`${label}: no file input after hydration`);
    return { downloaded: false };
  }

  gate.active = true;
  await inputs.first().setInputFiles(FIXTURE);

  const saveBtn = page.getByRole('button', { name: /Save as PDF|儲存為 PDF|保存为 PDF/i });
  try {
    await waitForEnabled(saveBtn, 30000);
  } catch {
    findings.push(`${label}: Save as PDF button missing or disabled after fixture load (operation required)`);
    return { downloaded: false };
  }

  const downloadPromise = page.waitForEvent('download', { timeout: 30000 }).catch(() => null);
  await saveBtn.click();
  const download = await downloadPromise;
  if (!download) {
    findings.push(`${label}: no download event after Save as PDF (download required)`);
    return { downloaded: false };
  }

  const suggested = download.suggestedFilename();
  if (!/\.pdf$/i.test(suggested)) {
    findings.push(`${label}: download filename not PDF: ${suggested}`);
  }

  await page.waitForTimeout(2000);
  return { downloaded: true, filename: suggested };
}

async function runSignFlow(page, findings, gate) {
  const label = 'sign-pdf';
  await page.goto(`${ORIGIN}/en/sign-pdf/`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);

  const inputs = page.locator('input[type="file"]');
  if ((await inputs.count()) === 0) {
    findings.push(`${label}: no file input after hydration`);
    return { downloaded: false };
  }

  gate.active = true;
  await inputs.first().setInputFiles(FIXTURE);
  await page.waitForTimeout(2500);

  const textInputs = page.locator('textarea');
  if ((await textInputs.count()) > 0) {
    await textInputs.first().fill('Privacy E2E');
  } else {
    const anyText = page.locator('input[type="text"], textarea').first();
    if ((await anyText.count()) > 0) await anyText.fill('Privacy E2E');
  }

  const canvas = page.locator('canvas').first();
  if ((await canvas.count()) > 0) {
    const box = await canvas.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width * 0.4, box.y + box.height * 0.4);
      await page.waitForTimeout(800);
    }
  } else {
    const stage = page.locator('.stage, .viewer-column, .pdf-page, [class*="viewer"]').first();
    if ((await stage.count()) > 0) {
      await stage.click({ position: { x: 120, y: 160 } }).catch(() => {});
      await page.waitForTimeout(800);
    }
  }

  const exportBtn = page.getByRole('button', { name: /Save signed PDF|儲存已簽署 PDF|保存已签署 PDF/i });
  try {
    await waitForEnabled(exportBtn, 20000);
  } catch {
    findings.push(
      `${label}: Save signed PDF button missing/disabled after place attempt (operation+download required)`,
    );
    return { downloaded: false };
  }

  const downloadPromise = page.waitForEvent('download', { timeout: 30000 }).catch(() => null);
  await exportBtn.click();
  const download = await downloadPromise;
  if (!download) {
    findings.push(`${label}: no download event after Save signed PDF (download required)`);
    return { downloaded: false };
  }

  await page.waitForTimeout(2000);
  return { downloaded: true, filename: download.suggestedFilename() };
}

async function waitForSavePdf(page, label, findings) {
  const saveBtn = page.getByRole('button', { name: /Save as PDF|儲存為 PDF|保存为 PDF/i });
  try {
    await waitForEnabled(saveBtn, 30000);
  } catch {
    findings.push(`${label}: Save as PDF button missing or disabled after operation`);
    return null;
  }
  return saveBtn;
}

async function runCompressFlow(page, findings, gate) {
  const label = 'compress-pdf';
  await page.goto(`${ORIGIN}/en/compress-pdf/`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);

  const inputs = page.locator('input[type="file"]');
  if ((await inputs.count()) === 0) {
    findings.push(`${label}: no file input after hydration`);
    return { downloaded: false };
  }

  gate.active = true;
  await inputs.first().setInputFiles(FIXTURE);
  await page.waitForTimeout(2500);

  const compressBtn = page.getByRole('button', { name: /Compress|壓縮|压缩/i });
  try {
    await waitForEnabled(compressBtn, 20000);
  } catch {
    findings.push(`${label}: Compress button missing/disabled after fixture load`);
    return { downloaded: false };
  }
  await compressBtn.click();
  // Wait for compress to finish (progress or re-enabled button)
  await page.waitForTimeout(4000);
  try {
    await waitForEnabled(compressBtn, 60000);
  } catch {
    findings.push(`${label}: compress did not finish`);
    return { downloaded: false };
  }

  const saveBtn = await waitForSavePdf(page, label, findings);
  if (!saveBtn) return { downloaded: false };

  const downloadPromise = page.waitForEvent('download', { timeout: 30000 }).catch(() => null);
  await saveBtn.click();
  const download = await downloadPromise;
  if (!download) {
    findings.push(`${label}: no download after compress + Save as PDF`);
    return { downloaded: false };
  }
  await page.waitForTimeout(2000);
  return { downloaded: true, filename: download.suggestedFilename() };
}

async function runReorderFlow(page, findings, gate) {
  const label = 'reorder-pdf';
  await page.goto(`${ORIGIN}/en/reorder-pdf/`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);

  const inputs = page.locator('input[type="file"]');
  if ((await inputs.count()) === 0) {
    findings.push(`${label}: no file input after hydration`);
    return { downloaded: false };
  }

  gate.active = true;
  await inputs.first().setInputFiles(FIXTURE_MULTI);
  await page.waitForTimeout(3000);

  const thumbs = page.locator('[data-page-index]');
  try {
    await thumbs.first().waitFor({ state: 'visible', timeout: 20000 });
  } catch {
    findings.push(`${label}: page thumbnails did not appear`);
    return { downloaded: false };
  }
  const count = await thumbs.count();
  if (count < 2) {
    findings.push(`${label}: expected 2+ pages for reorder, got ${count}`);
    return { downloaded: false };
  }

  // Drag page 0 onto page 1 (pointer events on PageManager)
  const box0 = await thumbs.nth(0).boundingBox();
  const box1 = await thumbs.nth(1).boundingBox();
  if (box0 && box1) {
    await page.mouse.move(box0.x + box0.width / 2, box0.y + box0.height / 2);
    await page.mouse.down();
    await page.mouse.move(box1.x + box1.width / 2, box1.y + box1.height / 2, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(800);
  } else {
    findings.push(`${label}: could not measure thumbnails for drag reorder`);
    return { downloaded: false };
  }

  const saveBtn = await waitForSavePdf(page, label, findings);
  if (!saveBtn) return { downloaded: false };

  const downloadPromise = page.waitForEvent('download', { timeout: 30000 }).catch(() => null);
  await saveBtn.click();
  const download = await downloadPromise;
  if (!download) {
    findings.push(`${label}: no download after reorder + Save as PDF`);
    return { downloaded: false };
  }
  await page.waitForTimeout(2000);
  return { downloaded: true, filename: download.suggestedFilename() };
}

async function runDeleteFlow(page, findings, gate) {
  const label = 'delete-pdf-pages';
  await page.goto(`${ORIGIN}/en/delete-pdf-pages/`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);

  const inputs = page.locator('input[type="file"]');
  if ((await inputs.count()) === 0) {
    findings.push(`${label}: no file input after hydration`);
    return { downloaded: false };
  }

  gate.active = true;
  await inputs.first().setInputFiles(FIXTURE_MULTI);
  await page.waitForTimeout(3000);

  const thumb = page.locator('[data-page-index="1"]');
  try {
    await thumb.waitFor({ state: 'visible', timeout: 20000 });
  } catch {
    findings.push(`${label}: no second page thumbnail to delete`);
    return { downloaded: false };
  }

  // Prefer per-thumb delete (hidden until hover); fall back to select + bulk Delete.
  const perThumbDelete = thumb.locator('button.thumb-delete, button[aria-label*="Delete page"]');
  if ((await perThumbDelete.count()) > 0) {
    await thumb.hover();
    await perThumbDelete.first().click({ force: true });
  } else {
    await thumb.click();
    const bulkDelete = page.getByRole('button', { name: /Delete|刪除|删除/i });
    try {
      await waitForEnabled(bulkDelete, 10000);
      await bulkDelete.click();
    } catch {
      findings.push(`${label}: could not delete a page`);
      return { downloaded: false };
    }
  }
  await page.waitForTimeout(1000);

  const saveBtn = await waitForSavePdf(page, label, findings);
  if (!saveBtn) return { downloaded: false };

  const downloadPromise = page.waitForEvent('download', { timeout: 30000 }).catch(() => null);
  await saveBtn.click();
  const download = await downloadPromise;
  if (!download) {
    findings.push(`${label}: no download after delete + Save as PDF`);
    return { downloaded: false };
  }
  await page.waitForTimeout(2000);
  return { downloaded: true, filename: download.suggestedFilename() };
}

async function observePage(browser, flow, fixture) {
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();
  const findings = [];
  const gate = { active: false };
  const ctx = { origin: ORIGIN, fixture };

  await installDeepNetworkHooks(page, findings, gate);

  page.on('request', (req) => {
    if (!gate.active) return;
    const headers = req.headers();
    const postData = req.postDataBuffer() ?? req.postData() ?? null;
    const inspected = inspectPayload(postData, headers);
    const issue = leakReason(
      req.url(),
      req.method(),
      { ...inspected, headers },
      req.resourceType(),
      ctx,
    );
    if (issue) findings.push(issue);
  });

  page.on('requestfinished', async (req) => {
    if (!gate.active) return;
    if (req.resourceType() === 'websocket') {
      findings.push(`WebSocket resource: ${req.url()}`);
    }
    // Service worker controlled navigations still surface as normal requests;
    // flag SW script loads after selection
    if (/service.?worker|\/sw\.js/i.test(req.url())) {
      findings.push(`serviceWorker.request: ${req.url()}`);
    }
  });

  let result;
  try {
    result = await flow(page, findings, gate);
  } catch (e) {
    findings.push(`flow error: ${e?.message ?? e}`);
    result = { downloaded: false };
  }

  const hookPrefixes = ['sendBeacon:', 'WebSocket-', 'WebSocket resource:', 'serviceWorker.', 'fetch-body:'];
  const isHookFinding = (f) => hookPrefixes.some((p) => f.startsWith(p));
  const networkFindings = findings.filter((f) => !isHookFinding(f));
  const hookLeaks = findings.filter((f) => isHookFinding(f)).filter((f) => {
    if (f.startsWith('fetch-body:')) {
      return (
        f.includes(MARKER) ||
        f.includes(FIXTURE_NAME) ||
        f.includes('%PDF') ||
        f.includes('privacy-fixture') ||
        /pageCount|fileHash|fileSize|originalFilename/i.test(f)
      );
    }
    return isHookLeak(f, fixture);
  });

  await context.close();
  return {
    findings: networkFindings,
    downloaded: !!result.downloaded,
    hookLeaks,
  };
}

async function main() {
  if (!existsSync(join(BUILD, 'en', 'sign-pdf', 'index.html'))) {
    fail('build/en/sign-pdf/index.html missing — run npm run build first');
    process.exit(1);
  }
  if (!existsSync(join(BUILD, 'en', 'merge-pdf', 'index.html'))) {
    fail('build/en/merge-pdf/index.html missing — run npm run build first');
    process.exit(1);
  }

  await ensureFixture();
  const fixtureBytes = statSync(FIXTURE).size;
  const fixture = fixtureMeta(fixtureBytes, 1);

  const server = await startStaticServer();
  let browser;
  try {
    browser = await launchChromium({ headless: true });

    const merge = await observePage(browser, runMergeFlow, fixture);
    const sign = await observePage(browser, runSignFlow, fixture);
    const compress = await observePage(browser, runCompressFlow, fixture);
    const reorder = await observePage(browser, runReorderFlow, fixture);
    const del = await observePage(browser, runDeleteFlow, fixture);

    const runs = [
      ['merge-pdf', merge],
      ['sign-pdf', sign],
      ['compress-pdf', compress],
      ['reorder-pdf', reorder],
      ['delete-pdf-pages', del],
    ];
    const all = runs.flatMap(([, r]) => [...r.findings, ...r.hookLeaks]);

    for (const [name, r] of runs) {
      if (!r.downloaded && !all.some((f) => f.includes(name))) {
        all.push(`${name}: operation/download did not complete`);
      }
    }

    if (all.length) {
      for (const f of all) fail(f);
    } else {
      console.log(
        'PASS: browser privacy network test — operation+download on sign/merge/compress/reorder/delete; URL+headers+body, beacon/WS/SW inspected',
      );
    }
  } finally {
    if (browser) await browser.close();
    await new Promise((r) => server.close(r));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
