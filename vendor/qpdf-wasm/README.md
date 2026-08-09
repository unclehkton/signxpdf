# QPDF WebAssembly build (native Emscripten)

Reproducible, auditable recipe that builds **QPDF 12.2.0** for a **browser Web Worker** using the local **Emscripten 3.1.73** SDK. Production does **not** depend on the `qpdf-wasm` npm package.

## Pinned revisions

| Component | Revision | Notes |
| --- | --- | --- |
| QPDF | `856d32c610334855d30e96d25eb5f9636fb62f08` | QPDF **12.2.0** |
| zlib | `51b7f2abdade71cd9bb0e7a373ef2610ec6f9daf` | static |
| libjpeg-turbo | `7723f50f3f66b9da74376e6d8badb6162464212c` | static `jpeg-static` only |
| Emscripten SDK | `3.1.73` | native Windows install, outside the repo |

## Outputs

After a successful build + Chromium worker gate:

| File | Role |
| --- | --- |
| `public/qpdf/qpdf.js` | Emscripten modular ES module (`createQpdfModule`) |
| `public/qpdf/qpdf.wasm` | Worker-only WASM binary |

(SvelteKit `kit.files.assets` is `public/` in this repo, so artefacts must live under `public/qpdf/`.)

App URL wiring (immutable): `/qpdf/qpdf.js`, `/qpdf/qpdf.wasm` via `src/lib/pdf/qpdf-assets.ts`.

### Current artefact fingerprints (post smoke gate)

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `qpdf.js` | 75939 | `fa3d33ea2590ea08800e8bf0f91937c04244af7ff186613a1520a728cb8ed8a4` |
| `qpdf.wasm` | 2277064 | `7ea417cb0bbda9069a8d20f60e2c8ee526c1cb126b765488a40ccd19936ceec4` |

Re-run `npm run build:qpdf-wasm` (or `npm run test:qpdf-wasm`) and update this table if the artefacts change.

## Prerequisites (Windows, no Docker)

1. Native Emscripten **3.1.73** (this machine uses `<path-to-emscripten-sdk>`).
2. Before building in PowerShell:

```powershell
$env:EM_CONFIG = '<path-to-emscripten-sdk>\.emscripten'
```

3. `cmake`, `ninja`, `git`, and Node.js on `PATH`.
4. A Chromium-based browser for the worker gate (`chrome` / `msedge`, or `QPDF_CHROMIUM`).

## Commands

```powershell
$env:EM_CONFIG = '<path-to-emscripten-sdk>\.emscripten'
npm run build:qpdf-wasm           # clean rebuild + Chromium gate + publish to public/qpdf
npm run build:qpdf-wasm -- --resume   # resume after an interrupted dependency stage
npm run test:qpdf-wasm            # hash + Chromium gate against committed public/qpdf
npm run build:qpdf-wasm -- --help
```

## Build behaviour

- Clones only the pinned revisions above into `node_modules/.cache/qpdf-wasm/native-build/`.
- Builds static **zlib** and static **libjpeg** (`jpeg-static` target only).
- **Does not** run full libjpeg-turbo `cmake --install` of WASM CLI tools. On Windows Emscripten those tools (cjpeg/djpeg/jpegtran/…) are unnecessary for QPDF and caused the install-stage hang / incomplete install (libraries present in the build tree, missing from the prefix). The recipe stages `libjpeg.a`, public JPEG headers, and `libjpeg.pc` deterministically.
- Configures QPDF with **native crypto only** (`DEFAULT_CRYPTO=native`, OpenSSL/GnuTLS off). Hard-fails if config enables forbidden providers.
- Links a modular ES worker module with `callMain`, `FS`, `WORKERFS`, `ENVIRONMENT=worker`, `MODULARIZE`, `EXPORT_ES6`.
- Runs a **Chromium CDP** worker smoke test (encrypt AES-256 → wrong password rejects → correct decrypt, page count + content marker) before copying into `static/qpdf/`. Headless `--dump-dom` + virtual time is **not** used; it returns before WASM workers finish real wall-clock work.

## Runtime constraints

- Worker-only environment.
- Argument arrays only (no shell strings).
- No network-capable crypto providers.
- Licence texts for bundled third parties: [`THIRD_PARTY_NOTICES.txt`](./THIRD_PARTY_NOTICES.txt).

## Licence

QPDF is Apache-2.0. See `THIRD_PARTY_NOTICES.txt` for QPDF, zlib, libjpeg-turbo, and Emscripten output notices.
