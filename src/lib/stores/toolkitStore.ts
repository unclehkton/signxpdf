import { writable, get } from 'svelte/store';
import type { PageRef, TextPlacement } from '../types';
import {
  insertBlank as _insertBlank,
  deletePage as _deletePage,
  reorderPages as _reorderPages,
  mergeFrom as _mergeFrom,
  assembleDocument,
  compressToTarget,
} from '../pdf/PdfToolkit';
import { getPdfLib } from '../pdf/runtime';
import { isSupportedDocument, loadDocument } from '../pdf/loadDocument';
import { RateLimiter } from '../rate-limit/RateLimiter';
import { downloadPdf } from '../pdf/PdfExporter';
import { toast } from '../components/Toast.svelte';
import {
  decryptDocument,
  encryptDocument,
  isPdfLibEncryptionError,
  type SourceEncryption,
} from '../pdf/password-document';
import { terminateSharedQpdfClient } from '../pdf/qpdf-client';
import type { QpdfErrorCode } from '../pdf/qpdf-worker.types';

export interface CompressResultState {
  fromKB: number;
  toKB: number;
  reachedTarget: boolean;
}

export type PasswordExportMode = 'none' | 'remove-only' | 'add-open-password';

interface ToolkitState {
  pages: PageRef[];
  sources: Map<string, Uint8Array>;
  sourceNames: Map<string, string>;
  primaryFilename: string;
  compressedBytes: Uint8Array | null;
  saving: boolean;
  compressing: boolean;
  compressProgress: number;
  compressResult: CompressResultState | null;
  textPlacements: TextPlacement[];
  /** Original bytes of the primary document (memory only). */
  originalSourceBytes: Uint8Array | null;
  sourceEncryption: SourceEncryption;
  /** Direct QPDF output for password-only removal export. */
  passwordOnlyOutputBytes: Uint8Array | null;
  passwordExportMode: PasswordExportMode;
  passwordBusy: boolean;
  /**
   * QPDF decrypted successfully but pdf-lib cannot open the result for editing.
   * Save still works via password-only direct download.
   */
  editingUnavailable: boolean;
}

const initial: ToolkitState = {
  pages: [],
  sources: new Map(),
  sourceNames: new Map(),
  primaryFilename: 'document',
  compressedBytes: null,
  saving: false,
  compressing: false,
  compressProgress: 0,
  compressResult: null,
  textPlacements: [],
  originalSourceBytes: null,
  sourceEncryption: 'unknown',
  passwordOnlyOutputBytes: null,
  passwordExportMode: 'none',
  passwordBusy: false,
  editingUnavailable: false,
};

/** Bumped on reset / new primary load so in-flight password ops cannot resurrect state. */
let operationGeneration = 0;

function clearCompressed(state: ToolkitState): ToolkitState {
  return { ...state, compressedBytes: null, compressResult: null };
}

function reindexTextAfterReorder(
  placements: TextPlacement[],
  fromIndex: number,
  toIndex: number,
) {
  if (fromIndex === toIndex) return placements;
  return placements.map((placement) => {
    let pageIndex = placement.pageIndex;
    if (pageIndex === fromIndex) {
      pageIndex = toIndex;
    } else if (fromIndex < toIndex && pageIndex > fromIndex && pageIndex <= toIndex) {
      pageIndex -= 1;
    } else if (fromIndex > toIndex && pageIndex >= toIndex && pageIndex < fromIndex) {
      pageIndex += 1;
    }
    return { ...placement, pageIndex };
  });
}

function hasToolkitEdits(state: ToolkitState): boolean {
  if (state.textPlacements.length > 0) return true;
  if (state.compressedBytes) return true;
  if (state.pages.length === 0) return false;
  // Multiple sources or reordered/deleted pages vs a single original.
  if (state.sources.size !== 1) return true;
  const onlyKey = state.pages[0]?.sourceKey;
  if (!onlyKey || !state.sources.has(onlyKey)) return true;
  for (let i = 0; i < state.pages.length; i += 1) {
    const page = state.pages[i];
    if (!page || page.sourceKey !== onlyKey || page.pageIndex !== i) return true;
  }
  // Blank inserted pages have synthetic source keys without bytes in sources sometimes.
  return false;
}

