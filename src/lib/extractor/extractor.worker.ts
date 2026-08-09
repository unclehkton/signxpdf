import { extractSignature } from './SignatureExtractor';
import type { ExtractorParams } from '../types';

type Req = { id: number; imageData: ImageData; params: ExtractorParams };

declare const self: {
  onmessage: ((e: MessageEvent<Req>) => void) | null;
  postMessage: (message: { id: number; imageData: ImageData; appliedThreshold: number }) => void;
};

self.onmessage = (e: MessageEvent<Req>) => {
  const { id, imageData, params } = e.data;
  const r = extractSignature(imageData, params);
  self.postMessage({ id, imageData: r.imageData, appliedThreshold: r.appliedThreshold });
};
