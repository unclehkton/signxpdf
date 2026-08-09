import { describe, expect, it } from "vitest";
import {
  classifyQpdfError,
  isQpdfSuccessStatus,
  safeQpdfMessage,
} from "./qpdf-classify";

describe("qpdf-classify", () => {
  it("does not treat exit status 2 alone as incorrect-password", () => {
    expect(classifyQpdfError(2, "qpdf: error: unable to find trailer")).toBe(
      "malformed-pdf",
    );
    expect(classifyQpdfError(2, "encryption algorithm not supported")).toBe(
      "unsupported-encryption",
    );
    expect(classifyQpdfError(2, "something went wrong while writing")).toBe(
      "engine-failure",
    );
  });

  it("classifies incorrect password from stderr text", () => {
    expect(classifyQpdfError(2, "invalid password")).toBe("incorrect-password");
    expect(classifyQpdfError(2, "invalid password supplied")).toBe(
      "incorrect-password",
    );
  });

  it("treats status 0 as success and status 3 with output as success", () => {
    expect(isQpdfSuccessStatus(0, false)).toBe(true);
    expect(isQpdfSuccessStatus(0, true)).toBe(true);
    expect(isQpdfSuccessStatus(3, true)).toBe(true);
    expect(isQpdfSuccessStatus(3, false)).toBe(false);
    expect(isQpdfSuccessStatus(2, true)).toBe(false);
  });

  it("never puts stderr into safe user messages", () => {
    expect(safeQpdfMessage("incorrect-password")).not.toMatch(/stderr|qpdf:/i);
    expect(safeQpdfMessage("engine-failure")).toMatch(/failed/i);
  });
});
