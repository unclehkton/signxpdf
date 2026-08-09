import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import {
  access,
  copyFile,
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const EMSCRIPTEN_VERSION = "3.1.73";
const SOURCE_REVISIONS = Object.freeze({
  qpdf: "856d32c610334855d30e96d25eb5f9636fb62f08",
  zlib: "51b7f2abdade71cd9bb0e7a373ef2610ec6f9daf",
  libjpegTurbo: "7723f50f3f66b9da74376e6d8badb6162464212c",
});
const SOURCE_REPOSITORIES = Object.freeze({
  qpdf: "https://github.com/qpdf/qpdf.git",
  zlib: "https://github.com/madler/zlib.git",
  libjpegTurbo: "https://github.com/libjpeg-turbo/libjpeg-turbo.git",
});

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "../..");
// SvelteKit assets root is `public/` (see svelte.config.js kit.files.assets).
const staticAssetDirectory = path.join(projectRoot, "public", "qpdf");
const cacheRoot = path.join(projectRoot, "node_modules", ".cache", "qpdf-wasm");
const workspace = path.join(cacheRoot, "native-build");
const cliArguments = new Set(process.argv.slice(2));
const helpOnly = cliArguments.has("--help");
const resumeBuild = cliArguments.has("--resume");
const smokeOnly = cliArguments.has("--smoke-only");
const supportedArguments = new Set(["--help", "--resume", "--smoke-only"]);

const usage = `Usage: npm run build:qpdf-wasm -- [option]

Options:
  --resume      Reuse and verify the pinned native-build cache after an interrupted build.
  --smoke-only  Run the Chromium worker gate against the committed static/qpdf assets.
  --help        Show this help without inspecting the toolchain or build cache.
`;

async function stage(label, action) {
  const startedAt = Date.now();
  console.log(`[qpdf-wasm] START ${label}`);
  try {
    const result = await action();
    console.log(`[qpdf-wasm] DONE  ${label} (${((Date.now() - startedAt) / 1000).toFixed(1)}s)`);
    return result;
  } catch (error) {
    console.error(`[qpdf-wasm] FAIL  ${label} (${((Date.now() - startedAt) / 1000).toFixed(1)}s)`);
    throw error;
  }
}

const preJs = String.raw`let process, fs;
Module["noInitialRun"] = true;
if (Module["locateFile"]) {
  _scriptName = Module["locateFile"]("qpdf.js");
}
`;

const postJs = String.raw`Object.assign(FS, {
  ["init"]: FS.init,
  ["mkdir"]: FS.mkdir,
  ["mount"]: FS.mount,
  ["chdir"]: FS.chdir,
  ["writeFile"]: FS.writeFile,
  ["readFile"]: FS.readFile,
  ["setIgnorePermissions"]: function (value) {
    FS.ignorePermissions = value;
  },
});
`;

