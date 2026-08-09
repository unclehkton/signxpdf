import type { ParamMatcher } from '@sveltejs/kit';
import { SEO_LOCALES } from '$lib/seo/site';

/** URL segment for public locales (lowercase path form). */
export const match = ((param: string): boolean => {
  return (SEO_LOCALES as readonly string[]).includes(param);
}) satisfies ParamMatcher;
