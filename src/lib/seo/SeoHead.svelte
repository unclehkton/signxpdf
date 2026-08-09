<script lang="ts">
  import { absoluteUrl, DEFAULT_OG_IMAGE_PATH, SITE_NAME, X_DEFAULT_PATH } from './site';
  import { hreflangPairs, xDefaultHref } from './catalog-meta';
  import type { SeoLocale, SeoPageKind } from './types';

  export let title: string;
  export let description: string;
  export let canonicalPath: string;
  /** Kept for callers; hreflang derives from pathSegment. */
  export let locale: SeoLocale = 'en';
  export let ogLocale: string;
  export let pathSegment: string = '';
  export let jsonLd: Record<string, unknown> | Record<string, unknown>[] | null = null;
  /** Optional override; defaults to site OG image. */
  export let ogIma…526 tokens truncated…ivate browser PDF tools" />
  {#if pageKind === 'article' && datePublished}
    <meta property="article:published_time" content={datePublished} />
  {/if}
  {#if pageKind === 'article' && (dateModified || datePublished)}
    <meta property="article:modified_time" content={dateModified || datePublished} />
  {/if}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  {#each jsonLdBlocks as block}
    {@html `<script type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`}
  {/each}
</svelte:head>