const smokeWorker = String.raw`import createQpdfModule from "./qpdf.js";

const marker = "QPDF_WASM_STRUCTURE_MARKER_2026";
const attemptedFetches = [];
const originalFetch = self.fetch.bind(self);
self.fetch = (input, init) => {
  const url = new URL(typeof input === "string" ? input : input.url, self.location.href);
  attemptedFetches.push(url.href);
  if (url.origin !== self.location.origin || url.pathname !== "/qpdf.wasm") {
    throw new Error("Blocked unexpected worker fetch: " + url.href);
  }
  return originalFetch(input, init);
};

let stdout = [];
let stderr = [];

function makeFixture() {
  const encoder = new TextEncoder();
  const content = "BT /F1 12 Tf 72 720 Td (" + marker + ") Tj ET\n";
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    "<< /Length " + encoder.encode(content).length + " >>\nstream\n" + content + "endstream",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];

  let pdf = "%PDF-1.7\n%QPDF-WASM-SMOKE\n";
  const offsets = [0];
  for (let index = 0; index < objects.length; index += 1) {
    offsets.push(encoder.encode(pdf).length);
    pdf += String(index + 1) + " 0 obj\n" + objects[index] + "\nendobj\n";
  }

  const xrefOffset = encoder.encode(pdf).length;
  pdf += "xref\n0 6\n0000000000 65535 f \n";
  for (const offset of offsets.slice(1)) {
    pdf += String(offset).padStart(10, "0") + " 00000 n \n";
  }
  pdf += "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n" + xrefOffset + "\n%%EOF\n";
  return encoder.encode(pdf);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function runQpdf(module, args) {
  stdout = [];
  stderr = [];
  let status = 0;

  try {
    const result = module.callMain(args);
    if (typeof result === "number") {
      status = result;
    }
  } catch (error) {
    status = Number(error && error.status) || 1;
    if (!("status" in Object(error))) {
      stderr.push(String(error));
    }
  }

  return {
    status,
    stdout: stdout.join("\n").trim(),
    stderr: stderr.join("\n").trim(),
  };
}

try {
  const module = await createQpdfModule({
    locateFile: (name) => new URL(name.endsWith(".wasm") ? "./qpdf.wasm" : name, self.location.href).href,
    thisProgram: "qpdf",
    noExitRuntime: true,
    noInitialRun: true,
    print: (line) => stdout.push(String(line)),
    printErr: (line) => stderr.push(String(line)),
    quit: (status, error) => {
      if (status !== 0) {
        throw Object.assign(error || new Error("qpdf exited with status " + status), { status });
      }
    },
  });

  module.FS.writeFile("/fixture.pdf", makeFixture());

  const version = runQpdf(module, ["--version"]);
  assert(version.status === 0, "qpdf --version failed: " + version.stderr);
  // Emscripten may keep argv0 as "./this.program" unless thisProgram is honoured.
  assert(
    /(?:qpdf|this\.program) version 12\.2\.0/.test(version.stdout) ||
      version.stdout.includes("version 12.2.0"),
    "Unexpected QPDF version: " + version.stdout,
  );

  const crypto = runQpdf(module, ["--show-crypto"]);
  assert(crypto.status === 0, "qpdf --show-crypto failed: " + crypto.stderr);
  assert(crypto.stdout.split(/\s+/).filter(Boolean).join(",") === "native", "Unexpected crypto providers: " + crypto.stdout);

  const inputCheck = runQpdf(module, ["--check", "/fixture.pdf"]);
  assert(inputCheck.status === 0, "Input fixture failed qpdf --check: " + inputCheck.stderr);

  const inputPages = runQpdf(module, ["--show-npages", "/fixture.pdf"]);
  assert(inputPages.status === 0 && inputPages.stdout === "1", "Input page count was not 1");

  const encryption = runQpdf(module, [
    "--encrypt",
    "browser-user",
    "browser-owner",
    "256",
    "--",
    "/fixture.pdf",
    "/encrypted.pdf",
  ]);
  assert(encryption.status === 0, "Encryption failed: " + encryption.stderr);

  const encryptedBytes = module.FS.readFile("/encrypted.pdf");
  const encryptedText = new TextDecoder().decode(encryptedBytes);
  assert(encryptedBytes.length > 0, "Encrypted output is empty");
  assert(encryptedText.includes("/Encrypt"), "Encrypted output has no encryption dictionary");
  assert(!encryptedText.includes(marker), "Encrypted output leaked the fixture content marker");

  const wrongPassword = runQpdf(module, ["--password=wrong", "--check", "/encrypted.pdf"]);
  assert(wrongPassword.status !== 0, "Wrong password unexpectedly opened the encrypted PDF");

  const decryption = runQpdf(module, [
    "--password=browser-user",
    "--decrypt",
    "--stream-data=uncompress",
    "/encrypted.pdf",
    "/decrypted.pdf",
  ]);
  assert(decryption.status === 0, "Decryption failed: " + decryption.stderr);

  const decryptedCheck = runQpdf(module, ["--check", "/decrypted.pdf"]);
  assert(decryptedCheck.status === 0, "Decrypted output failed qpdf --check: " + decryptedCheck.stderr);

  const decryptedPages = runQpdf(module, ["--show-npages", "/decrypted.pdf"]);
  assert(decryptedPages.status === 0 && decryptedPages.stdout === "1", "Decrypted page count was not 1");

  const decryptedBytes = module.FS.readFile("/decrypted.pdf");
  const decryptedText = new TextDecoder().decode(decryptedBytes);
  assert(decryptedText.includes(marker), "Decrypted output did not preserve the content marker");
  assert(!decryptedText.includes("/Encrypt"), "Decrypted output retained an encryption dictionary");

  postMessage({
    ok: true,
    proof: {
      qpdfVersion: version.stdout.split("\n")[0],
      cryptoProviders: crypto.stdout.split(/\s+/).filter(Boolean),
      wrongPasswordRejected: true,
      pagesBefore: Number(inputPages.stdout),
      pagesAfter: Number(decryptedPages.stdout),
      markerPreserved: true,
      encryptedBytes: encryptedBytes.length,
      decryptedBytes: decryptedBytes.length,
      workerFetches: attemptedFetches,
    },
  });
} catch (error) {
  postMessage({
    ok: false,
    error: error instanceof Error ? error.stack || error.message : String(error),
  });
}
`;

