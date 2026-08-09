import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  appRedirectRules,
  classifyBaseUrl,
  canonicalOrigin,
  canonicalRoutes,
  evaluateRobotsPolicy,
  expectedRouteSeo,
  hasRedirectRule,
  listRuntimeValidatedRoutes,
  parseSeoMetadata,
  parseSitemapUrls,
  runSeoFoundationCheck,
} from './seo-foundation-check.mjs';

describe('SEO foundation checker helpers', () => {
  it('recognises the Phase 2+3 canonical route inventory', () => {
    expect(canonicalOrigin).toBe('https://www.signxpdf.com');
    expect(canonicalRoutes).toContain('/en/');
    expect(canonicalRoutes).toContain('/en/sign-pdf/');
    expect(canonicalRoutes).toContain('/zh-hant/merge-pdf/');
    expect(canonicalRoutes).toContain('/en/guides/how-browser-pdf-tools-work/');
    expect(canonicalRoutes).toContain('/zh-hant/guides/visible-vs-digital-signature/');
    expect(canonicalRoutes).toContain('/zh-hans/');
    expect(canonicalRoutes).toContain('/zh-hans/guides/how-browser-pdf-tools-work/');
    expect(canonicalRoutes).toContain('/languages/');
    expect(canonicalRoutes).toContain('/open-source-licences/');
    // 3 core * 15 + 10 wave1 * 7 + languages + licences = 117
    expect(canonicalRoutes).toHaveLength(117);
    expect(canonicalRoutes).toContain('/en/verification/');
    expect(canonicalRoutes).toContain('/zh-hant/about/');
    expect(canonicalRoutes).toContain('/en/guides/how-to-check-pdf-upload/');
    expect(canonicalRoutes).toContain('/es/sign-pdf/');
    expect(canonicalRoutes).toContain('/ja/privacy/');
    expect(canonicalRoutes).not.toContain('/es/guides/how-browser-pdf-tools-work/');
    expect(canonicalRoutes).not.toContain('/');
    expect(canonicalRoutes).not.toContain('/tools');
  });

  it('runtime-validates every sitemap/canonical route (no hard-coded primary subset)', () => {
    const runtime = listRuntimeValidatedRoutes();
    expect(runtime).toEqual([...canonicalRoutes]);
    expect(runtime).toHaveLength(canonicalRoutes.length);

    const sitemapXml = readFileSync('public/sitemap.xml', 'utf8');
    const sitemapPaths = parseSitemapUrls(sitemapXml).map((url) => new URL(url).pathname);
    expect(sitemapPaths).toEqual(canonicalRoutes);
    // Contract: foundation runner iterates listRuntimeValidatedRoutes(), which must stay == sitemap.
    expect(runtime).toEqual(sitemapPaths);
  });

  it('requests every canonical route during a local foundation run', async () => {
    const filler = ' content '.repeat(40);
    const htmlPage = (title, route) => {
      const seo = expectedRouteSeo(route);
      const links = [
        `<link rel="canonical" href="${seo.canonical}"/>`,
        ...seo.alternates.map(
          (alternate) => `<link rel="alternate" hreflang="${alternate.lang}" href="${alternate.href}"/>`,
        ),
      ].join('');
      return `<!doctype html><html><head><title>${title}</title>${links}<meta property="og:image" content="/og-default.png"/></head><body><h1>${title}</h1><p>${filler}</p></body></html>`;
    };

    const requestedHtmlPaths = [];
    const fetchImpl = async (input) => {
      const url = new URL(String(input));
      const path = url.pathname.endsWith('/') || url.pathname.includes('.')
        ? url.pathname
        : `${url.pathname}/`;

      if (path === '/robots.txt') {
        return new Response(
          'User-agent: *\nAllow: /\nDisallow: /*.ai-training\n\nContent-Signal: search=yes, ai-input=yes, ai-train=no\n\nUser-agent: GPTBot\nDisallow: /\n\nUser-agent: Google-Extended\nDisallow: /\n\nUser-agent: CCBot\nDisallow: /\n\nUser-agent: anthropic-ai\nDisallow: /\n\nSitemap: https://www.signxpdf.com/sitemap.xml\n',
          { status: 200, headers: { 'content-type': 'text/plain' } },
        );
      }
      if (path === '/sitemap.xml') {
        const body = `<?xml version="1.0"?><urlset>${canonicalRoutes
          .map((route) => `<url><loc>${canonicalOrigin}${route}</loc></url>`)
          .join('')}</urlset>`;
        return new Response(body, { status: 200, headers: { 'content-type': 'application/xml' } });
      }
      if (path === '/__seo-foundation-missing__'
        || path === '/__seo-foundation-missing__.xml'
        || path === '/__seo-foundation-missing__.js') {
        return new Response('missing', { status: 404, headers: { 'content-type': 'text/plain' } });
      }
      if (canonicalRoutes.includes(path) || canonicalRoutes.includes(url.pathname)) {
        const route = canonicalRoutes.includes(path) ? path : url.pathname;
        requestedHtmlPaths.push(route);
        return new Response(htmlPage(`Sign X PDF ${route}`, route), {
          status: 200,
          headers: { 'content-type': 'text/html; charset=utf-8' },
        });
      }
      // Accept-header markdown probe on /
      if (url.pathname === '/' || path === '/') {
        return new Response('<html></html>', { status: 200, headers: { 'content-type': 'text/html' } });
      }
      return new Response('not found', { status: 404, headers: { 'content-type': 'text/plain' } });
    };

    const logs = [];
    const result = await runSeoFoundationCheck({
      baseUrl: 'http://127.0.0.1:4199',
      fetchImpl,
      log: (line) => logs.push(String(line)),
    });

    expect(result.failures).toBe(0);
    expect(new Set(requestedHtmlPaths).size).toBe(canonicalRoutes.length);
    for (const route of canonicalRoutes) {
      expect(requestedHtmlPaths).toContain(route);
    }
  });

  it('declares forced app HTTP redirects for legacy paths', () => {
    expect(appRedirectRules).toEqual(
      expect.arrayContaining([
        { from: '/', to: '/en/', status: 308 },
        { from: '/tools', to: '/en/merge-pdf/', status: 308 },
        { from: '/sign-app', to: '/en/sign-pdf/', status: 308 },
      ]),
    );
  });

  it('classifies local previews, Cloudflare Pages previews, and canonical production separately', () => {
    expect(classifyBaseUrl('http://127.0.0.1:4173')).toBe('local');
    expect(classifyBaseUrl('https://preview.example.pages.dev')).toBe('preview');
    expect(classifyBaseUrl(canonicalOrigin)).toBe('production');
    expect(classifyBaseUrl('https://example.com')).toBe('unknown');
  });

  it('accepts only numeric Cloudflare Pages redirect statuses', () => {
    const rule = { from: '/', to: '/en/', status: 308 };
    expect(hasRedirectRule('/ /en/ 308\n', rule)).toBe(true);
    expect(hasRedirectRule('/ /en/ 308!\n', rule)).toBe(false);
  });

  it('parses sitemap URLs without accepting query strings or another host', () => {
    const urls = parseSitemapUrls(`
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>https://www.signxpdf.com/en/</loc></url>
        <url><loc>https://www.signxpdf.com/en/sign-pdf/</loc></url>
        <url><loc>https://www.signxpdf.com/tools/?file=secret.pdf</loc></url>
        <url><loc>https://example.com/</loc></url>
      </urlset>
    `);

    expect(urls).toEqual([
      'https://www.signxpdf.com/en/',
      'https://www.signxpdf.com/en/sign-pdf/',
      'https://www.signxpdf.com/tools/?file=secret.pdf',
      'https://example.com/',
    ]);
  });

  it('derives the exact canonical and hreflang contract for localized routes', () => {
    expect(expectedRouteSeo('/en/')).toEqual({
      canonical: 'https://www.signxpdf.com/en/',
      alternates: [
        { lang: 'en', href: 'https://www.signxpdf.com/en/' },
        { lang: 'zh-Hant', href: 'https://www.signxpdf.com/zh-hant/' },
        { lang: 'zh-Hans', href: 'https://www.signxpdf.com/zh-hans/' },
        { lang: 'es', href: 'https://www.signxpdf.com/es/' },
        { lang: 'pt-BR', href: 'https://www.signxpdf.com/pt-br/' },
        { lang: 'fr', href: 'https://www.signxpdf.com/fr/' },
        { lang: 'de', href: 'https://www.signxpdf.com/de/' },
        { lang: 'ja', href: 'https://www.signxpdf.com/ja/' },
        { lang: 'ko', href: 'https://www.signxpdf.com/ko/' },
        { lang: 'ru', href: 'https://www.signxpdf.com/ru/' },
        { lang: 'id', href: 'https://www.signxpdf.com/id/' },
        { lang: 'vi', href: 'https://www.signxpdf.com/vi/' },
        { lang: 'fil', href: 'https://www.signxpdf.com/fil/' },
        { lang: 'x-default', href: 'https://www.signxpdf.com/languages/' },
      ],
    });

    expect(expectedRouteSeo('/en/guides/how-browser-pdf-tools-work/').alternates).toHaveLength(4);
    expect(expectedRouteSeo('/en/verification/').alternates).toHaveLength(4);
    expect(expectedRouteSeo('/languages/')).toEqual({
      canonical: 'https://www.signxpdf.com/languages/',
      alternates: [{ lang: 'x-default', href: 'https://www.signxpdf.com/languages/' }],
    });
    expect(expectedRouteSeo('/open-source-licences/')).toEqual({
      canonical: 'https://www.signxpdf.com/open-source-licences/',
      alternates: [],
    });
  });

  it('parses canonical and alternate link tags from rendered HTML', () => {
    expect(
      parseSeoMetadata(`
        <link rel="canonical" href="https://www.signxpdf.com/en/" />
        <link rel="alternate" hreflang="en" href="https://www.signxpdf.com/en/" />
        <link href="https://www.signxpdf.com/languages/" hreflang="x-default" rel="alternate" />
      `),
    ).toEqual({
      canonical: 'https://www.signxpdf.com/en/',
      alternates: [
        { lang: 'en', href: 'https://www.signxpdf.com/en/' },
        { lang: 'x-default', href: 'https://www.signxpdf.com/languages/' },
      ],
    });
  });

  it('requires search and user-directed AI access while reserving training access', () => {
    expect(
      evaluateRobotsPolicy(`User-agent: *\nAllow: /\nDisallow: /*.ai-training\n\nContent-Signal: search=yes, ai-input=yes, ai-train=no\n\nUser-agent: GPTBot\nDisallow: /\n\nUser-agent: Google-Extended\nDisallow: /\n\nUser-agent: CCBot\nDisallow: /\n\nUser-agent: anthropic-ai\nDisallow: /\n\nSitemap: https://www.signxpdf.com/sitemap.xml`),
    ).toMatchObject({
      allowsAll: true,
      blocksTraining: true,
      hasContentSignals: true,
      hasSitemap: true,
    });
  });
});