function buildUnlockedState(
  decryptedBytes: Uint8Array,
  displayName: string,
  pageCount: number | undefined,
  pages: PageRef[],
  sources: Map<string, Uint8Array>,
  sourceNames: Map<string, string>,
  editingUnavailable: boolean,
): ToolkitState {
  return {
    ...initial,
    pages,
    sources,
    sourceNames,
    primaryFilename: displayName,
    originalSourceBytes: decryptedBytes,
    sourceEncryption: 'unencrypted',
    passwordOnlyOutputBytes: decryptedBytes,
    passwordExportMode: 'remove-only',
    editingUnavailable,
  };
}

/**
 * Apply a successful QPDF decryption.
 * Direct-removal bytes are stored immediately; pdf-lib is best-effort for editing.
 */
async function applyDecryptedDocument(
  decryptedBytes: Uint8Array,
  displayName: string,
  pageCountHint?: number,
): Promise<ToolkitState> {
  // P1.4: retain direct QPDF output even when pdf-lib cannot parse the result.
  try {
    const { PDFDocument } = await getPdfLib();
    const doc = await PDFDocument.load(decryptedBytes);
    const pageCount = doc.getPageCount();
    const sourceKey = crypto.randomUUID();
    const pages: PageRef[] = Array.from({ length: pageCount }, (_, i) => ({
      id: crypto.randomUUID(),
      sourceKey,
      pageIndex: i,
    }));
    return buildUnlockedState(
      decryptedBytes,
      displayName,
      pageCount,
      pages,
      new Map([[sourceKey, decryptedBytes]]),
      new Map([[sourceKey, displayName]]),
      false,
    );
  } catch {
    void pageCountHint;
    return buildUnlockedState(
      decryptedBytes,
      displayName,
      pageCountHint,
      [],
      new Map(),
      new Map(),
      true,
    );
  }
}

const _store = writable<ToolkitState>(initial);

export type PasswordActionResult =
  | { ok: true }
  | { ok: false; code: QpdfErrorCode; message: string };

