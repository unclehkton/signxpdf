<script lang="ts">
  import AuthoritySeoLayout from '$lib/seo/AuthoritySeoLayout.svelte';
  import type { AuthorityPageContent, LocaleNav, SeoLocale } from '$lib/seo/types';

  export let data: { seoLocale: SeoLocale; page: AuthorityPageContent; nav: LocaleNav };
</script>

<AuthoritySeoLayout locale={data.seoLocale} page={data.page} nav={data.nav} />
