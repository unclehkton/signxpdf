import { lookup as defaultLookup } from 'node:dns/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import {
  AUTHORITY_SLUGS,
  GUIDE_LOCALES,
  HREFLANG_BY_LOCALE,
  listCanonicalRoutes,
  SEO_LOCALES,
  SITE_ORIGIN,
  X_DEFAULT_PATH,
} from './seo-inventory.mjs';

export const canonicalOrigin = SITE_ORIGIN;

/** Indexable routes from shared inventory (must match public/sitemap.xml). */
export const canonicalRoutes = listCanonicalRoutes();

/**
 * Routes that receive full runtime HTTP + HTML foundation checks.
 * Must stay identical to `canonicalRoutes` so new locales/guides cannot slip past inventory-only checks.
 */
export function listRuntimeValidatedRoutes() {
  return listCanonicalRoutes();
}

export { X_DEFAULT_PATH };

/** App-level HTTP redirects (Cloudflare Pages public/_redirects). */
export const appRedirectRules = [
  { from: '/', to: '/en/', status: 308 },
  { from: '/tools', to: '/en/merge-pdf/', status: 308 },
  { from: '/tools/', to: '/en/merge-pdf/', status: 308 },
  { from: '/sign-app', to: '/en/sign-pdf/', status: 308 },
  { from: '/sign-app/', to: '/en/sign-pdf/', status: 308 },
];

const trainingAgents = ['gptbot', 'google-extended', 'ccbot', 'anthropic-ai'];
const defaultTimeoutMs = 8000;

export function parseSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) =>
    match[1].replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>'),
  );
}

function decodeHtmlAttribute(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&#x27;', "'")
    .replaceAll('&quot;', '"');
}

