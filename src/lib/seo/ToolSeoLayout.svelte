<script lang="ts">
  import SeoHead from './SeoHead.svelte';
  import {
    buildFaqPageJsonLd,
    buildBreadcrumbJsonLd,
    buildWebAppJsonLd,
    buildWebSiteJsonLd,
    relatedHref,
  } from './catalog-meta';
  import { toolPath } from './site';
  import type { LocaleNav, SeoLocale, ToolPageContent } from './types';
  import PdfToolIsland from './islands/PdfToolIsland.svelte';

  export let locale: SeoLocale;
  export let page: ToolPageContent;
  /** Nav labels for this locale only — loaded server-side; do not call getBundle here. */
  export let nav: LocaleNav;

  $: canonicalPath = toolPath(locale, page.slug === 'home' ? 'home' : page.pathSegment);
  $: signPath = toolPath(locale, 'sign-pdf');
  $: toolsPath = toolPath(locale, 'merge-pdf');
  $: faqLd = buildFaqPageJsonLd(page.faq);
  $: breadcrumbItems =
    page.slug === 'home'
      ? []
      : [
          { name: nav.home, path: toolPath(locale, 'home') },
          { name: page.h1, path: canonicalPath },
        ];
  $: breadcrumbLd = buildBreadcrumbJsonLd(breadcrumbItems);
  $: jsonLd = (() => {
    const blocks: Record<string, unknown>[] = [];
    if (breadcrumbLd) blocks.push(breadcrumbLd);
    if (page.slug === 'home') blocks.push(buildWebSiteJsonLd());
    blocks.push(buildWebAppJsonLd(locale, page));
    if (faqLd) blocks.push(faqLd);
    return blocks;
  })();
</script>

<SeoHead
  title={page.title}
  description={page.description}
  canonicalPath={canonicalPath}
  locale={locale}
  ogLocale={page.ogLocale}
  pathSegment={page.pathSegment}
  jsonLd={jsonLd}
/>

