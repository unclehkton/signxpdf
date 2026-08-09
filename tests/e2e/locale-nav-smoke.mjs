#!/usr/bin/env node
/**
 * Browser smoke: crawlable locale links preserve path; html lang + hydration.
 * Flow: /en/sign-pdf/ → 繁 → /zh-hant/sign-pdf/ → 简 → /zh-hans/sign-pdf/ → EN → /en/sign-pdf/
 * Usage: node tests/e2e/locale-nav-smoke.mjs  (after npm run build)
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { launchChromium } from './launch-chromium.mjs';

const BUILD = join(process.cwd(), 'build');
const PORT = 4180;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.wasm': 'application/wasm',
  '.mjs': 'text/javascript',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
};

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

async function main() {
  if (!existsSync(join(BUILD, 'en', 'sign-pdf', 'index.html'))) {
    console.error('Missing build — run npm run build first');
    process.exit(1);
  }
  if (!existsSync(join(BUILD, 'zh-hans', 'sign-pdf', 'index.html'))) {
    console.error('Missing zh-hans prerender — check route entries');
    process.exit(1);
  }

  const server = await startServer();
  const browser = await launchChromium({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`http://127.0.0.1:${PORT}/en/sign-pdf/`, { waitUntil: 'networkidle' });

    const enLang = await page.locator('html').getAttribute('lang');
    if (enLang !== 'en') throw new Error(`expected html lang=en, got ${enLang}`);
    const enH1 = await page.locator('h1').first().textContent();
    if (!enH1 || enH1.length < 5) throw new Error('missing H1 on /en/sign-pdf/');

    // Crawlable links (not JS-only buttons)
    await page.getByRole('link', { name: '繁', exact: true }).click();
    await page.waitForURL(/\/zh-hant\/sign-pdf\/?$/, { timeout: 10000 });
    const zhHantLang = await page.locator('html').getAttribute('lang');
    if (zhHantLang !== 'zh-Hant') throw new Error(`expected html lang=zh-Hant, got ${zhHantLang}`);
    const zhHantH1 = await page.locator('h1').first().textContent();
    if (!zhHantH1 || !/簽署|簽名|PDF|瀏覽器/.test(zhHantH1)) {
      throw new Error(`unexpected zh-Hant H1: ${zhHantH1}`);
    }

    await page.getByRole('link', { name: '简', exact: true }).click();
    await page.waitForURL(/\/zh-hans\/sign-pdf\/?$/, { timeout: 10000 });
    const zhHansLang = await page.locator('html').getAttribute('lang');
    if (zhHansLang !== 'zh-Hans') throw new Error(`expected html lang=zh-Hans, got ${zhHansLang}`);
    const zhHansH1 = await page.locator('h1').first().textContent();
    if (!zhHansH1 || !/签署|签名|PDF|浏览器/.test(zhHansH1)) {
      throw new Error(`unexpected zh-Hans H1: ${zhHansH1}`);
    }

    await page.getByRole('link', { name: 'EN', exact: true }).click();
    await page.waitForURL(/\/en\/sign-pdf\/?$/, { timeout: 10000 });
    if ((await page.locator('html').getAttribute('lang')) !== 'en') {
      throw new Error('expected html lang=en after return');
    }

    await page.waitForTimeout(1000);
    const fileInputs = await page.locator('input[type="file"]').count();
    if (fileInputs < 1) {
      throw new Error('sign-pdf island did not expose a file input after hydration');
    }

    // Mobile layout: the shared header and SEO content must use the same gutter,
    // and no language control or CTA may extend beyond the viewport in any shipped locale.
    async function checkMobileSeoShell(path) {
      await page.goto(`http://127.0.0.1:${PORT}${path}`, { waitUntil: 'networkidle' });
      const mobileLayout = await page.evaluate(() => {
        const edge = (element) => {
          if (!element) return null;
          const style = getComputedStyle(element);
          return element.getBoundingClientRect().left + parseFloat(style.paddingLeft);
        };
        const summary = document.querySelector('details.other-langs > summary');
        const summaryRect = summary?.getBoundingClientRect();
        const heroActions = [...document.querySelectorAll('.hero-actions .hero-action')].map((element) => {
          const rect = element.getBoundingClientRect();
          return { left: rect.left, right: rect.right };
        });
        return {
          viewport: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          headerContentLeft: edge(document.querySelector('.top-inner')),
          pageContentLeft: edge(document.querySelector('.seo-page')),
          summaryBox: summaryRect
            ? { left: summaryRect.left, right: summaryRect.right }
            : null,
          heroActions,
        };
      });
      if (mobileLayout.scrollWidth > mobileLayout.viewport + 1) {
        throw new Error(
          `${path}: mobile horizontal overflow: viewport=${mobileLayout.viewport}, scrollWidth=${mobileLayout.scrollWidth}`,
        );
      }
      if (
        mobileLayout.headerContentLeft === null ||
        mobileLayout.pageContentLeft === null ||
        Math.abs(mobileLayout.headerContentLeft - mobileLayout.pageContentLeft) > 1
      ) {
        throw new Error(
          `${path}: mobile content gutters are misaligned: header=${mobileLayout.headerContentLeft}, page=${mobileLayout.pageContentLeft}`,
        );
      }
      if (
        !mobileLayout.summaryBox ||
        mobileLayout.summaryBox.left < -1 ||
        mobileLayout.summaryBox.right > mobileLayout.viewport + 1
      ) {
        throw new Error(`${path}: mobile Other languages control is outside the viewport: ${JSON.stringify(mobileLayout.summaryBox)}`);
      }
      if (mobileLayout.heroActions.length !== 2) {
        throw new Error(`${path}: mobile homepage is missing the two primary tool actions`);
      }
      for (const box of mobileLayout.heroActions) {
        if (box.left < -1 || box.right > mobileLayout.viewport + 1) {
          throw new Error(`${path}: mobile hero action is outside the viewport: ${JSON.stringify(box)}`);
        }
      }
    }

    for (const locale of [
      'en',
      'zh-hant',
      'zh-hans',
      'es',
      'pt-br',
      'fr',
      'de',
      'ja',
      'ko',
      'ru',
      'id',
      'vi',
      'fil',
    ]) {
      await checkMobileSeoShell(`/${locale}/`);
    }

    // Wave 1 representative pages: lang, canonical, hreflang, H1, Other languages dropdown
    async function checkWave1(path, expectLang, h1Pattern) {
      await page.goto(`http://127.0.0.1:${PORT}${path}`, { waitUntil: 'networkidle' });
      const lang = await page.locator('html').getAttribute('lang');
      if (lang !== expectLang) throw new Error(`${path}: expected lang=${expectLang}, got ${lang}`);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      if (!canonical || !canonical.includes(path.replace(/\/$/, ''))) {
        throw new Error(`${path}: unexpected canonical ${canonical}`);
      }
      const hreflangs = await page.locator('link[rel="alternate"][hreflang]').count();
      if (hreflangs < 3) throw new Error(`${path}: expected reciprocal hreflang, got ${hreflangs}`);
      const h1 = (await page.locator('h1').first().textContent()) || '';
      if (!h1Pattern.test(h1)) throw new Error(`${path}: unexpected H1: ${h1}`);
      const other = page.locator('details.other-langs, .other-langs');
      if ((await other.count()) < 1) throw new Error(`${path}: missing Other languages control`);
    }

    await checkWave1('/es/sign-pdf/', 'es', /Firma|PDF|navegador/i);
    await checkWave1('/ja/compress-pdf/', 'ja', /圧縮|PDF|ブラウザ/);
    await checkWave1('/ko/privacy/', 'ko', /개인|프라이버시|PDF|브라우저/);

    console.log(
      'PASS: locale link navigation EN→繁→简→EN + sign-pdf hydration + Wave1 es/ja/ko smoke',
    );
  } finally {
    await browser.close();
    await new Promise((r) => server.close(r));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
