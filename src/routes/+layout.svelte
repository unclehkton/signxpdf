<script lang="ts">
  import '../app.css';
  import TopBar from '$lib/components/TopBar.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
</script>

<!--
  Do not preload PDF.js / pdf-lib here. Heavy runtimes load on demand when a
  tool island hydrates and the user opens a document.
-->
<TopBar />
<slot />
<SiteFooter />
<Toast />
