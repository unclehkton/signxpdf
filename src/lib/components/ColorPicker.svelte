<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    TEXT_COLOR_PRESETS,
    getColorSwatchLabel,
    isValidHexColor,
    normalizeHexColor,
  } from "$lib/text/colors";

  export let label: string;
  export let value: string;
  export let presets: readonly string[] = TEXT_COLOR_PRESETS;
  export let collapsible = false;
  export let collapsed = false;
  export let hexLabel = "HEX";
  export let presetLabel = "";
  export let previewLabel = "";
  export let validHelpText = "Enter a 6-digit HEX color.";
  export let invalidHelpText = "Enter a 6-digit HEX color like #2563EB.";

  const dispatch = createEventDispatcher<{
    change: { value: string; valid: boolean };
  }>();

  const columns = 5;

  let groupEl: HTMLDivElement;
  let expanded = !collapsible || !collapsed;
  let committedValue = normalizeHexColor(value);
  let inputValue = committedValue;
  let activeIndex = Math.max(0, presets.indexOf(committedValue));

  function slugifyLabel(input: string) {
    return input.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }

  $: normalizedValue = normalizeHexColor(value);
  $: if (isValidHexColor(normalizedValue) && normalizedValue !== committedValue) {
    committedValue = normalizedValue;
    inputValue = normalizedValue;
    activeIndex = Math.max(0, presets.indexOf(normalizedValue));
  }
  $: panelId = `${slugifyLabel(label || "color-picker") || "color-picker"}-panel`;
  $: resolvedPresetLabel = presetLabel || `${label} presets`;
  $: resolvedPreviewLabel = previewLabel || `${label} preview`;

  $: previewColor = isValidHexColor(inputValue) ? normalizeHexColor(inputValue) : committedValue;
  $: invalid = inputValue.length > 0 && !isValidHexColor(inputValue);
  $: helperText = invalid ? invalidHelpText : validHelpText;

  function commitColor(next: string) {
    const normalized = normalizeHexColor(next);

    value = normalized;
    committedValue = normalized;
    inputValue = normalized;

    const presetIndex = presets.indexOf(normalized);
    if (presetIndex >= 0) activeIndex = presetIndex;

    dispatch("change", { value: normalized, valid: true });
  }

  function handleInput(event: Event) {
    inputValue = normalizeHexColor((event.currentTarget as HTMLInputElement).value);

    if (isValidHexColor(inputValue)) {
      commitColor(inputValue);
      return;
    }

    dispatch("change", { value: inputValue, valid: false });
  }

  function toggleExpanded() {
    expanded = !expanded;
  }

  function moveFocus(delta: number) {
    if (presets.length === 0) return;

    activeIndex = (activeIndex + delta + presets.length) % presets.length;

    queueMicrotask(() => {
      const next = groupEl?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
      next?.focus();
    });
  }

  function handleSwatchKeydown(event: KeyboardEvent, index: number) {
    activeIndex = index;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveFocus(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveFocus(-1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      moveFocus(columns);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus(-columns);
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      const nextPreset = presets[index];
      if (!nextPreset) return;
      commitColor(nextPreset);
    }
  }

  function handleSwatchFocus(index: number) {
    activeIndex = index;
  }
</script>

<div class="color-picker">
  {#if collapsible}
    <button
      type="button"
      class="toggle"
      aria-controls={panelId}
      aria-expanded={expanded ? "true" : "false"}
      on:click={toggleExpanded}
    >
      {label}
    </button>
  {:else}
    <div class="heading-row">
      <span class="label">{label}</span>
      <span
        class="preview"
        aria-label={resolvedPreviewLabel}
        data-color={previewColor}
        style={`--preview-color: ${previewColor};`}
      ></span>
    </div>
  {/if}

  {#if !collapsible || expanded}
    <div class="panel" id={panelId}>
      {#if collapsible}
        <div class="heading-row">
          <span class="label">{label}</span>
          <span
            class="preview"
            aria-label={resolvedPreviewLabel}
            data-color={previewColor}
            style={`--preview-color: ${previewColor};`}
          ></span>
        </div>
      {/if}

      <div
        bind:this={groupEl}
        class="swatch-grid"
        role="radiogroup"
        aria-label={resolvedPresetLabel}
      >
        {#each presets as preset, index}
          {@const normalizedPreset = normalizeHexColor(preset)}
          {@const isSelected = committedValue === normalizedPreset}
          <button
            type="button"
            role="radio"
            class:selected={isSelected}
            class:white-swatch={normalizedPreset === "#FFFFFF"}
            aria-checked={isSelected ? "true" : "false"}
            aria-label={getColorSwatchLabel(normalizedPreset)}
            data-has-contrast-ring={normalizedPreset === "#FFFFFF" ? "true" : "false"}
            data-index={index}
            tabindex={index === activeIndex ? 0 : -1}
            style={`--swatch-color: ${normalizedPreset};`}
            on:click={() => commitColor(normalizedPreset)}
            on:focus={() => handleSwatchFocus(index)}
            on:keydown={(event) => handleSwatchKeydown(event, index)}
          >
            <span class="swatch-fill" aria-hidden="true"></span>
            <span class="selection-indicator" aria-hidden="true">✓</span>
          </button>
        {/each}
      </div>

      <label class="input-block">
        <span class="input-label">{hexLabel}</span>
        <input
          type="text"
          inputmode="text"
          spellcheck="false"
          maxlength="7"
          value={inputValue}
          aria-invalid={invalid ? "true" : "false"}
          aria-describedby={`${panelId}-help`}
          on:input={handleInput}
        />
      </label>

      <p class:invalid-text={invalid} id={`${panelId}-help`}>
        {helperText}
      </p>
    </div>
  {/if}
</div>

<style>
  .color-picker {
    display: grid;
    gap: 0.75rem;
  }

  .toggle,
  .label,
  .input-label,
  .panel p {
    font: inherit;
  }

  .toggle {
    align-items: center;
    background: #fff;
    border: 1px solid #cbd5e1;
    border-radius: 0.75rem;
    color: #111827;
    cursor: pointer;
    display: inline-flex;
    justify-content: space-between;
    padding: 0.65rem 0.9rem;
  }

  .panel {
    border: 1px solid #e5e7eb;
    border-radius: 0.9rem;
    display: grid;
    gap: 0.75rem;
    padding: 0.9rem;
  }

  .heading-row {
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .label {
    color: #111827;
    font-weight: 600;
  }

  .preview {
    background: var(--preview-color);
    border: 2px solid #cbd5e1;
    border-radius: 999px;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);
    display: inline-flex;
    height: 1.5rem;
    width: 1.5rem;
  }

  .swatch-grid {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  [role="radio"] {
    align-items: center;
    background: #fff;
    border: 2px solid #cbd5e1;
    border-radius: 0.9rem;
    cursor: pointer;
    display: inline-flex;
    height: 2.5rem;
    justify-content: center;
    padding: 0;
    position: relative;
    width: 100%;
  }

  [role="radio"]:focus-visible {
    outline: 3px solid #111827;
    outline-offset: 2px;
  }

  [role="radio"].selected {
    border-color: #111827;
    box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.18);
  }

  .swatch-fill {
    background: var(--swatch-color);
    border-radius: 0.7rem;
    box-shadow: inset 0 0 0 1px rgba(17, 24, 39, 0.08);
    height: 1.8rem;
    width: 1.8rem;
  }

  .white-swatch .swatch-fill {
    border: 1px solid #cbd5e1;
    box-shadow: inset 0 0 0 1px #94a3b8;
  }

  .selection-indicator {
    color: #111827;
    font-size: 0.95rem;
    font-weight: 700;
    opacity: 0;
    position: absolute;
  }

  .selected .selection-indicator {
    opacity: 1;
  }

  .white-swatch.selected .selection-indicator {
    color: #111827;
  }

  .input-block {
    display: grid;
    gap: 0.35rem;
  }

  .input-label {
    color: #374151;
    font-size: 0.95rem;
    font-weight: 600;
  }

  input {
    border: 1px solid #cbd5e1;
    border-radius: 0.75rem;
    color: #111827;
    padding: 0.65rem 0.8rem;
  }

  input[aria-invalid="true"] {
    border-color: #dc2626;
  }

  p {
    color: #4b5563;
    font-size: 0.9rem;
    margin: 0;
  }

  .invalid-text {
    color: #b91c1c;
  }
</style>
