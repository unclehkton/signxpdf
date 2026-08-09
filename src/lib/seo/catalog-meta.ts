/**
 * Client-safe SEO helpers: no locale content bundle imports.
 * Keep content loading in catalog-content.ts (server/prerender/tests only).
 */
import {
  alternatePath,
  AUTHORITY_SLUGS,
  DEFAULT_OG_IMAGE_PATH,
  GUIDE_SLUGS,
  HREFLANG_BY_LOCALE,
  htmlLangForLocale,
  listCanonicalRoutes,
  localesForPathSegment,
  SEO_LOCALES,
  SITE_NAME,
  SITE_ORIGIN,
  TOOL_SLUGS,
  toolPath,
  X_DEFAULT_PATH,
} from './site';
import type {
  BreadcrumbItem,
  AuthorityPageContent,
  AuthoritySlug,
  FaqItem,
  GuidePageContent,
  GuideSlug,
  SeoLocale,
  ToolPageContent,
  ToolSlug,
} from './types';

export function isSeoLocale(value: string): value is SeoLocale {
  return (SEO_LOCALES as readonly string[]).includes(value);
}

export function isGuideSlug(value: string): value is GuideSlug {
  return (GUIDE_SLUGS as readonly string[]).includes(value);
}

export function isAuthoritySlug(value: string): value is AuthoritySlug {
  return (AUTHORITY_SLUGS as readonly string[]).includes(value);
}

/** Resolve internal related-link path (locale-aware tools/guides; absolute licences). */
export function relatedHref(locale: SeoLocale, pathSegment: string): string {
  const cleaned = (pathSegment || '').replace(/^\/+|\/+$/g, '');
  if (!cleaned || cleaned === 'home') return toolPath(locale, 'home');
  if (cleaned === 'open-source-licences') return '/open-source-licences/';
  if (cleaned === 'languages') return X_DEFAULT_PATH;
  return toolPath(locale, cleaned);
}

export function listIndexablePaths(): string[] {
  return listCanonicalRoutes();
}

export function buildWebAppJsonLd(locale: SeoLocale, page: ToolPageContent) {
  const segment = page.slug === 'home' ? 'home' : page.pathSegment;
  const canonical = `${SITE_ORIGIN}${toolPath(locale, segment)}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    url: canonical,
    description: page.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Visible PDF signature placement',
      'Merge PDF',
      'Compress PDF',
      'Reorder PDF pages',
      'Delete PDF pages',
      'Local browser processing',
    ],
    inLanguage: htmlLangForLocale(locale),
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    inLanguage: SEO_LOCALES.map((l) => HREFLANG_BY_LOCALE[l]),
    potentialAction: {
      '@type': 'ReadAction',
      target: `${SITE_ORIGIN}/en/`,
    },
  };
}

export function buildFaqPageJsonLd(faq: FaqItem[]): Record<string, unknown> | null {
  if (!faq?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): Record<string, unknown> | null {
  if (!items || items.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_ORIGIN}${item.path}`,
    })),
  };
}

export function buildGuideJsonLd(locale: SeoLocale, page: GuidePageContent) {
  const canonical = `${SITE_ORIGIN}${toolPath(locale, page.pathSegment)}`;
  const article: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.description,
    mainEntityOfPage: canonical,
    url: canonical,
    inLanguage: htmlLangForLocale(locale),
    image: `${SITE_ORIGIN}${DEFAULT_OG_IMAGE_PATH}`,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
  };
  if (page.datePublished) article.datePublished = page.datePublished;
  if (page.dateModified) article.dateModified = page.dateModified;
  else if (page.datePublished) article.dateModified = page.datePublished;

  const blocks: Record<string, unknown>[] = [article];
  const faq = buildFaqPageJsonLd(page.faq);
  if (faq) blocks.push(faq);
  return blocks;
}

export function buildAuthorityJsonLd(locale: SeoLocale, page: AuthorityPageContent) {
  const canonical = `${SITE_ORIGIN}${toolPath(locale, page.pathSegment)}`;
  const primary: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': page.pageKind === 'profile' ? 'ProfilePage' : 'Article',
    headline: page.h1,
    description: page.description,
    mainEntityOfPage: canonical,
    url: canonical,
    inLanguage: htmlLangForLocale(locale),
    image: `${SITE_ORIGIN}${DEFAULT_OG_IMAGE_PATH}`,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
  };
  if (page.dateVerified) {
    primary.dateModified = page.dateVerified;
  }

  const blocks: Record<string, unknown>[] = [primary];
  if (page.slug === 'about') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_ORIGIN,
      sameAs: page.sameAs ?? [],
    });
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: SITE_NAME,
      url: canonical,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      isAccessibleForFree: true,
    });
  }
  const faq = buildFaqPageJsonLd(page.faq);
  if (faq) blocks.push(faq);
  return blocks;
}

export function hreflangPairs(pathSegment: string): { lang: string; href: string }[] {
  return localesForPathSegment(pathSegment).map((locale) => ({
    lang: HREFLANG_BY_LOCALE[locale],
    href: `${SITE_ORIGIN}${alternatePath(locale, pathSegment)}`,
  }));
}

export function xDefaultHref(): string {
  return `${SITE_ORIGIN}${X_DEFAULT_PATH}`;
}

export { SEO_LOCALES, TOOL_SLUGS, GUIDE_SLUGS, AUTHORITY_SLUGS, listCanonicalRoutes };

// Re-export ToolSlug type helper for callers
export type { SeoLocale, ToolSlug, GuideSlug, AuthoritySlug };
