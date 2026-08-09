import type { EntryGenerator } from './$types';
import { guideLocaleEntries } from '$lib/seo/site';

export const prerender = true;
export const ssr = true;

/** Guides only for core locales — Wave 1 ships commercial pages without long guides. */
export const entries: EntryGenerator = () => guideLocaleEntries();
