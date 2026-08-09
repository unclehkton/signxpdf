import type { PageServerLoad } from './$types';
import { getAuthorityContent, getNav } from '$lib/seo/catalog-content';
import { isAuthoritySlug, isSeoLocale } from '$lib/seo/catalog-meta';
import { CORE_SEO_LOCALES } from '$lib/seo/site';
import { error } from '@sveltejs/kit';
import type { CoreSeoLocale } from '$lib/seo/types';

export const load: PageServerLoad = ({ params }) => {
  if (!isSeoLocale(params.locale) || !(CORE_SEO_LOCALES as readonly string[]).includes(params.locale)) {
    throw error(404, 'Not found');
  }
  if (!isAuthoritySlug('verification')) {
    throw error(404, 'Not found');
  }
  const locale = params.locale as CoreSeoLocale;
  return {
    seoLocale: locale,
    page: getAuthorityContent(locale, 'verification'),
    nav: getNav(locale),
  };
};
