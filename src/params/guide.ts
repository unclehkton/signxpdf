import type { ParamMatcher } from '@sveltejs/kit';
import { GUIDE_SLUGS } from '$lib/seo/site';

const guides = new Set<string>(GUIDE_SLUGS);

/** Match Phase 3 guide path segments under /[locale]/guides/[guide]/. */
export const match = ((param: string): boolean => guides.has(param)) satisfies ParamMatcher;
