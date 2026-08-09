import { QPDF_ASSET_URLS } from "./qpdf-assets";
import {
  classifyQpdfError,
  isQpdfSuccessStatus,
  safeQpdfMessage,
} from "./qpdf-classify";
import type {
  QpdfErrorCode,
  QpdfWorkerRequest,
  QpdfWorkerResponse,
} from "./qpdf-worker.types";

type QpdfModule = {
  callMain: (args: string[]) => number | void;
  FS: {
    mkdir: (path: string) => void;
    writeFile: (path: string, data: Uint8Array | string) => void;
    readFile: (path: string) => Uint8Array;
    unlink: (path: string) => void;
    rmdir?: (path: string) => void;
    analyzePath?: (path: string) => { exists: boolean };
  };
};

type WorkerScope = {
  onmessage: ((event: MessageEvent<QpdfWorkerRequest>) => void) | null;
  postMessage: (message: QpdfWorkerResponse, transfer?: Transferable[]) => void;
};

declare const self: WorkerScope;

type CreateQpdfModule = (options: Record<string, unknown>) => Promise<QpdfModule>;

let modulePromise: Promise<QpdfModule> | null = null;
let requestCounter = 0;
const capturedStdout: string[] = [];
const capturedStderr: string[] = [];

function pathExists(module: QpdfModule, filePath: string): boolean {
  try {
    if (module.FS.analyzePath) {
      return Boolean(module.FS.analyzePath(filePath).exists);
    }
    module.FS.readFile(filePath);
    return true;
  } catch {
    return false;
  }
}

function fail(
  id: string,
  status: number,
  stderr: string,
): QpdfWorkerResponse {
  const code = classifyQpdfError(status, stderr);
  return { id, ok: false, code, message: safeQpdfMessage(code) };
}

async function getModule(): Promise<QpdfModule> {
  if (!modulePromise) {
    modulePromise = (async () => {
      const imported = (await import(
        /* @vite-ignore */ QPDF_ASSET_URLS.glue
      )) as { default: CreateQpdfModule };
      const createQpdfModule = imported.default;
      return createQpdfModule({
        locateFile: (name: string) =>
          name.endsWith(".wasm")
            ? QPDF_ASSET_URLS.wasm
            : `${QPDF_ASSET_URLS.glue.replace(/[^/]+$/, "")}${name}`,
        thisProgram: "qpdf",
        noExitRuntime: true,
        noInitialRun: true,
        print: (line: string) => {
          capturedStdout.push(String(line));
        },
        printErr: (line: string) => {
          capturedStderr.push(String(line));
        },
      });
    })().catch((error) => {
      // Allow a later request to retry WASM/JS asset load after a transient failure.
      modulePromise = null;
      throw error;
    });
  }
  return modulePromise;
}

function runMain(
  module: QpdfModule,
  args: string[],
): { status: number; stdout: string; stderr: string } {
  capturedStdout.length = 0;
  capturedStderr.length = 0;
  let status = 0;
  try {
    const result = module.callMain(args);
    if (typeof result === "number") status = result;
  } catch (error) {
    const maybe = error as { status?: number; message?: string };
    status = typeof maybe?.status === "number" ? maybe.status : 1;
    if (maybe?.message) capturedStderr.push(String(maybe.message));
  }
  return {
    status,
    stdout: capturedStdout.join("\n").trim(),
    stderr: capturedStderr.join("\n").trim(),
  };
}

function ensureDir(module: QpdfModule, dir: string): void {
  try {
    module.FS.mkdir(dir);
  } catch {
    // Directory may already exist across requests in the same worker.
  }
}

function cleanupPath(module: QpdfModule, filePath: string): void {
  try {
    module.FS.unlink(filePath);
  } catch {
    // Best-effort cleanup; missing files are fine.
  }
}

function cleanupDir(module: QpdfModule, dir: string): void {
  try {
    module.FS.rmdir?.(dir);
  } catch {
    // Best-effort; directory may already be gone.
  }
}

