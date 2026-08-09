#!/usr/bin/env node
/**
 * Lab Core Web Vitals probe (Playwright) for Phase 2 acceptance evidence.
 *
 * Records LCP, CLS, and long-task TBT for the four required routes against a
 * local static build. Compares against a committed lab baseline + absolute budgets.
 *
 * Usage: node tests/e2e/performance-lab.mjs
 *        node tests/e2e/performance-lab.mjs --write-baseline
 * Requires: npm run build; playwright chromium (npm run ensure:playwright).
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { execSync } from 'node:child_process';
import { launchChromium } from './launch-chromium.mjs';

const ROOT = process.cwd();
const BUILD = join(ROOT, 'build');
const PORT = 4181;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const ROUTES = ['/en/', '/en/sign-pdf/', '/en/merge-pdf/', '/zh-hant/'];
const OUT = join(BUILD, 'phase2-perf-lab.json');
const BASELINE_PATH = join(ROOT, 'tests', 'build', 'phase2-perf-lab-baseline.json');
const WRITE_BASELINE = process.argv.includes('--write-baseline');

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
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

function fail(msg) {
  console.error('FAIL:', msg);
  process.exitCode = 1;
}

function gitBin() {
  // Minimal PATH shells (e.g. some agent sessions) may not include Git for Windows.
  const candidates = [
    process.env.GIT_BIN,
    'C:\\Program Files\\Git\\cmd\\git.exe',
    'git',
  ].filter(Boolean);
  for (const bin of candidates) {
    try {
      execSync(`"${bin}" --version`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      return bin;
    } catch {
      /* try next */
    }
  }
  return null;
}

function gitMeta() {
  const git = gitBin();
  if (!git) return { commit: 'unknown', branch: 'unknown', short: 'unknown' };
  try {
    const q = `"${git}"`;
    return {
      commit: execSync(`${q} rev-parse HEAD`, { cwd: ROOT, encoding: 'utf8' }).trim(),
      branch: execSync(`${q} rev-parse --abbrev-ref HEAD`, { cwd: ROOT, encoding: 'utf8' }).trim(),
      short: execSync(`${q} rev-parse --short HEAD`, { cwd: ROOT, encoding: 'utf8' }).trim(),
    };
  } catch {
    return { commit: 'unknown', branch: 'unknown', short: 'unknown' };
  }
}

function startServer() {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      let urlPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
      if (urlPath.endsWith('/')) urlPath += 'index.html';
      const filePath = join(BUILD, urlPath.replace(/^\//, ''));
      if (!filePath.startsWith(BUILD) || !existsSync(filePath)) {
        res.writeHead(404);
        res.end('not found');
        return;
      }
      res.writeHead(200, { 'content-type': MIME[extname(filePath)] ?? 'application/octet-stream' });
      res.end(readFileSync(filePath));
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
    server.on('error', reject);
  });
}

