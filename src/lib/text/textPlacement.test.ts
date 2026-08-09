import { describe, expect, it } from "vitest";

import { createTextPlacementFromDraft } from "./textPlacement";

describe("createTextPlacementFromDraft", () => {
  it("creates independent text placements from the same draft", async () => {
    const draft = {
      text: "Paid",
      fontId: "source-serif" as const,
      colorId: "#000000" as const,
      borderEnabled: false,
      borderColorId: "#000000" as const,
      borderWidth: 1 as const,
    };

    const first = await createTextPlacementFromDraft({
      draft,
      pageIndex: 0,
      x: 100,
      y: 120,
    });
    const second = await createTextPlacementFromDraft({
      draft,
      pageIndex: 0,
      x: 160,
      y: 180,
    });

    expect(first.id).not.toBe(second.id);
    expect(first.text).toBe("Paid");
    expect(second.text).toBe("Paid");
    expect(first.x).not.toBe(second.x);
    expect(first.y).not.toBe(second.y);
  });
});
