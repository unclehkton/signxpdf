export type PasswordOperation =
  | { kind: "inspect" }
  | { kind: "encrypt"; openPassword: string; ownerPassword: string }
  | { kind: "decrypt"; password: string };

export type QpdfErrorCode =
  | "incorrect-password"
  | "unsupported-encryption"
  | "malformed-pdf"
  | "engine-failure"
  | "cancelled";

export interface QpdfWorkerRequest {
  id: string;
  bytes: ArrayBuffer;
  operation: PasswordOperation;
}

export interface QpdfWorkerSuccess {
  id: string;
  ok: true;
  bytes: ArrayBuffer;
  encrypted: boolean;
  pageCount?: number;
}

export interface QpdfWorkerFailure {
  id: string;
  ok: false;
  code: QpdfErrorCode;
  message: string;
}

export type QpdfWorkerResponse = QpdfWorkerSuccess | QpdfWorkerFailure;

export class QpdfClientError extends Error {
  readonly code: QpdfErrorCode;

  constructor(code: QpdfErrorCode, message: string) {
    super(message);
    this.name = "QpdfClientError";
    this.code = code;
  }
}
