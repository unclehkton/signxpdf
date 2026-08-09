import { describe, expect, it } from 'vitest';
import {
  htmlLangForLocale,
  localeEntries,
  SEO_LOCALES,
  seoLocaleFromPathname,
} from './site';

describe('SEO locale helpers', () => {
  it('seoLocaleFromPathname parses first segment', () => {
    expect(seoLocaleFromPathname('/en/')).toBe('en');
    expect(seoLocaleFromPathname('/zh-hant/privacy/')).toBe('zh-hant');
    expect(seoLocaleFromPathname('/zh-hans/sign-pdf/')).toBe('zh-hans');
    expect(seoLocaleFromPathname('/languages/')).toBeNull();
    expect(seoLocaleFromPathname('/')).toBeNull();
    expect(seoLocaleFromPathname('')).toBeNull();
  });

  it('htmlLangForLocale maps BCP-like tags', () => {
    expect(htmlLangForLocale('en')).toBe('en');
    expect(htmlLangForLocale('zh-hant')).toBe('zh-Hant');
    expect(htmlLangForLocale('zh-hans')).toBe('zh-Hans');
  });

  it('localeEntries covers all SEO_LOCALES including Wave 1', () => {
    expect(localeEntries()).toEqual(SEO_LOCALES.map((locale) => ({ locale })));
    expect(SEO_LOCALES).toContain('es');
    expect(SEO_LOCALES).toContain('pt-br');
    expect(SEO_LOCALES).toContain('fil');
    expect(SEO_LOCALES).toHaveLength(13);
  });
});
