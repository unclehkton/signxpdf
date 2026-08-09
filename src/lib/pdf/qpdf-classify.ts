import type { QpdfErrorCode } from "./qpdf-worker.types";

/**
 * QPDF exit statuses (CLI docs):
 * - 0: success
 * - 2: general processing error (NOT specifically incorrect password)
 * - 3: warnings were issued, but no errors
 */
export function isQpdfSuccessStatus(
  status: number,
  outputExists: boolean,
): boolean {
  if (status === 0) return true;
  // Recoverable warnings: keep output when QPDF produced a file.
  if (status === 3 && outputExists) return true;
  return false;
}

/**
 * Classify a failed QPDF run from stderr text.
 * Never treats exit status 2 alone as an incorrect password.
 */
export function classifyQpdfError(
  _status: number,
  stderr: string,
): QpdfErrorCode {
  const text = stderr.toLowerCase();

  if (
    text.includes("invalid password") ||
    text.includes("incorrect password") ||
    text.includes("password is incorrect") ||
    text.includes("invalid password supplied") ||
    text.includes("password required") ||
    (text.includes("password") &&
      (text.includes("incorrect") ||
        text.includes("invalid") ||
        text.includes("wrong") ||
        text.includes("authentication")))
  ) {
    return "incorrect-password";
  }

  if (
    (text.includes("unsupported") || text.includes("not supported")) &&
    (text.includes("encrypt") ||
      text.includes("security") ||
      text.includes("algorithm") ||
      text.includes("cipher") ||
      text.includes("r=") ||
      text.includes("revision"))
  ) {
    return "unsupported-encryption";
  }

  if (
    text.includes("not a pdf") ||
    text.includes("isn't a pdf") ||
    text.includes("may not be a pdf") ||
    text.includes("unable to find trailer") ||
    text.includes("damaged") ||
    text.includes("file is damaged") ||
    text.includes("not a valid pdf") ||
    text.includes("xref") ||
    text.includes("malformed")
  ) {
    return "malformed-pdf";
  }

  return "engine-failure";
}

export function safeQpdfMessage(code: QpdfErrorCode): string {
  switch (code) {
    case "incorrect-password":
      return "The password is incorrect.";
    case "unsupported-encryption":
      return "This PDF uses unsupported encryption.";
    case "malformed-pdf":
      return "This file is not a valid PDF.";
    case "cancelled":
      return "The PDF password operation was cancelled.";
    default:
      return "The PDF password engine failed.";
  }
}
