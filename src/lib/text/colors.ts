export type TextColorValue = string;

export const TEXT_COLOR_PRESETS = [
  "#000000",
  "#374151",
  "#9CA3AF",
  "#FFFFFF",
  "#DC2626",
  "#EA580C",
  "#F97316",
  "#F59E0B",
  "#EAB308",
  "#65A30D",
  "#16A34A",
  "#059669",
  "#0D9488",
  "#0891B2",
  "#2563EB",
  "#4F46E5",
  "#7C3AED",
  "#9333EA",
  "#C026D3",
  "#DB2777",
] as const;

const HEX_COLOR_RE = /^#[0-9A-F]{6}$/;

export function normalizeHexColor(input: string): string {
  const stripped = input.trim().replace(/^#+/, "");
  return `#${stripped.toUpperCase().slice(0, 6)}`;
}

export function isValidHexColor(input: string): boolean {
  return HEX_COLOR_RE.test(normalizeHexColor(input));
}

export function getColorSwatchLabel(hex: string): string {
  return `Color ${normalizeHexColor(hex)}`;
}
