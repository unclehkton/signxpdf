import type { EntryGenerator } from './$types';
import { SEO_LOCALES, TOOL_SLUGS } from '$lib/seo/site';

export const prerender = true;
export const ssr = true;

export const entries: EntryGenerator = () => {
  const out: { locale: string; tool: string }[] = [];
  for (const locale of SEO_LOCALES) {
    for (const tool of TOOL_SLUGS) {
      out.push({ locale, tool });
    }
  }
  return out;
};
