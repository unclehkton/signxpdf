<script lang="ts">
  import { onDestroy } from "svelte";
  import { editorStore } from "../stores/editorStore";
  import { t } from "../i18n";
  import { TEXT_FONT_FAMILIES } from "../text/fonts";
  import { layoutTextObject } from "../text/layoutTextObject";
  import type { Placement, Signature, TextPlacement } from "../types";

  export let pageIndex: number;
  export let pageScale: number;
  export let signatures: Signature[];

  let placements: Placement[] = [];
  let selectedId: string | null = null;
  editorStore.subscribe((s) => {
    placements = s.placements;
    selectedId = s.selectedPlacementId;
  });

  const blobUrls = new Map<string, string>();
  $: {
    const active = new Set(signatures.map((s) => s.id));
    signatures.forEach((s) => {
      if (!blobUrls.has(s.id)) blobUrls.set(s.id, URL.createObjectURL(s.blob));
    });
    for (const [id, url] of blobUrls.entries()) {
      if (!active.has(id)) {
        URL.revokeObjectURL(url);
        blobUrls.delete(id);
      }
    }
  }

  function getUrl(id: string): string {
    return blobUrls.get(id) ?? "";
  }

  let dragging: {
    id: string;
    ox: number;
    oy: number;
    mode: "move" | "resize" | "rotate";
  } | null = null;

  function onPointerDown(
    e: PointerEvent,
    p: Placement,
    mode: "move" | "resize" | "rotate",
  ) {
    e.stopPropagation();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    dragging = { id: p.id, ox: e.clientX, oy: e.clientY, mode };
    editorStore.select(p.id);
    editorStore.setActiveTool("select");
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragging) return;
    const dx = (e.clientX - dragging.ox) / pageScale;
    const dy = (e.clientY - dragging.oy) / pageScale;
    const p = placements.find((x) => x.id === dragging!.id);
    if (!p) return;
    if (dragging.mode === "move") {
      editorStore.updatePlacement(p.id, { x: p.x + dx, y: p.y + dy });
    } else if (dragging.mode === "resize") {
      if (p.kind === "text") {
        const natural = layoutTextObject({ ...p, scale: 1 });
        const nextScale = Math.max(
          0.5,
          (p.width + dx) / Math.max(1, natural.boxWidthPx),
        );
        editorStore.updatePlacement(p.id, {
          scale: nextScale,
          width: natural.boxWidthPx * nextScale,
          height: natural.boxHeightPx * nextScale,
        });
      } else {
        const ratio = p.height / Math.max(1, p.width);
        const w = Math.max(20, p.width + dx);
        editorStore.updatePlacement(p.id, { width: w, height: w * ratio });
      }
    } else if (dragging.mode === "rotate") {
      editorStore.updatePlacement(p.id, {
        rotation: (p.rotation + dx * 0.5) % 360,
      });
    }
    dragging = { ...dragging, ox: e.clientX, oy: e.clientY };
  }

  function onPointerUp() {
    dragging = null;
  }

  function onBoxKeydown(event: KeyboardEvent, placement: Placement) {
    if (event.key === "Delete" || event.key === "Backspace") {
      removePlacement(event, placement.id);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      editorStore.select(placement.id);
      editorStore.setActiveTool("select");
    }
  }

  function removePlacement(event: Event, id: string) {
    event.preventDefault();
    event.stopPropagation();
    editorStore.removePlacement(id);
  }

  function getTextLayout(placement: TextPlacement) {
    return layoutTextObject({ ...placement, scale: 1 });
  }

  function getTextPreviewStyle(placement: TextPlacement) {
    const layout = getTextLayout(placement);
    return [
      `width:${layout.boxWidthPx}px`,
      `height:${layout.boxHeightPx}px`,
      `font-family:${TEXT_FONT_FAMILIES[placement.fontId]}`,
      `font-size:${layout.fontSizePx}px`,
      `line-height:${layout.lineHeightPx}px`,
      `color:${placement.colorId}`,
      `padding:${layout.paddingPx}px`,
      `transform:scale(${placement.scale * pageScale})`,
      "transform-origin:top left",
      `border:${placement.borderEnabled ? `${placement.borderWidth}px solid ${placement.borderColorId}` : "0 solid transparent"}`,
    ].join(";");
  }

  onDestroy(() => {
    for (const url of blobUrls.values()) URL.revokeObjectURL(url);
    blobUrls.clear();
  });
</script>

<svelte:window on:pointermove={onPointerMove} on:pointerup={onPointerUp} />

<div class="overlay">
  {#each placements.filter((p) => p.pageIndex === pageIndex) as p (p.id)}
    <div
      class="box"
      class:selected={p.id === selectedId}
      role="button"
      tabindex="0"
      aria-label={$t("overlay.placedSignature")}
      style={`left:${p.x * pageScale}px;top:${p.y * pageScale}px;
                 width:${p.width * pageScale}px;height:${p.height * pageScale}px;
                 transform:rotate(${p.rotation}deg);`}
      on:pointerdown={(e) => onPointerDown(e, p, "move")}
      on:keydown={(event) => onBoxKeydown(event, p)}
    >
      {#if p.kind === "signature"}
        <img src={getUrl(p.signatureId)} alt="signature" draggable="false" />
      {:else if p.kind === "text"}
        <div class="text-preview" style={getTextPreviewStyle(p)}>
          {#each getTextLayout(p).lines as line}
            <span class="text-line">{line || " "}</span>
          {/each}
        </div>
      {/if}
      {#if p.id === selectedId}
        <button
          type="button"
          class="handle resize"
          aria-label={$t("overlay.resizeSignature")}
          on:pointerdown={(e) => onPointerDown(e, p, "resize")}
        ></button>
        <button
          type="button"
          class="handle rotate"
          aria-label={$t("overlay.rotateSignature")}
          on:pointerdown={(e) => onPointerDown(e, p, "rotate")}>↻</button
        >
        <button
          type="button"
          class="handle del"
          aria-label={$t("overlay.deleteSignature")}
          on:keydown={(event) =>
            (event.key === "Delete" || event.key === "Backspace") &&
            removePlacement(event, p.id)}
          on:pointerdown={(event) => removePlacement(event, p.id)}
          on:click={(event) => removePlacement(event, p.id)}>×</button
        >
      {/if}
    </div>
  {/each}
</div>

<style>
  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .box {
    position: absolute;
    pointer-events: auto;
    transform-origin: center;
    touch-action: none;
  }
  .box img {
    width: 100%;
    height: 100%;
    user-select: none;
    -webkit-user-drag: none;
  }
  .text-preview {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background: transparent;
    white-space: pre;
    box-sizing: border-box;
  }
  .text-line {
    display: block;
  }
  .box.selected {
    outline: 2px dashed var(--accent);
  }
  .handle {
    position: absolute;
    z-index: 1;
    width: 18px;
    height: 18px;
    background: var(--accent);
    color: #fff;
    border: 0;
    border-radius: 50%;
    padding: 0;
    touch-action: none;
  }
  .handle.resize {
    right: -9px;
    bottom: -9px;
    cursor: nwse-resize;
  }
  .handle.rotate {
    right: -9px;
    top: -9px;
    cursor: grab;
  }
  .handle.del {
    left: -9px;
    top: -9px;
    background: var(--danger);
  }
</style>
