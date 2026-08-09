#!/usr/bin/env node
/**
 * Offline SEO gate against the static build/ directory.
 * Run after `npm run build`.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  listCanonicalRoutes,
  LICENCES_PATH,
  X_DEFAULT_PATH,
} from './seo-inventory.mjs';

const BUILD = 'build';

/** Pathnames without leading/trailing slash for build/ folder layout, except special roots. */
function routeToBuildDir(pathname) {
  const trimmed = pathname.replace(/^\/+|\/+$/g, '');
  return trimmed;
}

const failures = [];

function fail(msg) {
  failures.push(msg);
}

const routes = listCanonicalRoutes();

for (const pathname of routes) {
  const rel = routeToBuildDir(pathname);
  const file = join(BUILD, rel, 'index.html');
  if (!existsSync(file)) {
    fail(`missing ${file}`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  if (!/<title>[^<]{8,}<\/title>/i.test(html)) fail(`${pathname}: weak title`);
  if (!/<h1[\s>]/i.test(html)) fail(`${pathname}: missing H1`);
  if (!/rel="canonical"/i.test(html)) fail(`${pathname}: missing canonical`);
  if (!/property="og:image"/i.test(html)) fail(`${pathname}: missing og:image`);
  if ((html.match(/<title\b/gi) ?? []).length !== 1) fail(`${pathname}: expected exactly one title`);

  const head = (html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1]) ?? '';
  const isLanguages = pathname === X_DEFAULT_PATH;
  const isLicences = pathname === LICENCES_PATH;
  if (isLicences) {
    // Standalone legal page: no SEO alternate / x-default cluster in <head>
    if (/rel="alternate"[^>]*hreflang=/i.test(head) || /hreflang="x-default"/i.test(head)) {
      fail(`${pathname}: should not emit hreflang/x-default alternates`);
    }
  } else {
    if (!isLanguages) {
      if (!/hreflang="en"/i.test(head) || !/hreflang="zh-Hant"/i.test(head) || !/hreflang="zh-Hans"/i.test(head)) {
        fail(`${pathname}: incomplete hreflang (need en, zh-Hant, zh-Hans)`);
      }
    }
    if (!/hreflang="x-default"/i.test(head)) fail(`${pathname}: missing x-default`);
    const xd = head.match(/hreflang="x-default"[^>]*href="([^"]+)"/i)
      || head.match(/href="([^"]+)"[^>]*hreflang="x-default"/i);
    if (xd && !/\/languages\/?/.test(xd[1])) {
      fail(`${pathname}: x-default should be /languages/ (got ${xd[1]})`);
    }
  }
  if (/noindex/i.test(html)) fail(`${pathname}: accidental noindex`);
}

// Redirects + og asset
const redirects = existsSync(join(BUILD, '_redirects'))
  ? readFileSync(join(BUILD, '_redirects'), 'utf8')
  : existsSync('public/_redirects')
    ? readFileSync('public/_redirects', 'utf8')
    : '';
if (!redirects.includes('/en/')) fail('redirects missing /en/ target');

if (
  !existsSync(join(BUILD, 'og-default.png'))
  && !existsSync('public/og-default.png')
  && !existsSync('static/og-default.png')
) {
  fail('og-default.png missing from build/public');
}

// Sitemap parity
const sitemapPath = existsSync(join(BUILD, 'sitemap.xml'))
  ? join(BUILD, 'sitemap.xml')
  : 'public/sitemap.xml';
if (!existsSync(sitemapPath)) fail('sitemap.xml missing');
else {
  const xml = readFileSync(sitemapPath, 'utf8');
  for (const pathname of routes) {
    if (!xml.includes(`https://www.signxpdf.com${pathname}`)) {
      fail(`sitemap missing ${pathname}`);
    }
  }
}

if (failures.length) {
  console.error('SEO check FAILED:');
  for (const f of failures) console.error(' -', f);
  process.exit(1);
}

console.log(`Phase 2/3 SEO check PASSED (${routes.length} routes + sitemap + redirects + og:image).`);
