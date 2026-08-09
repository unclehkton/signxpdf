#!/usr/bin/env node
/**
 * Write public/sitemap.xml from scripts/seo-inventory.mjs (catalog SoT).
 * Usage: node scripts/generate-sitemap.mjs
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listCanonicalRoutes, renderSitemapXml } from './seo-inventory.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'sitemap.xml');
const xml = renderSitemapXml();
writeFileSync(out, xml, 'utf8');
console.log(`Wrote ${out} (${listCanonicalRoutes().length} routes)`);
