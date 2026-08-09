import type { PageServerLoad } from './$types';
import { getNav, getPageContent } from '$lib/seo/catalog-content';
import { isSeoLocale } from '$lib/seo/catalog-meta';
import { error } from '@sveltejs/kit';
import type { SeoLocale } from '$lib/seo/types';

export const load: PageServerLoad = ({ params }) => {
  if (!isSeoLocale(params.locale)) {
    throw error(404, 'Not found');
  }
  const locale = params.locale as SeoLocale;
  return {
    seoLocale: locale,
    page: getPageContent(locale, 'privacy'),
    nav: getNav(locale),
  };
};
