import type {
  PasswordOperation,
  QpdfWorkerRequest,
  QpdfWorkerResponse,
} from "./qpdf-worker.types";
import { QpdfClientError } from "./qpdf-worker.types";

export type { PasswordOperation, QpdfErrorCode, QpdfClientError } from "./qpdf-worker.types";

type Pending = {
  resolve: (value: QpdfWorkerResponse & { ok: true }) => void;
  reject: (error: QpdfClientError) => void;
  timer: ReturnType<typeof setTimeout>;
};

const DEFAULT_TIMEOUT_MS = 60_000;

export class QpdfClient {
  private worker: Worker | null = null;
  private pending = new Map<string, Pending>();
  private nextId = 0;

  /**
   * Lazily create the module worker. Does not run until the first encrypt/decrypt
   * (or full QPDF inspect). Opening a normal PDF never reaches here.
   */
  private ensureWorker(): Worker {
    if (this.worker) return this.worker;
    const worker = new Worker(new URL("./qpdf.worker.ts", import.meta.url), {
      type: "module",
    });
    worker.onmessage = (event: MessageEvent<QpdfWorkerResponse>) => {
      const response = event.data;
      const entry = this.pending.get(response.id);
      if (!entry) return;
      clearTimeout(entry.timer);
      this.pending.delete(response.id);
      if (response.ok) {
        entry.resolve(response);
      } else {
        entry.reject(new QpdfClientError(response.code, response.message));
      }
    };
    worker.onerror = (event) => {
      const error = new QpdfClientError(
        "engine-failure",
        event.message || "The PDF password engine failed.",
      );
      for (const [id, entry] of this.pending) {
        clearTimeout(entry.timer);
        entry.reject(error);
        this.pending.delete(id);
      }
      this.terminate();
    };
    this.worker = worker;
    return worker;
  }

  async run(
    bytes: Uint8Array,
    operation: PasswordOperation,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  ): Promise<{ bytes: Uint8Array; encrypted: boolean; pageCount?: number }> {
    const worker = this.ensureWorker();
    const id = `qpdf-${++this.nextId}`;
    const buffer = bytes.buffer.slice(
      bytes.byteOffset,
      bytes.byteOffset + bytes.byteLength,
    ) as ArrayBuffer;

    const response = await new Promise<QpdfWorkerResponse & { ok: true }>(
      (resolve, reject) => {
        const timer = setTimeout(() => {
          this.pending.delete(id);
          reject(new QpdfClientError("engine-failure", "The PDF password engine timed out."));
          this.terminate();
        }, timeoutMs);

        this.pending.set(id, {
          resolve,
          reject: (error) => reject(error),
          timer,
        });

        const request: QpdfWorkerRequest = { id, bytes: buffer, operation };
        worker.postMessage(request, [buffer]);
      },
    );

    return {
      bytes: new Uint8Array(response.bytes),
      encrypted: response.encrypted,
      pageCount: response.pageCount,
    };
  }

  inspect(bytes: Uint8Array) {
    return this.run(bytes, { kind: "inspect" });
  }

  encrypt(bytes: Uint8Array, openPassword: string, ownerPassword: string) {
    return this.run(bytes, { kind: "encrypt", openPassword, ownerPassword });
  }

  decrypt(bytes: Uint8Array, password: string) {
    return this.run(bytes, { kind: "decrypt", password });
  }

  terminate(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    for (const [, entry] of this.pending) {
      clearTimeout(entry.timer);
      entry.reject(new QpdfClientError("engine-failure", "The PDF password engine was stopped."));
    }
    this.pending.clear();
  }
}

let sharedClient: QpdfClient | null = null;

export function getQpdfClient(): QpdfClient {
  if (!sharedClient) sharedClient = new QpdfClient();
  return sharedClient;
}

/** Terminate the shared worker and drop the singleton (e.g. toolkit reset). */
export function terminateSharedQpdfClient(): void {
  if (!sharedClient) return;
  try {
    sharedClient.terminate?.();
  } catch {
    // Best-effort: test mocks may omit terminate.
  }
  sharedClient = null;
}

/** Test helper to inject a mock client or clear the singleton. */
export function setQpdfClientForTests(client: QpdfClient | null): void {
  if (sharedClient && client !== sharedClient) {
    try {
      sharedClient.terminate?.();
    } catch {
      // ignore
    }
  }
  sharedClient = client;
}
