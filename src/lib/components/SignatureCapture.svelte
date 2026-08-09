<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { get } from 'svelte/store';
  import UploadTab from './UploadTab.svelte';
  import CameraTab from './CameraTab.svelte';
  import DrawTab from './DrawTab.svelte';
  import ImageCropper from './ImageCropper.svelte';
  import ThresholdSlider from './ThresholdSlider.svelte';
  import { extractInWorker, extractToPng } from '../extractor/SignatureExtractor';
  import { signatureStore } from '../stores/signatureStore';
  import { t } from '../i18n';
  import type { Signature } from '../types';

  const dispatch = createEventDispatcher<{ saved: Signature; close: void }>();
  type Tab = 'upload' | 'camera' | 'draw';
  let tab: Tab = 'upload';

  let imageSrc: string | null = null;
  let croppedCanvas: HTMLCanvasElement | null = null;
  let previewUrl: string | null = null;
  let threshold: number | null = null;
  let busy = false;
  let error = '';
  let nameInput = '';
  let previewSeq = 0;

  function tr(key: string, params: Record<string, string | number> = {}) {
    return get(t)(key, params);
  }

  function reset() {
    imageSrc = null; croppedCanvas = null; previewUrl = null;
    threshold = null; nameInput = ''; error = '';
  }

  async function refreshPreview(currentThreshold: number | null) {
    if (!croppedCanvas) return;
    const seq = ++previewSeq;
    busy = true;
    try {
      const ctx = croppedCanvas.getContext('2d', { willReadFrequently: true })!;
      const id = ctx.getImageData(0, 0, croppedCanvas.width, croppedCanvas.height);
      const r = await extractInWorker(id, { threshold: currentThreshold ?? undefined, smoothEdges: true });
      if (seq !== previewSeq) return;
      const c = document.createElement('canvas');
      c.width = croppedCanvas.width; c.height = croppedCanvas.height;
      c.getContext('2d')!.putImageData(r.imageData, 0, 0);
      previewUrl = c.toDataURL('image/png');
    } finally { busy = false; }
  }

  $: if (croppedCanvas) void refreshPreview(threshold);

  async function handleDraw(e: CustomEvent<HTMLCanvasElement>) {
    croppedCanvas = e.detail;
  }

  async function save() {
    if (!croppedCanvas) return;
    error = '';
    try {
      const r = await extractToPng(croppedCanvas, { threshold: threshold ?? undefined, smoothEdges: true });
      const saved = await signatureStore.save(
        r.pngBlob,
        nameInput.trim() || `Signature ${Date.now()}`,
        { width: r.width, height: r.height }
      );
      dispatch('saved', saved);
      reset();
    } catch (e) {
      error = (e as Error).name === 'LimitReachedError' ? tr('capture.limitReached') : (e as Error).message;
    }
  }
</script>

<div class="capture">
  <nav class="tabs">
    <button class:active={tab === 'upload'} on:click={() => tab = 'upload'}>{$t('capture.upload')}</button>
    <button class:active={tab === 'camera'} on:click={() => tab = 'camera'}>{$t('capture.camera')}</button>
    <button class:active={tab === 'draw'} on:click={() => tab = 'draw'}>{$t('capture.draw')}</button>
  </nav>

  {#if !imageSrc && !croppedCanvas}
    {#if tab === 'upload'}<UploadTab on:image={(e) => imageSrc = e.detail} />{/if}
    {#if tab === 'camera'}<CameraTab on:image={(e) => imageSrc = e.detail} />{/if}
    {#if tab === 'draw'}<DrawTab on:canvas={handleDraw} />{/if}
  {:else if imageSrc && !croppedCanvas}
    <ImageCropper src={imageSrc} on:done={(e) => croppedCanvas = e.detail} />
  {:else}
    <div class="preview">
      {#if previewUrl}<img src={previewUrl} alt="extracted preview" />{/if}
      <ThresholdSlider value={threshold} onChange={(v) => threshold = v} />
      <label>{$t('capture.name')}: <input bind:value={nameInput} placeholder={$t('capture.namePlaceholder')} /></label>
      <div class="actions">
        <button class="btn-secondary" on:click={reset}>{$t('capture.startOver')}</button>
        <button class="btn-primary" on:click={save} disabled={busy}>{$t('capture.saveSignature')}</button>
      </div>
      {#if error}<p class="err">{error}</p>{/if}
    </div>
  {/if}
</div>

<style>
  .tabs { display: flex; gap: .25rem; margin-bottom: .5rem; }
  .tabs button { background: #eee; border: 0; padding: .4rem .8rem; border-radius: 6px; }
  .tabs .active { background: var(--accent); color: #fff; }
  .preview img { background: #fafafa; max-width: 100%; border: 1px solid var(--border); }
  .err { color: var(--danger); }
  .actions { display: flex; gap: .5rem; margin-top: .5rem; }
</style>
