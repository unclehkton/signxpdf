import { afterEach, describe, expect, it, vi } from "vitest";
import {
  decryptDocument,
  encryptDocument,
  inspectEncryption,
  inspectWithQpdf,
  probePdfEncryption,
} from "./password-document";
import { setQpdfClientForTests, type QpdfClient } from "./qpdf-client";
import { QpdfClientError } from "./qpdf-worker.types";

function mockClient(impl: Partial<QpdfClient>): QpdfClient {
  return impl as QpdfClient;
}

function encoderPdfWithEncrypt(): Uint8Array {
  // Minimal PDF-like bytes that include an /Encrypt name for the cheap probe.
  return new TextEncoder().encode(
    "%PDF-1.7\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<< /Size 2 /Root 1 0 R /Encrypt 3 0 R >>\n%%EOF\n",
  );
}

function plainPdfBytes(): Uint8Array {
  return new TextEncoder().encode(
    "%PDF-1.7\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<< /Size 2 /Root 1 0 R >>\n%%EOF\n",
  );
}

describe("password-document", () => {
  afterEach(() => {
    setQpdfClientForTests(null);
  });

  it("probes encryption without calling the QPDF client (hint only)", () => {
    const inspect = vi.fn();
    setQpdfClientForTests(mockClient({ inspect }));

    expect(probePdfEncryption(encoderPdfWithEncrypt())).toBe(true);
    expect(probePdfEncryption(plainPdfBytes())).toBe(false);
    // Continues past /EncryptMetadata to a later /Encrypt key.
    const withMetadataFirst = new TextEncoder().encode(
      "%PDF-1.7\n/EncryptMetadata true\ntrailer\n<< /Encrypt 3 0 R >>\n%%EOF\n",
    );
    expect(probePdfEncryption(withMetadataFirst)).toBe(true);
    expect(inspectEncryption(encoderPdfWithEncrypt())).toEqual({
      ok: true,
      value: { encrypted: true },
    });
    expect(inspect).not.toHaveBeenCalled();
  });

  it("detects pdf-lib encryption errors", async () => {
    const { isPdfLibEncryptionError } = await import("./password-document");
    expect(
      isPdfLibEncryptionError(
        new Error("Input document to `PDFDocument.load` is encrypted."),
      ),
    ).toBe(true);
    expect(isPdfLibEncryptionError(new Error("Failed to parse PDF"))).toBe(false);
  });


  it("loads QPDF only for inspectWithQpdf / decrypt / encrypt", async () => {
    setQpdfClientForTests(
      mockClient({
        inspect: vi.fn(async () => ({
          bytes: new Uint8Array(),
          encrypted: true,
        })),
      }),
    );

    const result = await inspectWithQpdf(new Uint8Array([1]));
    expect(result).toEqual({ ok: true, value: { encrypted: true } });
  });

  it("maps incorrect password errors without echoing the password", async () => {
    setQpdfClientForTests(
      mockClient({
        decrypt: vi.fn(async () => {
          throw new QpdfClientError(
            "incorrect-password",
            "The password is incorrect.",
          );
        }),
      }),
    );

    const result = await decryptDocument(new Uint8Array([1]), "secret-value");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("incorrect-password");
      expect(result.message).not.toContain("secret-value");
    }
  });

  it("encrypts with a generated owner password that never leaves the helper", async () => {
    const encrypt = vi.fn(
      async (_bytes: Uint8Array, openPassword: string, ownerPassword: string) => {
        expect(openPassword).toBe("user-pass");
        expect(ownerPassword).toMatch(/^[0-9a-f]{64}$/);
        expect(ownerPassword).not.toBe(openPassword);
        return { bytes: new Uint8Array([9]), encrypted: true };
      },
    );
    setQpdfClientForTests(mockClient({ encrypt }));

    const result = await encryptDocument(new Uint8Array([1, 2]), "user-pass");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(Array.from(result.value.bytes)).toEqual([9]);
      expect(result.value.encrypted).toBe(true);
    }
    expect(encrypt).toHaveBeenCalledOnce();
  });
});