const smokePage = String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="icon" href="data:,">
    <title>QPDF_SMOKE_PENDING</title>
  </head>
  <body>
    <pre id="result">QPDF_SMOKE_PENDING</pre>
    <script type="module">
      const result = document.querySelector("#result");
      const finish = (ok, payloadObject) => {
        const payload = btoa(JSON.stringify(payloadObject));
        const label = ok ? "QPDF_SMOKE_PASS " : "QPDF_SMOKE_FAIL ";
        result.textContent = label + payload;
        document.title = ok ? "QPDF_SMOKE_PASS" : "QPDF_SMOKE_FAIL";
        window.__QPDF_SMOKE__ = { ok, payload: payloadObject, text: result.textContent };
      };
      const worker = new Worker("/smoke-worker.js", { type: "module" });
      worker.onmessage = ({ data }) => {
        finish(Boolean(data.ok), data.ok ? data.proof : { error: data.error });
        worker.terminate();
      };
      worker.onerror = ({ message, filename, lineno }) => {
        finish(false, { error: message, filename, lineno });
        worker.terminate();
      };
    </script>
  </body>
</html>
`;

function spawnInvocation(command, args) {
  if (process.platform !== "win32" || !command.toLowerCase().endsWith(".bat")) {
    return { command, args };
  }

  return {
    command: process.env.ComSpec ?? "cmd.exe",
    args: ["/d", "/c", command, ...args],
  };
}

async function run(command, args, options = {}) {
  await new Promise((resolve, reject) => {
    const invocation = spawnInvocation(command, args);
    const child = spawn(invocation.command, invocation.args, {
      cwd: projectRoot,
      stdio: "inherit",
      windowsHide: true,
      ...options,
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} exited with code ${code ?? "null"} and signal ${signal ?? "none"}`));
    });
  });
}

async function capture(command, args, options = {}) {
  return await new Promise((resolve, reject) => {
    const invocation = spawnInvocation(command, args);
    const child = spawn(invocation.command, invocation.args, {
      cwd: projectRoot,
      windowsHide: true,
      ...options,
    });
    let stdoutText = "";
    let stderrText = "";
    child.stdout.on("data", (chunk) => {
      stdoutText += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderrText += chunk;
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) {
        resolve({ stdout: stdoutText, stderr: stderrText });
        return;
      }
      reject(
        new Error(
          `${command} exited with code ${code ?? "null"} and signal ${signal ?? "none"}\n${stderrText}`,
        ),
      );
    });
  });
}

async function findChromium() {
  const configured = process.env.QPDF_CHROMIUM;
  const candidates =
    process.platform === "win32"
      ? [
          configured,
          path.join(process.env.PROGRAMFILES ?? "", "Google", "Chrome", "Application", "chrome.exe"),
          path.join(
            process.env["PROGRAMFILES(X86)"] ?? "",
            "Microsoft",
            "Edge",
            "Application",
            "msedge.exe",
          ),
          path.join(
            process.env.LOCALAPPDATA ?? "",
            "Google",
            "Chrome",
            "Application",
            "chrome.exe",
          ),
        ]
      : [configured, "chromium", "chromium-browser", "google-chrome", "google-chrome-stable"];

  for (const candidate of candidates.filter(Boolean)) {
    if (path.isAbsolute(candidate)) {
      try {
        await access(candidate);
        return candidate;
      } catch {
        continue;
      }
    }

    try {
      await capture(candidate, ["--version"]);
      return candidate;
    } catch {
      continue;
    }
  }

  throw new Error("Chromium was not found. Set QPDF_CHROMIUM to a Chromium-based browser executable.");
}

function contentType(filePath) {
  if (filePath.endsWith(".wasm")) return "application/wasm";
  if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8";
  return "text/html; charset=utf-8";
}

