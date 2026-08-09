import { describe, expect, it } from 'vitest';
import { extractSignature, otsuThreshold, toGrayscale } from './SignatureExtractor';

function makeImageData(pixels: number[][]): ImageData {
  const height = pixels.length;
  const width = pixels[0]!.length;
  const data = new Uint8ClampedArray(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = pixels[y]![x]!;
      const index = (y * width + x) * 4;
      data[index] = value;
      data[index + 1] = value;
      data[index + 2] = value;
      data[index + 3] = 255;
    }
  }

  return new ImageData(data, width, height);
}

describe('toGrayscale', () => {
  it('averages RGB to luminance', () => {
    const imageData = makeImageData([[255, 0, 128]]);
    const gray = toGrayscale(imageData);
    expect(gray.length).toBe(3);
    expect(gray[0]).toBe(255);
    expect(gray[1]).toBe(0);
    expect(gray[2]).toBe(128);
  });
});

describe('otsuThreshold', () => {
  it('finds a threshold between two distinct populations', () => {
    const gray = new Uint8Array([10, 12, 14, 200, 210, 220]);
    const threshold = otsuThreshold(gray);
    expect(threshold).toBeGreaterThan(14);
    expect(threshold).toBeLessThan(200);
  });
});

describe('extractSignature', () => {
  it('makes light pixels transparent and keeps dark pixels opaque', () => {
    const imageData = makeImageData([
      [255, 255, 255],
      [255, 0, 255],
      [255, 255, 255]
    ]);
    const output = extractSignature(imageData, { smoothEdges: false });
    expect(output.appliedThreshold).toBeGreaterThan(0);
    const center = (1 * 3 + 1) * 4;
    expect(output.imageData.data[center + 3]).toBeGreaterThan(200);
    expect(output.imageData.data[3]).toBe(0);
  });

  it('respects an explicit threshold', () => {
    const imageData = makeImageData([[100, 200]]);
    const output = extractSignature(imageData, { threshold: 150, smoothEdges: false });
    expect(output.appliedThreshold).toBe(150);
    expect(output.imageData.data[3]).toBeGreaterThan(0);
    expect(output.imageData.data[7]).toBe(0);
  });
});
