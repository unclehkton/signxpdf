import { afterEach, describe, expect, it, vi } from "vitest";
import { QpdfClient, setQpdfClientForTests } from "./qpdf-client";
import { QpdfClientError, type QpdfWorkerRequest, type QpdfWorkerResponse } from "./qpdf-worker.types";

class MockWorker {
  static last: MockWorker | null = null;
  onmessage: ((event: MessageEvent<QpdfWorkerResponse>) => void) | null = null;
  onerror: ((event: ErrorEvent) => void) | null = null;
  posted: Array<{ data: QpdfWorkerRequest; transfer: Transferable[] }> = [];
  terminated = false;

  constructor() {
    MockWorker.last = this;
  }

  postMessage(data: QpdfWorkerRequest, transfer?: Transferable[]) {
    this.posted.push({ data, transfer: transfer ?? [] });
  }

  terminate() {
    this.terminated = true;
  }

  respond(response: QpdfWorkerResponse) {
    this.onmessage?.({ data: response } as MessageEvent<QpdfWorkerResponse>);
  }
}

describe("QpdfClient", () => {
  afterEach(() => {
    setQpdfClientForTests(null);
    vi.unstubAllGlobals();
    MockWorker.last = null;
  });

  it("transfers ArrayBuffers and resolves typed success responses", async () => {
    vi.stubGlobal(
      "Worker",
      class extends MockWorker {
        constructor(_url: URL | string, _options?: WorkerOptions) {
          super();
        }
      },
    );

    const client = new QpdfClient();
    const input = new Uint8Array([1, 2, 3, 4]);
    const promise = client.encrypt(input, "open", "owner");

    expect(MockWorker.last).toBeTruthy();
    const posted = MockWorker.last!.posted[0]!;
    expect(posted.data.operation).toEqual({
      kind: "encrypt",
      openPassword: "open",
      ownerPassword: "owner",
    });
    expect(posted.transfer).toHaveLength(1);
    expect(posted.transfer[0]).toBeInstanceOf(ArrayBuffer);

    const output = new Uint8Array([9, 8, 7]).buffer;
    MockWorker.last!.respond({
      id: posted.data.id,
      ok: true,
      bytes: output,
      encrypted: true,
    });

    const result = await promise;
    expect(result.encrypted).toBe(true);
    expect(Array.from(result.bytes)).toEqual([9, 8, 7]);
    expect(client["pending"].size).toBe(0);
  });

  it("maps typed worker failures and clears pending entries", async () => {
    vi.stubGlobal(
      "Worker",
      class extends MockWorker {
        constructor(_url: URL | string, _options?: WorkerOptions) {
          super();
        }
      },
    );

    const client = new QpdfClient();
    const promise = client.decrypt(new Uint8Array([1]), "wrong");
    const posted = MockWorker.last!.posted[0]!;
    MockWorker.last!.respond({
      id: posted.data.id,
      ok: false,
      code: "incorrect-password",
      message: "The password is incorrect.",
    });

    await expect(promise).rejects.toBeInstanceOf(QpdfClientError);
    await expect(promise).rejects.toMatchObject({
      code: "incorrect-password",
      message: "The password is incorrect.",
    });
    expect(client["pending"].size).toBe(0);
  });

  it("supports inspect operations without retaining password fields", async () => {
    vi.stubGlobal(
      "Worker",
      class extends MockWorker {
        constructor(_url: URL | string, _options?: WorkerOptions) {
          super();
        }
      },
    );

    const client = new QpdfClient();
    const promise = client.inspect(new Uint8Array([1, 2]));
    const posted = MockWorker.last!.posted[0]!;
    expect(posted.data.operation).toEqual({ kind: "inspect" });
    expect(JSON.stringify(posted.data)).not.toMatch(/password/i);

    MockWorker.last!.respond({
      id: posted.data.id,
      ok: true,
      bytes: new ArrayBuffer(0),
      encrypted: true,
    });

    await expect(promise).resolves.toMatchObject({ encrypted: true });
  });
});