async function waitForHttpJson(url, attempts = 80) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Chrome may not have opened the debug port yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for Chromium debug endpoint ${url}`);
}

/**
 * Headless Chromium's --virtual-time-budget/--dump-dom returns before WASM
 * workers finish real wall-clock async work. Drive the smoke page over CDP and
 * poll document state with a real timeout instead.
 */
async function runBrowserSmoke(assetDirectory) {
  const browser = await findChromium();
  await mkdir(cacheRoot, { recursive: true });
  const browserProfile = await mkdtemp(path.join(cacheRoot, "chromium-"));
  const requestPaths = [];
  const expectedPaths = new Set([
    "/",
    "/smoke-worker.js",
    "/qpdf.js",
    "/qpdf.wasm",
    "/favicon.ico",
  ]);

  const server = createServer(async (request, response) => {
    try {
      const requestPath = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
      requestPaths.push(requestPath);
      response.setHeader("Cross-Origin-Resource-Policy", "same-origin");
      response.setHeader("Cache-Control", "no-store");

      if (requestPath === "/") {
        response.setHeader("Content-Type", contentType("index.html"));
        response.end(smokePage);
        return;
      }
      if (requestPath === "/smoke-worker.js") {
        response.setHeader("Content-Type", contentType(requestPath));
        response.end(smokeWorker);
        return;
      }
      if (requestPath === "/qpdf.js" || requestPath === "/qpdf.wasm") {
        const filePath = path.join(assetDirectory, path.basename(requestPath));
        response.setHeader("Content-Type", contentType(filePath));
        createReadStream(filePath).pipe(response);
        return;
      }
      if (requestPath === "/favicon.ico") {
        response.statusCode = 204;
        response.end();
        return;
      }

      response.statusCode = 404;
      response.end("Not found");
    } catch (error) {
      response.statusCode = 500;
      response.end(String(error));
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  let browserProcess;
  try {
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Smoke server did not expose a TCP port");
    }

    const pageUrl = `http://127.0.0.1:${address.port}/`;
    const debugServer = createServer();
    await new Promise((resolve, reject) => {
      debugServer.once("error", reject);
      debugServer.listen(0, "127.0.0.1", resolve);
    });
    const debugAddress = debugServer.address();
    if (!debugAddress || typeof debugAddress === "string") {
      throw new Error("Could not allocate a Chromium remote-debugging port");
    }
    const debugPort = debugAddress.port;
    await new Promise((resolve) => debugServer.close(resolve));

    browserProcess = spawn(
      browser,
      [
        "--headless=new",
        "--disable-background-networking",
        "--disable-component-update",
        "--disable-default-apps",
        "--disable-extensions",
        "--disable-gpu",
        "--no-first-run",
        "--no-sandbox",
        `--remote-debugging-port=${debugPort}`,
        `--user-data-dir=${browserProfile}`,
        pageUrl,
      ],
      { windowsHide: true, stdio: ["ignore", "pipe", "pipe"] },
    );

    let browserStderr = "";
    browserProcess.stderr.on("data", (chunk) => {
      browserStderr += chunk;
    });

    await waitForHttpJson(`http://127.0.0.1:${debugPort}/json/version`);

    let target;
    for (let attempt = 0; attempt < 80; attempt += 1) {
      const targets = await waitForHttpJson(`http://127.0.0.1:${debugPort}/json/list`, 4);
      target = targets.find(
        (entry) =>
          entry.type === "page" &&
          typeof entry.webSocketDebuggerUrl === "string" &&
          String(entry.url).startsWith(pageUrl),
      );
      if (target) break;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    if (!target) {
      throw new Error(
        `Chromium did not expose a page target for ${pageUrl}.\nSTDERR:\n${browserStderr}`,
      );
    }

    if (typeof WebSocket === "undefined") {
      throw new Error("Global WebSocket is required for the Chromium CDP smoke gate");
    }

    const socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener(
        "error",
        () => reject(new Error("Chromium CDP WebSocket failed to open")),
        { once: true },
      );
    });

    let nextId = 1;
    const pending = new Map();
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data));
      if (!message.id || !pending.has(message.id)) {
        return;
      }
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) {
        reject(new Error(JSON.stringify(message.error)));
        return;
      }
      resolve(message.result);
    });

    const send = (method, params = {}) => {
      const id = nextId;
      nextId += 1;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
      });
    };

    await send("Runtime.enable");
    await send("Page.enable");

    const deadline = Date.now() + 120_000;
    let smokeState;
    while (Date.now() < deadline) {
      const evaluation = await send("Runtime.evaluate", {
        expression:
          "({ title: document.title, text: document.querySelector('#result')?.textContent || '', payload: window.__QPDF_SMOKE__ || null })",
        returnByValue: true,
      });
      smokeState = evaluation.result?.value;
      if (
        smokeState?.title === "QPDF_SMOKE_PASS" ||
        smokeState?.title === "QPDF_SMOKE_FAIL" ||
        smokeState?.payload
      ) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    try {
      socket.close();
    } catch {
      // ignore close races while Chrome is shutting down
    }

    const smokeEnvelope = smokeState?.payload;
    const passed =
      smokeState?.title === "QPDF_SMOKE_PASS" ||
      smokeEnvelope?.ok === true ||
      String(smokeState?.text || "").startsWith("QPDF_SMOKE_PASS ");
    if (!passed) {
      throw new Error(
        `Chromium worker smoke did not pass.\nSTATE:\n${JSON.stringify(smokeState, null, 2)}\nSTDERR:\n${browserStderr}`,
      );
    }

    const unexpectedPaths = requestPaths.filter(
      (requestPath) => !expectedPaths.has(requestPath),
    );
    if (unexpectedPaths.length > 0) {
      throw new Error(`Chromium requested unexpected local paths: ${unexpectedPaths.join(", ")}`);
    }

    let proof = smokeEnvelope?.payload;
    if (!proof || typeof proof !== "object" || !("qpdfVersion" in proof)) {
      const passMatch = String(smokeState?.text || "").match(
        /QPDF_SMOKE_PASS ([A-Za-z0-9+/=]+)/,
      );
      if (!passMatch) {
        throw new Error(`Missing smoke proof payload: ${JSON.stringify(smokeState)}`);
      }
      proof = JSON.parse(Buffer.from(passMatch[1], "base64").toString("utf8"));
    }

    console.log("QPDF Chromium worker proof:");
    console.log(JSON.stringify({ ...proof, localRequestPaths: requestPaths }, null, 2));
    return proof;
  } finally {
    if (browserProcess && !browserProcess.killed) {
      browserProcess.kill();
      await new Promise((resolve) => {
        browserProcess.once("exit", resolve);
        setTimeout(resolve, 2000);
      });
    }
    await new Promise((resolve) => server.close(resolve));
    await rm(browserProfile, { recursive: true, force: true }).catch(() => {});
  }
}

