<script lang="ts">
  import { onDestroy } from 'svelte';
  import { getPdfJs } from './runtime';
  import type { PdfDoc } from '../types';

  export let pdf: PdfDoc;
  export let activePage = 0;
  export let onSelect: (i: number) => void;

  let thumbs: string[] = [];
  let pdfDoc: import('pdfjs-dist').PDFDocumentProxy | null = null;
  let pdfjsLib: typeof import('pdfjs-dist') | null = null;
  let loadSeq = 0;

  $: if (pdf?.bytes) void loadThumbs(pdf);

  onDestroy(() => {
    loadSeq += 1;
    void pdfDoc?.destroy();
  });

  async function loadThumbs(nextPdf: PdfDoc) {
    const seq = ++loadSeq;
    thumbs = [];
    const lib = await getPdfJs();
    pdfjsLib = lib;
    const doc = await lib.getDocument({ data: nextPdf.bytes.slice() }).promise;
    if (seq !== loadSeq) {
      await doc.destroy();
      return;
    }
    await pdfDoc?.destroy();
    pdfDoc = doc;
    const out: string[] = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const vp = page.getViewport({ scale: 0.2 });
      const c = document.createElement('canvas');
      c.width = vp.width; c.height = vp.height;
      await page.render({ canvasContext: c.getContext('2d')!, viewport: vp }).promise;
      out.push(c.toDataURL('image/png'));
    }
    if (seq !== loadSeq) {
      await doc.destroy();
      return;
    }
    thumbs = out;
  }
</script>

<div class="thumbs">
  {#each thumbs as src, i}
    <button type="button" class="thumb" class:active={i === activePage} aria-label={`Go to page ${i + 1}`} on:click={() => onSelect(i)}>
      <img {src} alt={`Page ${i + 1}`} />
      <span>{i + 1}</span>
    </button>
  {/each}
</div>

<style>
  .thumbs {
    display: flex;
    flex-direction: column;
    gap: .65rem;
    padding: .25rem .5rem .25rem .25rem;
    overflow-y: auto;
    max-height: 70vh;
  }
  .thumb {
    width: 124px;
    flex: 0 0 124px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 4px;
    cursor: pointer;
    transition: border-color .15s ease, transform .15s ease, box-shadow .15s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .2rem;
  }
  .thumb:hover { border-color: var(--border-strong); transform: translateY(-1px); }
  .thumb.active {
    border-color: var(--green-700);
    box-shadow: 0 0 0 3px rgba(26, 93, 66, 0.1);
  }
  .thumb img {
    width: 100%;
    display: block;
    border-radius: 4px;
  }
  .thumb span {
    font-size: .72rem;
    color: var(--muted);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.04em;
  }
  .thumb.active span { color: var(--green-800); font-weight: 500; }
  @media (max-width: 768px) {
    .thumbs { gap: .4rem; padding: 0 0 .25rem; max-height: none; }
    .thumb { width: 84px; flex: 0 0 84px; }
  }
</style>
