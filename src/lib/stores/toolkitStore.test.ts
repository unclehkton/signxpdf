import { get } from 'svelte/store';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { setQpdfClientForTests, type QpdfClient } from '../pdf/qpdf-client';
import { QpdfClientError } from '../pdf/qpdf-worker.types';
import * as runtime from '../pdf/runtime';
import {
  hasPendingOpenPasswordForTests,
  toolkitStore,
} from './toolkitStore';

function mockClient(impl: Partial<QpdfClient>): QpdfClient {
  return {
    terminate: vi.fn(),
    ...impl,
  } as QpdfClient;
}

function makePdfFile(name: string, bytes: Uint8Array): File {
  const blob = new Blob(
    [bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer],
    { type: 'application/pdf' },
  );
  return new File([blob], name, { type: 'application/pdf' });
}

function mockPdfLib(loadImpl: (bytes: Uint8Array) => Promise<unknown>) {
  return vi.spyOn(runtime, 'getPdfLib').mockResolvedValue({
    PDFDocument: {
      load: loadImpl,
    },
  } as never);
}

describe('toolkitStore', () => {
  afterEach(() => {
    toolkitStore.reset();
    setQpdfClientForTests(null);
    vi.restoreAllMocks();
  });

  it('resets loaded files and page state', () => {
    toolkitStore.insertBlank(-1);

    expect(get(toolkitStore).pages).toHaveLength(1);

    toolkitStore.reset();

    expect(get(toolkitStore)).toMatchObject({
      pages: [],
      primaryFilename: 'document',
      compressedBytes: null,
      saving: false,
      compressing: false,
      compressProgress: 0,
      compressResult: null,
      sourceEncryption: 'unknown',
      passwordExportMode: 'none',
      editingUnavailable: false,
    });
    expect(get(toolkitStore).sources.size).toBe(0);
    expect(get(toolkitStore).sourceNames.size).toBe(0);
  });

  it('marks password-required when pdf-lib reports encryption and empty password fails', async () => {
    mockPdfLib(async () => {
      throw new Error('Input document to `PDFDocument.load` is encrypted.');
    });
    const decrypt = vi.fn(async () => {
      throw new QpdfClientError('incorrect-password', 'The password is incorrect.');
    });
    setQpdfClientForTests(mockClient({ decrypt }));

    await toolkitStore.loadPrimary(
      makePdfFile('secret.pdf', new Uint8Array([1, 2, 3])),
    );

    const state = get(toolkitStore);
    expect(state.sourceEncryption).toBe('password-required');
    expect(state.pages).toHaveLength(0);
    expect(state.primaryFilename).toBe('secret.pdf');
    expect(state.originalSourceBytes).toBeTruthy();
    expect(JSON.stringify(state)).not.toMatch(/password\s*[:=]/i);
    // Empty-password attempt must run (P1.2) before prompting.
    expect(decrypt).toHaveBeenCalledOnce();
    const firstCall = decrypt.mock.calls[0] as unknown as [Uint8Array, string];
    expect(firstCall[1]).toBe('');
  });

  it('auto-unlocks encrypted PDFs that accept an empty user password', async () => {
    const decrypted = new Uint8Array([9, 9, 9]);
    mockPdfLib(async (bytes) => {
      if (bytes === decrypted || (bytes.length === 3 && bytes[0] === 9)) {
        return {
          getPageCount: () => 1,
        };
      }
      throw new Error('Input document is encrypted');
    });
    const decrypt = vi.fn(async () => ({
      bytes: decrypted,
      encrypted: false,
      pageCount: 1,
    }));
    setQpdfClientForTests(mockClient({ decrypt }));

    await toolkitStore.loadPrimary(
      makePdfFile('empty-user.pdf', new Uint8Array([1])),
    );

    const state = get(toolkitStore);
    expect(decrypt).toHaveBeenCalledWith(expect.any(Uint8Array), '');
    expect(state.sourceEncryption).toBe('unencrypted');
    expect(state.passwordExportMode).toBe('remove-only');
    expect(state.passwordOnlyOutputBytes).toEqual(decrypted);
    expect(state.pages).toHaveLength(1);
  });

  it('preserves prior state when unlock password is incorrect', async () => {
    mockPdfLib(async () => {
      throw new Error('encrypted');
    });
    const decrypt = vi
      .fn()
      .mockRejectedValueOnce(
        new QpdfClientError('incorrect-password', 'The password is incorrect.'),
      )
      .mockRejectedValueOnce(
        new QpdfClientError('incorrect-password', 'The password is incorrect.'),
      );
    setQpdfClientForTests(mockClient({ decrypt }));

    await toolkitStore.loadPrimary(
      makePdfFile('secret.pdf', new Uint8Array([1])),
    );
    const before = get(toolkitStore);
    const result = await toolkitStore.unlockPrimary('wrong-password');

    expect(result).toMatchObject({ ok: false, code: 'incorrect-password' });
    if (!result.ok) {
      expect(result.message).not.toContain('wrong-password');
    }
    const after = get(toolkitStore);
    expect(after.sourceEncryption).toBe('password-required');
    expect(after.primaryFilename).toBe(before.primaryFilename);
    expect(after.pages).toHaveLength(0);
  });

  it('keeps direct password-only output when pdf-lib cannot parse decrypted bytes', async () => {
    mockPdfLib(async () => {
      throw new Error('encrypted');
    });
    const decrypted = new Uint8Array([7, 7, 7, 7]);
    const decrypt = vi
      .fn()
      .mockRejectedValueOnce(
        new QpdfClientError('incorrect-password', 'The password is incorrect.'),
      )
      .mockResolvedValueOnce({
        bytes: decrypted,
        encrypted: false,
        pageCount: 2,
      });
    setQpdfClientForTests(mockClient({ decrypt }));

    await toolkitStore.loadPrimary(
      makePdfFile('odd.pdf', new Uint8Array([1])),
    );
    // After empty fail, unlock with password — pdf-lib still cannot load decrypted.
    mockPdfLib(async () => {
      throw new Error('unsupported feature');
    });

    const result = await toolkitStore.unlockPrimary('correct');
    expect(result.ok).toBe(true);
    const state = get(toolkitStore);
    expect(state.passwordOnlyOutputBytes).toEqual(decrypted);
    expect(state.passwordExportMode).toBe('remove-only');
    expect(state.editingUnavailable).toBe(true);
    expect(state.pages).toHaveLength(0);
    expect(state.sourceEncryption).toBe('unencrypted');
  });

  it('ignores unlock results after reset (generation cancel)', async () => {
    mockPdfLib(async () => {
      throw new Error('encrypted');
    });
    let release!: (value: {
      bytes: Uint8Array;
      encrypted: boolean;
      pageCount?: number;
    }) => void;
    const decrypt = vi
      .fn()
      .mockRejectedValueOnce(
        new QpdfClientError('incorrect-password', 'The password is incorrect.'),
      )
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            release = resolve;
          }),
      );
    setQpdfClientForTests(mockClient({ decrypt }));

    await toolkitStore.loadPrimary(
      makePdfFile('secret.pdf', new Uint8Array([1])),
    );
    const pending = toolkitStore.unlockPrimary('later');
    toolkitStore.reset();
    release({ bytes: new Uint8Array([1, 2]), encrypted: false, pageCount: 1 });
    const result = await pending;
    expect(result).toMatchObject({ ok: false, code: 'cancelled' });
    expect(get(toolkitStore).sourceEncryption).toBe('unknown');
    expect(get(toolkitStore).originalSourceBytes).toBeNull();
  });

  it('stages add-open-password without storing the password in toolkit state', async () => {
    toolkitStore.insertBlank(-1);
    expect(get(toolkitStore).pages.length).toBeGreaterThan(0);

    const result = await toolkitStore.addOpenPassword('user-secret');
    expect(result.ok).toBe(true);
    expect(hasPendingOpenPasswordForTests()).toBe(true);
    const state = get(toolkitStore);
    expect(state.passwordExportMode).toBe('add-open-password');
    expect(JSON.stringify(state)).not.toContain('user-secret');
  });
});
