import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { isSeoLocale } from '$lib/seo/catalog-meta';
import { localeToStore } from '$lib/seo/site';
import { locale as localeStore } from '$lib/i18n';

export const prerender = true;
export const ssr = true;

export const load: LayoutLoad = ({ params }) => {
  if (!isSeoLocale(params.locale)) {
    throw error(404, 'Not found');
  }
  // Align client i18n store with URL locale during hydration.
  localeStore.set(localeToStore(params.locale));
  return { seoLocale: params.locale };
};
