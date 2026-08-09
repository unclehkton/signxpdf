import type {
  BorderWidthId,
  TextColorId,
  TextFontId,
} from "../types";
import { ensureTextFontsLoaded } from "./fontLoader";
import { layoutTextObject } from "./layoutTextObject";
import type { TextPlacement } from "../types";

export interface TextPlacementDraft {
  text: string;
  fontId: TextFontId;
  colorId: TextColorId;
  borderEnabled: boolean;
  borderColorId: TextColorId;
  borderWidth: BorderWidthId;
}

export interface CreateTextPlacementArgs {
  draft: TextPlacementDraft;
  pageIndex: number;
  x: number;
  y: number;
  scale?: number;
}

export async function createTextPlacementFromDraft({
  draft,
  pageIndex,
  x,
  y,
  scale = 1,
}: CreateTextPlacementArgs): Promise<TextPlacement> {
  await ensureTextFontsLoaded([draft.fontId]);
  const layout = layoutTextObject({ ...draft, scale });

  return {
    id: crypto.randomUUID(),
    kind: "text",
    pageIndex,
    x: x - layout.boxWidthPx / 2,
    y: y - layout.boxHeightPx / 2,
    width: layout.boxWidthPx,
    height: layout.boxHeightPx,
    rotation: 0,
    scale,
    text: draft.text,
    fontId: draft.fontId,
    colorId: draft.colorId,
    borderEnabled: draft.borderEnabled,
    borderColorId: draft.borderColorId,
    borderWidth: draft.borderWidth,
  };
}