async function sha256(filePath) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(filePath)) {
    hash.update(chunk);
  }
  return hash.digest("hex");
}

async function describeArtifacts(assetDirectory) {
  const files = await readdir(assetDirectory);
  const expected = ["qpdf.js", "qpdf.wasm"];
  if (files.sort().join(",") !== expected.join(",")) {
    throw new Error(`Expected only ${expected.join(", ")}, found ${files.join(", ")}`);
  }

  const descriptions = [];
  for (const file of expected) {
    const filePath = path.join(assetDirectory, file);
    const details = await stat(filePath);
    descriptions.push({
      file,
      bytes: details.size,
      sha256: await sha256(filePath),
    });
  }
  return descriptions;
}

function requireNativeEmscripten() {
  const emConfig = process.env.EM_CONFIG;
  if (!emConfig) {
    throw new Error(
      "EM_CONFIG is required. Set it to the Emscripten 3.1.73 .emscripten file before building.",
    );
  }

  const emsdkRoot = path.dirname(path.resolve(emConfig));
  const emscriptenRoot = path.join(emsdkRoot, "upstream", "emscripten");
  return {
    emConfig: path.resolve(emConfig),
    emar: path.join(emscriptenRoot, "emar.bat"),
    emcc: path.join(emscriptenRoot, "emcc.bat"),
    emcmake: path.join(emscriptenRoot, "emcmake.bat"),
    emconfigure: path.join(emscriptenRoot, "emconfigure.bat"),
    emmake: path.join(emscriptenRoot, "emmake.bat"),
    emranlib: path.join(emscriptenRoot, "emranlib.bat"),
    emxx: path.join(emscriptenRoot, "em++.bat"),
  };
}

async function assertToolchain(toolchain) {
  await access(toolchain.emConfig);
  await access(toolchain.emar);
  await access(toolchain.emcc);
  await access(toolchain.emcmake);
  await access(toolchain.emconfigure);
  await access(toolchain.emmake);
  await access(toolchain.emranlib);
  await access(toolchain.emxx);
  const { stdout, stderr } = await capture(toolchain.emxx, ["--version"], {
    env: { ...process.env, EM_CONFIG: toolchain.emConfig },
  });
  const versionText = `${stdout}\n${stderr}`;
  if (!versionText.includes(`emcc (Emscripten gcc/clang-like replacement + linker emulating GNU ld) ${EMSCRIPTEN_VERSION}`)) {
    throw new Error(`Expected Emscripten ${EMSCRIPTEN_VERSION}, received:\n${versionText}`);
  }
}

function gitInCheckout(destination, args) {
  const safeDirectory = destination.replaceAll("\\", "/");
  return ["-c", `safe.directory=${safeDirectory}`, "-C", destination, ...args];
}

async function assertExactCheckout(destination, name, revision, env) {
  await access(path.join(destination, ".git"));
  const { stdout } = await capture("git", gitInCheckout(destination, ["rev-parse", "HEAD"]), {
    env,
  });
  if (stdout.trim() !== revision) {
    throw new Error(`${name} resolved to ${stdout.trim()}, expected ${revision}`);
  }
}

async function cloneExact(sourceRoot, name, repository, revision, env) {
  const destination = path.join(sourceRoot, name);
  await run("git", ["init", destination], { env });
  await run("git", ["-C", destination, "fetch", "--depth=1", "--no-tags", repository, revision], {
    env,
  });
  await run("git", ["-C", destination, "checkout", "--detach", "FETCH_HEAD"], { env });
  await assertExactCheckout(destination, name, revision, env);
}

