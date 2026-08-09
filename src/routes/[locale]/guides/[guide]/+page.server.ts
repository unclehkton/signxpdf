import type { PageServerLoad } from './$types';
import { getGuideContent, getNav } from '$lib/seo/catalog-content';
import { isGuideSlug, isSeoLocale } from '$lib/seo/catalog-meta';
import { localeHasGuides } from '$lib/seo/site';
import { error } from '@sveltejs/kit';
import type { GuideSlug, SeoLocale } from '$lib/seo/types';

export const load: PageServerLoad = ({ params }) => {
  if (!isSeoLocale(params.locale)) {
    throw error(404, 'Not found');
  }
  if (!isGuideSlug(params.guide)) {
    throw error(404, 'Not found');
  }
  const locale = params.locale as SeoLocale;
  if (!localeHasGuides(locale)) {
    throw error(404, 'Not found');
  }
  const guide = params.guide as GuideSlug;
  return {
    seoLocale: locale,
    page: getGuideContent(locale, guide),
    nav: getNav(locale),
  };
};