function overwriteString(value: string): void {
  // Local passwords are stack strings; we cannot truly zero JS string memory,
  // but avoid retaining extra references beyond this function.
  void value.length;
}

async function handleRequest(request: QpdfWorkerRequest): Promise<QpdfWorkerResponse> {
  const id = request.id;
  const module = await getModule();
  requestCounter += 1;
  const workDir = `/qpdf-work-${requestCounter}`;
  const inputPath = `${workDir}/input.pdf`;
  const outputPath = `${workDir}/output.pdf`;

  ensureDir(module, workDir);
  module.FS.writeFile(inputPath, new Uint8Array(request.bytes));

  const operation = request.operation;
  let openPassword = "";
  let ownerPassword = "";
  let password = "";

  try {
    if (operation.kind === "inspect") {
      const encryptedProbe = runMain(module, ["--is-encrypted", inputPath]);
      // qpdf --is-encrypted: exit 0 = encrypted, exit 2 = not encrypted (typical).
      if (encryptedProbe.status === 0) {
        const empty = new ArrayBuffer(0);
        return { id, ok: true, bytes: empty, encrypted: true };
      }
      if (encryptedProbe.status === 2) {
        const empty = new ArrayBuffer(0);
        return { id, ok: true, bytes: empty, encrypted: false };
      }
      // Fallback: --check
      const check = runMain(module, ["--check", inputPath]);
      if (!isQpdfSuccessStatus(check.status, false)) {
        return fail(id, check.status, check.stderr);
      }
      const empty = new ArrayBuffer(0);
      return { id, ok: true, bytes: empty, encrypted: false };
    }

    if (operation.kind === "encrypt") {
      openPassword = operation.openPassword;
      ownerPassword = operation.ownerPassword;
      const result = runMain(module, [
        "--encrypt",
        openPassword,
        ownerPassword,
        "256",
        "--",
        inputPath,
        outputPath,
      ]);
      if (!isQpdfSuccessStatus(result.status, pathExists(module, outputPath))) {
        return fail(id, result.status, result.stderr);
      }
      const out = module.FS.readFile(outputPath);
      const copy = out.slice().buffer as ArrayBuffer;
      return { id, ok: true, bytes: copy, encrypted: true };
    }

    // decrypt
    password = operation.password;
    const result = runMain(module, [
      `--password=${password}`,
      "--decrypt",
      inputPath,
      outputPath,
    ]);
    if (!isQpdfSuccessStatus(result.status, pathExists(module, outputPath))) {
      return fail(id, result.status, result.stderr);
    }
    const out = module.FS.readFile(outputPath);
    const copy = out.slice().buffer as ArrayBuffer;

    let pageCount: number | undefined;
    const pages = runMain(module, ["--show-npages", outputPath]);
    if (
      isQpdfSuccessStatus(pages.status, false) &&
      /^\d+$/.test(pages.stdout.trim())
    ) {
      pageCount = Number(pages.stdout.trim());
    }

    return { id, ok: true, bytes: copy, encrypted: false, pageCount };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const code: QpdfErrorCode = classifyQpdfError(1, message);
    return { id, ok: false, code, message: safeQpdfMessage(code) };
  } finally {
    cleanupPath(module, inputPath);
    cleanupPath(module, outputPath);
    cleanupDir(module, workDir);
    overwriteString(openPassword);
    overwriteString(ownerPassword);
    overwriteString(password);
    openPassword = "";
    ownerPassword = "";
    password = "";
  }
}

self.onmessage = (event: MessageEvent<QpdfWorkerRequest>) => {
  const request = event.data;
  void handleRequest(request)
    .then((response) => {
      if (response.ok && response.bytes.byteLength > 0) {
        self.postMessage(response, [response.bytes]);
      } else {
        self.postMessage(response);
      }
    })
    .catch((error: unknown) => {
      const failure: QpdfWorkerResponse = {
        id: request.id,
        ok: false,
        code: "engine-failure",
        message: safeQpdfMessage("engine-failure"),
      };
      void error;
      self.postMessage(failure);
    });
};
