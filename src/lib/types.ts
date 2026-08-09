import type { TextColorValue } from "./text/colors";

export interface Signature {
  id: string;
  name: string;
  blob: Blob;
  width?: number;
  height?: number;
  createdAt: number;
}

export interface PlacementBase {
  id: string;
  pageIndex: number; // 0-based
  x: number; // PDF user-space units (origin top-left for our convenience; convert at export)
  y: number;
  width: number;
  height: number;
  rotation: number; // degrees, clockwise
}

export interface SignaturePlacement extends PlacementBase {
  kind: "signature";
  signatureId: string;
}

export type TextFontId = "source-serif" | "source-sans" | "courier-prime";
export type TextColorId = TextColorValue;
export type BorderWidthId = 1 | 2 | 3;

export interface TextPlacement extends PlacementBase {
  kind: "text";
  text: string;
  fontId: TextFontId;
  colorId: TextColorValue;
  borderEnabled: boolean;
  borderColorId: TextColorValue;
  borderWidth: BorderWidthId;
  scale: number;
}

export type Placement = SignaturePlacement | TextPlacement;
export type ActiveTool = "select" | "signature" | "text";

export interface PdfDoc {
  file: File;
  pageCount: number;
  bytes: Uint8Array;
}

export interface PageRef {
  id: string; // crypto.randomUUID() — stable drag/key identity
  sourceKey: string; // UUID assigned when source PDF is first loaded; 'blank' for inserted blank pages
  pageIndex: number; // 0-based index within the source PDF (ignored for blank pages)
}

export type ExtractorParams = {
  /** 0..255; if undefined, Otsu auto-threshold is used */
  threshold?: number;
  /** smooth edges with 1-pixel feather */
  smoothEdges: boolean;
};

export type ExtractorResult = {
  pngBlob: Blob;
  width: number;
  height: number;
  appliedThreshold: number;
};

export class LimitReachedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LimitReachedError";
  }
}
