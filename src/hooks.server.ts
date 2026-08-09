import type { Handle } from '@sveltejs/kit';
import {
  DEFAULT_LOCALE,
  htmlLangForLocale,
  SEO_LOCALES,
  seoLocaleFromPathname,
} from '$lib/seo/site';
import type { SeoLocale } from '$lib/seo/types';

/**
 * Inject html lang for prerendered locale pages (app.html uses %lang%).
 * Prefer route param `locale` when present; else first path segment.
 */
export const handle: Handle = async ({ event, resolve }) => {
  const fromParam = event.params.locale;
  const fromParamLocale =
    fromParam && (SEO_LOCALES as readonly string[]).includes(fromParam)
      ? (fromParam as SeoLocale)
      : null;
  const locale: SeoLocale =
    fromParamLocale ?? seoLocaleFromPathname(event.url.pathname) ?? DEFAULT_LOCALE;
  const lang = htmlLangForLocale(locale);

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang),
  });
};
