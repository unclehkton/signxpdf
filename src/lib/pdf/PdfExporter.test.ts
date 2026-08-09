import { describe, expect, it } from 'vitest';
import {
  PDFArray,
  PDFContentStream,
  PDFDocument,
  PDFName,
  PDFRawStream,
  decodePDFRawStream
} from 'pdf-lib';

import { exportSignedPdf } from './PdfExporter';
import type { Placement } from '../types';

async function blankPdfBytes(): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.addPage([612, 792]);
  return pdf.save();
}

const makePngBlob = async (): Promise<Blob> => {
  const bytes = Uint8Array.from(
    atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='),
    (c) => c.charCodeAt(0)
  );
  return new Blob([bytes], { type: 'image/png' });
};

function getPageContentStrings(pdf: PDFDocument, pageIndex: number): string[] {
  const page = pdf.getPage(pageIndex) as typeof pdf.getPage extends (...args: never[]) => infer T ? T : never;
  const contents = (page as any).node.lookup(PDFName.of('Contents'));
  if (!contents) return [];

  const streams = contents instanceof PDFArray ? contents.asArray() : [contents];
  return streams.flatMap((stream) => {
    const resolved = (pdf.context as any).lookup(stream);
    if (resolved instanceof PDFContentStream) {
      return [resolved.getContentsString()];
    }
    if (resolved instanceof PDFRawStream) {
      return [new TextDecoder().decode(decodePDFRawStream(resolved).decode())];
    }
    return [];
  });
}

describe('exportSignedPdf', () => {
  it('produces a PDF with the expected page count', async () => {
    const original = await blankPdfBytes();
    const sigBlob = await makePngBlob();
    const placements: Placement[] = [{
      id: '1',
      kind: 'signature',
      signatureId: 'sig',
      pageIndex: 0,
      x: 100,
      y: 100,
      width: 200,
      height: 80,
      rotation: 0
    }];

    const out = await exportSignedPdf({
      originalBytes: original,
      placements,
      signatures: new Map([['sig', sigBlob]])
    });

    const reloaded = await PDFDocument.load(out);
    expect(reloaded.getPageCount()).toBe(1);
  });

  it('draws an opaque white background behind each placed signature', async () => {
    const original = await blankPdfBytes();
    const sigBlob = await makePngBlob();

    const out = await exportSignedPdf({
      originalBytes: original,
      placements: [{
        id: '1',
        kind: 'signature',
        signatureId: 'sig',
        pageIndex: 0,
        x: 100,
        y: 100,
        width: 200,
        height: 80,
        rotation: 0
      }],
      signatures: new Map([['sig', sigBlob]])
    });

    const reloaded = await PDFDocument.load(out);
    const content = getPageContentStrings(reloaded, 0).join('\n');

    expect(content).toContain('1 1 1 rg');
    expect(content).toContain('200 80');
    expect(content.indexOf('1 1 1 rg')).toBeLessThan(content.indexOf('Do'));
  });
});