/**
 * Stage only the static libjpeg artefacts QPDF needs.
 *
 * Full `cmake --build` + `cmake --install` for libjpeg-turbo under Windows
 * Emscripten also builds/installs WASM CLI tools (cjpeg/djpeg/jpegtran/…).
 * Those LTO-linked programs are unnecessary for QPDF and were the observed
 * install-stage hang / incomplete-output failure mode: libjpeg.a exists in
 * the build tree while the install prefix never receives headers or the lib.
 */
async function stageLibjpegInstall(source, buildDirectory, installRoot) {
  const includeDir = path.join(installRoot, "include");
  const libDir = path.join(installRoot, "lib");
  const pkgConfigDir = path.join(libDir, "pkgconfig");
  await mkdir(includeDir, { recursive: true });
  await mkdir(pkgConfigDir, { recursive: true });

  const librarySource = path.join(buildDirectory, "libjpeg.a");
  await access(librarySource);
  await copyFile(librarySource, path.join(libDir, "libjpeg.a"));

  const headers = [
    [path.join(buildDirectory, "jconfig.h"), "jconfig.h"],
    [path.join(source, "src", "jerror.h"), "jerror.h"],
    [path.join(source, "src", "jmorecfg.h"), "jmorecfg.h"],
    [path.join(source, "src", "jpeglib.h"), "jpeglib.h"],
  ];
  for (const [from, name] of headers) {
    await access(from);
    await copyFile(from, path.join(includeDir, name));
  }

  const pkgConfigSource = path.join(buildDirectory, "pkgscripts", "libjpeg.pc");
  await access(pkgConfigSource);
  await copyFile(pkgConfigSource, path.join(pkgConfigDir, "libjpeg.pc"));

  await access(path.join(libDir, "libjpeg.a"));
  await access(path.join(includeDir, "jpeglib.h"));
  console.log(
    `[qpdf-wasm] staged libjpeg-static -> ${path.join(libDir, "libjpeg.a")} + headers/pkg-config`,
  );
}

async function buildAndStageLibjpeg(toolchain, source, buildDirectory, installRoot, options, env) {
  await stage("configure libjpeg-turbo", () =>
    run(
      toolchain.emcmake,
      [
        "cmake",
        "-S",
        source,
        "-B",
        buildDirectory,
        "-G",
        "Ninja",
        "-DCMAKE_BUILD_TYPE=Release",
        ...options,
      ],
      { env },
    ),
  );

  // Only the static library is required. Skipping CLI tool targets avoids the
  // Windows Emscripten LTO hang / missing-program install failure.
  await stage("build libjpeg-static only", () =>
    run("cmake", ["--build", buildDirectory, "--target", "jpeg-static", "--parallel", "5"], {
      env,
    }),
  );

  await stage("stage libjpeg headers and static library", () =>
    stageLibjpegInstall(source, buildDirectory, installRoot),
  );
}

async function assertNativeCrypto(qpdfBuildDirectory) {
  const configPath = path.join(qpdfBuildDirectory, "libqpdf", "qpdf", "qpdf-config.h");
  const config = await readFile(configPath, "utf8");
  const required = ['#define DEFAULT_CRYPTO "native"', "#define USE_CRYPTO_NATIVE 1"];
  for (const line of required) {
    if (!config.includes(line)) {
      throw new Error(`QPDF native crypto assertion missing from ${configPath}: ${line}`);
    }
  }
  if (/^#define USE_CRYPTO_(GNUTLS|OPENSSL) 1$/m.test(config)) {
    throw new Error(`QPDF enabled a forbidden external crypto provider in ${configPath}`);
  }
}

