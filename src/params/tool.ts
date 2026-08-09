import type { ParamMatcher } from '@sveltejs/kit';
import { TOOL_SLUGS } from '$lib/seo/site';

const tools = new Set<string>(TOOL_SLUGS);

/** Match indexable tool path segments under /[locale]/[tool]/. */
export const match = ((param: string): boolean => tools.has(param)) satisfies ParamMatcher;
