import type { PdfDoc } from '../types';
import { getPdfLib } from './runtime';

const imageExtensions = /\.(png|jpe?g|tiff?|gif|webp|heic|heif)$/i;

export const DOCUMENT_ACCEPT =
  '.pdf,.png,.jpg,.jpeg,.tif,.tiff,.gif,.webp,.heic,.heif,application/pdf,image/png,image/jpeg,image/tiff,image/gif,image/webp,image/heic,image/heif';

export function isSupportedDocument(file: File) {
  return isPdf(file) || isImage(file);
}

function isPdf(file: File) {
  return file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
}

function isImage(file: File) {
  return file.type.startsWith('image/') || imageExtensions.test(file.name);
}

async function toUint8Array(file: Blob) {
  return new Uint8Array(await file.arrayBuffer());
}

async function rasterizeImage(file: File) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('image-rasterize-failed');

  try {
    const bitmap = await createImageBitmap(file);
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();
  } catch {
    const src = URL.createObjectURL(file);
    try {
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('image-rasterize-failed'));
        img.src = src;
      });
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      ctx.drawImage(image, 0, 0);
    } finally {
      URL.revokeObjectURL(src);
    }
  }

  const pngBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('image-rasterize-failed'))), 'image/png');
  });

  return {
    pngBytes: await toUint8Array(pngBlob),
    width: canvas.width,
    height: canvas.height,
  };
}

export async function loadDocument(file: File): Promise<PdfDoc> {
  const { PDFDocument } = await getPdfLib();

  if (isPdf(file)) {
    const bytes = await toUint8Array(file);
    const doc = await PDFDocument.load(bytes);
    return { file, pageCount: doc.getPageCount(), bytes };
  }

  if (!isImage(file)) {
    throw new Error('unsupported-document');
  }

  const raster = await rasterizeImage(file);
  const pdf = await PDFDocument.create();
  const image = await pdf.embedPng(raster.pngBytes);
  const page = pdf.addPage([raster.width, raster.height]);
  page.drawImage(image, { x: 0, y: 0, width: raster.width, height: raster.height });
  const bytes = new Uint8Array(await pdf.save());
  const pdfName = (file.name.replace(/\.[^.]+$/, '') || file.name || 'document') + '.pdf';

  return {
    file: new File([bytes], pdfName, { type: 'application/pdf' }),
    pageCount: 1,
    bytes,
  };
}
