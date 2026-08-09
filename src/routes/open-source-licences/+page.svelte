<script lang="ts">
  import {
    OPEN_SOURCE_NOTICES,
    OPEN_SOURCE_NOTICES_DOWNLOAD_PATH,
    QPDF_WASM_FULL_NOTICES,
  } from '$lib/legal/open-source-notices';
  import { t } from '$lib/i18n';
  import SeoHead from '$lib/seo/SeoHead.svelte';
  import { LICENCES_PATH } from '$lib/seo/site';

  $: title = $t('licences.pageTitle');
  $: description = $t('licences.pageDesc');
</script>

<SeoHead
  title={title}
  description={description}
  canonicalPath={LICENCES_PATH}
  locale="en"
  ogLocale="en_US"
  pathSegment=""
  multiLocale={false}
  emitXDefault={false}
  pageKind="website"
/>

<section class="licences-page">
  <div class="page-header">
    <span class="eyebrow">{$t('licences.eyebrow')}</span>
    <h1 class="page-title">{$t('licences.title')}</h1>
    <p class="page-sub">{$t('licences.subtitle')}</p>
    <p class="full-link">
      <a href={OPEN_SOURCE_NOTICES_DOWNLOAD_PATH} download="open-source-notices.txt">
        {$t('licences.fullNoticesLink')}
      </a>
    </p>
  </div>

  <div class="notice-list">
    {#each OPEN_SOURCE_NOTICES as notice}
      <article class="card notice-card" id={notice.id}>
        <h2>{notice.name}</h2>
        <p class="meta"><strong>{$t('licences.version')}</strong> {notice.version}</p>
        <p class="meta"><strong>{$t('licences.license')}</strong> {notice.license}</p>
        <p class="meta"><strong>{$t('licences.copyright')}</strong> {notice.copyright}</p>
        {#if notice.homepage}
          <p class="meta">
            <strong>{$t('licences.source')}</strong>
            <a href={notice.homepage} rel="noopener noreferrer" target="_blank">{notice.homepage}</a>
          </p>
        {/if}
        <pre class="license-body">{notice.body}</pre>
      </article>
    {/each}

    <article class="card notice-card" id="full-third-party-notices">
      <h2>{$t('licences.fullNoticesHeading')}</h2>
      <pre class="license-body" data-testid="full-third-party-notices">{QPDF_WASM_FULL_NOTICES}</pre>
    </article>
  </div>
</section>

<style>
  .licences-page {
    max-width: var(--max-content);
    margin: 0 auto;
    padding: 1.5rem 1rem 3rem;
  }

  .page-header {
    margin-bottom: 1.25rem;
  }

  .full-link {
    margin: 0.75rem 0 0;
  }

  .full-link a {
    color: var(--green-800);
    font-weight: 600;
  }

  .notice-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .notice-card h2 {
    margin: 0 0 0.5rem;
    font-size: 1.15rem;
  }
</style>
