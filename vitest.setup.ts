import 'fake-indexeddb/auto';

if (typeof ImageData === 'undefined') {
  class TestImageData {
    data: Uint8ClampedArray;
    width: number;
    height: number;

    constructor(data: Uint8ClampedArray, width: number, height: number) {
      this.data = data;
      this.width = width;
      this.height = height;
    }
  }

  globalThis.ImageData = TestImageData as unknown as typeof ImageData;
}
