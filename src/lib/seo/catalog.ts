/**
 * SEO catalog facade.
 *
 * - catalog-meta: client-safe helpers (hreflang, JSON-LD, related links)
 * - catalog-content: full locale bundles (server load / tests only)
 *
 * Client components must import from catalog-meta (or site.ts), never catalog-content.
 * Universal/server load functions may import content helpers from here or catalog-content.
 */
export {
  isSeoLocale,
  isGuideSlug,
  relatedHref,
  listIndexablePaths,
  buildWebAppJsonLd,
  buildWebSiteJsonLd,
  buildFaqPageJsonLd,
  buildGuideJsonLd,
  hreflangPairs,
  xDefaultHref,
  SEO_LOCALES,
  TOOL_SLUGS,
  GUIDE_SLUGS,
  listCanonicalRoutes,
} from './catalog-meta';

export { getBundle, getNav, getPageContent, getGuideContent, bundles } from './catalog-content';
