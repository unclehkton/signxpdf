import { spawnSync } from "node:child_process";
import path from "node:path";
import { describe, expect, it } from "vitest";

const buildScript = path.resolve("vendor/qpdf-wasm/build.mjs");

describe("QPDF WASM build CLI", () => {
  it("documents recovery mode without requiring the Emscripten toolchain", () => {
    const result = spawnSync(process.execPath, [buildScript, "--help"], {
      encoding: "utf8",
      env: { ...process.env, EM_CONFIG: "" },
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("Usage: npm run build:qpdf-wasm");
    expect(result.stdout).toContain("--resume");
    expect(result.stderr).toBe("");
  });
});
