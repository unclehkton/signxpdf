<script lang="ts">
  import SeoHead from './SeoHead.svelte';
  import { buildBreadcrumbJsonLd, buildGuideJsonLd, relatedHref } from './catalog-meta';
  import { toolPath } from './site';
  import type { GuidePageContent, LocaleNav, SeoLocale } from './types';

  export let locale: SeoLocale;
  export let page: GuidePageContent;
  export let nav: LocaleNav;

  $: canonicalPath = toolPath(locale, page.pathSegment);
  $: breadcrumbItems = [
    { name: nav.home, path: toolPath(locale, 'home') },
    { name: page.h1, path: canonicalPath },
  ];
  $: breadcrumbLd = buildBreadcrumbJsonLd(breadcrumbItems);
  $: jsonLd = [...buildGuideJsonLd(locale, page), ...(breadcrumbLd ? [breadcrumbLd] : [])];
</script>

<SeoHead
  title={page.title}
  description={page.description}
  canonicalPath={canonicalPath}
  locale={locale}
  ogLocale={page.ogLocale}
  pathSegment={page.pathSegment}
  jsonLd={jsonLd}
  pageKind="article"
  datePublished={page.datePublished}
  dateModified={page.dateModified}
/>

<article class="seo-page" data-seo-page={page.slug} data-locale={locale} data-seo-kind="guide">
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
  <header class="seo-hero">
    <p class="eyebrow">{SITE_LABEL} · {nav.guides}</p>
    <h1>{page.h1}</h1>
    <p class="answer-first">{page.answerFirst}</p>
    {#if page.datePublished || page.dateModified || page.dateVerified}
      <p class="meta-dates">
        {#if page.datePublished}
          <span>{nav.published ?? 'Published'}: <time datetime={page.datePublished}>{page.datePublished}</time></span>
        {/if}
        {#if page.dateModified}
          <span>{nav.updated ?? 'Last updated'}: <time datetime={page.dateModified}>{page.dateModified}</time></span>
        {/if}
        {#if page.dateVerified}
          <span>{nav.verified ?? 'Last verified'}: <time datetime={page.dateVerified}>{page.dateVerified}</time></span>
        {/if}
      </p>
    {/if}
    {#if page.disclaimer}
      <p class="disclaimer" role="note">{page.disclaimer}</p>
    {/if}
    {#if page.verificationNote}
      <p class="verification-note" role="note">{page.verificationNote}</p>
    {/if}
  </header>

  {#each page.sections as section}
    <section class="seo-section">
      <h2>{section.heading}</h2>
      {#each section.paragraphs as para}
        <p>{para}</p>
      {/each}
      {#if section.bullets?.length}
        <ul>
          {#each section.bullets as item}
            <li>{item}</li>
          {/each}
        </ul>
      {/if}
      {#if section.table}
        <div class="data-table-wrap">
          <table>
            {#if section.table.caption}
              <caption>{section.table.caption}</caption>
            {/if}
            <thead>
              <tr>
                {#each section.table.headers as header}
                  <th scope="col">{header}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each section.table.rows as row}
                <tr>
                  {#each row as cell}
                    <td>{cell}</td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </section>
  {/each}

  {#if page.evidence?.length}
    <section class="seo-section evidence" aria-labelledby="evidence-heading">
      <h2 id="evidence-heading">{nav.howWeVerified ?? 'How we verified this'}</h2>
      {#each page.evidence as item}
        <div class="evidence-item">
          <h3>{item.method}</h3>
          <p><strong>Result:</strong> {item.result}</p>
          {#if item.scope}
            <p><strong>Scope:</strong> {item.scope}</p>
          {/if}
          {#if item.limits}
            <p><strong>Limits:</strong> {item.limits}</p>
          {/if}
          {#if item.source}
            <p class="evidence-source"><strong>Source:</strong> <code>{item.source}</code></p>
          {/if}
        </div>
      {/each}
    </section>
  {/if}

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
    max-width: 52rem;
    margin: 0 auto;
    padding: 1.25rem 1rem 3rem;
  }
  .seo-hero {
    margin-bottom: 1.5rem;
  }
  .breadcrumbs {
    margin: 0 0 1rem;
    color: #3a4a42;
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
    color: #aebbb3;
  }
  .breadcrumbs a {
    color: var(--green-800, #0d3a29);
  }
  .breadcrumbs [aria-current='page'] {
    color: var(--ink, #102018);
  }
  .eyebrow {
    margin: 0 0 0.35rem;
    font-size: 0.85rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--green-800, #0d3a29);
    opacity: 0.85;
  }
  h1 {
    margin: 0 0 0.75rem;
    font-size: clamp(1.6rem, 2.5vw, 2.1rem);
    line-height: 1.25;
    color: var(--green-900, #0a2f22);
  }
  .answer-first {
    font-size: 1.05rem;
    line-height: 1.65;
    margin: 0 0 0.75rem;
  }
  .meta-dates {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
    margin: 0 0 0.75rem;
    font-size: 0.9rem;
    color: #3a4a42;
  }
  .disclaimer {
    margin: 0;
    padding: 0.65rem 0.85rem;
    border-left: 3px solid var(--green-700, #1a6b4a);
    background: #f3faf6;
    font-size: 0.95rem;
  }
  .verification-note {
    margin: 0.65rem 0 0;
    padding: 0.65rem 0.85rem;
    border: 1px solid #d7e8de;
    border-radius: 8px;
    background: #fafdfb;
    font-size: 0.92rem;
    line-height: 1.55;
  }
  .seo-section {
    margin-top: 1.5rem;
  }
  .seo-section h2 {
    margin: 0 0 0.65rem;
    font-size: 1.25rem;
  }
  .seo-section h3 {
    margin: 0.75rem 0 0.35rem;
    font-size: 1.05rem;
  }
  .seo-section p {
    margin: 0 0 0.65rem;
    line-height: 1.65;
  }
  .data-table-wrap {
    overflow-x: auto;
    margin: 0.75rem 0 0.25rem;
    border: 1px solid #d7e8de;
    border-radius: 8px;
    background: #fff;
  }
  .data-table-wrap table {
    width: 100%;
    min-width: 42rem;
    border-collapse: collapse;
    font-size: 0.88rem;
  }
  .data-table-wrap caption {
    padding: 0.65rem 0.75rem;
    text-align: left;
    font-weight: 600;
    color: #26483a;
  }
  .data-table-wrap th,
  .data-table-wrap td {
    padding: 0.55rem 0.65rem;
    border-top: 1px solid #e3eee7;
    text-align: left;
    vertical-align: top;
    white-space: nowrap;
  }
  .data-table-wrap th {
    background: #f3faf6;
    color: #26483a;
    font-weight: 650;
  }
  .faq-item {
    margin-bottom: 0.85rem;
  }
  .related {
    margin: 0;
    padding-left: 1.2rem;
  }
  .related a {
    color: var(--green-800, #0d3a29);
    font-weight: 600;
  }
  .evidence-item {
    margin-bottom: 1rem;
    padding: 0.75rem 0.9rem;
    border: 1px solid #d7e8de;
    border-radius: 8px;
    background: #fafdfb;
  }
  .evidence-source code {
    font-size: 0.85em;
    word-break: break-all;
  }
</style>
