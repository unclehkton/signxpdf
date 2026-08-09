import { writable } from "svelte/store";
import type { ActiveTool, PdfDoc, Placement } from "../types";

interface EditorState {
  pdf: PdfDoc | null;
  placements: Placement[];
  activeSignatureId: string | null;
  activeTool: ActiveTool;
  selectedPlacementId: string | null;
}

const initial: EditorState = {
  pdf: null,
  placements: [],
  activeSignatureId: null,
  activeTool: "select",
  selectedPlacementId: null,
};

function create() {
  const { subscribe, update, set } = writable<EditorState>(initial);
  return {
    subscribe,
    setPdf(pdf: PdfDoc | null) {
      update((s) => ({
        ...s,
        pdf,
        placements: [],
        selectedPlacementId: null,
        activeTool: s.activeSignatureId ? "signature" : "select",
      }));
    },
    setActiveSignature(id: string | null) {
      update((s) => ({
        ...s,
        activeSignatureId: id,
        activeTool: id ? "signature" : s.activeTool,
      }));
    },
    setActiveTool(tool: ActiveTool) {
      update((s) => ({ ...s, activeTool: tool }));
    },
    addPlacement(p: Placement) {
      update((s) => ({
        ...s,
        placements: [...s.placements, p],
        selectedPlacementId: p.id,
      }));
    },
    updatePlacement(id: string, patch: Partial<Placement>) {
      update((s) => ({
        ...s,
        placements: s.placements.map((p) =>
          p.id === id ? ({ ...p, ...patch } as Placement) : p,
        ),
      }));
    },
    removePlacement(id: string) {
      update((s) => ({
        ...s,
        placements: s.placements.filter((p) => p.id !== id),
        selectedPlacementId:
          s.selectedPlacementId === id ? null : s.selectedPlacementId,
      }));
    },
    select(id: string | null) {
      update((s) => ({ ...s, selectedPlacementId: id }));
    },
    reset() {
      set(initial);
    },
  };
}

export const editorStore = create();
