import {
  TEXT_FONT_FAMILIES,
  TEXT_FONT_SIZE_PX,
  TEXT_LINE_HEIGHT,
  TEXT_PADDING_PX,
  type BorderWidthId,
  type TextColorId,
  type TextFontId,
} from "./fonts";

export interface LayoutTextInput {
  text: string;
  fontId: TextFontId;
  colorId: TextColorId;
  borderEnabled: boolean;
  borderColorId: TextColorId;
  borderWidth: BorderWidthId;
  scale: number;
}

export interface TextLayout {
  lines: string[];
  fontFamily: string;
  fontSizePx: number;
  lineHeightPx: number;
  paddingPx: number;
  contentWidthPx: number;
  contentHeightPx: number;
  boxWidthPx: number;
  boxHeightPx: number;
}

function estimateLineWidth(line: string, fontSizePx: number) {
  return Math.max(1, line.length) * fontSizePx * 0.62;
}

export function layoutTextObject(input: LayoutTextInput): TextLayout {
  const lines = input.text.split("\n");
  const fontSizePx = TEXT_FONT_SIZE_PX;
  const lineHeightPx = Math.round(fontSizePx * TEXT_LINE_HEIGHT);
  const paddingPx = TEXT_PADDING_PX;
  const borderInsetPx = input.borderEnabled ? input.borderWidth : 0;
  const contentWidthPx = Math.max(
    ...lines.map((line) => estimateLineWidth(line, fontSizePx)),
  );
  const contentHeightPx = Math.max(lineHeightPx, lines.length * lineHeightPx);
  const boxWidthPx =
    (contentWidthPx + (paddingPx + borderInsetPx) * 2) * input.scale;
  const boxHeightPx =
    (contentHeightPx + (paddingPx + borderInsetPx) * 2) * input.scale;

  return {
    lines,
    fontFamily: TEXT_FONT_FAMILIES[input.fontId],
    fontSizePx,
    lineHeightPx,
    paddingPx,
    contentWidthPx,
    contentHeightPx,
    boxWidthPx,
    boxHeightPx,
  };
}
