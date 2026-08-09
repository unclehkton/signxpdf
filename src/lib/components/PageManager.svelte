<script lang="ts">
  import type { PageRef } from '$lib/types';
  import { getPdfJs } from '$lib/pdf/runtime';
  import { t, translate } from '$lib/i18n';

  export let pages: PageRef[];
  export let sourceNames: Map<string, string>;
  export let sources: Map<string, Uint8Array> = new Map();
  export let onReorder: (from: number, to: number) => void;
  export let onDeleteSelected: (indices: number[]) => void;
  export let onInsertBlank: (afterIndex: number) => void;

  // ── Selection ──────────────────────────────────────────
  let selected = new Set<number>();

  function toggleSelect(i: number) {
    if (selected.has(i)) { selected.delete(i); } else { selected.add(i); }
    selected = selected;
  }

  function clearSelection() { selected = new Set(); }

  function handleDelete() {
    if (selected.size === 0) return;
    onDeleteSelected([...selected]);
    clearSelection();
  }

  function handleInsertBlank() {
    const last = selected.size > 0 ? Math.max(...selected) : pages.length - 1;
    onInsertBlank(last);
    clearSelection();
  }

  // ── Thumbnails ─────────────────────────────────────────
  const thumbCache = new Map<string, string>();
  const docCache = new Map<string, unknown>();

  let thumbnails: Record<string, string> = {};

  async function ensureDoc(sourceKey: string): Promise<void> {
    if (docCache.has(sourceKey) || sourceKey === 'blank') return;
    const bytes = sources.get(sourceKey);
    if (!bytes) return;
    const pdfjsLib = await getPdfJs();
    const doc = await pdfjsLib.getDocument({ data: bytes.slice() }).promise;
    docCache.set(sourceKey, doc);
  }

  async function renderThumb(ref: PageRef): Promise<void> {
    if (ref.sourceKey === 'blank') return;
    const cacheKey = `${ref.sourceKey}-${ref.pageIndex}`;
    if (thumbCache.has(cacheKey)) {
      thumbnails = { ...thumbnails, [cacheKey]: thumbCache.get(cacheKey)! };
      return;
    }
    try {
      const doc = docCache.get(ref.sourceKey) as { getPage: (n: number) => Promise<unknown> } | undefined;
      if (!doc) return;
      const page = await doc.getPage(ref.pageIndex + 1) as {
        getViewport: (opts: { scale: number }) => { width: number; height: number };
        render: (opts: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => { promise: Promise<void> };
      };
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise;
      const dataUrl = canvas.toDataURL('image/png');
      thumbCache.set(cacheKey, dataUrl);
      thumbnails = { ...thumbnails, [cacheKey]: dataUrl };
    } catch (_e) { /* thumbnail silently fails */ }
  }

  async function renderAll(refs: PageRef[]) {
    for (const ref of refs) {
      await ensureDoc(ref.sourceKey);
      await renderThumb(ref);
    }
  }

  $: renderAll(pages);

  // ── Drag-to-reorder ────────────────────────────────────
  let dragFrom: number | null = null;
  let dragOver: number | null = null;
  let statusMsg = '';
  let gridEl: HTMLDivElement;

  function isInteractiveTarget(target: EventTarget | null): boolean {
    return target instanceof Element && target.closest('button') !== null;
  }

  function onPointerDown(e…68 tokens truncated…ridEl.setPointerCapture(e.pointerId);
    dragFrom = index;
    dragOver = index;
    clearSelection();
    statusMsg = translate('pm.movingPage', { n: index + 1 });
  }

  function onGridMove(e: PointerEvent) {
    if (dragFrom === null) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const wrap = el?.closest('[data-page-index]') as HTMLElement | null;
    if (!wrap) return;
    const idx = parseInt(wrap.dataset.pageIndex ?? '-1', 10);
    if (idx >= 0 && idx !== dragOver) {
      dragOver = idx;
      statusMsg = dragOver < dragFrom
        ? translate('pm.dropBefore', { from: dragFrom + 1, to: dragOver + 1 })
        : translate('pm.dropAfter', { from: dragFrom + 1, to: dragOver + 1 });
    }
  }

  function onGridUp() {
    if (dragFrom === null) return;
    const from = dragFrom;
    const to = dragOver ?? from;
    dragFrom = null;
    dragOver = null;
    statusMsg = '';
    if (from !== to) onReorder(from, to);
  }

  function onGridCancel() {
    dragFrom = null;
    dragOver = null;
    statusMsg = '';
  }

  function thumbKey(ref: PageRef) {
    return `${ref.sourceKey}-${ref.pageIndex}`;
  }

  function sourceLabelClass(ref: PageRef): string {
    if (ref.sourceKey === 'blank') return 'tag-blank';
    const keys = [...sourceNames.keys()];
    return keys.indexOf(ref.sourceKey) === 0 ? 'tag-primary' : 'tag-merged';
  }

  function onThumbClick(event: MouseEvent, index: number) {
    if (isInteractiveTarget(event.target)) return;
    if (dragFrom === null) toggleSelect(index);
  }

  function onThumbKeyDown(event: KeyboardEvent, index: number) {
    if (isInteractiveTarget(event.target)) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (dragFrom === null) toggleSelect(index);
  }
</script>

<div class="pm-header">
  <span class="pm-title">{$t('pm.header')}</span>
  <div class="pm-actions">
    <button
      type="button"
      class="btn btn-danger btn-sm"
      disabled={selected.size === 0}
      on:click={handleDelete}
    >{$t('pm.delete')}</button>
    <button type="button" class="btn btn-ghost btn-sm" on:click={handleInsertBlank}>{$t('pm.insertBlank')}</button>
  </div>
</div>

{#if statusMsg}
  <div class="drag-banner" role="status" aria-live="polite">{statusMsg}</div>
{/if}

<div
  class="thumbs-grid"
  class:is-dragging={dragFrom !== null}
  bind:this={gridEl}
  on:pointermove={onGridMove}
  on:pointerup={onGridUp}
  on:pointercancel={onGridCancel}
  role="list"
>
  {#each pages as ref, i (ref.id)}
    {@const isDragging = dragFrom === i}
    {@const isDropTarget = dragFrom !== null && dragOver === i && dragFrom !== i}
    {@const isIdle = dragFrom !== null && !isDragging && !isDropTarget}
    {@const isSelected = selected.has(i)}

    <div
      class="thumb-wrap"
      class:dragging={isDragging}
      class:drop-target={isDropTarget}
      class:idle={isIdle}
      class:selected={isSelected && dragFrom === null}
      data-page-index={i}
      on:pointerdown={e => onPointerDown(e, i)}
      on:click={event => onThumbClick(event, i)}
      on:keydown={event => onThumbKeyDown(event, i)}
      role="button"
      tabindex="0"
      aria-label="Page {i + 1}"
    >
      <span class="thumb-tag {sourceLabelClass(ref)}">
        {ref.sourceKey === 'blank' ? $t('pm.blankTag') : (sourceNames.get(ref.sourceKey) ?? 'PDF')}
      </span>
      <div class="thumb-card">
        {#if ref.sourceKey === 'blank'}
          <div class="thumb-img blank">+</div>
        {:else if thumbnails[thumbKey(ref)]}
          <img
            class="thumb-img-actual"
            src={thumbnails[thumbKey(ref)]}
            alt="Page {i + 1} preview"
            draggable="false"
          />
        {:else}
          <div class="thumb-img loading">…</div>
        {/if}
        <button
          type="button"
          class="thumb-delete"
          aria-label="Delete page {i + 1}"
          on:pointerdown|stopPropagation
          on:click|stopPropagation={() => { onDeleteSelected([i]); }}
          tabindex="-1"
        >✕</button>
      </div>
      {#if ref.sourceKey !== 'blank' && thumbnails[thumbKey(ref)]}
        <div class="thumb-preview">
          <img
            src={thumbnails[thumbKey(ref)]}
            alt="Page {i + 1} enlarged preview"
            draggable="false"
          />
        </div>
      {/if}
      <span class="thumb-num">{i + 1}</span>
    </div>
  {/each}
</div>

{#if pages.length === 0}
  <p class="empty-hint">{$t('pm.emptyHint')}</p>
{/if}

<style>
  .pm-header {
    display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;
  }
  .pm-title {
    font-size: .72rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: .12em; color: var(--muted);
  }
  .pm-actions { display: flex; gap: 6px; }

  .drag-banner {
    display: flex; align-items: center; gap: 8px;
    background: var(--green-50); border: 1px solid var(--green-100);
    border-radius: var(--radius); padding: 7px 12px; margin-bottom: 10px;
    font-size: .82rem; color: var(--green-800);
  }

  .thumbs-grid {
    display: flex; flex-wrap: wrap; gap: 10px; align-items: flex-start;
  }
  .is-dragging { cursor: grabbing; }

  .thumb-wrap {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    cursor: grab; user-select: none; touch-action: none;
    position: relative;
  }

  .thumb-tag {
    font-size: .65rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: .06em; padding: 2px 7px; border-radius: 999px;
    white-space: nowrap; max-width: 70px; overflow: hidden; text-overflow: ellipsis;
  }
  .tag-primary { background: var(--green-100); color: var(--green-800); }
  .tag-merged  { background: #d4f0e4; color: #1a6b3a; }
  .tag-blank   { background: #fef3cd; color: #7a5500; }

  .thumb-card {
    background: var(--surface); border: 1.5px solid var(--border);
    border-radius: var(--radius-sm); padding: 4px;
    box-shadow: var(--shadow-sm); width: 66px;
    transition: border-color .15s, box-shadow .15s, transform .15s, opacity .15s;
    position: relative;
  }

  .thumb-delete {
    display: none;
    position: absolute; top: -6px; right: -6px;
    width: 20px; height: 20px; min-width: 20px;
    border-radius: 50%; border: 1.5px solid var(--border-strong);
    background: var(--surface); color: var(--danger);
    font-size: .6rem; font-weight: 700; line-height: 1;
    cursor: pointer; align-items: center; justify-content: center;
    padding: 0; transition: background .12s, color .12s;
    z-index: 5;
  }
  .thumb-delete:hover { background: var(--danger); color: #fff; border-color: var(--danger); }
  .thumbs-grid:not(.is-dragging) .thumb-wrap:hover .thumb-delete { display: flex; }
  .thumb-img {
    width: 56px; height: 72px; border-radius: 3px;
    background: #ece9df; display: flex; align-items: center;
    justify-content: center; font-size: .75rem; color: var(--soft);
  }
  .thumb-img.blank {
    background: var(--paper); border: 1px dashed var(--border-strong);
    font-size: 1.4rem; color: var(--border-strong);
  }
  .thumb-img.loading { color: var(--soft); font-size: .65rem; }
  .thumb-img-actual { width: 56px; height: 72px; object-fit: contain; border-radius: 3px; display: block; }
  .thumb-num {
    font-size: .72rem; color: var(--soft);
    font-variant-numeric: tabular-nums;
  }

  /* Hover preview */
  .thumb-preview {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 200;
    background: var(--surface);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius);
    padding: 6px;
    box-shadow: 0 12px 36px rgba(0, 0, 0, .28), 0 3px 10px rgba(0, 0, 0, .12);
    pointer-events: none;
  }
  .thumb-preview img {
    display: block;
    width: 700px;
    height: auto;
    border-radius: 4px;
  }
  .thumbs-grid:not(.is-dragging) .thumb-wrap:hover .thumb-preview {
    display: block;
  }

  /* Selection */
  .thumb-wrap.selected .thumb-card {
    border-color: var(--green-800);
    box-shadow: 0 0 0 3px rgba(19, 74, 53, .12), var(--shadow-sm);
  }

  /* Drag states */
  .thumb-wrap.dragging .thumb-card {
    transform: rotate(3deg) scale(1.07) translateY(-6px);
    box-shadow: 0 16px 40px rgba(12, 31, 23, .18), 0 4px 12px rgba(12, 31, 23, .10);
    border-color: var(--green-800);
    z-index: 10; position: relative;
  }
  .thumb-wrap.drop-target .thumb-card {
    border-color: var(--green-700);
    background: var(--green-50);
    box-shadow: 0 0 0 3px rgba(26, 93, 66, .15), var(--shadow-sm);
  }
  .thumb-wrap.idle .thumb-card { opacity: .65; }

  .empty-hint { font-size: .85rem; color: var(--soft); margin-top: .5rem; }

  /* Button styles */
  .btn {
    display: inline-flex; align-items: center; gap: 4px;
    font-family: var(--font-sans); font-weight: 500; font-size: .82rem;
    border-radius: 999px; padding: .4rem .85rem; border: 1px solid transparent;
    cursor: pointer; white-space: nowrap;
    transition: background .15s, color .15s, border-color .15s;
  }
  .btn:disabled { opacity: .4; cursor: not-allowed; }
  .btn-ghost { background: transparent; color: var(--ink); }
  .btn-ghost:hover:not(:disabled) { background: rgba(13, 58, 41, .06); }
  .btn-danger { background: transparent; color: var(--danger); }
  .btn-danger:hover:not(:disabled) { background: rgba(168, 50, 31, .06); }
  .btn-sm { padding: .3rem .7rem; font-size: .78rem; }
</style>
