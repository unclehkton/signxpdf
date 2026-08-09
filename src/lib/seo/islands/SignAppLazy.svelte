<script lang="ts">
  /**
   * Client-only signing workspace. Loaded on demand from SEO sign pages so
   * homepage/tool shells do not eagerly ship the full editor graph.
   */
  import SignPage from '../../../routes/sign-app/+page.svelte';

  export let focus: string = 'general';
  void focus;
</script>

<div class="sign-embed">
  <SignPage embedded={true} />
</div>

<style>
  .sign-embed :global(.page-shell) {
    padding-top: 0.25rem;
  }
</style>
