<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { RateLimiter } from '../rate-limit/RateLimiter';
  import { locale, t, type Locale } from '../i18n';
  import {
    HREFLANG_BY_LOCALE,
    AUTHORITY_SLUGS,
    LOCALE_DISPLAY,
    localeHasGuides,
    localeToStore,
    seoLocaleFromPathname,
    SEO_LOCALES,
    storeToLocale,
    toolPath,
    WAVE1_SEO_LOCALES,
    X_DEFAULT_PATH,
  } from '../seo/site';
  import type { SeoLocale } from '../seo/types';

  let remaining = 5;

  onMount(() => {
    const limiter = new RateLimiter();
    const updateRemaining = () => (remaining = limiter.remaining());
    updateRemaining();
    const timer = window.setInterval(updateRemaining, 5000);

    return () => window.clearInterval(timer);
  });

  $: pathname = $page.url.pathname;
  $: urlLocale = seoLocaleFromPathname(pathname);
  $: seoLocale = (urlLocale ?? storeToLocale($locale)) as SeoLocale;
  $: signHref = toolPath(seoLocale, 'sign-pdf');
  $: toolsHref = toolPath(seoLocale, 'merge-pdf');
  $: homeHref = toolPath(seoLocale, 'home');
  $: segment = pathSegmentAfterLocale(pathname);
  $: enHref = toolPath('en', equivalentSegmentForLocale('en', segment));
  $: zhHantHref = toolPath('zh-hant', equivalentSegmentForLocale('zh-hant', segment));
  $: zhHansHref = toolPath('zh-hans', equivalentSegmentForLocale('zh-hans', segment));
  $: otherLanguageLinks = WAVE1_SEO_LOCALES.map((loc) => ({
    locale: loc,
    href: toolPath(loc, equivalentSegmentForLocale(loc, segment)),
    hreflang: HREFLANG_BY_LOCALE[loc],
    label: LOCALE_DISPLAY[loc].nativeLabel,
  }));
  $: otherActive = (WAVE1_SEO_LOCALES as readonly string[]).includes(seoLocale);
  $: signActive = pathname.includes('/sign-pdf');
  $: toolsActive =
    pathname.includes('/merge-pdf') ||
    pathname.includes('/compress-pdf') ||
    pathname.includes('/reorder-pdf') ||
    pathname.includes('/delete-pdf-pages') ||
    pathname === '/tools' ||
    pathname === '/tools/';

  function pathSegmentAfterLocale(path: string): string {
    const parts = path.split('/').filter(Boolean);
    if (parts[0] && (SEO_LOCALES as readonly string[]).includes(parts[0])) {
      return parts.slice(1).join('/');
    }
    return '';
  }

  /**
   * Map current path segment to an equivalent that exists for the target locale.
   * Wave 1 has no long guides — fall back to home rather than inventing 404 guide URLs.
   */
  function equivalentSegmentForLocale(target: SeoLocale, pathSegment: string): string {
    const cleaned = pathSegment || 'home';
    if (
      (cleaned.startsWith('guides/') || (AUTHORITY_SLUGS as readonly string[]).includes(cleaned))
      && !localeHasGuides(target)
    ) {
      return 'home';
    }
    return cleaned;
  }

  function onLocaleClick(next: Locale) {
    locale.set(next);
  }

  function onWave1LocaleClick(next: SeoLocale) {
    locale.set(localeToStore(next));
  }
</script>

