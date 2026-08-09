import type { EntryGenerator } from './$types';
import { localeEntries } from '$lib/seo/site';

export const prerender = true;
export const ssr = true;

export const entries: EntryGenerator = () => localeEntries();
