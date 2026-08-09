import type { ExtractorParams, ExtractorResult } from '../types';

export function toGrayscale(img: ImageData): Uint8Array {
  const out = new Uint8Array(img.width * img.height);
  const d = img.data;
  for (let i = 0, j = 0; i < d.length; i += 4, j++) {
    out[j] = Math.round(0.299 * d[i]! + 0.587 * d[i + 1]! + 0.114 * d[i + 2]!);
  }
  return out;
}

export function otsuThreshold(gray: Uint8Array): number {
  const hist = new Array(256).fill(0);
  for (const v of gray) hist[v]++;
  const total = gray.length;
  let sum = 0;
  for (let i = 0; i < 256; i++) sum += i * hist[i]!;
  let sumB = 0, wB = 0, varMax = -1, threshold = 127;
  for (let t = 0; t < 256; t++) {
    wB += hist[t]!;
    if (wB === 0) continue;
    const wF = total - wB;
    if (wF === 0) break;
    sumB += t * hist[t]!;
    const mB = sumB / wB;
    const mF = (sum - sumB) / wF;
    const v = wB * wF * (mB - mF) * (mB - mF);
    if (v > varMax) { varMax = v; threshold = t; }
  }
  for (let next = threshold + 1; next < 256; next++) {
    if (hist[next]! > 0) return Math.round((threshold + next) / 2);
  }
  return threshold;
}

export interface ExtractInternal extends ExtractorResult { imageData: ImageData; }

export function extractSignature(input: ImageData, params: ExtractorParams): ExtractInternal {
  const gray = toGrayscale(input);
  const threshold = params.threshold ?? otsuThreshold(gray);
  const out = new Uint8ClampedArray(input.data.length);
  for (let i = 0, j = 0; i < input.data.length; i += 4, j++) {
    const g = gray[j]!;
    if (g >= threshold) {
      out[i] = 0; out[i + 1] = 0; out[i + 2] = 0; out[i + 3] = 0;
    } else {
      const alpha = Math.min(255, Math.round(((threshold - g) / Math.max(1, threshold)) * 255));
      out[i] = 0; out[i + 1] = 0; out[i + 2] = 0; out[i + 3] = alpha;
    }
  }
  let imageData = new ImageData(out, input.width, input.height);
  if (params.smoothEdges) imageData = featherEdges(imageData);
  return {
    imageData,
    width: input.width,
    height: input.height,
    appliedThreshold: threshold,
    pngBlob: undefined as unknown as Blob,
  };
}

function featherEdges(img: ImageData): ImageData {
  const { width: w, height: h, data } = img;
  const out = new Uint8ClampedArray(data);
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    const i = (y * w + x) * 4 + 3;
    const a = data[i]!;
    if (a > 0 && a < 255) {
      const n = (data[((y - 1) * w + x) * 4 + 3]! + data[((y + 1) * w + x) * 4 + 3]! +
                 data[(y * w + x - 1) * 4 + 3]! + data[(y * w + x + 1) * 4 + 3]!) / 4;
      out[i] = Math.round((a + n) / 2);
    }
  }
  return new ImageData(out, w, h);
}

/** Browser-only wrapper that returns a PNG Blob via OffscreenCanvas. */
export async function extractToPng(canvas: HTMLCanvasElement, params: ExtractorParams): Promise<ExtractorResult> {
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  const input = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const r = extractSignature(input, params);
  const off = new OffscreenCanvas(r.width, r.height);
  off.getContext('2d')!.putImageData(r.imageData, 0, 0);
  const blob = await off.convertToBlob({ type: 'image/png' });
  return { pngBlob: blob, width: r.width, height: r.height, appliedThreshold: r.appliedThreshold };
}

let _worker: Worker | null = null;
let _seq = 0;
const _pending = new Map<number, (v: { imageData: ImageData; appliedThreshold: number }) => void>();

function getWorker(): Worker | null {
  if (typeof Worker === 'undefined') return null;
  if (_worker) return _worker;
  _worker = new Worker(new URL('./extractor.worker.ts', import.meta.url), { type: 'module' });
  _worker.onmessage = (e) => {
    const cb = _pending.get(e.data.id);
    if (cb) { _pending.delete(e.data.id); cb(e.data); }
  };
  return _worker;
}

export async function extractInWorker(imageData: ImageData, params: ExtractorParams)
  : Promise<{ imageData: ImageData; appliedThreshold: number }> {
  const w = getWorker();
  if (!w) {
    const r = extractSignature(imageData, params);
    return { imageData: r.imageData, appliedThreshold: r.appliedThreshold };
  }
  const id = ++_seq;
  return new Promise((res) => {
    _pending.set(id, res);
    w.postMessage({ id, imageData, params });
  });
}