async function buildNativeArtifacts(toolchain, artifactDirectory, { resume = false } = {}) {
  const sourceRoot = path.join(workspace, "src");
  const buildRoot = path.join(workspace, "build");
  const installRoot = path.join(workspace, "install");
  const cflags = "-Oz -flto -msimd128";
  const env = {
    ...process.env,
    EM_CONFIG: toolchain.emConfig,
    CFLAGS: cflags,
    CXXFLAGS: cflags,
    NINJA_STATUS: "[qpdf-wasm %f/%t %es] ",
  };

  await mkdir(sourceRoot, { recursive: true });
  await mkdir(buildRoot, { recursive: true });
  await mkdir(installRoot, { recursive: true });

  const zlibSource = path.join(sourceRoot, "zlib");
  const libjpegSource = path.join(sourceRoot, "libjpeg-turbo");
  const libjpegBuildDirectory = path.join(buildRoot, "libjpeg-turbo");

  if (resume) {
    await stage("verify interrupted-build cache", async () => {
      await Promise.all([
        assertExactCheckout(zlibSource, "zlib", SOURCE_REVISIONS.zlib, env),
        assertExactCheckout(
          libjpegSource,
          "libjpeg-turbo",
          SOURCE_REVISIONS.libjpegTurbo,
          env,
        ),
        assertExactCheckout(path.join(sourceRoot, "qpdf"), "qpdf", SOURCE_REVISIONS.qpdf, env),
        access(path.join(installRoot, "lib", "libz.a")),
      ]);

      // Prefer an already-staged install; otherwise recover from a build-tree
      // that produced libjpeg.a before cmake --install stalled.
      try {
        await access(path.join(installRoot, "lib", "libjpeg.a"));
        await access(path.join(installRoot, "include", "jpeglib.h"));
      } catch {
        await stage("recover libjpeg install from build tree", () =>
          stageLibjpegInstall(libjpegSource, libjpegBuildDirectory, installRoot),
        );
      }
    });
  } else {
    await stage("fetch exact source revisions", async () => {
      await Promise.all([
        cloneExact(sourceRoot, "zlib", SOURCE_REPOSITORIES.zlib, SOURCE_REVISIONS.zlib, env),
        cloneExact(
          sourceRoot,
          "libjpeg-turbo",
          SOURCE_REPOSITORIES.libjpegTurbo,
          SOURCE_REVISIONS.libjpegTurbo,
          env,
        ),
        cloneExact(sourceRoot, "qpdf", SOURCE_REPOSITORIES.qpdf, SOURCE_REVISIONS.qpdf, env),
      ]);
    });

    await stage("configure zlib", async () => {
      await run(
        toolchain.emconfigure,
        ["sh", "configure", `--prefix=${installRoot.replaceAll("\\", "/")}`, "--static"],
        { cwd: zlibSource, env },
      );
      const zlibMakefilePath = path.join(zlibSource, "Makefile");
      let zlibMakefile = await readFile(zlibMakefilePath, "utf8");
      for (const [variable, executable] of [
        ["CC", toolchain.emcc],
        ["LDSHARED", toolchain.emcc],
        ["AR", toolchain.emar],
        ["RANLIB", toolchain.emranlib],
      ]) {
        zlibMakefile = zlibMakefile.replace(
          new RegExp(`^${variable}=.*$`, "m"),
          `${variable}=${executable.replaceAll("\\", "/")}`,
        );
      }
      await writeFile(zlibMakefilePath, zlibMakefile, "utf8");
    });
    await stage("build and install zlib", () =>
      run(toolchain.emmake, ["make", "-j5", "install"], { cwd: zlibSource, env }),
    );
    await buildAndStageLibjpeg(
      toolchain,
      libjpegSource,
      libjpegBuildDirectory,
      installRoot,
      [
        `-DCMAKE_INSTALL_PREFIX=${installRoot}`,
        "-DENABLE_SHARED=OFF",
        "-DENABLE_STATIC=ON",
        "-DWITH_SIMD=OFF",
        "-DWITH_TURBOJPEG=OFF",
        `-DCMAKE_C_FLAGS=${cflags}`,
      ],
      env,
    );
  }

  const qpdfBuildDirectory = path.join(buildRoot, "qpdf");
  await stage("configure QPDF with native crypto", () =>
    run(
      toolchain.emcmake,
      [
        "cmake",
        "-S",
        path.join(sourceRoot, "qpdf"),
        "-B",
        qpdfBuildDirectory,
        "-G",
        "Ninja",
        "-DCMAKE_BUILD_TYPE=Release",
        `-DCMAKE_INSTALL_PREFIX=${installRoot}`,
        `-DCMAKE_PREFIX_PATH=${installRoot}`,
        `-DCMAKE_INCLUDE_PATH=${path.join(installRoot, "include")}`,
        `-DCMAKE_LIBRARY_PATH=${path.join(installRoot, "lib")}`,
        `-DCMAKE_C_FLAGS=${cflags}`,
        `-DCMAKE_CXX_FLAGS=${cflags}`,
        "-DBUILD_DOC=OFF",
        "-DBUILD_SHARED_LIBS=OFF",
        "-DBUILD_STATIC_LIBS=ON",
        "-DDEFAULT_CRYPTO=native",
        "-DGENERATE_AUTO_JOB=OFF",
        "-DINSTALL_EXAMPLES=OFF",
        "-DRANDOM_DEVICE=/dev/random",
        "-DREQUIRE_CRYPTO_NATIVE=ON",
        "-DUSE_IMPLICIT_CRYPTO=OFF",
      ],
      { env },
    ),
  );
  await stage("build QPDF static library", () =>
    run("cmake", ["--build", qpdfBuildDirectory, "--target", "libqpdf", "--parallel", "5"], {
      env,
    }),
  );
  await stage("assert native-only QPDF crypto configuration", () =>
    assertNativeCrypto(qpdfBuildDirectory),
  );

  await writeFile(path.join(workspace, "pre.js"), preJs, "utf8");
  await writeFile(path.join(workspace, "post.js"), postJs, "utf8");
  await stage("link QPDF worker module", () =>
    run(
      toolchain.emxx,
      [
        ...cflags.split(" "),
        `-I${path.join(installRoot, "include")}`,
        `-I${path.join(sourceRoot, "qpdf", "include")}`,
        `-I${path.join(qpdfBuildDirectory, "libqpdf")}`,
        `-L${path.join(installRoot, "lib")}`,
        "--pre-js",
        path.join(workspace, "pre.js"),
        "--post-js",
        path.join(workspace, "post.js"),
        "-sALLOW_MEMORY_GROWTH=1",
        "-sDYNAMIC_EXECUTION=0",
        "-sEMIT_EMSCRIPTEN_LICENSE=1",
        "-sENVIRONMENT=worker",
        "-sEXPORTED_FUNCTIONS=[_main]",
        "-sEXPORTED_RUNTIME_METHODS=[callMain,FS,WORKERFS]",
        "-sEXPORT_ES6=1",
        "-sEXPORT_NAME=createQpdfModule",
        "-sINITIAL_MEMORY=67108864",
        "-sINCOMING_MODULE_JS_API=[locateFile,thisProgram,noExitRuntime,noInitialRun,onExit,print,printErr,quit]",
        "-sMODULARIZE=1",
        "-sNO_DISABLE_EXCEPTION_CATCHING=1",
        "-sSTACK_SIZE=1MB",
        "-sUSE_ES6_IMPORT_META=0",
        "-lworkerfs.js",
        "-o",
        path.join(artifactDirectory, "qpdf.js"),
        path.join(sourceRoot, "qpdf", "qpdf", "qpdf.cc"),
        path.join(qpdfBuildDirectory, "libqpdf", "libqpdf.a"),
        "-ljpeg",
        "-lz",
      ],
      { env },
    ),
  );
}

