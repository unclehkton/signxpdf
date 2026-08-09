import { TEXT_COLOR_PRESETS, type TextColorValue } from "./colors";

export type TextFontId = "source-serif" | "source-sans" | "courier-prime";
export type TextColorId = TextColorValue;
export type BorderWidthId = 1 | 2 | 3;

export const TEXT_FONT_LABELS: Record<TextFontId, string> = {
  "source-serif": "Source Serif 4",
  "source-sans": "Source Sans 3",
  "courier-prime": "Courier Prime",
};

export const TEXT_FONT_FAMILIES: Record<TextFontId, string> = {
  "source-serif": '"Source Serif 4", "Times New Roman", Times, serif',
  "source-sans": '"Source Sans 3", "Segoe UI", Arial, sans-serif',
  "courier-prime": '"Courier Prime", "Courier New", monospace',
};

export const TEXT_COLOR_VALUES = Object.fromEntries(
  TEXT_COLOR_PRESETS.map((hex) => [hex, hex]),
) as Record<TextColorValue, string>;

export const TEXT_BORDER_WIDTH_LABELS: Record<BorderWidthId, string> = {
  1: "Thin",
  2: "Medium",
  3: "Bold",
};

export const TEXT_PADDING_PX = 8;
export const TEXT_FONT_SIZE_PX = 24;
export const TEXT_LINE_HEIGHT = 1.25;
