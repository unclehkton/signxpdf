import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Client components must not import catalog-content (all 13 locale SEO bundles).
 * Page data + nav are loaded server-side and serialized into each route.
 */
const CLIENT_ROOTS = [
  'src/lib/seo/ToolSeoLayout.svelte',
  'src/lib/seo/GuideSeoLayout.svelte',
  'src/lib/seo/SeoHead.svelte',
  'src/lib/seo/islands',
  'src/lib/components',
  'src/lib/ads',
];

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.(ts|js|svelte)$/.test(name)) acc.push(p);
  }
  return acc;
}

function filesUnder(root: string): string[] {
  const abs = join(process.cwd(), root);
  try {
    const st = statSync(abs);
    if (st.isDirectory()) return walk(abs);
    return [abs];
  } catch {
    return [];
  }
}

describe('SEO catalog client boundary', () => {
  it('client SEO/UI modules do not import catalog-content or eager catalog facade content path', () => {
    const files = CLIENT_ROOTS.flatMap(filesUnder);
    expect(files.length).toBeGreaterThan(5);

    const offenders: string[] = [];
    for (const file of files) {
      const src = readFileSync(file, 'utf8');
      if (/from\s+['"][^'"]*catalog-content['"]/.test(src)) {
        offenders.push(`${file}: catalog-content`);
      }
      // Direct getBundle usage in client layout would re-pull all locales
      if (/getBundle\s*\(/.test(src) && !file.includes('catalog-content')) {
        offenders.push(`${file}: getBundle(`);
      }
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });

  it('server load modules import catalog-content for page data', () => {
    const serverLoads = [
      'src/routes/[locale]/+page.server.ts',
      'src/routes/[locale]/[tool]/+page.server.ts',
      'src/routes/[locale]/privacy/+page.server.ts',
      'src/routes/[locale]/guides/[guide]/+page.server.ts',
    ];
    for (const f of serverLoads) {
      const src = readFileSync(join(process.cwd(), f), 'utf8');
      expect(src, f).toMatch(/catalog-content/);
      expect(src, f).toMatch(/getNav|getPageContent|getGuideContent/);
    }
  });
});
