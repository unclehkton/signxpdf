import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";
import Page from "./+page.svelte";
import {
  OPEN_SOURCE_NOTICES_DOWNLOAD_PATH,
  QPDF_WASM_FULL_NOTICES,
} from "$lib/legal/open-source-notices";

describe("open-source-licences page", () => {
  afterEach(() => {
    cleanup();
  });

  it("includes QPDF, pdf-lib, zlib, and libjpeg-turbo notices", () => {
    const { container } = render(Page);
    const text = container.textContent ?? "";
    expect(text).toMatch(/QPDF/);
    expect(text).toMatch(/Apache License 2\.0/i);
    expect(text).toMatch(/pdf-lib/);
    expect(text).toMatch(/Copyright \(c\) 2019 Andrew Dillon/);
    expect(text).toMatch(/zlib/i);
    expect(text).toMatch(/libjpeg-turbo/i);
    expect(text).toMatch(/856d32c/);
  });

  it("ships complete licence texts (not only licence names)", () => {
    const { container, getByTestId } = render(Page);
    const full = getByTestId("full-third-party-notices").textContent ?? "";
    const page = container.textContent ?? "";

    // Apache-2.0 recognisable beginning and ending sections
    expect(full).toMatch(/Apache License/);
    expect(full).toMatch(/Version 2\.0, January 2004/);
    expect(full).toMatch(/APPENDIX: How to apply the Apache License/);
    expect(full).toMatch(/END OF TERMS AND CONDITIONS/);

    // QPDF NOTICE attribution
    expect(full).toMatch(/Jay Berkenbilt/);

    // zlib and libjpeg sections
    expect(full).toMatch(/jloup@gzip\.org/);
    expect(full).toMatch(/IJG/);
    expect(full).toMatch(/Redistribution and use in source and binary forms/);

    // Emscripten
    expect(full).toMatch(/Copyright 2010 The Emscripten Authors/);

    // Download link to the static public copy
    expect(page).toMatch(/open-source-notices\.txt|complete third-party notices|完整第三方/i);
    expect(OPEN_SOURCE_NOTICES_DOWNLOAD_PATH).toBe("/open-source-notices.txt");
    expect(QPDF_WASM_FULL_NOTICES.length).toBeGreaterThan(10_000);

    // public/ copy exists for deployment (kit.files.assets = public)
    const publicCopy = readFileSync(
      resolve("public/open-source-notices.txt"),
      "utf8",
    );
    expect(publicCopy).toMatch(/Apache License/);
    expect(publicCopy).toMatch(/END OF TERMS AND CONDITIONS/);
    expect(publicCopy).toMatch(/IJG/);
  });
});
