import { describe, expect, it } from 'vitest';
import { getBundle, listIndexablePaths, hreflangPairs } from '../../src/lib/seo/catalog';
import {
  CORE_SEO_LOCALES,
  localeHasGuides,
  SEO_LOCALES,
  SITE_ORIGIN,
  toolPath,
  WAVE1_SEO_LOCALES,
} from '../../src/lib/seo/site';
import type { SeoLocale, ToolSlug } from '../../src/lib/seo/types';

const TOOLS: Exclude<ToolSlug, 'home' | 'privacy'>[] = [
  'sign-pdf',
  'merge-pdf',
  'compress-pdf',
  'reorder-pdf',
  'delete-pdf-pages',
];

/** Local-processing privacy note should mention browser/local in any shipped language. */
const PRIVACY_NOTE_RE =
  /local|browser|navegador|navigateur|浏览器|瀏覽器|本機|裝置|设备|本地|dispositivo|appareil|gerät|ブラウザ|ブラウザ内|브라우저|браузер|trình duyệt|peramban|sa browser|sa iyong browser/i;

const LOCAL_NO_UPLOAD_TITLE_RE: Record<SeoLocale, RegExp> = {
  en: /locally.*no\s+pdf\s+upload/i,
  'zh-hant': /本機.*(?:不上傳|不需上傳)/,
  'zh-hans': /本地.*(?:无需上传|不上传)/,
  es: /localmente.*sin subir/i,
  'pt-br': /localmente.*sem (?:enviar|upload)/i,
  fr: /localement.*sans envoyer/i,
  de: /lokal.*ohne upload/i,
  ja: /ローカル.*アップロードなし/,
  ko: /로컬.*업로드 없이/,
  ru: /локально.*без загрузки/i,
  id: /secara lokal.*tanpa unggah/i,
  vi: /cục bộ.*không tải lên/i,
  fil: /lokal.*walang pag-upload/i,
};

