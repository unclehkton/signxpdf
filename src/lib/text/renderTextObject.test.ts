import { afterEach, describe, expect, it, vi } from "vitest";

import { renderTextObject } from "./renderTextObject";

describe("renderTextObject", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("returns a transparent bitmap payload with positive dimensions for custom HEX colors", async () => {
    const rendered = await renderTextObject({
      text: "Approved",
      fontId: "courier-prime",
      colorId: "#DB2777",
      borderEnabled: true,
      borderColorId: "#DB2777",
      borderWidth: 2,
      scale: 1,
      renderScale: 2,
    });

    expect(rendered.width).toBeGreaterThan(0);
    expect(rendered.height).toBeGreaterThan(0);
    expect(rendered.blob.type).toBe("image/png");
  });

  it("waits for asynchronous canvas toBlob output instead of falling back to a transparent placeholder", async () => {
    const realCreateElement = document.createElement.bind(document);
    const asyncBlob = new Blob(["async-png"], { type: "image/png" });
    const mockContext = {
      clearRect() {},
      scale() {},
      fillText() {},
      strokeRect() {},
      font: "",
      fillStyle: "",
      strokeStyle: "",
      lineWidth: 0,
      textBaseline: "top",
    };

    vi.spyOn(document, "createElement").mockImplementation(((tagName: string) => {
      if (tagName !== "canvas") return realCreateElement(tagName);
      return {
        width: 0,
        height: 0,
        getContext: () => mockContext,
        toBlob: (callback: BlobCallback) => {
          setTimeout(() => callback(asyncBlob), 5);
        },
      } as unknown as HTMLCanvasElement;
    }) as typeof document.createElement);

    vi.stubGlobal("navigator", {
      userAgent: "vitest-browser",
    });

    const rendered = await renderTextObject({
      text: "Approved",
      fontId: "courier-prime",
      colorId: "#DB2777",
      borderEnabled: false,
      borderColorId: "#DB2777",
      borderWidth: 1,
      scale: 1,
      renderScale: 1,
    });

    expect(await rendered.blob.text()).toBe("async-png");
  });
});
