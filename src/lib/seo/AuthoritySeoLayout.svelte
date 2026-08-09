<script lang="ts">
  import SeoHead from './SeoHead.svelte';
  import { buildAuthorityJsonLd, buildBreadcrumbJsonLd, relatedHref } from './catalog-meta';
  import { authorityPath, toolPath } from './site';
  import type { AuthorityPageContent, LocaleNav, SeoLocale } from './types';

  export let locale: SeoLocale;
  export let page: AuthorityPageContent;
  export let nav: LocaleNav;

  $: canonicalPath = authorityPath(locale as 'en' | 'zh-hant' | 'zh-hans', page.slug);
  $: breadcrumbItems = [
    { name: nav.home, path: toolPath(locale, 'home') },
    { name: page.h1, path: canonicalPath },
  ];
  $: breadcrumbLd = buildBreadcrumbJsonLd(breadcrumbItems);
  $: jsonLd = [...buildAuthorityJsonLd(locale, page), ...(breadcrumbLd ? [breadcrumbLd] : [])];
  $: tableLabels = page.verificationTableLabels ?? {
    workflow: 'Workflow',
    test: 'Test',
    result: 'Result',
    verified: 'Verified',
  };
</script>

<SeoHead
  title={page.title}
  description={page.description}
  canonicalPath={canonicalPath}
  locale={locale}
  ogLocale={page.ogLocale}
  pathSegment={page.pathSegment}
  jsonLd={jsonLd}
  pageKind={page.pageKind}
  dateModified={page.dateVerified}
/>

<article class="seo-page" data-seo-page={page.slug} data-locale={locale} data-seo-kind="authority">
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
    <p class="eyebrow">Sign X PDF · {page.slug === 'about' ? 'About' : 'Verification'}</p>
    <h1>{page.h1}</h1>
    <p class="answer-first">{page.answerFirst}</p>
    <p class="meta-dates">
      <span>{nav.verified ?? 'Last verified'}: <time datetime={page.dateVerified}>{page.dateVerified}</time></span>
    </p>
    <p class="verification-note" role="note">{page.verificationNote}</p>
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
    </section>
  {/each}

  {#if page.verificationRows?.length}
    <section class="seo-section" aria-labelledby="verification-table-heading">
      <h2 id="verification-table-heading">{page.slug === 'verification' ? page.h1 : 'Verification coverage'}</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">{tableLabels.workflow}</th>
              <th scope="col">{tableLabels.test}</th>
              <th scope="col">{tableLabels.result}</th>
              <th scope="col">{tableLabels.verified}</th>
            </tr>
          </thead>
          <tbody>
            {#each page.verificationRows as row}
              <tr>
                <th scope="row">{row.workflowLabel}</th>
                <td>{row.test}</td>
                <td>{row.result}</td>
                <td><time datetime={row.verified}>{row.verified}</time></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
  {/if}

  {#if page.evidence?.length}
    <section class="seo-section evidence" aria-labelledby="evidence-heading">
      <h2 id="evidence-heading">{nav.howWeVerified ?? 'How we verified this'}</h2>
      {#each page.evidence as item}
        <div class="evidence-item">
          <h3>{item.method}</h3>
          <p><strong>Result:</strong> {item.result}</p>
          {#if item.scope}<p><strong>Scope:</strong> {item.scope}</p>{/if}
          {#if item.limits}<p><strong>Limits:</strong> {item.limits}</p>{/if}
          {#if item.source}<p class="evidence-source"><strong>Source:</strong> <code>{item.source}</code></p>{/if}
        </div>
      {/each}
    </section>
  {/if}

  {#if page.sourceLinks.length}
    <section class="seo-section" aria-labelledby="sources-heading">
      <h2 id="sources-heading">{page.sourceHeading ?? 'Sources'}</h2>
      <ul class="source-links">
        {#each page.sourceLinks as source}
          <li>
            <a href={source.href}>{source.label}</a>
            {#if source.note}<span> — {source.note}</span>{/if}
          </li>
        {/each}
      </ul>
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
        <li><a href={relatedHref(locale, rel.pathSegment)}>{rel.label}</a></li>
      {/each}
    </ul>
  </section>
</article>

<style>
  .seo-page { max-width: 52rem; margin: 0 auto; padding: 1.25rem 1rem 3rem; }
  .seo-hero { margin-bottom: 1.5rem; }
  .breadcrumbs { margin: 0 0 1rem; color: #3a4a42; font-size: 0.88rem; }
  .breadcrumbs ol { display: flex; flex-wrap: wrap; gap: 0.35rem 0.65rem; margin: 0; padding: 0; list-style: none; }
  .breadcrumbs li { display: inline-flex; align-items: center; gap: 0.65rem; }
  .breadcrumbs li:not(:last-child)::after { content: '/'; color: #aebbb3; }
  .breadcrumbs a, .related a, .source-links a { color: var(--green-800, #0d3a29); }
  .breadcrumbs [aria-current='page'] { color: var(--ink, #102018); }
  .eyebrow { margin: 0 0 0.35rem; font-size: 0.85rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--green-800, #0d3a29); opacity: 0.85; }
  h1 { margin: 0 0 0.75rem; font-size: clamp(1.6rem, 2.5vw, 2.1rem); line-height: 1.25; color: var(--green-900, #0a2f22); }
  .answer-first { font-size: 1.05rem; line-height: 1.65; margin: 0 0 0.75rem; }
  .meta-dates { margin: 0 0 0.75rem; font-size: 0.9rem; color: #3a4a42; }
  .verification-note { margin: 0; padding: 0.65rem 0.85rem; border: 1px solid #d7e8de; border-radius: 8px; background: #fafdfb; font-size: 0.92rem; line-height: 1.55; }
  .seo-section { margin-top: 1.5rem; }
  .seo-section h2 { margin: 0 0 0.65rem; font-size: 1.25rem; }
  .seo-section h3 { margin: 0.75rem 0 0.35rem; font-size: 1.05rem; }
  .seo-section p { margin: 0 0 0.65rem; line-height: 1.65; }
  .seo-section ul { line-height: 1.65; }
  .faq-item { margin-bottom: 0.85rem; }
  .related, .source-links { margin: 0; padding-left: 1.2rem; }
  .related a, .source-links a { font-weight: 600; }
  .source-links span { color: #3a4a42; }
  .evidence-item { margin-bottom: 1rem; padding: 0.75rem 0.9rem; border: 1px solid #d7e8de; border-radius: 8px; background: #fafdfb; }
  .evidence-source code { font-size: 0.85em; word-break: break-all; }
  .table-wrap { overflow-x: auto; }
  table { width: 100%; min-width: 34rem; border-collapse: collapse; font-size: 0.95rem; }
  th, td { padding: 0.65rem 0.7rem; border: 1px solid #d7e8de; text-align: left; vertical-align: top; }
  thead th { background: #f1f8f4; color: var(--green-900, #0a2f22); }
  tbody th { font-weight: 600; background: #fbfdfc; }
</style>
