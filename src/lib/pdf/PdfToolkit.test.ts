import { describe, it, expect } from 'vitest';
import { insertBlank, deletePage, reorderPages, mergeFrom } from './PdfToolkit';
import type { PageRef } from '../types';

function ref(sourceKey = 'src-a', pageIndex = 0): PageRef {
  return { id: crypto.randomUUID(), sourceKey, pageIndex };
}

describe('insertBlank', () => {
  it('inserts a blank ref after the given index', () => {
    const pages = [ref('a', 0), ref('a', 1), ref('a', 2)];
    const result = insertBlank(pages, 1);
    expect(result.length).toBe(4);
    expect(result[2]!.sourceKey).toBe('blank');
  });

  it('inserts at the end when afterIndex is the last index', () => {
    const pages = [ref()];
    const result = insertBlank(pages, 0);
    expect(result[1]!.sourceKey).toBe('blank');
  });

  it('does not mutate the input array', () => {
    const pages = [ref()];
    insertBlank(pages, 0);
    expect(pages.length).toBe(1);
  });
});

describe('deletePage', () => {
  it('removes the page at the given index', () => {
    const a = ref('a'); const b = ref('b'); const c = ref('c');
    const result = deletePage([a, b, c], 1);
    expect(result.length).toBe(2);
    expect(result.some(p => p.id === b.id)).toBe(false);
  });

  it('does not mutate the input array', () => {
    const pages = [ref(), ref()];
    deletePage(pages, 0);
    expect(pages.length).toBe(2);
  });
});

describe('reorderPages', () => {
  it('moves a page from index 2 to index 0', () => {
    const pages = [ref('a'), ref('b'), ref('c')];
    const result = reorderPages(pages, 2, 0);
    expect(result[0]!.sourceKey).toBe('c');
    expect(result[1]!.sourceKey).toBe('a');
    expect(result[2]!.sourceKey).toBe('b');
  });

  it('returns the same array reference when fromIndex === toIndex', () => {
    const pages = [ref('a'), ref('b')];
    expect(reorderPages(pages, 1, 1)).toBe(pages);
  });

  it('does not mutate the input array', () => {
    const pages = [ref('a'), ref('b'), ref('c')];
    reorderPages(pages, 0, 2);
    expect(pages[0]!.sourceKey).toBe('a');
  });
});

describe('mergeFrom', () => {
  it('appends the correct number of refs with the given sourceKey', () => {
    const pages = [ref()];
    const result = mergeFrom(pages, 'src-new', 3);
    expect(result.length).toBe(4);
    expect(result[1]!.sourceKey).toBe('src-new');
    expect(result[2]!.sourceKey).toBe('src-new');
    expect(result[3]!.sourceKey).toBe('src-new');
  });

  it('assigns sequential pageIndex values starting from 0', () => {
    const result = mergeFrom([], 'src-x', 3);
    expect(result.map(r => r.pageIndex)).toEqual([0, 1, 2]);
  });

  it('does not mutate the input array', () => {
    const pages = [ref()];
    mergeFrom(pages, 'x', 2);
    expect(pages.length).toBe(1);
  });
});

import { PDFDocument } from 'pdf-lib';
import { assembleDocument, compressToTarget } from './PdfToolkit';

async function blankPdfBytes(pageCount: number, width = 612, height = 792): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  for (let i = 0; i < pageCount; i++) pdf.addPage([width, height]);
  return pdf.save();
}

describe('assembleDocument', () => {
  it('produces a PDF with the expected page count from a single source', async () => {
    const bytes = await blankPdfBytes(3);
    const sources = new Map([['src', bytes]]);
    const pages: PageRef[] = [
      { id: '1', sourceKey: 'src', pageIndex: 0 },
      { id: '2', sourceKey: 'src', pageIndex: 2 },
    ];
    const out = await assembleDocument(pages, sources);
    const reloaded = await PDFDocument.load(out);
    expect(reloaded.getPageCount()).toBe(2);
  });

  it('includes blank pages at the correct position', async () => {
    const bytes = await blankPdfBytes(2);
    const sources = new Map([['src', bytes]]);
    const pages: PageRef[] = [
      { id: '1', sourceKey: 'src', pageIndex: 0 },
      { id: '2', sourceKey: 'blank', pageIndex: 0 },
      { id: '3', sourceKey: 'src', pageIndex: 1 },
    ];
    const out = await assembleDocument(pages, sources);
    const reloaded = await PDFDocument.load(out);
    expect(reloaded.getPageCount()).toBe(3);
  });

  it('assembles pages from multiple sources in order', async () => {
    const bytesA = await blankPdfBytes(2);
    const bytesB = await blankPdfBytes(2);
    const sources = new Map([['a', bytesA], ['b', bytesB]]);
    const pages: PageRef[] = [
      { id: '1', sourceKey: 'a', pageIndex: 0 },
      { id: '2', sourceKey: 'b', pageIndex: 0 },
      { id: '3', sourceKey: 'a', pageIndex: 1 },
    ];
    const out = await assembleDocument(pages, sources);
    const reloaded = await PDFDocument.load(out);
    expect(reloaded.getPageCount()).toBe(3);
  });

  it('blank page uses primary source page size', async () => {
    const bytes = await blankPdfBytes(1, 500, 700);
    const sources = new Map([['src', bytes]]);
    const pages: PageRef[] = [
      { id: '1', sourceKey: 'src', pageIndex: 0 },
      { id: '2', sourceKey: 'blank', pageIndex: 0 },
    ];
    const out = await assembleDocument(pages, sources);
    const reloaded = await PDFDocument.load(out);
    const blankPage = reloaded.getPage(1);
    const { width, height } = blankPage.getSize();
    expect(Math.round(width)).toBe(500);
    expect(Math.round(height)).toBe(700);
  });
});

describe('compressToTarget', () => {
  it('returns lossless result when assembled bytes are already under the target', async () => {
    const bytes = await blankPdfBytes(1);
    const sources = new Map([['src', bytes]]);
    const pages: PageRef[] = [{ id: '1', sourceKey: 'src', pageIndex: 0 }];
    const progress: number[] = [];

    // A 1-page blank PDF is well under 5000 KB
    const result = await compressToTarget(pages, sources, 5000, p => progress.push(p));

    expect(result.lossless).toBe(true);
    expect(result.reachedTarget).toBe(true);
    expect(result.achievedKB).toBeLessThan(5000);
    expect(result.originalKB).toBeGreaterThan(0);
    expect(result.originalKB).toBe(result.achievedKB);
    expect(progress[progress.length - 1]).toBe(1);
  });
});
