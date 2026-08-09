<script lang="ts">
  import { browser } from '$app/environment';
  import { locale as localeStore } from '$lib/i18n';
  import { htmlLangForLocale, localeToStore } from '$lib/seo/site';
  import type { SeoLocale } from '$lib/seo/types';

  export let data: { seoLocale: SeoLocale };

  $: if (browser) {
    localeStore.set(localeToStore(data.seoLocale));
    document.documentElement.lang = htmlLangForLocale(data.seoLocale);
  }
</script>

<slot />
