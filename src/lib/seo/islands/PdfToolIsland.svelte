<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import type { ComponentType } from 'svelte';

  export let kind: 'sign' | 'tools' = 'tools';
  export let focus: 'merge' | 'compress' | 'reorder' | 'delete' | 'general' = 'general';
  /** Noscript / enable-JS label for current locale (passed from server-loaded nav). */
  export let enableJsLabel: string =
    'Enable JavaScript to edit PDFs in your browser after page assets load.';

  let Comp: ComponentType | null = null;
  let error = '';
  let loading = true;

  onMount(() => {
    let cancelled = false;
    (async () => {
      try {
        if (kind === 'sign') {
          const mod = await import('./SignAppLazy.svelte');
          if (!cancelled) Comp = mod.default;
        } else {
          const mod = await import('./ToolsAppLazy.svelte');
          if (!cancelled) Comp = mod.default;
        }
      } catch (e) {
        if (!cancelled) error = e instanceof Error ? e.message : String(e);
      } finally {
        if (!cancelled) loading = false;
      }
    })();
    return () => {
      cancelled = true;
    };
  });
</script>

<div class="island" data-tool-kind={kind} data-tools-focus={focus}>
  {#if !browser}
    <p class="noscript">{enableJsLabel}</p>
  {:else if error}
    <p class="error" role="alert">Could not load the local PDF tool: {error}</p>
  {:else if loading || !Comp}
    <p class="loading" aria-live="polite">Loading local PDF tool…</p>
  {:else}
    <svelte:component this={Comp} {focus} />
  {/if}
</div>

<style>
  .island {
    min-height: 8rem;
  }
  .noscript,
  .loading,
  .error {
    margin: 0;
    padding: 0.75rem 0;
    line-height: 1.5;
  }
  .error {
    color: #9b1c1c;
  }
</style>
