<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { signatureStore } from '../stores/signatureStore';
  import { editorStore } from '../stores/editorStore';
  import { t } from '../i18n';
  import type { Signature } from '../types';

  let signatures: Signature[] = [];
  let activeId: string | null = null;
  signatureStore.subscribe((s) => signatures = s);
  editorStore.subscribe((s) => activeId = s.activeSignatureId);

  onMount(() => {
    void signatureStore.refresh();
  });

  const urls = new Map<string, string>();
  $: {
    const active = new Set(signatures.map((s) => s.id));
    signatures.forEach((s) => {
      if (!urls.has(s.id)) urls.set(s.id, URL.createObjectURL(s.blob));
    });
    for (const [id, url] of urls.entries()) {
      if (!active.has(id)) {
        URL.revokeObjectURL(url);
        urls.delete(id);
      }
    }
  }

  onDestroy(() => {
    for (const url of urls.values()) URL.revokeObjectURL(url);
    urls.clear();
  });
</script>

<ul class="list">
  {#each signatures as s (s.id)}
    <li class:active={s.id === activeId}>
      <button on:click={() => editorStore.setActiveSignature(s.id)}>
        <img src={urls.get(s.id)} alt={s.name} />
        <span>{s.name}</span>
      </button>
      <button class="del" on:click={() => signatureStore.remove(s.id)}>{$t('signature.delete')}</button>
    </li>
  {/each}
</ul>
{#if signatures.length === 0}
  <p class="empty">{$t('signature.empty')}</p>
{/if}

<style>
  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: .4rem;
  }
  li {
    display: flex;
    align-items: center;
    gap: .35rem;
    padding: .35rem .5rem .35rem .35rem;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--surface-2);
    transition: border-color .15s ease, background .15s ease, box-shadow .15s ease;
  }
  li:hover { border-color: var(--border-strong); }
  li.active {
    border-color: var(--green-700);
    background: var(--green-50);
    box-shadow: 0 0 0 3px rgba(26, 93, 66, 0.08);
  }
  li button {
    display: flex;
    align-items: center;
    gap: .65rem;
    background: none;
    border: 0;
    flex: 1;
    min-width: 0;
    padding: .15rem;
    text-align: left;
    color: var(--ink);
    font-size: .9rem;
    letter-spacing: -0.005em;
  }
  li img {
    width: 64px;
    height: 32px;
    object-fit: contain;
    background: var(--paper);
    border-radius: 6px;
    border: 1px solid var(--border);
  }
  li span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .del {
    color: var(--muted);
    font-size: .78rem;
    padding: .25rem .55rem !important;
    border-radius: 999px;
    transition: color .15s ease, background .15s ease;
  }
  .del:hover { color: var(--danger); background: rgba(168, 50, 31, 0.08); }
  .empty {
    color: var(--muted);
    font-size: .85rem;
    padding: .75rem 0;
    font-style: italic;
    font-family: var(--font-serif);
  }
</style>