async function build({ resume = false } = {}) {
  const artifactDirectory = path.join(workspace, "artifacts");
  const toolchain = requireNativeEmscripten();

  await stage("verify native Emscripten toolchain", () => assertToolchain(toolchain));
  if (resume) {
    await rm(artifactDirectory, { recursive: true, force: true });
  } else {
    await rm(workspace, { recursive: true, force: true });
  }
  await mkdir(artifactDirectory, { recursive: true });

  console.log(
    `${resume ? "Resuming" : "Building"} pinned QPDF WASM sources with native Emscripten ${EMSCRIPTEN_VERSION}`,
  );
  console.log(`${resume ? "Verified recovery" : "Clean audit"} workspace: ${workspace}`);
  try {
    await buildNativeArtifacts(toolchain, artifactDirectory, { resume });
    const descriptions = await stage("hash generated artefacts", () =>
      describeArtifacts(artifactDirectory),
    );
    await stage("Chromium worker encrypt/decrypt gate", () => runBrowserSmoke(artifactDirectory));

    await stage("publish gated static artefacts", async () => {
      await mkdir(staticAssetDirectory, { recursive: true });
      for (const { file } of descriptions) {
        await copyFile(path.join(artifactDirectory, file), path.join(staticAssetDirectory, file));
      }
    });

    console.log("QPDF artefacts copied after the worker gate passed:");
    console.log(JSON.stringify(descriptions, null, 2));
  } catch (error) {
    console.error(`Build workspace preserved for audit: ${workspace}`);
    throw error;
  }
}

async function main() {
  const unknownArguments = [...cliArguments].filter((argument) => !supportedArguments.has(argument));
  if (unknownArguments.length > 0) {
    throw new Error(`Unknown option(s): ${unknownArguments.join(", ")}\n\n${usage}`);
  }
  if (helpOnly) {
    process.stdout.write(usage);
    return;
  }
  if (resumeBuild && smokeOnly) {
    throw new Error("--resume and --smoke-only cannot be used together.");
  }
  if (smokeOnly) {
    const descriptions = await stage("hash committed artefacts", () =>
      describeArtifacts(staticAssetDirectory),
    );
    await stage("Chromium worker encrypt/decrypt gate", () =>
      runBrowserSmoke(staticAssetDirectory),
    );
    console.log("Existing QPDF artefacts:");
    console.log(JSON.stringify(descriptions, null, 2));
    return;
  }

  await build({ resume: resumeBuild });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
