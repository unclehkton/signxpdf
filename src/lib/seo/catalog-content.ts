/**
 * Locale SEO content catalog — import only from server load, prerender, or tests.
 * Never import this module from client components (ToolSeoLayout, SeoHead, islands):
 * it eagerly loads all locale bundles and would bloat homepage JS preload.
 */
import { enBundle } from './content/en';
import { zhHantBundle } from './content/zh-hant';
import { zhHansBundle } from './content/zh-hans';
import { deBundle } from './content/wave1/de';
import { esBundle } from './content/wave1/es';
import { filBundle } from './content/wave1/fil';
import { frBundle } from './content/wave1/fr';
import { idBundle } from './content/wave1/id';
import { jaBundle } from './content/wave1/ja';
import { koBundle } from './content/wave1/ko';
import { ptBrBundle } from './content/wave1/pt-br';
import { ruBundle } from './content/wave1/ru';
import { viBundle } from './content/wave1/vi';
import { enAuthority } from './content/authority-en';
import { zhHantAuthority } from './content/authority-zh-hant';
import { zhHansAuthority } from './content/authority-zh-hans';
import type {
  AuthorityPageContent,
  AuthoritySlug,
  CoreSeoLocale,
  GuidePageContent,
  GuideSlug,
  LocaleBundle,
  LocaleNav,
  SeoLocale,
  ToolPageContent,
  ToolSlug,
} from './types';

const authorityBundles: Record<CoreSeoLocale, Record<AuthoritySlug, AuthorityPageContent>> = {
  en: enAuthority,
  'zh-hant': zhHantAuthority,
  'zh-hans': zhHansAuthority,
};

const bundles: Record<SeoLocale, LocaleBundle> = {
  en: enBundle,
  'zh-hant': zhHantBundle,
  'zh-hans': zhHansBundle,
  es: esBundle,
  'pt-br': ptBrBundle,
  fr: frBundle,
  de: deBundle,
  ja: jaBundle,
  ko: koBundle,
  ru: ruBundle,
  id: idBundle,
  vi: viBundle,
  fil: filBundle,
};

export function getBundle(locale: SeoLocale): LocaleBundle {
  return bundles[locale];
}

export function getNav(locale: SeoLocale): LocaleNav {
  return getBundle(locale).nav;
}

export function getPageContent(locale: SeoLocale, slug: ToolSlug): ToolPageContent {
  const bundle = getBundle(locale);
  if (slug === 'home') return bundle.home;
  if (slug === 'privacy') return bundle.privacy;
  return bundle.tools[slug];
}

export function getGuideContent(locale: SeoLocale, slug: GuideSlug): GuidePageContent {
  const guide = getBundle(locale).guides?.[slug];
  if (!guide) {
    throw new Error(`Guide ${slug} is not available for locale ${locale}`);
  }
  return guide;
}

export function getAuthorityContent(locale: CoreSeoLocale, slug: AuthoritySlug): AuthorityPageContent {
  return authorityBundles[locale][slug];
}

export { bundles, authorityBundles };