export const toolkitStore = {
  subscribe: _store.subscribe,

  getState(): ToolkitState {
    return get(_store);
  },

  async loadPrimary(file: File): Promise<void> {
    if (!isSupportedDocument(file)) {
      toast('Please open a PDF or supported image (PNG, JPEG, WebP, HEIC, GIF, TIFF).', 'error');
      return;
    }

    operationGeneration += 1;
    const loadGeneration = operationGeneration;

    try {
      let bytes: Uint8Array;
      let displayName = file.name;
      const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
      if (isPdf) {
        bytes = new Uint8Array(await file.arrayBuffer());
      } else {
        const pdfDoc = await loadDocument(file);
        bytes = pdfDoc.bytes;
        displayName = file.name.replace(/\.[^.]+$/, '.pdf');
      }

      if (loadGeneration !== operationGeneration) return;

      const { PDFDocument } = await getPdfLib();
      try {
        const doc = await PDFDocument.load(bytes);
        if (loadGeneration !== operationGeneration) return;
        const pageCount = doc.getPageCount();
        const sourceKey = crypto.randomUUID();
        const pages: PageRef[] = Array.from({ length: pageCount }, (_, i) => ({
          id: crypto.randomUUID(),
          sourceKey,
          pageIndex: i,
        }));
        _store.set({
          ...initial,
          pages,
          sources: new Map([[sourceKey, bytes]]),
          sourceNames: new Map([[sourceKey, displayName]]),
          primaryFilename: displayName,
          originalSourceBytes: bytes,
          sourceEncryption: 'unencrypted',
        });
      } catch (loadError) {
        if (!isPdf || !isPdfLibEncryptionError(loadError)) {
          throw loadError;
        }

        // P1.2: try empty user password (common owner-only encryption) before prompting.
        _store.update((s) => ({ ...s, passwordBusy: true }));
        try {
          const emptyAttempt = await decryptDocument(bytes, '');
          if (loadGeneration !== operationGeneration) return;
          if (emptyAttempt.ok) {
            const unlocked = await applyDecryptedDocument(
              emptyAttempt.value.bytes,
              displayName,
              emptyAttempt.value.pageCount,
            );
            if (loadGeneration !== operationGeneration) return;
            _store.set(unlocked);
            return;
          }

          // Need a non-empty password from the user.
          if (loadGeneration !== operationGeneration) return;
          _store.set({
            ...initial,
            primaryFilename: displayName,
            originalSourceBytes: bytes,
            sourceEncryption: 'password-required',
          });
        } finally {
          if (loadGeneration === operationGeneration) {
            _store.update((s) => ({ ...s, passwordBusy: false }));
          }
        }
      }
    } catch (_e) {
      if (loadGeneration === operationGeneration) {
        toast("This file can't be opened. Try a PDF or a browser-supported image.", 'error');
      }
    }
  },

  async unlockPrimary(password: string): Promise<PasswordActionResult> {
    const current = get(_store);
    if (
      current.sourceEncryption !== 'password-required' ||
      !current.originalSourceBytes
    ) {
      return {
        ok: false,
        code: 'engine-failure',
        message: 'No encrypted PDF is waiting to be unlocked.',
      };
    }

    const opGeneration = operationGeneration;
    const sourceBytes = current.originalSourceBytes;
    const displayName = current.primaryFilename;

    _store.update((s) => ({ ...s, passwordBusy: true }));
    try {
      const decrypted = await decryptDocument(sourceBytes, password);
      if (opGeneration !== operationGeneration) {
        return {
          ok: false,
          code: 'cancelled',
          message: 'The PDF password operation was cancelled.',
        };
      }
      if (!decrypted.ok) {
        return { ok: false, code: decrypted.code, message: decrypted.message };
      }

      // P1.4: store direct QPDF output immediately; pdf-lib is optional for editing.
      const unlocked = await applyDecryptedDocument(
        decrypted.value.bytes,
        displayName,
        decrypted.value.pageCount,
      );
      if (opGeneration !== operationGeneration) {
        return {
          ok: false,
          code: 'cancelled',
          message: 'The PDF password operation was cancelled.',
        };
      }
      _store.set(unlocked);
      return { ok: true };
    } catch (_e) {
      if (opGeneration !== operationGeneration) {
        return {
          ok: false,
          code: 'cancelled',
          message: 'The PDF password operation was cancelled.',
        };
      }
      return {
        ok: false,
        code: 'engine-failure',
        message: 'The PDF password engine failed.',
      };
    } finally {
      password = '';
      if (opGeneration === operationGeneration) {
        _store.update((s) => ({ ...s, passwordBusy: false }));
      }
    }
  },

  async mergePdfs(files: FileList): Promise<void> {
    // Snapshot to Array before the first await — FileList is a live reference
    // tied to the input element; input.value='' in the caller clears it before
    // this function resumes after the first await.
    const fileArray = Array.from(files);
    const { PDFDocument } = await getPdfLib();
    const current = get(_store);
    if (current.sourceEncryption === 'password-required') {
      toast('Unlock the encrypted PDF before merging other files.', 'error');
      return;
    }
    let pages = current.pages;
    const sources = new Map(current.sources);
    const sourceNames = new Map(current.sourceNames);
    let skipped = 0;

    for (const file of fileArray) {
      if (!isSupportedDocument(file)) {
        skipped++;
        continue;
      }
      try {
        let bytes: Uint8Array;
        let dis…724 tokens truncated…asswordExportMode: s.passwordExportMode === 'remove-only' ? 'none' : s.passwordExportMode,
        passwordOnlyOutputBytes:
          s.passwordExportMode === 'remove-only' ? null : s.passwordOnlyOutputBytes,
        editingUnavailable: s.passwordExportMode === 'remove-only' ? false : s.editingUnavailable,
      });
    });
  },

  reorderPages(fromIndex: number, toIndex: number): void {
    _store.update((s) =>
      clearCompressed({
        ...s,
        pages: _reorderPages(s.pages, fromIndex, toIndex),
        textPlacements: reindexTextAfterReorder(s.textPlacements, fromIndex, toIndex),
        passwordExportMode: s.passwordExportMode === 'remove-only' ? 'none' : s.passwordExportMode,
        passwordOnlyOutputBytes:
          s.passwordExportMode === 'remove-only' ? null : s.passwordOnlyOutputBytes,
        editingUnavailable: s.passwordExportMode === 'remove-only' ? false : s.editingUnavailable,
      }),
    );
  },

  addTextPlacement(placement: TextPlacement): void {
    _store.update((s) =>
      clearCompressed({
        ...s,
        textPlacements: [...s.textPlacements, placement],
        passwordExportMode: s.passwordExportMode === 'remove-only' ? 'none' : s.passwordExportMode,
        passwordOnlyOutputBytes:
          s.passwordExportMode === 'remove-only' ? null : s.passwordOnlyOutputBytes,
        editingUnavailable: false,
      }),
    );
  },

  removeTextPlacement(id: string): void {
    _store.update((s) =>
      clearCompressed({
        ...s,
        textPlacements: s.textPlacements.filter((p) => p.id !== id),
      }),
    );
  },

  async compress(targetKB: number): Promise<void> {
    const current = get(_store);
    if (current.pages.length === 0) return;
    if (current.sourceEncryption === 'password-required') {
      toast('Unlock the encrypted PDF before compressing.', 'error');
      return;
    }
    if (current.editingUnavailable) {
      toast('This PDF can be downloaded after password removal, but editing is unavailable.', 'error');
      return;
    }

    _store.update((s) => ({
      ...s,
      compressing: true,
      compressProgress: 0,
      compressResult: null,
    }));

    try {
      const { pages, sources } = get(_store);

      const result = await compressToTarget(
        pages,
        sources,
        targetKB,
        (pct) => _store.update((s) => ({ ...s, compressProgress: pct })),
        get(_store).textPlacements,
      );

      _store.update((s) => ({
        ...s,
        compressing: false,
        compressProgress: 1,
        compressedBytes: result.bytes,
        compressResult: {
          fromKB: result.originalKB,
          toKB: result.achievedKB,
          reachedTarget: result.reachedTarget,
        },
        passwordExportMode: s.passwordExportMode === 'remove-only' ? 'none' : s.passwordExportMode,
        passwordOnlyOutputBytes: null,
        editingUnavailable: false,
      }));

      if (!result.reachedTarget) {
        toast(
          `Smallest achievable: ${Math.round(result.achievedKB)} KB. Try a higher target.`,
          'info',
        );
      }
    } catch (_e) {
      _store.update((s) => ({ ...s, compressing: false }));
      toast('Compression failed.', 'error');
    }
  },

  async removePassword(password: string): Promise<PasswordActionResult> {
    const current = get(_store);
    if (current.sourceEncryption === 'password-required' && current.originalSourceBytes) {
      return this.unlockPrimary(password);
    }

    // Already unlocked document: re-decrypt original path not needed; treat as
    // mark for password-only export if we still hold decrypted original bytes.
    if (current.passwordOnlyOutputBytes && current.passwordExportMode === 'remove-only') {
      return { ok: true };
    }

    if (!current.originalSourceBytes) {
      return {
        ok: false,
        code: 'engine-failure',
        message: 'No PDF is loaded for password removal.',
      };
    }

    const opGeneration = operationGeneration;
    _store.update((s) => ({ ...s, passwordBusy: true }));
    try {
      // Prefer pdf-lib to decide whether re-decrypt is needed (not the byte probe).
      try {
        const { PDFDocument } = await getPdfLib();
        await PDFDocument.load(current.originalSourceBytes);
        if (opGeneration !== operationGeneration) {
          return {
            ok: false,
            code: 'cancelled',
            message: 'The PDF password operation was cancelled.',
          };
        }
        // Already unencrypted in memory — stage direct export of those bytes.
        _store.update((s) => ({
          ...s,
          passwordOnlyOutputBytes: s.originalSourceBytes,
          passwordExportMode: 'remove-only',
        }));
        return { ok: true };
      } catch (loadError) {
        if (!isPdfLibEncryptionError(loadError)) {
          // pdf-lib cannot parse; if we already have remove-only bytes, keep them.
          if (current.passwordOnlyOutputBytes) {
            return { ok: true };
          }
          return {
            ok: false,
            code: 'engine-failure',
            message: 'The PDF password engine failed.',
          };
        }
      }

      // Encrypted → load QPDF WASM only now (user invoked password removal).
      const decrypted = await decryptDocument(current.originalSourceBytes, password);
      if (opGeneration !== operationGeneration) {
        return {
          ok: false,
          code: 'cancelled',
          message: 'The PDF password operation was cancelled.',
        };
      }
      if (!decrypted.ok) {
        return { ok: false, code: decrypted.code, message: decrypted.message };
      }
      _store.update((s) => ({
        ...s,
        passwordOnlyOutputBytes: decrypted.value.bytes,
        passwordExportMode: 'remove-only',
        originalSourceBytes: decrypted.value.bytes,
        sourceEncryption: 'unencrypted',
      }));
      return { ok: true };
    } finally {
      password = '';
      if (opGeneration === operationGeneration) {
        _store.update((s) => ({ ...s, passwordBusy: false }));
      }
    }
  },

  async addOpenPassword(openPassword: string): Promise<PasswordActionResult> {
    const current = get(_store);
    if (current.sourceEncryption === 'password-required') {
      return {
        ok: false,
        code: 'engine-failure',
        message: 'Unlock the encrypted PDF before adding a new password.',
      };
    }
    if (current.editingUnavailable && current.pages.length === 0) {
      return {
        ok: false,
        code: 'engine-failure',
        message: 'This PDF can be downloaded after password removal, but re-protecting requires an editable document.',
      };
    }
    if (current.pages.length === 0 && !current.originalSourceBytes) {
      return {
        ok: false,
        code: 'engine-failure',
        message: 'Open a PDF before adding a password.',
      };
    }
    // pages without originalSourceBytes (e.g. blank-only) still allow staging;
    // save() will assemble then encrypt.
    if (!openPassword) {
      return {
        ok: false,
        code: 'engine-failure',
        message: 'Enter a password.',
      };
    }

    _store.update((s) => ({
      ...s,
      passwordBusy: true,
      passwordExportMode: 'add-open-password',
      passwordOnlyOutputBytes: null,
    }));

    // Passwords stay out of store state; the open password is only used at save().
    // Stash in a module-private variable for the next save call.
    pendingOpenPassword = openPassword;
    _store.update((s) => ({ ...s, passwordBusy: false }));
    return { ok: true };
  },

  clearPendingPasswordAction(): void {
    pendingOpenPassword = '';
    _store.update((s) => ({
      ...s,
      passwordExportMode: 'none',
      passwordOnlyOutputBytes: null,
    }));
  },

  async save(): Promise<void> {
    const limiter = new RateLimiter();
    if (!limiter.canExport()) {
      const t = limiter.resetTime();
      toast(`Daily limit reached. Try again at ${t?.toLocaleTimeString() ?? 'tomorrow'}.`, 'error');
      return;
    }

    const current = get(_store);
    if (current.sourceEncryption === 'password-required') {
      toast('Enter the PDF password before saving.', 'error');
      return;
    }
    if (current.pages.length === 0 && current.passwordExportMode !== 'remove-only') {
      toast('A PDF needs at least one page.', 'error');
      return;
    }

    _store.update((s) => ({ ...s, saving: true }));
    try {
      let bytes: Uint8Array;

      if (
        current.passwordExportMode === 'remove-only' &&
        current.passwordOnlyOutputBytes &&
        !hasToolkitEdits(current)
      ) {
        // Direct QPDF-decrypted original — no assemble/compress path.
        bytes = current.passwordOnlyOutputBytes;
      } else if (current.passwordExportMode === 'add-open-password') {
        const openPassword = pendingOpenPassword;
        if (!openPassword) {
          toast('Enter a password before protecting the PDF.', 'error');
          return;
        }
        let sourceBytes: Uint8Array;
        if (current.compressedBytes) {
          sourceBytes = current.compressedBytes;
        } else if (!hasToolkitEdits(current) && current.originalSourceBytes) {
          sourceBytes = current.originalSourceBytes;
        } else {
          sourceBytes = await assembleDocument(
            current.pages,
            current.sources,
            current.textPlacements,
          );
        }
        const encrypted = await encryptDocument(sourceBytes, openPassword);
        pendingOpenPassword = '';
        if (!encrypted.ok) {
          toast(encrypted.message, 'error');
          return;
        }
        bytes = encrypted.value.bytes;
      } else {
        bytes =
          current.compressedBytes ??
          (await assembleDocument(current.pages, current.sources, current.textPlacements));
      }

      const filename = current.primaryFilename.replace(/\.pdf$/i, '') + '-tools.pdf';
      downloadPdf(bytes, filename);
      limiter.recordExport();
      toast('PDF saved.');
      _store.update((s) => ({
        ...s,
        passwordExportMode: 'none',
        passwordOnlyOutputBytes: null,
      }));
    } catch (_e) {
      toast('Save failed — try fewer pages or a higher compression target.', 'error');
    } finally {
      pendingOpenPassword = '';
      _store.update((s) => ({ ...s, saving: false }));
    }
  },

  reset(): void {
    operationGeneration += 1;
    pendingOpenPassword = '';
    terminateSharedQpdfClient();
    _store.set(initial);
  },
};

/** Module-private; never written into Svelte store state. */
let pendingOpenPassword = '';

/** Test-only: observe whether a password is staged without reading its value. */
export function hasPendingOpenPasswordForTests(): boolean {
  return pendingOpenPassword.length > 0;
}

/** Test-only: current operation generation. */
export function getOperationGenerationForTests(): number {
  return operationGeneration;
}
