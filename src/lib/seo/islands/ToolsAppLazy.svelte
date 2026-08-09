<script lang="ts">
  /**
   * Client-only tools workspace. Dynamically imported so informational HTML
   * does not pull pdf-lib / compression / QPDF into the initial shell chunk.
   */
  import ToolsPage from '../../../routes/tools/+page.svelte';

  export let focus: 'merge' | 'compress' | 'reorder' | 'delete' | 'general' = 'general';
</script>

<div class="tools-embed" data-focus={focus}>
  <ToolsPage embedded={true} {focus} />
</div>

<style>
  .tools-embed {
    /* Contain layout so SEO page chrome remains readable */
    border-radius: 8px;
    overflow: auto;
  }
  .tools-embed :global(.tools-page) {
    padding-top: 0.5rem;
  }
</style>
