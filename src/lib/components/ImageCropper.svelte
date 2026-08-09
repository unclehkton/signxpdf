<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import Cropper from 'cropperjs';
  import 'cropperjs/dist/cropper.css';
  import { t } from '../i18n';

  export let src: string;
  const dispatch = createEventDispatcher<{ done: HTMLCanvasElement }>();

  let imgEl: HTMLImageElement;
  let cropper: Cropper | null = null;

  onMount(() => {
    cropper = new Cropper(imgEl, {
      viewMode: 1, autoCropArea: 0.9, background: false, movable: true, zoomable: true,
    });
  });
  onDestroy(() => cropper?.destroy());

  function done() {
    if (!cropper) return;
    const canvas = cropper.getCroppedCanvas({ maxWidth: 2000, maxHeight: 2000 });
    dispatch('done', canvas);
  }
</script>

<div>
  <img bind:this={imgEl} {src} alt="signature source" style="max-width: 100%;" />
  <button class="btn-primary" on:click={done}>{$t('crop.use')}</button>
</div>
