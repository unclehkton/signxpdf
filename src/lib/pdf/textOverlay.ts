import { renderTextObject } from "../text/renderTextObject";
import type { Placement, TextPlacement } from "../types";

const TEXT_EXPORT_DPI_SCALE = 300 / 72;
const TEXT_EXPORT_MAX_SIDE = 4096;
const TEXT_EXPORT_MAX_PIXELS = 12_000_000;

export function resolveTextRenderScale(placement: TextPlacement) {
  const bySide =
    TEXT_EXPORT_MAX_SIDE / Math.max(placement.width, placement.height, 1);
  const byArea = Math.sqrt(
    TEXT_EXPORT_MAX_PIXELS / Math.max(placement.width * placement.height, 1),
  );
  return Math.max(1, Math.min(TEXT_EXPORT_DPI_SCALE, bySide, byArea));
}

export function resolveCenterRotatedPdfBox(
  placement: Placement,
  pageHeight: number,
) {
  const angle = (placement.rotation * Math.PI) / 180;
  const halfWidth = placement.width / 2;
  const halfHeight = placement.height / 2;
  const centerX = placement.x + halfWidth;
  const centerY = pageHeight - placement.y - halfHeight;
  const rotatedCenterOffsetX =
    halfWidth * Math.cos(angle) - halfHeight * Math.sin(angle);
  const rotatedCenterOffsetY =
    halfWidth * Math.sin(angle) + halfHeight * Math.cos(angle);

  return {
    x: centerX - rotatedCenterOffsetX,
    y: centerY - rotatedCenterOffsetY,
  };
}

export async function drawTextPlacement(
  pdf: { embedPng: (bytes: Uint8Array) => Promise<any> },
  page: {
    getSize: () => { height: number };
    drawImage: (image: any, options: any) => void;
  },
  placement: TextPlacement,
  degrees: (angle: number) => any,
) {
  const rendered = await renderTextObject({
    text: placement.text,
    fontId: placement.fontId,
    colorId: placement.colorId,
    borderEnabled: placement.borderEnabled,
    borderColorId: placement.borderColorId,
    borderWidth: placement.borderWidth,
    scale: placement.scale,
    renderScale: resolveTextRenderScale(placement),
  });
  const bytes = new Uint8Array(await rendered.blob.arrayBuffer());
  const img = await pdf.embedPng(bytes);
  const { height: pageH } = page.getSize();
  const box = resolveCenterRotatedPdfBox(placement, pageH);

  page.drawImage(img, {
    x: box.x,
    y: box.y,
    width: placement.width,
    height: placement.height,
    rotate: degrees(placement.rotation),
  });
}
