<script lang="ts" context="module">
  import { writable } from 'svelte/store';
  type Msg = { id: number; text: string; level: 'info' | 'error' };
  export const toasts = writable<Msg[]>([]);
  let _seq = 0;
  export function toast(text: string, level: 'info' | 'error' = 'info') {
    const m: Msg = { id: ++_seq, text, level };
    toasts.update((arr) => [...arr, m]);
    setTimeout(() => toasts.update((arr) => arr.filter((x) => x.id !== m.id)), 4000);
  }
</script>

<script lang="ts">
  let items: { id: number; text: string; level: 'info' | 'error' }[] = [];
  toasts.subscribe((arr) => items = arr);
</script>

<div class="stack" aria-live="polite">
  {#each items as t (t.id)}
    <div class={`toast ${t.level}`}>{t.text}</div>
  {/each}
</div>

<style>
  .stack { position: fixed; bottom: 1rem; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; gap: .25rem; z-index: 100; }
  .toast { background: #222; color: #fff; padding: .5rem .75rem; border-radius: 6px; }
  .toast.error { background: var(--danger); }
</style>
