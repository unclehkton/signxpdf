import type { Placement } from "../types";
import { getPdfLib } from "./runtime";
import { drawTextPlacement, resolveCenterRotatedPdfBox } from "./textOverlay";

export interface ExportArgs {
  originalBytes: Uint8Array;
  placements: Placement[];
  /** Map signatureId → PNG blob (with transparent background). */
  signatures: Map<string, Blob>;
}

export async function exportSignedPdf(args: ExportArgs): Promise<Uint8Array> {
  const { PDFDocument, degrees, rgb } = await getPdfLib();
  const pdf = await PDFDocument.load(args.originalBytes);
  const cache = new Map<string, Awaited<ReturnType<typeof pdf.embedPng>>>();

  for (const p of args.placements) {
    if (p.kind !== "text") {
      const blob = args.signatures.get(p.signatureId);
      if (!blob) continue;
      let img = cache.get(p.signatureId);
      if (!img) {
        const ab = await blob.arrayBuffer();
        img = await pdf.embedPng(new Uint8Array(ab));
        cache.set(p.signatureId, img);
      }
      const page = pdf.getPage(p.pageIndex);
      const { height: pageH } = page.getSize();
      const box = resolveCenterRotatedPdfBox(p, pageH);
      page.drawRectangle({
        x: box.x,
        y: box.y,
        width: p.width,
        height: p.height,
        color: rgb(1, 1, 1),
        rotate: degrees(p.rotation),
        borderWidth: 0,
      });
      page.drawImage(img, {
        x: box.x,
        y: box.y,
        width: p.width,
        height: p.height,
        rotate: degrees(p.rotation),
      });
      continue;
    }

    const page = pdf.getPage(p.pageIndex);
    await drawTextPlacement(pdf, page, p, degrees);
  }
  return pdf.save();
}

export function downloadPdf(bytes: Uint8Array, filename = "signed.pdf"): void {
  const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
