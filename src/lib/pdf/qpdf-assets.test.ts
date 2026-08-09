import { describe, expect, it } from "vitest";
import { QPDF_ASSET_URLS } from "./qpdf-assets";

describe("QPDF_ASSET_URLS", () => {
  it("exposes immutable QPDF worker assets beneath the static QPDF directory", () => {
    expect(Object.isFrozen(QPDF_ASSET_URLS)).toBe(true);
    expect(QPDF_ASSET_URLS).toEqual({
      glue: "/qpdf/qpdf.js",
      wasm: "/qpdf/qpdf.wasm",
    });

    for (const assetUrl of Object.values(QPDF_ASSET_URLS)) {
      expect(new URL(assetUrl, "https://example.test/tools").pathname).toMatch(
        /^\/qpdf\/[^/]+$/,
      );
    }
  });
});
