import type { EntryGenerator } from './$types';
import { authorityLocaleEntries } from '$lib/seo/site';

export const prerender = true;
export const ssr = true;
export const entries: EntryGenerator = () => authorityLocaleEntries().filter((entry) => entry.authority === 'verification');
