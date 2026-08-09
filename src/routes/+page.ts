import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

/** Option B: single default-language redirect (same for users and crawlers). */
export const load: PageLoad = () => {
  throw redirect(308, '/en/');
};

export const prerender = true;
