/**
 * Pure helpers for privacy network leak detection.
 * Used by privacy-no-upload.mjs and unit-tested in isolation.
 */

export const FIXTURE_NAME = 'privacy-fixture.pdf';
export const FIXTURE_STEM = 'privacy-fixture';
export const MARKER = 'SignXPDF-PRIVACY-FIXTURE-7f3a9c';

/** Known fixture attributes used to catch metadata-only leaks. */
export function fixtureMeta(fixtureBytesLength = 0, pageCount = 1) {
  return {
    filename: FIXTURE_NAME,
    stem: FIXTURE_STEM,
    marker: MARKER,
    byteLength: fixtureBytesLength,
    pageCount,
  };
}

/**
 * Decode request body into searchable text + PDF magic flag.
 * @param {string|Buffer|Uint8Array|null|undefined} postData
 * @param {Record<string, string>|undefined} headers
 */
export function inspectPayload(postData, headers = {}) {
  if (postData == null) {
    return { text: '', hasPdfMagic: false, byteLength: 0, contentType: headerValue(headers, 'content-type') };
  }

  let bytes;
  if (typeof postData === 'string') {
    bytes = Buffer.from(postData, 'utf8');
  } else if (Buffer.isBuffer(postData)) {
    bytes = postData;
  } else if (postData instanceof Uint8Array) {
    bytes = Buffer.from(postData);
  } else {
    bytes = Buffer.from(String(postData), 'utf8');
  }

  const hasPdfMagic =
    bytes.length >= 4 && bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;

  return {
    text: bytes.toString('latin1'),
    hasPdfMagic,
    byteLength: bytes.length,
    contentType: headerValue(headers, 'content-type'),
  };
}

function headerValue(headers, name) {
  if (!headers) return '';
  const lower = name.toLowerCase();
  for (const [k, v] of Object.entries(headers)) {
    if (k.toLowerCase() === lower) return String(v ?? '');
  }
  return '';
}

/**
 * Flatten URL + headers + body into one searchable haystack.
 */
export function buildHaystack(url, headers = {}, bodyText = '', contentType = '') {
  const headerLines = Object.entries(headers ?? {})
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  return [String(url), headerLines, contentType, bodyText].join('\n');
}

/**
 * @param {string} url
 * @param {string} method
 * @param {{ text: string, hasPdfMagic: boolean, byteLength: number, contentType?: string }} payload
 * @param {string} resourceType
 * @param {{ origin: string, fixture: ReturnType<typeof fixtureMeta> }} ctx
 * @returns {string|null} leak reason or null
 */
export function leakReason(url, method, payload, resourceType, ctx) {
  const u = String(url);
  const headers = payload.headers ?? {};
  const { text, hasPdfMagic, contentType = '', byteLength } = payload;
  const hay = buildHaystack(u, headers, text, contentType);
  const fixture = ctx.fixture;
  const sameOrigin = isSameOrigin(u, ctx.origin);

  // --- PDF body / document text marker ---
  if (hasPdfMagic || hay.includes('%PDF') || hay.includes(fixture.marker)) {
    return `PDF body/marker via ${method} ${resourceType} → ${u}`;
  }

  // --- filename (URL query, headers, or body) ---
  if (hay.includes(fixture.filename) || hay.includes(fixture.stem)) {
    return `fixture filename via ${method} ${resourceType} → ${u}`;
  }

  // --- signature / image binary hints (PNG/JPEG magic or data URLs) ---
  if (
    /data:image\/(png|jpeg|jpg|webp);base64,/i.test(hay) ||
    (byteLength > 8 && (text.startsWith('\x89PNG') || text.startsWith('\xff\xd8\xff')))
  ) {
    // Only flag when not loading same-origin static assets
    if (!sameOrigin || method !== 'GET') {
      return `signature/image payload via ${method} ${resourceType} → ${u}`;
    }
  }

  // --- metadata-only payloads (no filename required) ---
  const metaHit = matchMetadataLeak(hay, fixture);
  if (metaHit) {
    return `file metadata (${metaHit}) via ${method} ${resourceType} → ${u}`;
  }

  // --- analytics / error-reporting channels with document signals ---
  if (isAnalyticsOrErrorUrl(u) && (hasDocumentSignal(hay, fixture) || byteLength > 0 && method !== 'GET')) {
    if (hasDocumentSignal(hay, fixture) || hasPdfMagic || hay.includes('%PDF')) {
      return `analytics/error channel with document signal → ${u}`;
    }
  }

  if (sameOrigin) {
    if (/\/api\//i.test(u) || /\/upload\b/i.test(u)) {
      return `same-origin upload-like URL ${u}`;
    }
    return null;
  }

  // Third-party: fail closed on mutating methods with any non-empty body after selection
  if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && byteLength > 0) {
    if (hasDocumentSignal(hay, fixture) || hasPdfMagic || hay.includes('%PDF')) {
      return `third-party ${method} with document-related body → ${u}`;
    }
    // Opaque third-party POST bodies after PDF selection are still suspicious
    // if they look like form/json telemetry carrying sizes or hashes
    if (matchMetadataLeak(hay, fixture) || /[a-f0-9]{32,}/i.test(text)) {
      return `third-party ${method} with metadata/hash-like body → ${u}`;
    }
  }

  return null;
}

