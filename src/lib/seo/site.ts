import type {
  AuthoritySlug,
  CoreSeoLocale,
  GuideSlug,
  SeoLocale,
  ToolSlug,
  Wave1SeoLocale,
  Wave2SeoLocale,
} from './types';

export const SITE_ORIGIN = 'https://www.signxpdf.com';
export const SITE_NAME = 'Sign X PDF';
/** Default Open Graph / Twitter share image (absolute URL). */
export const DEFAULT_OG_IMAGE_PATH = '/og-default.png';
export const DEFAULT_LOCALE: SeoLocale = 'en';

/** Core locales with full guides + commercial pages. */
export const CORE_SEO_LOCALES: CoreSeoLocale[] = ['en', 'zh-hant', 'zh-hans'];

/** Wave 1 commercial locales (home + tools + privacy; no long guides yet). */
export const WAVE1_SEO_LOCALES: Wave1SeoLocale[] = [
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

/**
 * Wave 2 candidates — prepared for architecture only; not in SEO_LOCALES / sitemap.
 * Ship only after natural copy + (for ar/ur) dir=rtl layout/a11y QA.
 */
export const WAVE2_CANDIDATE_LOCALES: Wave2SeoLocale[] = ['th', 'ar', 'hi', 'bn', 'ur', 'ta'];

export const WAVE2_RTL_LOCALES: Wave2SeoLocale[] = ['ar', 'ur'];

/**
 * All indexable SEO locales (URL path form).
 * Keep aligned with scripts/seo-inventory.mjs SEO_LOCALES (drift-tested).
 */
export const SEO_LOCALES: SeoLocale[] = [...CORE_SEO_LOCALES, ...WAVE1_SEO_LOCALES];

/** Locales that may prerender long guides. */
export const GUIDE_LOCALES: CoreSeoLocale[] = [...CORE_SEO_LOCALES];

export const HREFLANG_BY_LOCALE: Record<SeoLocale, string> = {
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

/** Display metadata for language pickers (only shipped locales). */
export const LOCALE_DISPLAY: Record<
  SeoLocale,
  { nativeLabel: string; englishLabel: string; shortLabel: string }
> = {
  en: { nativeLabel: 'English', englishLabel: 'English', shortLabel: 'EN' },
  'zh-hant': { nativeLabel: '繁體中文', englishLabel: 'Traditional Chinese', shortLabel: '繁' },
  'zh-hans': { nativeLabel: '简体中文', englishLabel: 'Simplified Chinese', shortLabel: '简' },
  es: { nativeLabel: 'Español', englishLabel: 'Spanish', shortLabel: 'ES' },
  'pt-br': { nativeLabel: 'Português (Brasil)', englishLabel: 'Portuguese (Brazil)', shortLabel: 'PT' },
  fr: { nativeLabel: 'Français', englishLabel: 'French', shortLabel: 'FR' },
  de: { nativeLabel: 'Deutsch', englishLabel: 'German', shortLabel: 'DE' },
  ja: { nativeLabel: '日本語', englishLabel: 'Japanese', shortLabel: 'JA' },
  ko: { nativeLabel: '한국어', englishLabel: 'Korean', shortLabel: 'KO' },
  ru: { nativeLabel: 'Русский', englishLabel: 'Russian', shortLabel: 'RU' },
  id: { nativeLabel: 'Bahasa Indonesia', englishLabel: 'Indonesian', shortLabel: 'ID' },
  vi: { nativeLabel: 'Tiếng Việt', englishLabel: 'Vietnamese', shortLabel: 'VI' },
  fil: { nativeLabel: 'Filipino', englishLabel: 'Filipino', shortLabel: 'FIL' },
};

/** Parse first path segment → SeoLocale or null (e.g. `/zh-hans/privacy/` → `zh-hans`). */
export function seoLocaleFromPathname(pathname: string): SeoLocale | null {
  const segment = (pathname || '').split('/').filter(Boolean)[0] ?? '';
  if ((SEO_LOCALES as readonly string[]).includes(segment)) {
    return segment as SeoLocale;
  }
  return null;
}

/** html lang BCP-like value for <html lang>. */
export function htmlLangForLocale(locale: SeoLocale): string {
  return HREFLANG_BY_LOCALE[locale];
}

/**
 * Document direction. All shipped Wave 1 locales are LTR.
 * Wave 2 ar/ur will need 'rtl' when published.
 */
export function htmlDirForLocale(locale: SeoLocale): 'ltr' | 'rtl' {
  void locale;
  return 'ltr';
}

/** Whether this locale ships long guide pages. */
export function localeHasGuides(locale: SeoLocale): boolean {
  return (GUIDE_LOCALES as readonly string[]).includes(locale);
}

/** EntryGenerator helper: one `{ locale }` per SEO locale. */
export function localeEntries(): { locale: string }[] {
  return SEO_LOCALES.map((locale) => ({ locale }));
}

export function guideLocaleEntries(): { locale: string; guide: string }[] {
  const out: { locale: string; guide: string }[] = [];
  for (const locale of GUIDE_LOCALES) {
    for (const guide of GUIDE_SLUGS) {
      out.push({ locale, guide });
    }
  }
  return out;
}

export function authorityLocaleEntries(): { locale: string; authority: string }[] {
  const out: { locale: string; authority: string }[] = [];
  for (const locale of CORE_SEO_LOCALES) {
    for (const authority of AUTHORITY_SLUGS) {
      out.push({ locale, authority });
    }
  }
  return out;
}

export const TOOL_SLUGS = [
  'sign-pdf',
  'merge-pdf',
  'compress-pdf',
  'reorder-pdf',
  'delete-pdf-pages',
] as const satisfies readonly ToolSlug[];

/** Phase 3 and Phase 4 guide path segments under /[locale]/guides/. */
export const GUIDE_SLUGS = [
  'visible-vs-digital-signature',
  'how-browser-pdf-tools-work',
  'how-to-check-pdf-upload',
  'choose-private-pdf-tool',
  'pdf-compression-size-quality',
  'large-pdf-browser-tests',
] as const satisfies readonly GuideSlug[];

/** Public first-party trust/entity pages, localized only where full copy exists. */
export const AUTHORITY_SLUGS = ['verification', 'about'] as const satisfies readonly AuthoritySlug[];

/** Neutral language-selector path used as hreflang x-default. */
export const X_DEFAULT_PATH = '/languages/';

export const LICENCES_PATH = '/open-source-licences/';

/**
 * Map SEO URL locale → client i18n store.
 * Store still uses `zh-CN` for Simplified UI dictionary (not SEO proof by itself).
 * Wave 1 chrome falls back to English UI strings until dedicated UI dictionaries exist;
 * SEO body copy is fully localized via LocaleBundle.
 */
export function localeToStore(locale: SeoLocale): 'en' | 'zh-Hant' | 'zh-CN' {
  if (locale === 'zh-hant') return 'zh-Hant';
  if (locale === 'zh-hans') return 'zh-CN';
  return 'en';
}

export function storeToLocale(store: string): SeoLocale {
  if (store === 'zh-Hant' || store === 'zh-hant') return 'zh-hant';
  if (store === 'zh-CN' || store === 'zh-hans' || store === 'zh-Hans') return 'zh-hans';
  return 'en';
}

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function localeHomePath(locale: SeoLocale): string {
  return `/${locale}/`;
}

/**
 * Path under a locale. `slug` may be a tool slug, `privacy`, `home`/`''`,
 * or a nested segment such as `guides/visible-vs-digital-signature`.
 */
export function toolPath(locale: SeoLocale, slug: string): string {
  if (slug === 'home' || slug === '') return localeHomePath(locale);
  const cleaned = slug.replace(/^\/+|\/+$/g, '');
  return `/${locale}/${cleaned}/`;
}

export function guidePath(locale: SeoLocale, guide: GuideSlug | string): string {
  return toolPath(locale, `guides/${guide}`);
}

export function authorityPath(locale: CoreSeoLocale, authority: AuthoritySlug | string): string {
  return toolPath(locale, authority);
}

export function alternatePath(locale: SeoLocale, pathSegment: string): string {
  if (!pathSegment || pathSegment === 'home') return localeHomePath(locale);
  return toolPath(locale, pathSegment);
}

/**
 * Locales that have an equivalent page for a path segment (after locale).
 * Guides only exist for core locales — hreflang must not invent Wave 1 guide URLs.
 */
export function localesForPathSegment(pathSegment: string): SeoLocale[] {
  const cleaned = (pathSegment || '').replace(/^\/+|\/+$/g, '');
  if (cleaned.startsWith('guides/') || (AUTHORITY_SLUGS as readonly string[]).includes(cleaned)) {
    return [...GUIDE_LOCALES];
  }
  return [...SEO_LOCALES];
}

/** Ordered indexable pathnames (trailing slash), same contract as scripts/seo-inventory.mjs. */
export function listCanonicalRoutes(): string[] {
  const paths: string[] = [];
  for (const locale of SEO_LOCALES) {
    paths.push(localeHomePath(locale));
    for (const slug of TOOL_SLUGS) {
      paths.push(toolPath(locale, slug));
    }
    paths.push(toolPath(locale, 'privacy'));
    if (localeHasGuides(locale)) {
      for (const guide of GUIDE_SLUGS) {
        paths.push(guidePath(locale, guide));
      }
      for (const authority of AUTHORITY_SLUGS) {
        paths.push(authorityPath(locale as CoreSeoLocale, authority));
      }
    }
  }
  paths.push(X_DEFAULT_PATH);
  paths.push(LICENCES_PATH);
  return paths;
}
