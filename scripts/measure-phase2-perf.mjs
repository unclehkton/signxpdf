/**
 * Reproducible Phase 2 build-time performance inventory.
 *
 * Usage (after npm run build):
 *   node scripts/measure-phase2-perf.mjs
 *   node scripts/measure-phase2-perf.mjs --write-baseline
 *
 * No shebang: Vitest/Vite fail to parse imported .mjs files that start with #!.
 * Always invoke via `node` (or import the named export).
 *
 * Records transferred JS, initial JS, largest bundles, PDF chunks, WASM,
 * image sizes, and font assets for the four required routes.
 * LCP/CLS/TBT are browser lab metrics — see npm run test:perf-lab.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const BUILD = join(ROOT, 'build');
const BASELINE_PATH = join(ROOT, 'tests', 'build', 'phase2-perf-baseline.json');
const BUILD_REPORT_PATH = join(BUILD, 'phase2-perf-baseline.json');
const ROUTES = ['en', 'en/sign-pdf', 'en/merge-pdf', 'zh-hant'];

function walkFiles(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walkFiles(p, acc);
    else acc.push(p);
  }
  return acc;
}

function pageHtml(route) {
  return readFileSync(join(BUILD, route, 'index.html'), 'utf8');
}

function scriptSrcs(html) {
  // Match src before or after other attributes (type=module src=... / src=... type=module)
  const hrefs = new Set();
  for (const m of html.matchAll(/<script\b[^>]*>/gi)) {
    const tag = m[0] ?? '';
    const src = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1];
    if (src) hrefs.add(src);
  }
  return [...hrefs];
}

/** SvelteKit adapter-static injects inline bootstrap with import("...entry...") */
function inlineEntryImports(html) {
  const hrefs = new Set();
  for (const m of html.matchAll(/import\s*\(\s*["']([^"']+\.js)["']\s*\)/gi)) {
    if (m[1]) hrefs.add(m[1]);
  }
  return [...hrefs];
}

function modulepreloads(html) {
  const hrefs = new Set();
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = m[0] ?? '';
    if (!/\brel\s*=\s*["']modulepreload["']/i.test(tag)) continue;
    const href = tag.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1];
    if (href) hrefs.add(href);
  }
  return [...hrefs];
}

function stylesheetHrefs(html) {
  const hrefs = [];
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = m[0] ?? '';
    if (!/\brel\s*=\s*["']stylesheet["']/i.test(tag)) continue;
    const href = tag.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1];
    if (href) hrefs.push(href);
  }
  return hrefs;
}

function imageSrcs(html) {
  return [...html.matchAll(/<(?:img|source)[^>]+src="([^"]+)"/gi)].map((m) => m[1] ?? '');
}

function resolveBuildPath(relFromHtml) {
  const cleaned = relFromHtml.replace(/^(\.\.\/)+/, '').replace(/^\//, '').split('?')[0];
  return join(BUILD, cleaned);
}

function fileSize(abs) {
  return existsSync(abs) ? statSync(abs).size : 0;
}

function sumSizes(paths) {
  return paths.reduce((s, p) => s + fileSize(typeof p === 'string' && p.startsWith(BUILD) ? p : resolveBuildPath(p)), 0);
}

function measureRoute(route) {
  const html = pageHtml(route);
  const scripts = scriptSrcs(html);
  const entries = inlineEntryImports(html);
  const preloads = modulepreloads(html);
  const styles = stylesheetHrefs(html);
  const images = imageSrcs(html);

  // Initial JS = external script src + SvelteKit inline import() entry modules
  const initialPaths = [...new Set([...scripts, ...entries])];
  const initialJsBytes = initialPaths.reduce((s, src) => s + fileSize(resolveBuildPath(src)), 0);
  const preloadJsBytes = preloads.reduce((s, src) => s + fileSize(resolveBuildPath(src)), 0);
  // Transferred critical JS: unique union of entry + modulepreload (avoid double-count)
  const transferredSet = new Set([...initialPaths, ...preloads]);
  const transferredJsBytes = [...transferredSet].reduce((s, src) => s + fileSize(resolveBuildPath(src)), 0);
  const cssBytes = styles.reduce((s, src) => s + fileSize(resolveBuildPath(src)), 0);
  const imageBytesInHtml = images.reduce((s, src) => {
    if (/^https?:/i.test(src) || src.startsWith('data:')) return s;
    return s + fileSize(resolveBuildPath(src));
  }, 0);

  return {
    htmlBytes: Buffer.byteLength(html, 'utf8'),
    initialJsBytes,
    transferredJsBytes,
    preloadBytes: preloadJsBytes + cssBytes, // legacy field ≈ critical path assets
    preloadJsBytes,
    cssBytes,
    imageBytesInHtml,
    scriptCount: scripts.length,
    entryImportCount: entries.length,
    preloadCount: preloads.length,
    homepageMentionsPdfWorker: /pdf\.worker/i.test(html),
    homepageMentionsQpdf: /qpdf/i.test([...initialPaths, ...preloads].join('\n')),
  };
}

function buildInventory() {
  const immutable = join(BUILD, '_app', 'immutable');
  const all = walkFiles(immutable);
  const byRel = all.map((abs) => ({
    path: relative(BUILD, abs).replace(/\\/g, '/'),
    bytes: statSync(abs).size,
  }));

  const largestBundles = [...byRel].sort((a, b) => b.bytes - a.bytes).slice(0, 15);

  const pdfSpecificChunks = byRel.filter((f) =>
    /pdf|SignAppLazy|ToolsAppLazy|qpdf|worker/i.test(f.path),
  );

  const wasmFiles = [
    ...byRel.filter((f) => f.path.endsWith('.wasm')),
    ...walkFiles(join(BUILD, 'qpdf'))
      .filter((p) => p.endsWith('.wasm'))
      .map((abs) => ({ path: relative(BUILD, abs).replace(/\\/g, '/'), bytes: statSync(abs).size })),
  ];

  const fontFiles = byRel.filter((f) => /\.(woff2?|ttf|otf)$/i.test(f.path));
  const imageFiles = [
    ...byRel.filter((f) => /\.(png|jpe?g|gif|webp|svg)$/i.test(f.path)),
    …6571 tokens truncated…ivacy/i,
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