<article class="seo-page" data-seo-page={page.slug} data-locale={locale}>
  {#if breadcrumbItems.length}
    <nav class="breadcrumbs" aria-label={nav.breadcrumbs ?? 'Breadcrumb'}>
      <ol>
        {#each breadcrumbItems as item, index}
          <li>
            {#if index === breadcrumbItems.length - 1}
              <span aria-current="page">{item.name}</span>
            {:else}
              <a href={item.path}>{item.name}</a>
            {/if}
          </li>
        {/each}
      </ol>
    </nav>
  {/if}
  <header class="seo-hero">
    <p class="eyebrow">{SITE_LABEL}</p>
    <h1>{page.h1}</h1>
    <p class="answer-first">{page.answerFirst}</p>
    {#if page.slug !== 'privacy'}
      <nav class="hero-actions" aria-label={nav.tools}>
        <a
          class="hero-action"
          class:hero-action-primary={page.toolKind !== 'tools'}
          class:hero-action-secondary={page.toolKind === 'tools'}
          href={signPath}
        >{nav.sign}</a>
        <a
          class="hero-action"
          class:hero-action-primary={page.toolKind === 'tools'}
          class:hero-action-secondary={page.toolKind !== 'tools'}
          href={toolsPath}
        >{nav.tools}</a>
      </nav>
    {/if}
    <p class="privacy-note" role="note">{page.privacyNote}</p>
  </header>

  {#if page.toolKind !== 'none'}
    <section id="tool" class="tool-panel" aria-label={nav.openTool}>
      <h2 class="tool-heading">{nav.openTool}</h2>
      <PdfToolIsland
        kind={page.toolKind}
        focus={page.toolsFocus ?? 'general'}
        enableJsLabel={nav.enableJs}
      />
    </section>
  {/if}

  <section class="seo-section">
    <h2>{nav.whatItDoes}</h2>
    <p>{page.whatItDoes}</p>
  </section>

  <section class="seo-section">
    <h2>{nav.howTo}</h2>
    <ol>
      {#each page.howTo as step}
        <li>{step}</li>
      {/each}
    </ol>
  </section>

  <section class="seo-section">
    <h2>{nav.localProcessing}</h2>
    <p>{page.localProcessing}</p>
  </section>

  {#if page.storageDisclosure}
    <section class="seo-section" data-storage-disclosure>
      <h2>{page.storageDisclosure.heading}</h2>
      <div class="storage-table-wrap">
        <table class="storage-table">
          <thead>
            <tr>
              <th scope="col">{page.storageDisclosure.storageColumn}</th>
              <th scope="col">{page.storageDisclosure.purposeColumn}</th>
            </tr>
          </thead>
          <tbody>
            {#each page.storageDisclosure.rows as row}
              <tr>
                <td>{row.storage}</td>
                <td>{row.purpose}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <p class="storage-clear-note">{page.storageDisclosure.clearNote}</p>
    </section>
  {/if}

  <section class="seo-section">
    <h2>{nav.limitations}</h2>
    <ul>
      {#each page.limitations as item}
        <li>{item}</li>
      {/each}
    </ul>
  </section>

  <section class="seo-section">
    <h2>{nav.faq}</h2>
    {#each page.faq as item}
      <div class="faq-item">
        <h3>{item.question}</h3>
        <p>{item.answer}</p>
      </div>
    {/each}
  </section>

  <section class="seo-section">
    <h2>{nav.relatedTools}</h2>
    <ul class="related">
      {#each page.related as rel}
        <li>
          <a href={relatedHref(locale, rel.pathSegment)}>{rel.label}</a>
        </li>
      {/each}
    </ul>
  </section>
</article>

<script context="module" lang="ts">
  const SITE_LABEL = 'Sign X PDF';
</script>

<style>
  .seo-page {
    width: 100%;
    max-width: 52rem;
    margin: 0 auto;
    padding: 1.5rem var(--page-gutter, 1.5rem) 3rem;
    color: var(--ink, #102018);
  }
  .seo-hero {
    margin-bottom: 1.75rem;
  }
  .breadcrumbs {
    margin: 0 0 1rem;
    color: var(--muted, #58675f);
    font-size: 0.88rem;
  }
  .breadcrumbs ol {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 0.65rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .breadcrumbs li {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
  }
  .breadcrumbs li:not(:last-child)::after {
    content: '/';
    color: var(--border-strong, #b8c3ba);
  }
  .breadcrumbs a {
    color: var(--green-800, #145c3d);
  }
  .breadcrumbs [aria-current='page'] {
    color: var(--ink, #102018);
  }
  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 0.75rem;
    color: var(--green-800, #145c3d);
    font-weight: 600;
    margin: 0 0 0.5rem;
  }
  h1 {
    margin: 0 0 1rem;
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    line-height: 1.2;
    color: var(--green-900, #0d3a29);
  }
  .answer-first {
    font-size: 1.05rem;
    line-height: 1.65;
    margin: 0 0 1rem;
  }
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    margin: 0 0 1rem;
  }
  .hero-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 8.5rem;
    min-width: 8.5rem;
    min-height: 2.75rem;
    padding: 0.65rem 1rem;
    border: 1px solid transparent;
    border-radius: 999px;
    font-weight: 650;
    line-height: 1.2;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.18s ease, border-color 0.18s ease,
      color 0.18s ease, transform 0.18s ease;
  }
  .hero-action:focus-visible {
    outline: 2px solid var(--green-700, #1a5d42);
    outline-offset: 3px;
  }
  .hero-action-primary {
    background: var(--green-900, #0d3a29);
    border-color: var(--green-900, #0d3a29);
    color: #f4f1e6;
  }
  .hero-action-secondary {
    background: var(--surface, #fff);
    border-color: var(--border-strong, #d5d0bd);
    color: var(--ink, #102018);
  }
  @media (hover: hover) and (pointer: fine) {
    .hero-action-primary:hover {
      background: var(--green-700, #1a5d42);
      border-color: var(--green-700, #1a5d42);
      color: #f4f1e6;
      transform: translateY(-1px);
    }
    .hero-action-secondary:hover {
      border-color: var(--green-700, #1a5d42);
      color: var(--green-800, #134a35);
      transform: translateY(-1px);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hero-action {
      transition: none;
    }
  }
  .privacy-note {
    margin: 0;
    padding: 0.85rem 1rem;
    background: #eef6f0;
    border-left: 4px solid var(--green-700, #0f6b43);
    border-radius: 0 8px 8px 0;
    line-height: 1.55;
  }
  .tool-panel {
    margin: 1.75rem 0 2rem;
    padding: 1rem;
    border: 1px solid #d5e5db;
    border-radius: 12px;
    background: #fbfaf6;
  }
  .tool-heading {
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
  }
  .seo-section {
    margin-bottom: 1.75rem;
  }
  .seo-section h2 {
    margin: 0 0 0.65rem;
    font-size: 1.25rem;
    color: var(--green-900, #0d3a29);
  }
  .seo-section h3 {
    margin: 1rem 0 0.35rem;
    font-size: 1.05rem;
  }
  .seo-section p,
  .seo-section li {
    line-height: 1.6;
  }
  .storage-table-wrap {
    overflow-x: auto;
    margin: 0 0 0.75rem;
  }
  .storage-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }
  .storage-table th,
  .storage-table td {
    border: 1px solid #d5e5db;
    padding: 0.55rem 0.75rem;
    text-align: left;
    vertical-align: top;
  }
  .storage-table th {
    background: #eef6f0;
    font-weight: 650;
    color: var(--green-900, #0d3a29);
  }
  .storage-clear-note {
    margin: 0;
    line-height: 1.6;
  }
  .related {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 0.5rem;
  }
  .related a {
    color: var(--green-800, #145c3d);
    font-weight: 600;
  }
  .faq-item p {
    margin-top: 0.25rem;
  }
</style>
