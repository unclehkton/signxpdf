import { describe, expect, it } from "vitest";

import { layoutTextObject } from "./layoutTextObject";

describe("layoutTextObject", () => {
  it("computes natural bounds for multiline text", () => {
    const result = layoutTextObject({
      text: "Hello\nWorld",
      fontId: "source-serif",
      colorId: "#000000",
      borderEnabled: false,
      borderColorId: "#000000",
      borderWidth: 1,
      scale: 1,
    });

    expect(result.lines).toEqual(["Hello", "World"]);
    expect(result.boxWidthPx).toBeGreaterThan(0);
    expect(result.boxHeightPx).toBeGreaterThan(result.fontSizePx);
  });

  it("expands dimensions when the border is enabled", () => {
    const plain = layoutTextObject({
      text: "Stamp",
      fontId: "source-sans",
      colorId: "#2563EB",
      borderEnabled: false,
      borderColorId: "#DC2626",
      borderWidth: 1,
      scale: 1,
    });
    const bordered = layoutTextObject({
      text: "Stamp",
      fontId: "source-sans",
      colorId: "#2563EB",
      borderEnabled: true,
      borderColorId: "#DC2626",
      borderWidth: 3,
      scale: 1,
    });

    expect(bordered.boxWidthPx).toBeGreaterThan(plain.boxWidthPx);
    expect(bordered.boxHeightPx).toBeGreaterThan(plain.boxHeightPx);
  });
});
