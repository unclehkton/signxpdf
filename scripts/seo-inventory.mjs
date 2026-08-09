/**
 * Single source of truth for indexable SEO routes (shared by foundation check,
 * sitemap generator, and drift tests). Keep in sync with src/lib/seo/site.ts
 * SEO_LOCALES / TOOL_SLUGS / GUIDE_SLUGS — tested by seo-foundation-check.test.mjs.
 */

export const SITE_ORIGIN = 'https://www.signxpdf.com';
export const SITE_NAME = 'Sign X PDF';

/** Core locales (guides + commercial). */
export const CORE_SEO_LOCALES = ['en', 'zh-hant', 'zh-hans'];

/** Wave 1 commercial locales (no long guides until quality-ready). */
export const WAVE1_SEO_LOCALES = [
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
];

/** URL path segments for all indexable locales (lowercase). */
export const SEO_LOCALES = [...CORE_SEO_LOCALES, ...WAVE1_SEO_LOCALES];

/** Locales that include long guide routes. */
export const GUIDE_LOCALES = [...CORE_SEO_LOCALES];

/** hreflang BCP47 values aligned with SEO_LOCALES. */
export const HREFLANG_BY_LOCALE = {
  en: 'en',
  'zh-hant': 'zh-Hant',
  'zh-hans': 'zh-Hans',
  es: 'es',
  'pt-br': 'pt-BR',
  fr: 'fr',
  de: 'de',
  ja: 'ja',
  ko: 'ko',
  ru: 'ru',
  id: 'id',
  vi: 'vi',
  fil: 'fil',
};

export const TOOL_SLUGS = [
  'sign-pdf',
  'merge-pdf',
  'compress-pdf',
  'reorder-pdf',
  'delete-pdf-pages',
];

export const GUIDE_SLUGS = [
  'visible-vs-digital-signature',
  'how-browser-pdf-tools-work',
  'how-to-check-pdf-upload',
  'choose-private-pdf-tool',
  'pdf-compression-size-quality',
  'large-pdf-browser-tests',
];

export const AUTHORITY_SLUGS = ['verification', 'about'];

/** Neutral language-selector URL used as hreflang x-default. */
export const X_DEFAULT_PATH = '/languages/';

/** Locale-neutral indexable legal page (no translated equivalents required). */
export const LICENCES_PATH = '/open-source-licences/';

export function localeHomePath(locale) {
  return `/${locale}/`;
}

export function toolPath(locale, slug) {
  if (!slug || slug === 'home') return localeHomePath(locale);
  const cleaned = String(slug).replace(/^\/+|\/+$/g, '');
  return `/${locale}/${cleaned}/`;
}

export function guidePath(locale, guide) {
  return toolPath(locale, `guides/${guide}`);
}

/**
 * Full ordered list of absolute-path indexable routes (trailing slash).
 * Must match public/sitemap.xml loc pathnames.
 */
export function listCanonicalRoutes() {
  const paths = [];
  for (const locale of SEO_LOCALES) {
    paths.push(localeHomePath(locale));
    for (const slug of TOOL_SLUGS) {
      paths.push(toolPath(locale, slug));
    }
    paths.push(toolPath(locale, 'privacy'));
    if (GUIDE_LOCALES.includes(locale)) {
      for (const guide of GUIDE_SLUGS) {
        paths.push(guidePath(locale, guide));
      }
      for (const authority of AUTHORITY_SLUGS) {
        paths.push(toolPath(locale, authority));
      }
    }
  }
  paths.push(X_DEFAULT_PATH);
  paths.push(LICENCES_PATH);
  return paths;
}

export function listAbsoluteSitemapUrls() {
  return listCanonicalRoutes().map((path) => `${SITE_ORIGIN}${path}`);
}

export function renderSitemapXml() {
  const urls = listAbsoluteSitemapUrls()
    .map((loc) => `  <url><loc>${loc}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
