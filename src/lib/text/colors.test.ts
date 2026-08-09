import { describe, expect, it } from "vitest";
import {
  TEXT_COLOR_PRESETS,
  getColorSwatchLabel,
  isValidHexColor,
  normalizeHexColor,
} from "./colors";

describe("text color helpers", () => {
  it("exposes the approved 20 preset colors in uppercase order", () => {
    expect(TEXT_COLOR_PRESETS).toEqual([
      "#000000",
      "#374151",
      "#9CA3AF",
      "#FFFFFF",
      "#DC2626",
      "#EA580C",
      "#F97316",
      "#F59E0B",
      "#EAB308",
      "#65A30D",
      "#16A34A",
      "#059669",
      "#0D9488",
      "#0891B2",
      "#2563EB",
      "#4F46E5",
      "#7C3AED",
      "#9333EA",
      "#C026D3",
      "#DB2777",
    ]);
  });

  it("normalizes lowercase and missing-hash input to uppercase hex", () => {
    expect(normalizeHexColor("db2777")).toBe("#DB2777");
    expect(normalizeHexColor("#16a34a")).toBe("#16A34A");
  });

  it("accepts only six-digit hex values", () => {
    expect(isValidHexColor("#FFFFFF")).toBe(true);
    expect(isValidHexColor("#FFF")).toBe(false);
    expect(isValidHexColor("#ZZZZZZ")).toBe(false);
  });

  it("preserves normalized partial input for manual typing without marking it valid", () => {
    expect(normalizeHexColor("#db2")).toBe("#DB2");
    expect(isValidHexColor("#DB2")).toBe(false);
  });

  it("returns an accessible fallback label for custom colors", () => {
    expect(getColorSwatchLabel("#DB2777")).toContain("DB2777");
  });
});
