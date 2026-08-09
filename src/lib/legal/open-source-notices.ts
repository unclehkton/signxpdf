// Full vendored notices ship in the built app via this import (also copied to
// public/open-source-notices.txt for a plain-text download).
import QPDF_THIRD_PARTY_NOTICES from "./qpdf-third-party-notices.txt?raw";

export interface OpenSourceNotice {
  id: string;
  name: string;
  version: string;
  license: string;
  copyright: string;
  homepage?: string;
  body: string;
}

/** Complete third-party notice text for the QPDF WASM build (Apache-2.0, NOTICE, zlib, IJG/BSD, Emscripten). */
export const QPDF_WASM_FULL_NOTICES: string = QPDF_THIRD_PARTY_NOTICES;

export const OPEN_SOURCE_NOTICES_DOWNLOAD_PATH = "/open-source-notices.txt";

export const OPEN_SOURCE_NOTICES: OpenSourceNotice[] = [
  {
    id: "qpdf",
    name: "QPDF",
    version: "12.2.0 (commit 856d32c610334855d30e96d25eb5f9636fb62f08)",
    license: "Apache License 2.0",
    copyright: "Copyright (c) 2005-2024 Jay Berkenbilt",
    homepage: "https://github.com/qpdf/qpdf",
    // Full Apache-2.0 + upstream NOTICE are in QPDF_WASM_FULL_NOTICES (rendered below the list).
    body: QPDF_WASM_FULL_NOTICES.includes("Apache License")
      ? extractSection(QPDF_WASM_FULL_NOTICES, "1. QPDF", "2. zlib")
      : QPDF_WASM_FULL_NOTICES,
  },
  {
    id: "pdf-lib",
    name: "pdf-lib",
    version: "1.17.1",
    license: "MIT License",
    copyright: "Copyright (c) 2019 Andrew Dillon",
    homepage: "https://github.com/Hopding/pdf-lib",
    body: `Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
  },
  {
    id: "zlib",
    name: "zlib",
    version: "commit 51b7f2abdade71cd9bb0e7a373ef2610ec6f9daf",
    license: "zlib License",
    copyright: "Copyright (C) 1995-2024 Jean-loup Gailly and Mark Adler",
    homepage: "https://zlib.net/",
    body: extractSection(QPDF_WASM_FULL_NOTICES, "2. zlib", "3. libjpeg-turbo"),
  },
  {
    id: "libjpeg-turbo",
    name: "libjpeg-turbo",
    version: "commit 7723f50f3f66b9da74376e6d8badb6162464212c",
    license: "IJG License and Modified (3-clause) BSD License",
    copyright: "Copyright (C)2009-2024 D. R. Commander. All Rights Reserved.",
    homepage: "https://libjpeg-turbo.org/",
    body: extractSection(
      QPDF_WASM_FULL_NOTICES,
      "3. libjpeg-turbo",
      "4. Emscripten runtime",
    ),
  },
  {
    id: "emscripten",
    name: "Emscripten runtime (generated glue)",
    version: "SDK 3.1.73",
    license: "MIT License",
    copyright: "Copyright 2010 The Emscripten Authors",
    homepage: "https://emscripten.org/",
    body: extractSection(
      QPDF_WASM_FULL_NOTICES,
      "4. Emscripten runtime",
      null,
    ),
  },
];

function extractSection(
  full: string,
  startMarker: string,
  endMarker: string | null,
): string {
  const start = full.indexOf(startMarker);
  if (start < 0) return full;
  // Back up to the preceding banner line of equals if present.
  let from = full.lastIndexOf("\n====", start);
  if (from < 0) from = start;
  else from += 1;
  let to = full.length;
  if (endMarker) {
    const end = full.indexOf(endMarker, start + startMarker.length);
    if (end >= 0) {
      const banner = full.lastIndexOf("\n====", end);
      to = banner > start ? banner : end;
    }
  }
  return full.slice(from, to).trim();
}
