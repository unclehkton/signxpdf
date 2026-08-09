/**
 * Unit coverage for html lang helpers (no build required).
 * Prerendered lang="…" is asserted in tests/build/seo-phase2.test.ts after build.
 */
import { describe, expect, it } from 'vitest';
import {
  DEFAULT_LOCALE,
  htmlLangForLocale,
  seoLocaleFromPathname,
} from '../../src/lib/seo/site';

describe('html lang mapping (structural P1)', () => {
  it('maps path locales to BCP-like html lang tags', () => {
    const cases: [string, string][] = [
      ['/en/', 'en'],
      ['/en/sign-pdf/', 'en'],
      ['/zh-hant/', 'zh-Hant'],
      ['/zh-hant/privacy/', 'zh-Hant'],
      ['/zh-hans/', 'zh-Hans'],
      ['/zh-hans/merge-pdf/', 'zh-Hans'],
    ];
    for (const [path, lang] of cases) {
      const locale = seoLocaleFromPathname(path) ?? DEFAULT_LOCALE;
      expect(htmlLangForLocale(locale), path).toBe(lang);
    }
  });

  it('defaults unknown paths to en', () => {
    const locale = seoLocaleFromPathname('/languages/') ?? DEFAULT_LOCALE;
    expect(htmlLangForLocale(locale)).toBe('en');
  });
});
