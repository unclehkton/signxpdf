import type { LocaleBundle, LocaleNav, SeoLocale, ToolPageContent } from '../../types';

/** Shared structural pages for Wave 1 (no long guides). */
export type Wave1Copy = {
  htmlLang: string;
  ogLocale: string;
  nav: LocaleNav;
  home: Omit<ToolPageContent, 'slug' | 'pathSegment' | 'ogLocale' | 'toolKind'>;
  sign: Omit<ToolPageContent, 'slug' | 'pathSegment' | 'ogLocale' | 'toolKind' | 'toolsFocus'>;
  merge: Omit<ToolPageContent, 'slug' | 'pathSegment' | 'ogLocale' | 'toolKind' | 'toolsFocus'>;
  compress: Omit<ToolPageContent, 'slug' | 'pathSegment' | 'ogLocale' | 'toolKind' | 'toolsFocus'>;
  reorder: Omit<ToolPageContent, 'slug' | 'pathSegment' | 'ogLocale' | 'toolKind' | 'toolsFocus'>;
  deletePages: Omit<ToolPageContent, 'slug' | 'pathSegment' | 'ogLocale' | 'toolKind' | 'toolsFocus'>;
  privacy: Omit<ToolPageContent, 'slug' | 'pathSegment' | 'ogLocale' | 'toolKind'>;
};

/**
 * Build a Wave 1 LocaleBundle. Facts stay aligned with English evidence registry;
 * wording is supplied per locale (not a character-for-character translation).
 * Guides intentionally omitted until natural quality is ready.
 */
export function buildWave1Bundle(locale: SeoLocale, copy: Wave1Copy): LocaleBundle {
  const og = copy.ogLocale;
  return {
    locale,
    htmlLang: copy.htmlLang,
    nav: copy.nav,
    home: {
      slug: 'home',
      pathSegment: '',
      ogLocale: og,
      toolKind: 'none',
      ...copy.home,
    },
    tools: {
      'sign-pdf': {
        slug: 'sign-pdf',
        pathSegment: 'sign-pdf',
        ogLocale: og,
        toolKind: 'sign',
        ...copy.sign,
      },
      'merge-pdf': {
        slug: 'merge-pdf',
        pathSegment: 'merge-pdf',
        ogLocale: og,
        toolKind: 'tools',
        toolsFocus: 'merge',
        ...copy.merge,
      },
      'compress-pdf': {
        slug: 'compress-pdf',
        pathSegment: 'compress-pdf',
        ogLocale: og,
        toolKind: 'tools',
        toolsFocus: 'compress',
        ...copy.compress,
      },
      'reorder-pdf': {
        slug: 'reorder-pdf',
        pathSegment: 'reorder-pdf',
        ogLocale: og,
        toolKind: 'tools',
        toolsFocus: 'reorder',
        ...copy.reorder,
      },
      'delete-pdf-pages': {
        slug: 'delete-pdf-pages',
        pathSegment: 'delete-pdf-pages',
        ogLocale: og,
        toolKind: 'tools',
        toolsFocus: 'delete',
        ...copy.deletePages,
      },
    },
    privacy: {
      slug: 'privacy',
      pathSegment: 'privacy',
      ogLocale: og,
      toolKind: 'none',
      ...copy.privacy,
    },
  };
}
