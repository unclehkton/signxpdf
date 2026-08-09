import type { PageRef, TextPlacement } from '../types';
import { getPdfLib, getPdfJs } from './runtime';
import { drawTextPlacement } from './textOverlay';

export function insertBlank(pages: PageRef[], afterIndex: number): PageRef[] {
  const blank: PageRef = { id: crypto.randomUUID(), sourceKey: 'blank', pageIndex: 0 };
  const result = [...pages];
  result.splice(afterIndex + 1, 0, blank);
  return result;
}

export function deletePage(pages: PageRef[], index: number): PageRef[] {
  return pages.filter((_, i) => i !== index);
}

export function reorderPages(pages: PageRef[], fromIndex: number, toIndex: number): PageRef[] {
  if (fromIndex === toIndex) return pages;
  const result = [...pages];
  const [moved] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, moved!);
  return result;
}

export function mergeFrom(pages: PageRef[], sourceKey: string, pageCount: number): PageRef[] {
  const newRefs: PageRef[] = Array.from({ length: pageCount }, (_, i) => ({
    id: crypto.randomUUID(),
    sourceKey,
    pageIndex: i,
  }));
  return [...pages, ...newRefs];
}

export async function assembleDocument(
  pages: PageRef[],
  sources: Map<string, Uint8Array>,
  textPlacements: TextPlacement[] = [],
): Promise<Uint8Array> {
  const { PDFDocument, degrees } = await getPdfLib();
  const doc = await PDFDocument.create();
  const srcDocs = new Map<string, Awaited<ReturnType<typeof PDFDocument.load>>>();

  // Determine blank-page size from the first real source page
  let blankW = 595.28, blankH = 841.89; // A4 fallback in points
  for (const ref of pages) {
    if (ref.sourceKey !== 'blank') {
      const bytes = sources.get(ref.sourceKey);
      if (bytes) {
        const d = await PDFDocument.load(bytes);
        srcDocs.set(ref.sourceKey, d);
        const { width, height } = d.getPage(0).getSize();
        blankW = width;
        blankH = height;
      }
      break;
    }
  }

  for (const [outputPageIndex, ref] of pages.entries()) {
    let outputPage;
    if (ref.sourceKey === 'blank') {
      outputPage = doc.addPage([blankW, blankH]);
    } else {
      let srcDoc = srcDocs.get(ref.sourceKey);
      if (!srcDoc) {
        const bytes = sources.get(ref.sourceKey);
        if (!bytes) continue;
        srcDoc = await PDFDocument.load(bytes);
        srcDocs.set(ref.sourceKey, srcDoc);
      }
      const [copied] = await doc.copyPages(srcDoc, [ref.pageIndex]);
      outputPage = doc.addPage(copied!);
    }

    for (const placement of textPlacements.filter(
      (item) => item.pageIndex === outputPageIndex,
    )) {
      await drawTextPlacement(doc, outputPage, placement, degrees);
    }
  }

  return doc.save({ useObjectStreams: true });
}

export interface CompressResult {
  bytes: Uint8Array;
  originalKB: number;
  achievedKB: number;
  lossless: boolean;
  reachedTarget: boolean;
}

export async function compressToTarget(
  pages: PageRef[],
  sources: Map<string, Uint8Array>,
  targetKB: number,
  onProgress: (pct: number) => void,
  textPlacements: TextPlacement[] = [],
): Promise<CompressResult> {
  // Pass 1: lossless assembly
  const losslessBytes = await assembleDocument(pages, sources, textPlacements);
  const originalKB = losslessBytes.length / 1024;
  if (losslessBytes.length <= targetKB * 1024) {
    onProgress(1);
    return {
      bytes: losslessBytes,
      originalKB,
      achievedKB: originalKB,
      lossless: true,
      reachedTarget: true,
    };
  }

  // Pass 2: rasterize each page at 150 DPI using pdfjs
  const pdfjsLib = await getPdfJs();
  const pdfDoc = await pdfjsLib.getDocument({ data: losslessBytes.slice() }).promise;
  const numPages = pdfDoc.numPages;
  const canvases: OffscreenCanvas[] = [];

  for (let i = 0; i < numPages; i++) {
    const page = await pdfDoc.getPage(i + 1);
    const scale = 150 / 72;
    const viewport = page.getViewport({ scale });
    const canvas = new OffscreenCanvas(
      Math.round(viewport.width),
      Math.round(viewport.height)
    );
    await page.render({
      canvasContext: canvas.getContext('2d') as unknown as CanvasRenderingContext2D,
      viewport,
    }).promise;
    canvases.push(canvas);
    onProgress(0.6 * (i + 1) / numPages);
  }

  // Pass 3: binary-search JPEG quality (max 5 iterations)
  const { PDFDocument } = await getPdfLib();
  let lo = 0.1, hi = 0.92;
  let bestBytes = losslessBytes;
  let reachedTarget = false;

  for (let iter = 0; iter < 5; iter++) {
    const quality = (lo + hi) / 2;
    const testDoc = await PDFDocument.create();

    for (const canvas of canvases) {
      const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality });
      const jpegBytes = new Uint8Array(await blob.arrayBuffer());
      const img = await testDoc.embedJpg(jpegBytes);
      const pg = testDoc.addPage([canvas.width, canvas.height]);
      pg.drawImage(img, { x: 0, y: 0, width: canvas.width, height: canvas.height });
    }

    const testBytes = await testDoc.save();
    if (testBytes.length <= targetKB * 1024) {
      bestBytes = testBytes;
      reachedTarget = true;
      lo = quality;   // try higher quality
    } else {
      hi = quality;   // need lower quality
    }
    onProgress(0.6 + 0.4 * (iter + 1) / 5);
  }

  return {
    bytes: bestBytes,
    originalKB,
    achievedKB: bestBytes.length / 1024,
    lossless: false,
    reachedTarget,
  };
}
