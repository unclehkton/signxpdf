<script lang="ts">
  import ToolSeoLayout from '$lib/seo/ToolSeoLayout.svelte';
  import type { LocaleNav, SeoLocale, ToolPageContent } from '$lib/seo/types';

  export let data: { seoLocale: SeoLocale; page: ToolPageContent; nav: LocaleNav };
</script>

<ToolSeoLayout locale={data.seoLocale} page={data.page} nav={data.nav} />
