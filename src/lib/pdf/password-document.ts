import { getQpdfClient } from "./qpdf-client";
import { QpdfClientError, type QpdfErrorCode } from "./qpdf-worker.types";

export type SourceEncryption = "unknown" | "unencrypted" | "password-required";

export interface PasswordResult {
  bytes: Uint8Array;
  encrypted: boolean;
  pageCount?: number;
}

export type PasswordFailure = {
  ok: false;
  code: QpdfErrorCode;
  message: string;
};

export type PasswordSuccess<T> = { ok: true; value: T };
export type PasswordOutcome<T> = PasswordSuccess<T> | PasswordFailure;

function asFailure(error: unknown): PasswordFailure {
  if (error instanceof QpdfClientError) {
    return { ok: false, code: error.code, message: error.message };
  }
  return {
    ok: false,
    code: "engine-failure",
    message: "The PDF password engine failed.",
  };
}

const ENCRYPT_TOKEN = new TextEncoder().encode("/Encrypt");

/**
 * Cheap, synchronous encryption **hint** that never loads QPDF WASM.
 *
 * Scans the PDF head and trailer for a `/Encrypt` dictionary reference.
 * Must never be treated as authoritative — use pdf-lib load errors (or QPDF)
 * for open/merge decisions. Kept for diagnostics and optional optimisations.
 */
export function probePdfEncryption(bytes: Uint8Array): boolean {
  if (bytes.length < 8) return false;

  const windows: Array<{ start: number; end: number }> = [
    { start: 0, end: Math.min(bytes.length, 64 * 1024) },
  ];
  if (bytes.length > 64 * 1024) {
    windows.push({
      start: Math.max(0, bytes.length - 256 * 1024),
      end: bytes.length,
    });
  }

  for (const { start, end } of windows) {
    let from = start;
    while (from <= end - ENCRYPT_TOKEN.length) {
      const index = indexOfBytes(bytes, ENCRYPT_TOKEN, from, end);
      if (index < 0) break;
      const next = bytes[index + ENCRYPT_TOKEN.length];
      // After /Encrypt expect whitespace, <<, /, [, or digit (object ref).
      // Skip longer names such as /EncryptMetadata by requiring a boundary.
      if (
        next === undefined ||
        next === 0x20 || // space
        next === 0x0a || // \n
        next === 0x0d || // \r
        next === 0x09 || // \t
        next === 0x3c || // <
        next === 0x2f || // /
        next === 0x5b || // [
        (next >= 0x30 && next <= 0x39) // 0-9
      ) {
        return true;
      }
      from = index + 1;
    }
  }
  return false;
}

function indexOfBytes(
  haystack: Uint8Array,
  needle: Uint8Array,
  start: number,
  end: number,
): number {
  outer: for (let i = start; i <= end - needle.length; i += 1) {
    for (let j = 0; j < needle.length; j += 1) {
      if (haystack[i + j] !== needle[j]) continue outer;
    }
    return i;
  }
  return -1;
}

/** True when pdf-lib refused the file because it is encrypted. */
export function isPdfLibEncryptionError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /encrypt|password/i.test(message);
}

/**
 * Encryption hint only — **does not** start the QPDF worker.
 * Prefer {@link isPdfLibEncryptionError} after `PDFDocument.load` for decisions.
 */
export function inspectEncryption(
  bytes: Uint8Array,
): PasswordOutcome<{ encrypted: boolean }> {
  return { ok: true, value: { encrypted: probePdfEncryption(bytes) } };
}

/**
 * Full QPDF inspect. Loads WASM on first use.
 */
export async function inspectWithQpdf(
  bytes: Uint8Array,
): Promise<PasswordOutcome<{ encrypted: boolean }>> {
  try {
    const result = await getQpdfClient().inspect(bytes);
    return { ok: true, value: { encrypted: result.encrypted } };
  } catch (error) {
    return asFailure(error);
  }
}

/** Loads QPDF WASM (first call only) and decrypts. */
export async function decryptDocument(
  bytes: Uint8Array,
  password: string,
): Promise<PasswordOutcome<PasswordResult>> {
  try {
    const result = await getQpdfClient().decrypt(bytes, password);
    return {
      ok: true,
      value: {
        bytes: result.bytes,
        encrypted: false,
        pageCount: result.pageCount,
      },
    };
  } catch (error) {
    return asFailure(error);
  } finally {
    password = "";
  }
}

/** Loads QPDF WASM (first call only) and encrypts with AES-256. */
export async function encryptDocument(
  bytes: Uint8Array,
  openPassword: string,
): Promise<PasswordOutcome<PasswordResult>> {
  const ownerBytes = new Uint8Array(32);
  crypto.getRandomValues(ownerBytes);
  let ownerPassword = Array.from(ownerBytes, (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
  let open = openPassword;

  try {
    const result = await getQpdfClient().encrypt(bytes, open, ownerPassword);
    return {
      ok: true,
      value: {
        bytes: result.bytes,
        encrypted: true,
      },
    };
  } catch (error) {
    return asFailure(error);
  } finally {
    open = "";
    ownerPassword = "";
  }
}