async function measureRoute(browser, path) {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.addInitScript(() => {
    window.__perfLab = { lcp: 0, cls: 0, tbt: 0, fcp: 0, longTasks: 0 };
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          window.__perfLab.lcp = e.startTime;
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {
      /* unsupported */
    }
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (!e.hadRecentInput) window.__perfLab.cls += e.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    } catch {
      /* unsupported */
    }
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          window.__perfLab.longTasks += 1;
          window.__perfLab.tbt += Math.max(0, e.duration - 50);
        }
      }).observe({ type: 'longtask', buffered: true });
    } catch {
      /* unsupported */
    }
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (e.name === 'first-contentful-paint') window.__perfLab.fcp = e.startTime;
        }
      }).observe({ type: 'paint', buffered: true });
    } catch {
      /* unsupported */
    }
  });

  await page.goto(`${ORIGIN}${path}`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(4000);

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const lab = window.__perfLab || { lcp: 0, cls: 0, tbt: 0, fcp: 0, longTasks: 0 };

    let lcp = lab.lcp;
    try {
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      if (lcpEntries.length) lcp = lcpEntries[lcpEntries.length - 1].startTime;
    } catch {
      /* ignore */
    }
    if (!lcp) {
      try {
        const paints = performance.getEntriesByType('paint');
        const fcp = paints.find((p) => p.name === 'first-contentful-paint');
        if (fcp) lcp = fcp.startTime;
        else if (lab.fcp) lcp = lab.fcp;
      } catch {
        /* ignore */
      }
    }
    if (!lcp && nav) lcp = nav.domContentLoadedEventEnd;

    let cls = lab.cls;
    try {
      let sum = 0;
      for (const e of performance.getEntriesByType('layout-shift')) {
        if (!e.hadRecentInput) sum += e.value;
      }
      if (lab.cls > 0) cls = lab.cls;
      else cls = sum;
    } catch {
      /* ignore */
    }

    let tbt = lab.tbt;
    try {
      let sum = 0;
      for (const e of performance.getEntriesByType('longtask')) {
        sum += Math.max(0, e.duration - 50);
      }
      if (sum > tbt) tbt = sum;
    } catch {
      /* ignore */
    }

    const resources = performance.getEntriesByType('resource');
    const transferredJs = resources
      .filter((r) => r.initiatorType === 'script' || /\.m?js(\?|$)/i.test(r.name))
      .reduce((s, r) => s + (r.transferSize || r.encodedBodySize || 0), 0);
    const transferredFonts = resources
      .filter((r) => /\.(woff2?|ttf|otf)(\?|$)/i.test(r.name))
      .reduce((s, r) => s + (r.transferSize || r.encodedBodySize || 0), 0);
    const transferredImages = resources
      .filter((r) => r.initiatorType === 'img' || /\.(png|jpe?g|webp|svg|gif)(\?|$)/i.test(r.name))
      .reduce((s, r) => s + (r.transferSize || r.encodedBodySize || 0), 0);

    return {
      lcpMs: Math.round(lcp),
      fcpMs: Math.round(lab.fcp || 0),
      cls: Number(cls.toFixed(4)),
      tbtMs: Math.round(tbt),
      longTaskCount: lab.longTasks,
      domContentLoadedMs: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
      loadEventMs: nav ? Math.round(nav.loadEventEnd) : null,
      transferredJsBytes: transferredJs,
      transferredFontBytes: transferredFonts,
      transferredImageBytes: transferredImages,
      resourceCount: resources.length,
    };
  });

  await context.close();
  return { route: path, ...metrics };
}

function defaultBudgets() {
  // Lab budgets for local static serve (not field RUM). Generous to absorb machine variance.
  return {
    perRoute: {
      lcpMsMax: 5000,
      clsMax: 0.25,
      tbtMsMax: 2000,
    },
    home: {
      lcpMsMax: 4000,
      clsMax: 0.15,
      tbtMsMax: 1500,
    },
    // Regression vs committed baseline (relative + absolute slack)
    regression: {
      lcpMsFactor: 1.75,
      lcpMsSlack: 800,
      clsFactor: 2.0,
      clsSlack: 0.05,
      tbtMsFactor: 2.0,
      tbtMsSlack: 400,
    },
  };
}

function enforceBudgets(results, baseline) {
  const budgets = baseline?.budgets ?? defaultBudgets();
  const byRoute = Object.fromEntries((baseline?.results ?? []).map((r) => [r.route, r]));

  for (const r of results) {
    if (r.lcpMs <= 0) {
      fail(`${r.route}: LCP/FCP/DCL is 0 — instrumentation failed`);
    }
    if (r.lcpMs > budgets.perRoute.lcpMsMax) {
      fail(`${r.route}: LCP ${r.lcpMs}ms exceeds budget ${budgets.perRoute.lcpMsMax}ms`);
    }
    if (r.cls > budgets.perRoute.clsMax) {
      fail(`${r.route}: CLS ${r.cls} exceeds budget ${budgets.perRoute.clsMax}`);
…5586 tokens truncated….catch(() => {});
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
