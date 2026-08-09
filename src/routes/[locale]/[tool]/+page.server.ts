import type { PageServerLoad } from './$types';
import { getNav, getPageContent } from '$lib/seo/catalog-content';
import { isSeoLocale } from '$lib/seo/catalog-meta';
import { TOOL_SLUGS } from '$lib/seo/site';
import { error } from '@sveltejs/kit';
import type { SeoLocale, ToolSlug } from '$lib/seo/types';

export const load: PageServerLoad = ({ params }) => {
  if (!isSeoLocale(params.locale)) {
    throw error(404, 'Not found');
  }
  const tool = params.tool as ToolSlug;
  if (!TOOL_SLUGS.includes(tool as (typeof TOOL_SLUGS)[number])) {
    throw error(404, 'Not found');
  }
  const locale = params.locale as SeoLocale;
  return {
    seoLocale: locale,
    page: getPageContent(locale, tool),
    nav: getNav(locale),
  };
};
