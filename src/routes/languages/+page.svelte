<script lang="ts">
  import SeoHead from '$lib/seo/SeoHead.svelte';
  import {
    HREFLANG_BY_LOCALE,
    LOCALE_DISPLAY,
    SEO_LOCALES,
    SITE_NAME,
    toolPath,
    WAVE1_SEO_LOCALES,
    X_DEFAULT_PATH,
  } from '$lib/seo/site';
  import type { SeoLocale } from '$lib/seo/types';

  const title = `Choose a language | ${SITE_NAME}`;
  const description =
    'Select a language for Sign X PDF. Localized tool pages (home, tools, privacy) ship in multiple languages; some interactive tool controls may remain in English until full UI localization.';

  const coreOptions: {
    locale: SeoLocale;
    native: string;
    blurb: string;
  }[] = [
    {
      locale: 'en',
      native: LOCALE_DISPLAY.en.nativeLabel,
      blurb: 'Sign and edit PDFs in your browser with English interface copy.',
    },
    {
      locale: 'zh-hant',
      native: LOCALE_DISPLAY['zh-hant'].nativeLabel,
      blurb: '以繁體中文使用瀏覽器內 PDF 簽署與編輯工具。',
    },
    {
      locale: 'zh-hans',
      native: LOCALE_DISPLAY['zh-hans'].nativeLabel,
      blurb: '使用简体中文在浏览器中签署与编辑 PDF。',
    },
  ];

  const wave1Options = WAVE1_SEO_LOCALES.map((locale) => ({
    locale,
    native: LOCALE_DISPLAY[locale].nativeLabel,
    english: LOCALE_DISPLAY[locale].englishLabel,
  }));

  void SEO_LOCALES;
</script>

<SeoHead
  title={title}
  description={description}
  canonicalPath={X_DEFAULT_PATH}
  locale="en"
  ogLocale="en_US"
  pathSegment=""
  multiLocale={false}
  pageKind="website"
/>

<main class="lang-page">
  <header class="hero">
    <p class="eyebrow">{SITE_NAME}</p>
    <h1>Choose a language</h1>
    <p class="lede">
      Pick a language for Sign X PDF. Each option opens the matching locale homepage with localized
      tool and privacy pages. Some interactive tool controls may remain in English until full UI
      localization ships. This page is the site-wide language selector used as the unmatched-language
      fallback (<code>x-default</code>).
    </p>
  </header>

  <h2 class="group-title">Core languages</h2>
  <ul class="lang-list">
    {#each coreOptions as opt}
      <li>
        <a
          class="lang-card"
          href={toolPath(opt.locale, 'home')}
          hreflang={HREFLANG_BY_LOCALE[opt.locale]}
        >
          <span class="label">{opt.native}</span>
          <span class="blurb">{opt.blurb}</span>
        </a>
      </li>
    {/each}
  </ul>

  <h2 class="group-title">More languages</h2>
  <p class="group-note">
    Localized commercial pages (home, tools, privacy) are available in these languages. Long guides
    remain in English and Chinese until natural localizations ship. Interactive editor chrome may
    still show English labels in Wave 1 locales. Filipino pages use Tagalog/Taglish product copy;
    technical PDF search demand is often English—long Filipino guides wait for SERP validation.
  </p>
  <ul class="lang-list wave1">
    {#each wave1Options as opt}
      <li>
        <a
          class="lang-card"
          href={toolPath(opt.locale, 'home')}
          hreflang={HREFLANG_BY_LOCALE[opt.locale]}
        >
          <span class="label">{opt.native}</span>
          <span class="blurb">{opt.english}</span>
        </a>
      </li>
    {/each}
  </ul>

  <p class="note">
    Languages appear here only when they ship with complete commercial SEO pages. Unfinished or
    English-fallback locales are not listed. Wave 2 candidates (including RTL) stay unindexed until
    quality and layout QA pass.
  </p>
</main>

<style>
  .lang-page {
    max-width: 40rem;
    margin: 0 auto;
    padding: 2rem 1rem 3rem;
  }
  .eyebrow {
    margin: 0 0 0.35rem;
    font-size: 0.85rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--green-800, #0d3a29);
  }
  h1 {
    margin: 0 0 0.75rem;
    font-size: clamp(1.6rem, 2.5vw, 2rem);
    color: var(--green-900, #0a2f22);
  }
  .lede {
    line-height: 1.65;
    margin: 0 0 1.5rem;
  }
  .group-title {
    margin: 1.5rem 0 0.65rem;
    font-size: 1.05rem;
    color: var(--green-900, #0a2f22);
  }
  .group-note {
    margin: 0 0 0.75rem;
    font-size: 0.92rem;
    line-height: 1.55;
    color: #3a4a42;
  }
  .lang-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.75rem;
  }
  .lang-list.wave1 {
    grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  }
  .lang-card {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.9rem 1rem;
    border: 1px solid #d7e8de;
    border-radius: 10px;
    text-decoration: none;
    color: inherit;
    background: #fbfefc;
  }
  .lang-card:hover,
  .lang-card:focus-visible {
    border-color: var(--green-700, #1a6b4a);
    outline: none;
  }
  .label {
    font-weight: 700;
    color: var(--green-900, #0a2f22);
  }
  .blurb {
    font-size: 0.9rem;
    line-height: 1.45;
    color: #3a4a42;
  }
  .note {
    margin-top: 1.75rem;
    font-size: 0.9rem;
    line-height: 1.55;
    color: #3a4a42;
  }
</style>