export function isSameOrigin(url, origin) {
  const o = origin.replace(/\/$/, '');
  return url.startsWith(`${o}/`) || url.startsWith(o + '?') || url === o;
}

function hasDocumentSignal(hay, fixture) {
  return (
    hay.includes(fixture.marker) ||
    hay.includes(fixture.filename) ||
    hay.includes(fixture.stem) ||
    hay.includes('%PDF') ||
    matchMetadataLeak(hay, fixture) != null
  );
}

/**
 * Detect metadata-only leaks: page count, file size, hash, document text keys, etc.
 * @returns {string|null} which field matched
 */
export function matchMetadataLeak(hay, fixture) {
  // Named fields commonly used in telemetry (JSON and form encodings)
  if (/\b(pageCount|page_count|numPages|num_pages)\b\s*["']?\s*[:=]\s*["']?\s*\d+/i.test(hay)) {
    return 'pageCount';
  }
  if (
    /\b(fileSize|file_size|byteLength|contentLength|content_length|size)\b\s*["']?\s*[:=]\s*["']?\s*\d+/i.test(
      hay,
    )
  ) {
    return 'fileSize';
  }
  if (/\b(fileHash|file_hash|sha256|sha-256|md5|digest)\b\s*["']?\s*[:=]/i.test(hay)) return 'fileHash';
  if (/\b(documentText|document_text|pdfText|extractedText)\b\s*["']?\s*[:=]/i.test(hay)) {
    return 'documentText';
  }
  if (/\b(originalFilename|original_filename|fileName|file_name)\b\s*["']?\s*[:=]/i.test(hay)) {
    return 'originalFilename';
  }

  // Bare fixture size / page count when clearly labeled or as known values with context
  if (fixture.byteLength > 0) {
    const sizeRe = new RegExp(
      String.raw`\b(size|bytes|length|content-length)\b[^0-9]{0,16}\b${fixture.byteLength}\b`,
      'i',
    );
    if (sizeRe.test(hay)) return `fileSize=${fixture.byteLength}`;
  }
  if (fixture.pageCount != null) {
    const pagesRe = new RegExp(
      String.raw`\b(pages?|pageCount|page_count)\b[^0-9]{0,16}\b${fixture.pageCount}\b`,
      'i',
    );
    // Avoid matching every "page 1" in HTML asset paths — require key-ish left side
    if (pagesRe.test(hay) && !/\.(js|css|png|html)\b/i.test(hay.split('\n')[0] ?? '')) {
      return `pageCount=${fixture.pageCount}`;
    }
  }

  return null;
}

function isAnalyticsOrErrorUrl(url) {
  return /google-analytics|googletagmanager|gtag\/|sentry\.io|bugsnag|datadog|segment\.io|hotjar|clarity\.ms|facebook\.com\/tr|doubleclick|mixpanel|amplitude|fullstory|newrelic|error-report|\/collect\b|\/beacon\b/i.test(
    url,
  );
}

/**
 * Classify hook-reported sendBeacon / WebSocket / service-worker events.
 * @returns {boolean} true if this is a hard privacy failure
 */
export function isHookLeak(finding, fixture) {
  if (finding.startsWith('sendBeacon:')) {
    // Any sendBeacon after file selection is unexpected for this app; fail closed.
    return true;
  }
  if (finding.startsWith('WebSocket-open:') || finding.startsWith('WebSocket-send:')) {
    return true;
  }
  if (finding.startsWith('serviceWorker.register:') || finding.startsWith('serviceWorker.request:')) {
    return true;
  }
  if (finding.startsWith('WebSocket resource:')) {
    return true;
  }
  // Also catch raw marker strings that hooks may embed
  return (
    finding.includes(fixture.marker) ||
    finding.includes(fixture.filename) ||
    finding.includes('%PDF')
  );
}
