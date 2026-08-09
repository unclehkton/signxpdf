<script lang="ts">
  import GuideSeoLayout from '$lib/seo/GuideSeoLayout.svelte';
  import type { GuidePageContent, LocaleNav, SeoLocale } from '$lib/seo/types';

  export let data: { seoLocale: SeoLocale; page: GuidePageContent; nav: LocaleNav };
</script>

<GuideSeoLayout locale={data.seoLocale} page={data.page} nav={data.nav} />
