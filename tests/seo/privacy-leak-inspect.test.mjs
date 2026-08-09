import { describe, expect, it } from 'vitest';
import {
  FIXTURE_NAME,
  MARKER,
  buildHaystack,
  fixtureMeta,
  inspectPayload,
  isHookLeak,
  leakReason,
  matchMetadataLeak,
} from '../e2e/privacy-leak-inspect.mjs';

const ORIGIN = 'http://127.0.0.1:4179';
const fixture = fixtureMeta(883, 1);
const ctx = { origin: ORIGIN, fixture };

function payload(text, extra = {}) {
  return {
    text,
    hasPdfMagic: extra.hasPdfMagic ?? false,
    byteLength: extra.byteLength ?? text.length,
    contentType: extra.contentType ?? '',
    headers: extra.headers ?? {},
  };
}

describe('privacy leak inspect (URL + headers + body)', () => {
  it('buildHaystack includes URL, headers, and body', () => {
    const hay = buildHaystack(
      'https://evil.example/collect?f=privacy-fixture.pdf',
      { 'x-file-name': 'privacy-fixture.pdf' },
      'body',
      'application/json',
    );
    expect(hay).toContain('privacy-fixture.pdf');
    expect(hay).toContain('x-file-name');
    expect(hay).toContain('application/json');
  });

  it('detects fixture filename in URL query (not only body)', () => {
    const reason = leakReason(
      `https://tracker.example/log?file=${FIXTURE_NAME}`,
      'GET',
      payload(''),
      'fetch',
      ctx,
    );
    expect(reason).toMatch(/fixture filename/i);
  });

  it('detects fixture filename in request headers', () => {
    const reason = leakReason(
      'https://tracker.example/log',
      'POST',
      payload('{}', { headers: { 'x-filename': FIXTURE_NAME } }),
      'fetch',
      ctx,
    );
    expect(reason).toMatch(/fixture filename/i);
  });

  it('detects PDF magic in binary body', () => {
    const body = Buffer.from('%PDF-1.4\nfake');
    const p = inspectPayload(body, { 'content-type': 'application/pdf' });
    expect(p.hasPdfMagic).toBe(true);
    const reason = leakReason('https://evil.example/upload', 'POST', { ...p, headers: {} }, 'xhr', ctx);
    expect(reason).toMatch(/PDF body/i);
  });

  it('detects document marker text', () => {
    const reason = leakReason(
      'https://evil.example/ingest',
      'POST',
      payload(`text=${MARKER}`),
      'fetch',
      ctx,
    );
    expect(reason).toMatch(/PDF body\/marker/i);
  });

  it('detects metadata-only pageCount without filename', () => {
    expect(matchMetadataLeak('pageCount=1&user=x', fixture)).toBe('pageCount');
    const reason = leakReason(
      'https://evil.example/telemetry',
      'POST',
      payload('{"pageCount":1}'),
      'fetch',
      ctx,
    );
    expect(reason).toMatch(/file metadata \(pageCount/i);
  });

  it('detects metadata-only file size for known fixture length', () => {
    expect(matchMetadataLeak('size=883 bytes uploaded', fixture)).toMatch(/fileSize/);
    const reason = leakReason(
      'https://evil.example/telemetry',
      'POST',
      payload('size=883'),
      'fetch',
      ctx,
    );
    expect(reason).toMatch(/file metadata/i);
  });

  it('detects fileHash-style fields', () => {
    const reason = leakReason(
      'https://evil.example/telemetry',
      'POST',
      payload('fileHash=abcdef0123456789abcdef0123456789'),
      'fetch',
      ctx,
    );
    expect(reason).toMatch(/fileHash/i);
  });

  it('detects originalFilename field without requiring .pdf in same clause logic', () => {
    const reason = leakReason(
      'https://evil.example/telemetry',
      'POST',
      payload('originalFilename=scan-doc'),
      'fetch',
      ctx,
    );
    expect(reason).toMatch(/originalFilename/i);
  });

  it('allows same-origin static asset GETs', () => {
    const reason = leakReason(
      `${ORIGIN}/_app/immutable/chunks/foo.js`,
      'GET',
      payload(''),
      'script',
      ctx,
    );
    expect(reason).toBeNull();
  });

  it('flags same-origin /api/ upload paths', () => {
    const reason = leakReason(`${ORIGIN}/api/upload`, 'POST', payload('x'), 'fetch', ctx);
    expect(reason).toMatch(/upload-like/i);
  });

  it('treats any sendBeacon after selection as a hook leak', () => {
    expect(isHookLeak('sendBeacon: https://t.example/b body=ok', fixture)).toBe(true);
    expect(isHookLeak('WebSocket-open: wss://evil.example/ws', fixture)).toBe(true);
    expect(isHookLeak('serviceWorker.register: /sw.js', fixture)).toBe(true);
  });
});
