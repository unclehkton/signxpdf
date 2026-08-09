import { ensureTextFontsLoaded } from "./fontLoader";
import { type BorderWidthId, type TextColorId, type TextFontId } from "./fonts";
import { layoutTextObject, type TextLayout } from "./layoutTextObject";

export interface RenderTextInput {
  text: string;
  fontId: TextFontId;
  colorId: TextColorId;
  borderEnabled: boolean;
  borderColorId: TextColorId;
  borderWidth: BorderWidthId;
  scale: number;
  renderScale: number;
}

export interface RenderedTextObject {
  blob: Blob;
  width: number;
  height: number;
  layout: TextLayout;
}

const TRANSPARENT_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

function makeTransparentPngBlob() {
  const bytes = Uint8Array.from(atob(TRANSPARENT_PNG_BASE64), (char) =>
    char.charCodeAt(0),
  );
  return new Blob([bytes], { type: "image/png" });
}

function getCanvas2dContext(canvas: HTMLCanvasElement) {
  if (
    typeof navigator !== "undefined" &&
    navigator.userAgent.includes("jsdom")
  ) {
    return null;
  }
  return canvas.getContext("2d");
}

async function canvasToPngBlob(canvas: HTMLCanvasElement) {
  if (typeof canvas.toBlob === "function") {
    try {
      const blob = await new Promise<Blob | null>((resolve, reject) => {
        try {
          canvas.toBlob((result) => resolve(result), "image/png");
        } catch (error) {
          reject(error);
        }
      });
      if (blob) return blob;
    } catch {
      return makeTransparentPngBlob();
    }
  }

  return makeTransparentPngBlob();
}

export async function renderTextObject(
  input: RenderTextInput,
): Promise<RenderedTextObject> {
  await ensureTextFontsLoaded([input.fontId]);

  const layout = layoutTextObject(input);
  const width = Math.max(1, Math.ceil(layout.boxWidthPx * input.renderScale));
  const height = Math.max(1, Math.ceil(layout.boxHeightPx * input.renderScale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = getCanvas2dContext(canvas);
  if (!context) {
    return {
      blob: makeTransparentPngBlob(),
      width,
      height,
      layout,
    };
  }

  if (context) {
    context.clearRect(0, 0, width, height);
    context.scale(input.renderScale, input.renderScale);
    context.font = `${layout.fontSizePx}px ${layout.fontFamily}`;
    context.fillStyle = input.colorId;
    context.textBaseline = "top";

    if (input.borderEnabled) {
      context.strokeStyle = input.borderColorId;
      context.lineWidth = input.borderWidth;
      context.strokeRect(
        input.borderWidth / 2,
        input.borderWidth / 2,
        Math.max(1, layout.boxWidthPx - input.borderWidth),
        Math.max(1, layout.boxHeightPx - input.borderWidth),
      );
    }

    const originX =
      layout.paddingPx + (input.borderEnabled ? input.borderWidth : 0);
    const originY =
      layout.paddingPx + (input.borderEnabled ? input.borderWidth : 0);

    layout.lines.forEach((line, index) => {
      context.fillText(
        line || " ",
        originX,
        originY + index * layout.lineHeightPx,
      );
    });
  }

  return {
    blob: await canvasToPngBlob(canvas),
    width,
    height,
    layout,
  };
}
