import type { Signature } from '../types';

const DEFAULT_MAX_SIDE = 200;

export function fitSignatureDimensions(width: number, height: number, maxSide = DEFAULT_MAX_SIDE) {
  const longestSide = Math.max(width, height);
  if (longestSide <= 0) {
    throw new Error('invalid-signature-dimensions');
  }

  const scale = maxSide / longestSide;
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale))
  };
}

export async function resolveSignaturePlacementSize(signature: Signature, maxSide = DEFAULT_MAX_SIDE) {
  const width = signature.width;
  const height = signature.height;
  if (width && height) {
    return fitSignatureDimensions(width, height, maxSide);
  }

  const measured = await measureSignatureBlob(signature.blob);
  return fitSignatureDimensions(measured.width, measured.height, maxSide);
}

async function measureSignatureBlob(blob: Blob) {
  if (typeof createImageBitmap === 'function') {
    const bitmap = await createImageBitmap(blob);
    try {
      return { width: bitmap.width, height: bitmap.height };
    } finally {
      bitmap.close();
    }
  }

  const url = URL.createObjectURL(blob);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('signature-image-load-failed'));
      img.src = url;
    });

    return {
      width: image.naturalWidth,
      height: image.naturalHeight
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}
