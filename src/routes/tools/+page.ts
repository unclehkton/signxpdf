import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

/** Prefer indexable merge tool; tools workspace still embeds on locale pages. */
export const load: PageLoad = () => {
  throw redirect(308, '/en/merge-pdf/');
};

export const prerender = true;
