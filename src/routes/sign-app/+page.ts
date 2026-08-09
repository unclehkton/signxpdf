import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

/** Legacy app path → canonical indexable sign page. Component still embeds. */
export const load: PageLoad = () => {
  throw redirect(308, '/en/sign-pdf/');
};

export const prerender = true;
