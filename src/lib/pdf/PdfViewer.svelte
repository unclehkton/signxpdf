<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import { getPdfJs } from './runtime';
  import type { PdfDoc } from '../types';

  export let pdf: PdfDoc;
  export let activePage = 0;
  export let zoom = 1;

  const dispatch = createEventDispatcher<{ click: { pageIndex: number; x: number; y: number } }>();

  let canvas: HTMLCanvasElement;
  let container: HTMLDivElement;
  let pageScale = 1;
  let renderedPage = -1;
  let renderedWidth = -1;
  let renderedZoom = -1;
  let containerWidth = 0;
  let pdfDoc: import('pdfjs-dist').PDFDocumentProxy | null = null;
  let pdfjsLib: typeof import('pdfjs-dist') | null = null;
  let renderTask: { cancel(): void; promise: Promise<void> } | null = null;
  let loadSeq = 0;

  $: if (pdf?.bytes) void load(pdf.bytes);
  $: if (pdfDoc && (activePage !== renderedPage || Math.abs(renderedZoom - zoom) > 0.001 || (containerWidth > 0 && containerWidth !== renderedWidth))) renderPage(activePage);

  onMount(() => {
    const updateWidth = () => {
      const nextWidth = Math.floor(container?.clientWidth ?? 0);
      if (nextWidth > 0 && nextWidth !== containerWidth) {
        containerWidth = nextWidth;
        renderedWidth = -1;
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    if (container) observer.observe(container);

    return () => observer.disconnect();
  });

  onDestroy(() => {
    renderTask?.cancel();
    void pdfDoc?.destroy();
  });

  async function load(bytes: Uint8Array) {
    const seq = ++loadSeq;
    const lib = await getPdfJs();
    pdfjsLib = lib;
    const nextDoc = await lib.getDocument({ data: bytes.slice() }).promise;
    if (seq !== loadSeq) {
      await nextDoc.destroy();
      return;
    }
    await pdfDoc?.destroy();
    pdfDoc = nextDoc;
    renderedPage = -1;
    renderedZoom = -1;
  }

  async function renderPage(idx: number) {
    if (!pdfDoc) return;
    renderTask?.cancel();
    const page = await pdfDoc.getPage(idx + 1);
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const baseViewport = page.getViewport({ scale: 1 });
    const effectiveWidth = containerWidth > 0 ? containerWidth : Math.floor(container?.clientWidth ?? 0);
    const fitScale = effectiveWidth > 0 ? effectiveWidth / baseViewport.width : 1;
    const nextScale = fitScale * zoom;
    const viewport = page.getViewport({ scale: nextScale * dpr });
    pageScale = nextScale;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.width = `${baseViewport.width * nextScale}px`;
    canvas.style.height = `${baseViewport.height * nextScale}px`;
    const ctx = canvas.getContext('2d')!;
    const task = page.render({ canvasContext: ctx, viewport });
    renderTask = task;
    try {
      await task.promise;
    } catch (e) {
      if ((e as Error).name === 'RenderingCancelledException') return;
      throw e;
    } finally {
      if (renderTask === task) renderTask = null;
    }
    renderedPage = idx;
    renderedWidth = effectiveWidth;
    renderedZoom = zoom;
  }
  function handleClick(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / pageScale;
    const y = (e.clientY - rect.top) / pageScale;
    dispatch('click', { pageIndex: activePage, x, y });
  }
</script>

<div class="pdf-stage-wrap" bind:this={container}>
  <div class="pdf-stage">
    <canvas bind:this={canvas} on:click={handleClick}></canvas>
    <slot {activePage} {pageScale} />
  </div>
</div>

<style>
  .pdf-stage-wrap { width: 100%; max-width: 100%; overflow: auto; }
  .pdf-stage { position: relative; display: inline-block; box-shadow: 0 1px 6px rgba(0,0,0,.15); }
  canvas { display: block; }
  .pdf-stage-wrap { -webkit-overflow-scrolling: touch; }
</style>
