<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import SignaturePad from 'signature_pad';
  import { t } from '../i18n';

  const dispatch = createEventDispatcher<{ canvas: HTMLCanvasElement }>();
  let canvas: HTMLCanvasElement;
  let pad: SignaturePad;

  onMount(() => {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d')!.scale(ratio, ratio);
    pad = new SignaturePad(canvas, { backgroundColor: '#fff', penColor: '#000' });
  });

  function clear() { pad.clear(); }
  function done() {
    if (pad.isEmpty()) return;
    dispatch('canvas', canvas);
  }
</script>

<div class="wrap">
  <canvas bind:this={canvas} class="pad"></canvas>
  <div class="actions">
    <button class="btn-secondary" on:click={clear}>{$t('draw.clear')}</button>
    <button class="btn-primary" on:click={done}>{$t('draw.useSignature')}</button>
  </div>
</div>

<style>
  .pad { width: 100%; height: 200px; border: 1px solid var(--border); background: #fff; touch-action: none; }
  .actions { display: flex; gap: .5rem; margin-top: .5rem; }
</style>