<header class="top">
  <div class="top-inner">
    <a class="brand" href={homeHref} aria-label="Sign X PDF home">
      <span class="mark" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19.5L12 4l8 15.5H4z" fill="currentColor" opacity="0.18"/>
          <path d="M4 19.5L12 4l8 15.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
          <path d="M9 14.5h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </span>
      <span class="wordmark">Sign X PDF</span>
    </a>

  <nav class="nav-links" aria-label="Tools">
    <a class="nav-link" class:active={signActive} href={signHref}>✏️ {$t('topbar.signPdf')}</a>
    <a class="nav-link" class:active={toolsActive} href={toolsHref}>🛠 {$t('topbar.pdfTools')}</a>
  </nav>

    <span class="tagline"><span class="serif-accent">{$t('topbar.tagline')}</span></span>

    <div class="meta">
      <span class="counter" title="Daily exports remaining">
        <span class="dot" aria-hidden="true"></span>
        {$t('topbar.remaining', { remaining })}
      </span>
      <nav class="locale-switch" aria-label="Language">
        <a
          href={enHref}
          class:active={seoLocale === 'en'}
          hreflang="en"
          on:click={() => onLocaleClick('en')}
        >EN</a>
        <span class="sep" aria-hidden="true">/</span>
        <a
          href={zhHantHref}
          class:active={seoLocale === 'zh-hant'}
          hreflang="zh-Hant"
          on:click={() => onLocaleClick('zh-Hant')}
        >繁</a>
        <span class="sep" aria-hidden="true">/</span>
        <a
          href={zhHansHref}
          class:active={seoLocale === 'zh-hans'}
          hreflang="zh-Hans"
          on:click={() => onLocaleClick('zh-CN')}
        >简</a>
        <span class="sep" aria-hidden="true">/</span>
        <details class="other-langs" class:active={otherActive}>
          <summary>
            Other languages
            <span class="sr-only"> (opens language list)</span>
          </summary>
          <ul class="other-langs-menu" role="list">
            {#each otherLanguageLinks as link}
              <li>
                <a
                  href={link.href}
                  hreflang={link.hreflang}
                  class:active={seoLocale === link.locale}
                  on:click={() => onWave1LocaleClick(link.locale)}
                >{link.label}</a>
              </li>
            {/each}
            <li class="all-langs">
              <a href={X_DEFAULT_PATH}>All languages</a>
            </li>
          </ul>
        </details>
      </nav>
    </div>
  </div>
  <div class="rule" aria-hidden="true"></div>
</header>

<style>
  .top {
    background: var(--surface);
    position: sticky;
    top: 0;
    z-index: 30;
    backdrop-filter: saturate(140%) blur(8px);
  }
  .top-inner {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    padding: .9rem var(--page-gutter, 1.5rem);
    max-width: calc(var(--max-content) + 2 * var(--ad-width) + 4rem);
    margin: 0 auto;
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: .65rem;
    color: var(--green-900);
    border-bottom: 0;
    text-decoration: none;
    min-width: 0;
  }
  .wordmark {
    font-weight: 700;
    letter-spacing: 0.02em;
    overflow-wrap: anywhere;
  }
  .nav-links {
    display: flex;
    gap: 0.75rem;
    min-width: 0;
  }
  .nav-link {
    text-decoration: none;
    color: var(--green-900);
    font-weight: 600;
    font-size: 0.95rem;
    min-width: 0;
  }
  .nav-link.active {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  .tagline {
    flex: 1;
    min-width: 0;
    color: #3a4a42;
    font-size: 0.92rem;
  }
  .meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 0;
  }
  .counter {
    font-size: 0.85rem;
    color: #3a4a42;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }
  .dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: var(--green-700, #1a6b4a);
  }
  .locale-switch {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.9rem;
    min-width: 0;
  }
  .locale-switch a {
    color: var(--green-900);
    text-decoration: none;
    font-weight: 600;
    padding: 0.15rem 0.25rem;
    border-radius: 4px;
  }
  .locale-switch a.active {
    background: #e7f5ee;
  }
  .locale-switch a:focus-visible {
    outline: 2px solid var(--green-700, #1a6b4a);
    outline-offset: 2px;
  }
  .sep {
    opacity: 0.45;
  }
  .other-langs {
    position: relative;
  }
  .other-langs summary {
    display: block;
    list-style: none;
    cursor: pointer;
    color: var(--green-900);
    font-weight: 600;
    padding: 0.15rem 0.35rem;
    border-radius: 4px;
    user-select: none;
    max-width: 100%;
    overflow-wrap: anywhere;
  }
  .other-langs summary::-webkit-details-marker {
    display: none;
  }
  .other-langs.active > summary,
  .other-langs[open] > summary {
    background: #e7f5ee;
  }
  .other-langs summary:focus-visible {
    outline: 2px solid var(--green-700, #1a6b4a);
    outline-offset: 2px;
  }
  .other-langs-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 0.35rem);
    min-width: 12rem;
    max-width: min(18rem, calc(100vw - 2 * var(--page-gutter, 1.5rem)));
    margin: 0;
    padding: 0.4rem 0;
    list-style: none;
    background: #fff;
    border: 1px solid #d7e8de;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(16, 40, 28, 0.12);
    z-index: 40;
  }
  .other-langs-menu a {
    display: block;
    padding: 0.4rem 0.85rem;
    font-weight: 600;
    white-space: nowrap;
  }
  .other-langs-menu a.active {
    background: #e7f5ee;
  }
  .other-langs-menu .all-langs {
    border-top: 1px solid #e7f0eb;
    margin-top: 0.25rem;
    padding-top: 0.25rem;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  .rule {
    height: 1px;
    background: linear-gradient(90deg, transparent, #d7e8de, transparent);
  }
  @media (max-width: 900px) {
    .tagline { display: none; }
  }
  @media (max-width: 720px) {
    .top-inner {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 0.75rem 1rem;
      align-items: center;
    }
    .nav-links {
      justify-content: flex-end;
      gap: 0.55rem;
    }
    .meta {
      grid-column: 1 / -1;
      width: 100%;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
    }
    .counter {
      min-width: 0;
      flex: 0 1 auto;
    }
    .locale-switch {
      flex: 1 1 auto;
      justify-content: flex-end;
      flex-wrap: wrap;
      row-gap: 0.25rem;
    }
    .other-langs summary {
      text-align: right;
    }
  }
  @media (max-width: 430px) {
    .top-inner {
      gap: 0.6rem 0.75rem;
    }
    .nav-links {
      gap: 0.35rem;
    }
    .nav-link {
      font-size: 0.86rem;
    }
    .counter {
      max-width: 6.5rem;
      font-size: 0.78rem;
    }
    .locale-switch {
      gap: 0.2rem;
      font-size: 0.82rem;
    }
    .locale-switch a {
      padding-inline: 0.2rem;
    }
    .other-langs summary {
      max-width: 7rem;
    }
  }
</style>
