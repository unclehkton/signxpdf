import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getBundle } from '../../src/lib/seo/catalog';
import { SEO_LOCALES } from '../../src/lib/seo/site';
import type { SeoLocale, ToolPageContent } from '../../src/lib/seo/types';

const topBarSource = readFileSync('src/lib/components/TopBar.svelte', 'utf8');
const seoLayoutSource = readFileSync('src/lib/seo/ToolSeoLayout.svelte', 'utf8');

const SAVE_MARKERS: Record<SeoLocale, RegExp> = {
  en: /\bsave\b/i,
  'zh-hant': /儲存|保存/,
  'zh-hans': /保存/,
  es: /guard(?:a|ar)/i,
  'pt-br': /salv|guard/i,
  fr: /enregistr/i,
  de: /speicher/i,
  ja: /保存/,
  ko: /저장/,
  ru: /сохран/i,
  id: /simpan/i,
  vi: /lưu/i,
  fil: /i-save|save/i,
};

const GUIDE_OUTPUT_MARKERS: Record<'en' | 'zh-hant' | 'zh-hans', RegExp> = {
  en: /Output: save a new file/i,
  'zh-hant': /輸出：將新檔案儲存到裝置/,
  'zh-hans': /输出：将新文件保存到您的设备/,
};

function commercialPages(locale: SeoLocale): ToolPageContent[] {
  const bundle = getBundle(locale);
  return [bundle.home, ...Object.values(bundle.tools)];
}

describe('mobile SEO shell and output language', () => {
  it('keeps the shared header content inside a responsive mobile layout', () => {
    expect(topBarSource).toContain('display: grid;');
    expect(topBarSource).toContain('@media (max-width: 720px)');
    expect(topBarSource).toContain('min-width: 0;');
    expect(topBarSource).toContain('overflow-wrap: anywhere;');
  });

  it('renders localized Sign PDF and PDF tools actions after the answer-first copy', () => {
    expect(seoLayoutSource).toContain('class="hero-actions"');
    expect(seoLayoutSource).toContain('{nav.sign}');
    expect(seoLayoutSource).toContain('{nav.tools}');
    expect(seoLayoutSource).toContain("page.slug !== 'privacy'");
  });

  it('highlights PDF tools while viewing a PDF tools page', () => {
    expect(seoLayoutSource).toContain(
      "class:hero-action-primary={page.toolKind === 'tools'}",
    );
    expect(seoLayoutSource).toContain(
      "class:hero-action-secondary={page.toolKind === 'tools'}",
    );
  });

  it('uses save-oriented wording for generated PDF results in every shipped locale', () => {
    for (const locale of SEO_LOCALES) {
      const marker = SAVE_MARKERS[locale];
      for (const page of commercialPages(locale)) {
        expect(page.answerFirst, `${locale}/${page.slug}`).toMatch(marker);
      }
    }
  });

  it('uses save-oriented wording in the core browser-processing guide', () => {
    for (const locale of ['en', 'zh-hant', 'zh-hans'] as const) {
      const guide = getBundle(locale).guides?.['how-browser-pdf-tools-work'];
      const guideText = guide?.sections.flatMap((section) => [
        ...section.paragraphs,
        ...(section.bullets ?? []),
      ]).join('\n');

      expect(guideText, locale).toMatch(GUIDE_OUTPUT_MARKERS[locale]);
    }
  });
});