describe('SEO metadata matrix (source catalog)', () => {
  it('provides unique titles and substantially unique descriptions per locale', () => {
    for (const locale of SEO_LOCALES) {
      const bundle = getBundle(locale);
      const pages = [bundle.home, bundle.privacy, ...TOOLS.map((s) => bundle.tools[s])];
      const titles = pages.map((p) => p.title);
      const descs = pages.map((p) => p.description);
      expect(new Set(titles).size, locale).toBe(titles.length);
      expect(new Set(descs).size, locale).toBe(descs.length);
      for (const page of pages) {
        expect(page.h1.length, `${locale} h1`).toBeGreaterThan(5);
        expect(page.answerFirst.length, `${locale} answerFirst`).toBeGreaterThan(40);
        expect(page.privacyNote, `${locale}/${page.slug}`).toMatch(PRIVACY_NOTE_RE);
      }
    }
  });

  it('uses accurate local-processing and no-upload intent in Merge/Delete titles', () => {
    for (const locale of SEO_LOCALES) {
      const bundle = getBundle(locale);
      for (const slug of ['merge-pdf', 'delete-pdf-pages'] as const) {
        expect(bundle.tools[slug].title, `${locale}/${slug} title`).toMatch(LOCAL_NO_UPLOAD_TITLE_RE[locale]);
      }
    }
  });

  it('builds reciprocal hreflang pairs for commercial path segments across all shipped locales', () => {
    const segments = ['', 'sign-pdf', 'merge-pdf', 'privacy'];
    for (const segment of segments) {
      const pairs = hreflangPairs(segment);
      expect(pairs).toHaveLength(SEO_LOCALES.length);
      expect(pairs).toEqual(
        expect.arrayContaining([
          {
            lang: 'en',
            href: `${SITE_ORIGIN}${toolPath('en', segment || 'home')}`,
          },
          {
            lang: 'zh-Hant',
            href: `${SITE_ORIGIN}${toolPath('zh-hant', segment || 'home')}`,
          },
          {
            lang: 'zh-Hans',
            href: `${SITE_ORIGIN}${toolPath('zh-hans', segment || 'home')}`,
          },
          {
            lang: 'es',
            href: `${SITE_ORIGIN}${toolPath('es', segment || 'home')}`,
          },
          {
            lang: 'pt-BR',
            href: `${SITE_ORIGIN}${toolPath('pt-br', segment || 'home')}`,
          },
        ]),
      );
    }
  });

  it('guide hreflang only includes core locales', () => {
    const pairs = hreflangPairs('guides/how-browser-pdf-tools-work');
    expect(pairs).toHaveLength(CORE_SEO_LOCALES.length);
    expect(pairs.map((p) => p.lang).sort()).toEqual(['en', 'zh-Hans', 'zh-Hant'].sort());
  });

  it('privacy pages disclose localStorage, IndexedDB, and cookie stance', () => {
    for (const locale of SEO_LOCALES) {
      const disclosure = getBundle(locale).privacy.storageDisclosure;
      expect(disclosure, locale).toBeDefined();
      const keys = disclosure!.rows.map((r) => r.storage.toLowerCase());
      expect(keys, locale).toEqual(expect.arrayContaining(['localstorage', 'indexeddb', 'cookies']));
      expect(disclosure!.clearNote.length, locale).toBeGreaterThan(20);
      const storageFaq = getBundle(locale).privacy.faq.some(
        (f) => /localStorage|IndexedDB|storage|儲存|存储|Almacenamiento|Armazenamento|Stockage|Speicher|ストレージ|저장소|Хранилище|Penyimpanan|Bộ nhớ/i.test(
          `${f.question} ${f.answer}`
        )
      );
      expect(storageFaq, `${locale} storage FAQ`).toBe(true);
    }
  });

  it('lists indexable paths for core+wave1 commercial pages, core guides, languages, licences', () => {
    const paths = listIndexablePaths();
    expect(paths).toContain('/en/');
    expect(paths).toContain('/zh-hant/sign-pdf/');
    expect(paths).toContain('/zh-hans/sign-pdf/');
    expect(paths).toContain('/es/sign-pdf/');
    expect(paths).toContain('/pt-br/merge-pdf/');
    expect(paths).toContain('/ja/privacy/');
    expect(paths).toContain('/fil/compress-pdf/');
    expect(paths).toContain('/en/privacy/');
    expect(paths).toContain('/en/guides/visible-vs-digital-signature/');
    expect(paths).toContain('/zh-hant/guides/how-browser-pdf-tools-work/');
    expect(paths).toContain('/zh-hans/guides/how-browser-pdf-tools-work/');
    // Wave 1 does not ship long guides yet
    expect(paths).not.toContain('/es/guides/how-browser-pdf-tools-work/');
    expect(paths).toContain('/languages/');
    expect(paths).toContain('/open-source-licences/');
    expect(SEO_LOCALES).toEqual([...CORE_SEO_LOCALES, ...WAVE1_SEO_LOCALES]);
    // 3 core * 15 + 10 wave1 * 7 + languages + licences = 45 + 70 + 2 = 117
    expect(paths).toHaveLength(117);
  });

  it('zh-Hant home uses Hong Kong-oriented wording (私隱 / 瀏覽器)', () => {
    const zh = getBundle('zh-hant' as SeoLocale);
    expect(zh.home.h1).toContain('瀏覽器');
    expect(zh.privacy.title).toMatch(/私隱/);
    expect(zh.nav.privacy).toBe('私隱');
  });

  it('core locales link tools to privacy and at least one guide; Wave 1 links privacy without guides', () => {
    for (const locale of SEO_LOCALES) {
      const bundle = getBundle(locale);
      for (const slug of TOOLS) {
        const related = bundle.tools[slug].related;
        const segments = related.map((r) => r.pathSegment);
        expect(segments, `${locale}/${slug} privacy link`).toContain('privacy');
        if (localeHasGuides(locale)) {
          expect(
            segments.some((s) => s.startsWith('guides/')),
            `${locale}/${slug} guide link`,
          ).toBe(true);
        } else {
          expect(
            segments.some((s) => s.startsWith('guides/')),
            `${locale}/${slug} must not link unfinished guides`,
          ).toBe(false);
        }
      }
      if (localeHasGuides(locale)) {
        for (const slug of ['compress-pdf', 'reorder-pdf', 'delete-pdf-pages'] as const) {
          const segments = bundle.tools[slug].related.map((r) => r.pathSegment);
          expect(segments).toContain('guides/how-browser-pdf-tools-work');
        }
      }
    }
  });

  it('Wave 1 bundles omit long guides until quality-ready', () => {
    for (const locale of WAVE1_SEO_LOCALES) {
      const bundle = getBundle(locale);
      expect(bundle.guides, locale).toBeUndefined();
      expect(localeHasGuides(locale)).toBe(false);
    }
  });

  it('gives every shipped guide a dated, evidence-scoped verification note', () => {
    for (const locale of CORE_SEO_LOCALES) {
      const guides = getBundle(locale).guides;
      expect(guides, locale).toBeDefined();
      for (const guide of Object.values(guides ?? {})) {
        expect(guide.dateVerified, `${locale}/${guide.slug} dateVerified`).toMatch(/^2026-\d{2}-\d{2}$/);
        expect(guide.verificationNote, `${locale}/${guide.slug} verificationNote`).toMatch(
          /open-source|開放原始碼|开源/i,
        );
        expect(guide.verificationNote, `${locale}/${guide.slug} local-file scope`).toMatch(
          /not uploaded|不上傳|沒有上傳|不会上传|没有上传/i,
        );
      }
    }
  });
});