function htmlAttribute(tag, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = tag.match(new RegExp(`\\b${escaped}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
  return match ? decodeHtmlAttribute(match[1] ?? match[2] ?? '') : null;
}

/** Parse the canonical and hreflang link contract from a rendered HTML document. */
export function parseSeoMetadata(html) {
  const links = [...String(html).matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const canonicalLinks = links.filter((tag) =>
    (htmlAttribute(tag, 'rel') ?? '').split(/\s+/).some((value) => value.toLowerCase() === 'canonical'),
  );
  const alternateLinks = links
    .filter((tag) =>
      (htmlAttribute(tag, 'rel') ?? '').split(/\s+/).some((value) => value.toLowerCase() === 'alternate'),
    )
    .map((tag) => ({
      lang: htmlAttribute(tag, 'hreflang'),
      href: htmlAttribute(tag, 'href'),
    }))
    .filter((link) => link.lang && link.href)
    .map((link) => ({ lang: link.lang, href: link.href }));

  return {
    canonical: canonicalLinks.length === 1 ? htmlAttribute(canonicalLinks[0], 'href') : null,
    alternates: alternateLinks,
  };
}

/** Return the exact metadata contract expected for an inventory route. */
export function expectedRouteSeo(route) {
  const canonical = `${SITE_ORIGIN}${route}`;
  if (route === X_DEFAULT_PATH) {
    return { canonical, alternates: [{ lang: 'x-default', href: canonical }] };
  }
  if (route === '/open-source-licences/') {
    return { canonical, alternates: [] };
  }

  const segments = route.split('/').filter(Boolean);
  const locale = segments.shift();
  if (!locale || !SEO_LOCALES.includes(locale)) {
    throw new Error(`Route is not a localized SEO route: ${route}`);
  }

  const pathSegment = segments.join('/');
  const locales = pathSegment.startsWith('guides/') || AUTHORITY_SLUGS.includes(pathSegment)
    ? GUIDE_LOCALES
    : SEO_LOCALES;
  const alternates = locales.map((alternateLocale) => ({
    lang: HREFLANG_BY_LOCALE[alternateLocale],
    href: `${SITE_ORIGIN}/${alternateLocale}/${pathSegment ? `${pathSegment}/` : ''}`,
  }));
  alternates.push({ lang: 'x-default', href: `${SITE_ORIGIN}${X_DEFAULT_PATH}` });
  return { canonical, alternates };
}

function parseRobotsGroups(text) {
  const groups = [];
  let current = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, '').trim();
    if (!line) {
      if (current) groups.push(current);
      current = null;
      continue;
    }

    const userAgent = line.match(/^user-agent:\s*(.+)$/i);
    if (userAgent) {
      if (!current || current.directives.length > 0) {
        if (current) groups.push(current);
        current = { agents: [], directives: [] };
      }
      current.agents.push(userAgent[1].trim().toLowerCase());
      continue;
    }

    if (current) current.directives.push(line);
  }
  if (current) groups.push(current);
  return groups;
}

function robotsGroup(groups, agent) {
  return groups.find((group) => group.agents.includes(agent));
}

function groupAllowsRoot(group) {
  if (!group) return false;
  const allowsRoot = group.directives.some((line) => /^allow:\s*\/$/i.test(line));
  const blocksRoot = group.directives.some((line) => /^disallow:\s*\/$/i.test(line));
  return allowsRoot && !blocksRoot;
}

export function evaluateRobotsPolicy(text) {
  const groups = parseRobotsGroups(text);
  const defaultGroup = robotsGroup(groups, '*');
  const trainingBlocked = trainingAgents.every((agent) => {
    const group = robotsGroup(groups, agent);
    return Boolean(group?.directives.some((line) => /^disallow:\s*\/$/i.test(line)));
  });

  return {
    allowsAll: groupAllowsRoot(defaultGroup),
    blocksTraining: trainingBlocked,
    hasContentSignals: /^content-signal:\s*search=yes,\s*ai-input=yes,\s*ai-train=no\s*$/im.test(text),
    hasSitemap: new RegExp(`^sitemap:\\s*${canonicalOrigin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/sitemap\\.xml\\s*$`, 'im').test(text),
  };
}

export function hasNoIndexDirective(headers) {
  const value = headers.get('x-robots-tag') ?? '';
  return /\b(?:noindex|none|nosnippet)\b/i.test(value);
}

function isLocalHost(hostname) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}

/**
 * Classify the target so preview-only Cloudflare behavior is not treated as
 * production failure evidence.
 */
export function classifyBaseUrl(value) {
  let url;
  try {
    url = value instanceof URL ? value : new URL(String(value));
  } catch {
    return 'unknown';
  }

  if (isLocalHost(url.hostname)) return 'local';
  if (url.origin === canonicalOrigin) return 'production';
  if (url.hostname === 'pages.dev' || url.hostname.endsWith('.pages.dev')) return 'preview';
  return 'unknown';
}

/**
 * Match a Cloudflare Pages redirect rule using the numeric status exactly.
 * In particular, `308!` is not valid Pages syntax and must not be accepted.
 */
export function hasRedirectRule(text, rule) {
  const escape = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const normalized = String(text).replace(/\r\n/g, '\n');
  return new RegExp(
    `^${escape(rule.from)}\\s+${escape(rule.to)}\\s+${Number(rule.status)}\\s*$`,
    'm',
  ).test(normalized);
}

function formatUrl(url) {
  return url instanceof URL ? url.toString() : String(url);
}

async function fetchWithTimeout(fetchImpl, url, options, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetchImpl(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchRedirectChain(fetchImpl, startUrl, options, timeoutMs, maxHops = 4) {
  const history = [];
  let currentUrl = formatUrl(startUrl);

  for (let hop = 0; hop <= maxHops; hop += 1) {
    const response = await fetchWithTimeout(
      fetchImpl,
      currentUrl,
      { ...options, redirect: 'manual' },
      timeoutMs,
    );
    if (response.status < 300 || response.status >= 400) {
      return { response, history, finalUrl: currentUrl };
    }

    const location = response.headers.get('location');
    if (!location) return { response, history, finalUrl: currentUrl };
    history.push({ url: currentUrl, status: response.status, location });
    currentUrl = new URL(location, currentUrl).toString();
  }

  throw new Error(`redirect chain exceeded ${maxHops} hops`);
}

function reporter(log) {
  const result = { failures: 0, warnings: 0, checks: [] };
  const add = (level, label, detail) => {
    result.checks.push({ level, label, detail });
    if (level === 'FAIL') result.failures += 1;
    if (level === 'WARN') result.warnings += 1;
    log(`[${level}] ${label}${detail ? ` — ${detail}` : ''}`);
  };
  return {
    result,
    pass: (label, detail) => add('PASS', label, detail),
    warn: (label, detail) => add('WARN', label, detail),
    fail: (label, detail) => add('FAIL', label, detail),
  };
}

function requiredContentSignals(value) {
  return ['search=yes', 'ai-input=yes', 'ai-train=no'].every((token) =>
    value.toLowerCase().includes(token),
  );
}

function textContentLength(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim().length;
}

export async function runSeoFoundationCheck({
  baseUrl = process.env.SEO_BASE_URL || canonicalOrigin,
  fetchImpl = globalThis.fetch,
  lookupDns = defaultLookup,
  timeoutMs = defaultTimeoutMs,
  log = console.log,
} = {}) {
  const output = reporter(log);
  if (typeof fetchImpl !== 'function') {
    output.fail('HTTP client', 'global fetch is unavailable');
    return output.result;
  }

  let base;
  try {
    base = new URL(baseUrl);
  } catch {
    output.fail('Base URL', `invalid URL: ${baseUrl}`);
    log(`[FAIL] SEO foundation summary — ${output.result.failures} failures, ${output.result.warnings} warnings`);
    return output.result;
  }

  const target = classifyBaseUrl(base);
  if (target === 'unknown') {
    output.fail('Base URL', `unsupported target; use localhost, *.pages.dev, or ${canonicalOrigin}`);
    log(`[FAIL] SEO foundation summary — ${output.result.failures} failures, ${output.result.warnings} warnings`);
    return output.result;
  }

  const local = target === 'local';
  const preview = target === 'preview';
  const production = target === 'production';
  const requestUrl = (path) => new URL(path, base).toString();
  const request = (path, options = {}) => fetchWithTimeout(
    fetchImpl,
    requestUrl(path),
    {
      headers: {
        'user-agent': 'SignXPdfSeoFoundationCheck/1.0',
        accept: 'text/html,application/xhtml+xml,text/plain,application/xml;q=0.9,*/*;q=0.8',
        ...(options.headers ?? {}),
      },
      ...options,
    },
    timeoutMs,
  );

  if (local) {
    output.pass('Local base URL', base.origin);
  } else if (preview) {
    if (base.protocol !== 'https:') {
      output.fail('Preview transport', `${base.origin} is not HTTPS`);
    } else {
      output.pass('Preview transport', base.origin);
    }
  } else {
    if (base.protocol !== 'https:') {
      output.fail('Canonical transport', `${base.origin} is not HTTPS`);
    } else {
      output.pass('Canonical transport', base.origin);
    }

    for (const hostname of ['signxpdf.com', 'www.signxpdf.com']) {
      try {
        const addresses = await lookupDns(hostname, { all: true });
        output.pass(`DNS ${hostname}`, `${addresses.length} address record(s)`);
      } catch (error) {
        output.fail(`DNS ${hostname}`, error instanceof Error ? error.message : String(error));
      }
    }
  }

  if (production) {
    const redirectCases = [
      ['http://signxpdf.com/robots.txt?seo_phase=1', 'https://www.signxpdf.com/robots.txt?seo_phase=1'],
      ['https://signxpdf.com/robots.txt?seo_phase=1', 'https://www.signxpdf.com/robots.txt?seo_phase=1'],
      ['http://www.signxpdf.com/robots.txt?seo_phase=1', 'https://www.signxpdf.com/robots.txt?seo_phase=1'],
    ];

    for (const [source, expected] of redirectCases) {
      try {
        const chain = await fetchRedirectChain(fetchImpl, source, {
          headers: { 'user-agent': 'SignXPdfSeoFoundationCheck/1.0' },
        }, timeoutMs);
        const first = chain.history[0];
        if (!first || first.status !== 301) {
          output.fail(`Redirect ${source}`, `expected direct 301, received ${first?.status ?? chain.response.status}`);
          continue;
        }
        if (first.location !== expected) {
          output.fail(`Redirect ${source}`, `expected ${expected}, received ${first.location}`);
          continue;
        }
        if (chain.history.length !== 1) {
          output.fail(`Redirect ${source}`, `${chain.history.length} redirect hops detected`);
          continue;
        }
        output.pass(`Redirect ${source}`, `direct 301 to ${expected}`);
      } catch (error) {
        output.fail(`Redirect ${source}`, error instanceof Error ? error.message : String(error));
      }
    }
  } else if (local) {
    output.warn('Redirect matrix', 'skipped for local preview; verify apex/www Cloudflare rules against production');
  } else {
    output.warn('Redirect matrix', 'skipped for Pages preview; apex/www Cloudflare rules are production-only');
  }

  let robotsText = '';
  try {
    const response = await request('/robots.txt');
    robotsText = await response.text();
    const contentType = response.headers.get('content-type') ?? '';
    if (response.status !== 200) output.fail('robots.txt status', `expected 200, received ${response.status}`);
    else output.pass('robots.txt status', '200');
    if (!/text\/plain/i.test(contentType)) output.fail('robots.txt content type', contentType || 'missing');
    else output.pass('robots.txt content type', contentType);
    if (/<html\b/i.test(robotsText)) output.fail('robots.txt body', 'HTML shell returned instead of plain text');
    else output.pass('robots.txt body', `${robotsText.length} bytes`);
    const policy = evaluateRobotsPolicy(robotsText);
    for (const [label, value] of Object.entries({
      'robots search/user-directed AI access': policy.allowsAll,
      'robots training reservation': policy.blocksTraining,
      'robots Content-Signal': policy.hasContentSignals,
      'robots sitemap directive': policy.hasSitemap,
    })) {
      if (value) output.pass(label);
      else output.fail(label, 'required directive is missing or contradictory');
    }
  } catch (error) {
    output.fail('robots.txt request', error instanceof Error ? error.message : String(error));
  }

  let sitemapUrls = [];
  try {
    const response = await request('/sitemap.xml', { headers: { accept: 'application/xml,text/xml;q=0.9,*/*;q=0.8' } });
    const sitemapText = await response.text();
    const contentType = response.headers.get('content-type') ?? '';
    if (response.status !== 200) output.fail('sitemap.xml status', `expected 200, received ${response.status}`);
    else output.pass('sitemap.xml status', '200');
    if (!/xml|text\/plain/i.test(contentType)) output.warn('sitemap.xml content type', contentType || 'missing');
    else output.pass('sitemap.xml content type', contentType);
    sitemapUrls = parseSitemapUrls(sitemapText);
    const expectedUrls = canonicalRoutes.map((route) => `${canonicalOrigin}${route}`);
    if (JSON.stringify(sitemapUrls) !== JSON.stringify(expectedUrls)) {
      output.fail('sitemap.xml route inventory', `expected ${expectedUrls.join(', ')}, received ${sitemapUrls.join(', ')}`);
    } else {
      output.pass('sitemap.xml route inventory', `${sitemapUrls.length} canonical routes`);
    }
    for (const sitemapUrl of sitemapUrls) {
      const parsed = new URL(sitemapUrl);
      if (parsed.origin !== canonicalOrigin || parsed.search || parsed.hash) {
        output.fail('sitemap.xml URL safety', sitemapUrl);
      }
    }
  } catch (error) {
    output.fail('sitemap.xml request', error instanceof Error ? error.message : String(error));
  }

  async function checkPublicRoute(route, label) {
    try {
      const chain = await fetchRedirectChain(fetchImpl, requestUrl(route), {
        headers: { 'user-agent': 'SignXPdfSeoFoundationCheck/1.0', accept: 'text/html' },
      }, timeoutMs);
      const response = chain.response;
      const html = await response.text();
      if (chain.history.length > 0) {
        output.fail(
          `${label} redirect`,
          `expected direct 200 with no redirect hops, received ${chain.history.length} hop(s) ending ${response.status}`,
        );
        return null;
      }
      if (response.status !== 200) {
        output.fail(`${label} status`, `expected 200, received ${response.status}`);
        return null;
      }
      output.pass(`${label} status`, '200 (no redirect)');
      if (!/text\/html/i.test(response.headers.get('content-type') ?? '')) {
        output.fail(`${label} content type`, response.headers.get('content-type') || 'missing');
      } else {
        output.pass(`${label} content type`, response.headers.get('content-type'));
      }
      if (production && hasNoIndexDirective(response.headers)) {
        output.fail(`${label} indexability`, 'X-Robots-Tag contains noindex/none/nosnippet');
      } else if (preview && hasNoIndexDirective(response.headers)) {
        output.pass(`${label} indexability`, 'preview X-Robots-Tag noindex is expected');
      } else if (preview) {
        output.warn(`${label} indexability`, 'preview response has no X-Robots-Tag noindex directive');
      } else {
        output.pass(`${label} indexability`, 'no blocking X-Robots-Tag directive');
      }
      const contentSignal = response.headers.get('content-signal') ?? '';
      if (local) {
        if (contentSignal) output.pass(`${label} Content-Signal`, contentSignal);
        else output.warn(`${label} Content-Signal`, 'not applied by local preview; verify Cloudflare edge headers after deploy');
      } else if (!requiredContentSignals(contentSignal)) {
        output.fail(`${label} Content-Signal`, contentSignal || 'missing');
      } else {
        output.pass(`${label} Content-Signal`, contentSignal);
      }
      return { response, html, route };
    } catch (error) {
      output.fail(`${label} request`, error instanceof Error ? error.message : String(error));
      return null;
    }
  }

  function assertOneTitleH1(page, label, titlePattern) {
    if (!page) return;
    const titleCount = (page.html.match(/<title\b/gi) ?? []).length;
    const h1Count = (page.html.match(/<h1\b/gi) ?? []).length;
    if (titleCount !== 1) output.fail(`${label} title`, `expected exactly one title element, received ${titleCount}`);
    else if (!titlePattern.test(page.html)) output.fail(`${label} title`, 'expected title text is missing');
    else output.pass(`${label} title`, 'one title element');
    if (h1Count !== 1) output.fail(`${label} H1`, `expected exactly one H1, received ${h1Count}`);
    else output.pass(`${label} H1`, 'one H1 element');
    const length = textContentLength(page.html);
    if (length < 200) output.fail(`${label} meaningful HTML`, `${length} text characters`);
    else output.pass(`${label} meaningful HTML`, `${length} text characters`);
    if (!/property="og:image"/i.test(page.html)) output.fail(`${label} og:image`, 'missing');
    else output.pass(`${label} og:image`, 'present');

    const expected = expectedRouteSeo(page.route);
    const metadata = parseSeoMetadata(page.html);
    const canonicalCount = (page.html.match(/<link\b[^>]*\brel\s*=\s*["'][^"']*\bcanonical\b[^"']*["'][^>]*>/gi) ?? []).length;
    if (canonicalCount !== 1) {
      output.fail(`${label} canonical`, `expected exactly one canonical link, received ${canonicalCount}`);
    } else if (metadata.canonical !== expected.canonical) {
      output.fail(`${label} canonical`, `expected ${expected.canonical}, received ${metadata.canonical ?? 'missing'}`);
    } else {
      output.pass(`${label} canonical`, metadata.canonical);
    }

    if (JSON.stringify(metadata.alternates) !== JSON.stringify(expected.alternates)) {
      output.fail(
        `${label} hreflang`,
        `expected ${JSON.stringify(expected.alternates)}, received ${JSON.stringify(metadata.alternates)}`,
      );
    } else {
      output.pass(`${label} hreflang`, `${metadata.alternates.length} reciprocal alternate link(s)`);
    }
  }

  // Full inventory: every sitemap/canonical route gets HTTP + HTML foundation checks
  // (Phase 3 guides included — not only a hard-coded primary subset).
  const runtimeRoutes = listRuntimeValidatedRoutes();
  if (runtimeRoutes.length !== canonicalRoutes.length
    || runtimeRoutes.some((route, i) => route !== canonicalRoutes[i])) {
    output.fail(
      'runtime route inventory',
      `listRuntimeValidatedRoutes() must match canonicalRoutes (${canonicalRoutes.length} entries)`,
    );
  } else {
    output.pass('runtime route inventory', `${runtimeRoutes.length} routes match canonicalRoutes`);
  }

  /** Stricter title needles for a few flagship pages; others require brand in title. */
  const titleNeedleByRoute = {
    '/en/sign-pdf/': /Sign PDF/i,
    '/en/merge-pdf/': /Merge PDF/i,
    '/en/compress-pdf/': /Compress/i,
    '/en/reorder-pdf/': /Reorder/i,
    '/en/delete-pdf-pages/': /Delete/i,
    '/en/privacy/': /Privacy/i,
    '/en/guides/visible-vs-digital-signature/': /Visible|Digital Signature/i,
    '/en/guides/how-browser-pdf-tools-work/': /browser|PDF tools/i,
    '/zh-hant/sign-pdf/': /簽署|Sign/i,
    '/zh-hant/merge-pdf/': /合併|Merge/i,
    '/zh-hant/compress-pdf/': /壓縮|Compress/i,
    '/zh-hant/reorder-pdf/': /排列|Reorder/i,
    '/zh-hant/delete-pdf-pages/': /刪除|Delete/i,
    '/zh-hant/privacy/': /私隱|Privacy/i,
    '/zh-hant/guides/visible-vs-digital-signature/': /簽署|簽名|數位|數碼|Digital|Visible/i,
    '/zh-hant/guides/how-browser-pdf-tools-work/': /瀏覽器|browser|PDF/i,
    '/zh-hans/sign-pdf/': /签署|Sign/i,
    '/zh-hans/merge-pdf/': /合并|Merge/i,
    '/zh-hans/compress-pdf/': /压缩|Compress/i,
    '/zh-hans/reorder-pdf/': /排列|Reorder/i,
    '/zh-hans/delete-pdf-pages/': /删除|Delete/i,
    '/zh-hans/privacy/': /隐私|Privacy/i,
    '/zh-hans/guides/visible-vs-digital-signature/': /签署|签名|数字|Visible|Digital/i,
    '/zh-hans/guides/how-browser-pdf-tools-work/': /浏览器|browser|PDF/i,
    '/languages/': /language|语言|語言|Choose/i,
    '/open-source-licences/': /licen[cs]e|开源|開源/i,
  };

  for (const route of runtimeRoutes) {
    const label = `route ${route}`;
    const page = await checkPublicRoute(route, label);
    const needle = titleNeedleByRoute[route] ?? /Sign X PDF/i;
    const titlePattern = new RegExp(
      `<title\\b[^>]*>[^<]*(?:${needle.source}|Sign X PDF)[^<]*<\\/title>`,
      'i',
    );
    assertOneTitleH1(page, label, titlePattern);
  }

  // Local validation inspects the generated artifact. Remote validation must
  // use the target host so stale local build files cannot masquerade as live
  // Pages behavior.
  if (local) try {
    const { readFileSync, existsSync } = await import('node:fs');
    const redirectFile = existsSync('build/_redirects')
      ? 'build/_redirects'
      : existsSync('public/_redirects')
        ? 'public/_redirects'
        : null;
    if (!redirectFile) {
      output.fail('app _redirects file', 'missing build/_redirects and public/_redirects');
    } else {
      const text = readFileSync(redirectFile, 'utf8');
      for (const rule of appRedirectRules) {
        if (!hasRedirectRule(text, rule)) {
          output.fail(`app redirect rule ${rule.from}`, `expected ${rule.status} to ${rule.to} in ${redirectFile}`);
        } else {
          output.pass(`app redirect rule ${rule.from}`, `${rule.status} → ${rule.to}`);
        }
      }
    }
  } catch (error) {
    output.fail('app _redirects file', error instanceof Error ? error.message : String(error));
  }

  if (!local) {
    for (const rule of appRedirectRules) {
      try {
        const chain = await fetchRedirectChain(fetchImpl, requestUrl(rule.from), {
          headers: { 'user-agent': 'SignXPdfSeoFoundationCheck/1.0', accept: 'text/html' },
        }, timeoutMs);
        const first = chain.history[0];
        if (!first || first.status !== rule.status) {
          output.fail(
            `live redirect ${rule.from}`,
            `expected HTTP ${rule.status}, received ${first?.status ?? chain.response.status}`,
          );
          continue;
        }
        const locationPath = new URL(first.location, canonicalOrigin).pathname;
        const expectedPath = rule.to.endsWith('/') ? rule.to : `${rule.to}/`;
        const normalized = locationPath.endsWith('/') ? locationPath : `${locationPath}/`;
        if (normalized !== expectedPath && locationPath !== rule.to) {
          output.fail(`live redirect ${rule.from}`, `expected ${rule.to}, received ${first.location}`);
        } else {
          output.pass(`live redirect ${rule.from}`, `HTTP ${rule.status} → ${first.location}`);
        }
      } catch (error) {
        output.fail(`live redirect ${rule.from}`, error instanceof Error ? error.message : String(error));
      }
    }
  }

  for (const [path, label] of [
    ['/__seo-foundation-missing__', 'unknown route 404'],
    ['/__seo-foundation-missing__.xml', 'missing XML 404'],
    ['/__seo-foundation-missing__.js', 'missing asset 404'],
  ]) {
    try {
      const chain = await fetchRedirectChain(fetchImpl, requestUrl(path), {
        headers: { 'user-agent': 'SignXPdfSeoFoundationCheck/1.0' },
      }, timeoutMs);
      if (chain.response.status !== 404) output.fail(label, `expected 404, received ${chain.response.status}`);
      else output.pass(label, 'real 404 response');
    } catch (error) {
      output.fail(label, error instanceof Error ? error.message : String(error));
    }
  }

  try {
    const response = await request('/', { headers: { accept: 'text/markdown' } });
    const contentType = response.headers.get('content-type') ?? '';
    if (/text\/markdown/i.test(contentType)) {
      const markdown = await response.text();
      if (markdown.trim().length > 0 && !/<html\b/i.test(markdown)) output.pass('Markdown representation', `${markdown.length} bytes`);
      else output.fail('Markdown representation', 'enabled response is empty or HTML');
    } else {
      output.warn('Markdown representation', 'not enabled; no Markdown-specific response was detected');
    }
  } catch (error) {
    output.warn('Markdown representation', error instanceof Error ? error.message : String(error));
  }

  const summary = `${output.result.failures} failures, ${output.result.warnings} warnings`;
  log(`[${output.result.failures > 0 ? 'FAIL' : 'PASS'}] SEO foundation summary — ${summary}`);
  return output.result;
}

export async function main() {
  const result = await runSeoFoundationCheck();
  console.log(`SEO foundation checks complete: ${result.failures} failures, ${result.warnings} warnings.`);
  if (result.failures > 0) process.exitCode = 1;
  return result;
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]).toLowerCase() === resolve(currentFile).toLowerCase()) {
  void main();
}
