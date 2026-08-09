import { describe, expect, it } from "vitest";
import { resolveCenterRotatedPdfBox } from "./textOverlay";
import type { TextPlacement } from "../types";

const placement: TextPlacement = {
  id: "text-rotation",
  kind: "text",
  pageIndex: 0,
  x: 100,
  y: 200,
  width: 60,
  height: 20,
  rotation: 90,
  scale: 1,
  text: "Rotated text",
  fontId: "source-sans",
  colorId: "#111111",
  borderEnabled: false,
  borderColorId: "#111111",
  borderWidth: 1,
};

describe("resolveCenterRotatedPdfBox", () => {
  it("keeps the complete text box centered when the PDF rotates it", () => {
    expect(resolveCenterRotatedPdfBox(placement, 800)).toEqual({
      x: 140,
      y: 560,
    });
  });
});
