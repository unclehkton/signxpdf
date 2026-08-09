<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import PdfViewer from "$lib/pdf/PdfViewer.svelte";
  import PdfThumbnails from "$lib/pdf/PdfThumbnails.svelte";
  import ColorPicker from "$lib/components/ColorPicker.svelte";
  import PlacementOverlay from "$lib/components/PlacementOverlay.svelte";
  import SignatureCapture from "$lib/components/SignatureCapture.svelte";
  import SignatureList from "$lib/components/SignatureList.svelte";
  import { editorStore } from "$lib/stores/editorStore";
  import { signatureStore } from "$lib/stores/signatureStore";
  import { ensureTextFontsLoaded } from "$lib/text/fontLoader";
  import { TEXT_COLOR_PRESETS } from "$lib/text/colors";
  import {
    TEXT_BORDER_WIDTH_LABELS,
    TEXT_FONT_LABELS,
    type BorderWidthId,
    type TextColorId,
    type TextFontId,
  } from "$lib/text/fonts";
  import { layoutTextObject } from "$lib/text/layoutTextObject";
  import { createTextPlacementFromDraft } from "$lib/text/textPlacement";
  import { exportSignedPdf, downloadPdf } from "$lib/pdf/PdfExporter";
  import {
    DOCUMENT_ACCEPT,
    isSupportedDocument,
    loadDocument,
  } from "$lib/pdf/loadDocument";
  import { RateLimiter } from "$lib/rate-limit/RateLimiter";
  import { resolveSignaturePlacementSize } from "$lib/signatures/signatureSizing";
  import { toast } from "$lib/components/Toast.svelte";
  import { locale, t } from "$lib/i18n";
  import type {
    ActiveTool,
    PdfDoc,
    Placement,
    Signature,
    TextPlacement,
  } from "$lib/types";

  /** When true, hide route-level head tags (SEO parent owns metadata). */
  export let embedded = false;

  const fontOptions = Object.entries(TEXT_FONT_LABELS) as [
    TextFontId,
    string,
  ][];
  const borderWidthOptions = Object.entries(TEXT_BORDER_WIDTH_LABELS).map(
    ([value, label]) => ({ value: Number(value) as BorderWidthId, label }),
  );
  let pdf: PdfDoc | null = null;
  let activePage = 0;
  let placements: Placement[] = [];
  let activeSignatureId: string | null = null;
  let activeTool: ActiveTool = "select";
  let selectedPlacementId: string | null = null;
  let signatures: Signature[] = [];
  let showCapture = false;
  let exporting = false;
  let pageCount = 0;
  let zoom = 1;
  let syncedTextPlacementId: string | null = null;
  let textDraft = createDefaultTextDraft();
  let textColorInputInvalid = false;
  let borderColorInputInvalid = false;

  editorStore.subscribe((s) => {
    pdf = s.pdf;
    placements = s.placements;
    activeSignatureId = s.activeSignatureId;
    activeTool = s.activeTool;
    selectedPlacementId = s.selectedPlacementId;
  });
  $: pageCount = pdf?.pageCount ?? 0;
  $: syncTextDraftFromSelection();

  let limiter: RateLimiter | null = null;

  onMount(() => {
    const unsubscribe = signatureStore.subscribe((s) => (signatures = s));
    void signatureStore.refresh();
    void ensureTextFontsLoaded();

    return unsubscribe;
  });

  function getRateLimiter() {
    return limiter ??= new RateLimiter();
  }

  $: proofCards = [
    { title: $t("page.proofOfflineTitle"), body: $t("page.proofOfflineBody") },
    { title: $t("page.proofLocalTitle"), body: $t("page.proofLocalBody") },
    { title: $t("page.proofPrivacyTitle"), body: $t("page.proofPrivacyBody") },
  ];

  $: seoPoints = [
    { title: $t("page.seoPointOneTitle"), body: $t("page.seoPointOneBody") },
    { title: $t("page.seoPointTwoTitle"), body: $t("page.seoPointTwoBody") },
    {
      title: $t("page.seoPointThreeTitle"),
      body: $t("page.seoPointThreeBody"),
    },
  ];

  $: faqEntries = [
    { question: $t("page.faqUploadQ"), answer: $t("page.faqUploadA") },
    { question: $t("page.faqOfflineQ"), answer: $t("page.faqOfflineA") },
    { question: $t("page.faqInputQ"), answer: $t("page.faqInputA") },
  ];

  function tr(key: string, params: Record<string, string | number> = {}) {
    return get(t)(key, params);
  }

  function createDefaultTextDraft() {
    return {
      text: "",
      fontId: "source-serif" as TextFontId,
      colorId: "#000000" as TextColorId,
      borderEnabled: false,
      borderColorId: "#000000" as TextColorId,
      borderWidth: 1 as BorderWidthId,
    };
  }

  function getSelectedTextPlacement(): TextPlacement | null {
    const placement = placements.find(
      (item) => item.id === selectedPlacementId,
    );
    return placement?.kind === "text" ? placement : null;
  }

  function syncTextDraftFromSelection() {
    const selectedText = getSelectedTextPlacement();
    if (!selectedText) {
      if (selectedPlacementId === null && syncedTextPlacementId !== null) {
        syncedTextPlacementId = null;
        textDraft = createDefaultTextDraft();
        textColorInputInvalid = false;
        borderColorInputInvalid = false;
      }
      return;
    }

    if (selectedText.id !== syncedTextPlacementId) {
      syncedTextPlacementId = selectedText.id;
      textDraft = {
        text: selectedText.text,
        fontId: selectedText.fontId,
        colorId: selectedText.colorId,
        borderEnabled: selectedText.borderEnabled,
        borderColorId: selectedText.borderColorId,
        borderWidth: selectedText.borderWidth,
      };
      textColorInputInvalid = false;
      borderColorInputInvalid = false;
    }
  }

  function updateSelectedTextPlacement(nextDraft: typeof textDraft) {
    const selectedText = getSelectedTextPlacement();
    if (!selectedText) return;

    const layout = layoutTextObject({
      ...nextDraft,
      scale: selectedText.scale,
    });
    editorStore.updatePlacement(selectedText.id, {
      text: nextDraft.text,
      fontId: nextDraft.fontId,
      colorId: nextDraft.colorId,
      borderEnabled: nextDraft.borderEnabled,
      borderColorId: nextDraft.borderColorId,
      borderWidth: nextDraft.borderWidth,
      width: layout.boxWidthPx,
      height: layout.boxHeightPx,
    });
  }

  function applyTextDraftPatch(patch: Partial<typeof textDraft>) {
    const nextDraft = { ...textDraft, ...patch };
    textDraft = nextDraft;
    editorStore.setActiveTool("text");
    updateSelectedTextPlacement(nextDraft);
  }

  function onTextColorChange(
    event: CustomEvent<{ value: string; valid: boolean }>,
  ) {
    textColorInputInvalid = !event.detail.valid;
    if (!event.detail.valid) return;
    applyTextDraftPatch({ colorId: event.detail.value as TextColorId });
  }

  function onBorderColorChange(
    event: CustomEvent<{ value: string; valid: boolean }>,
  ) {
    borderColorInputInvalid = !event.detail.valid;
    if (!event.detail.valid) return;
    applyTextDraftPatch({
      borderColorId: event.detail.value as TextColorId,
    });
  }

  function onBorderEnabledChange(event: Event) {
    const checked = (event.currentTarget as HTMLInputElement).checked;
    if (!checked) borderColorInputInvalid = false;
    applyTextDraftPatch({
      borderEnabled: checked,
    });
  }

  async function onPdfPicked(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (!isSupportedDocument(file)) {
      toast(tr("page.uploadUnsupported"), "error");
      return;
    }
    try {
      const doc = await loadDocument(file);
      activePage = 0;
      zoom = 1;
      editorStore.setPdf(doc);
    } catch (error) {
      console.error(error);
      toast(tr("page.openDocumentError"), "error");
    }
  }

  async function onPageClick(
    e: CustomEvent<{ pageIndex: number; x: number; y: number }>,
  ) {
    if (activeTool === "text") {
     …7968 tokens truncated…rdExportMode: 'none' as 'none' | 'remove-only' | 'add-open-password',
    passwordBusy: false,
    editingUnavailable: false,
  };
  toolkitStore.subscribe(s => state = s as typeof state);
  $: hasDocument =
    state.pages.length > 0 ||
    state.sourceEncryption === 'password-required' ||
    (state.passwordExportMode === 'remove-only' && !!state.passwordOnlyOutputBytes);
  $: canDirectSave =
    state.passwordExportMode === 'remove-only' &&
    !!state.passwordOnlyOutputBytes &&
    state.pages.length === 0;

  const fontOptions = Object.entries(TEXT_FONT_LABELS) as [TextFontId, string][];
  const borderWidthOptions = Object.entries(TEXT_BORDER_WIDTH_LABELS).map(
    ([value, label]) => ({ value: Number(value) as BorderWidthId, label }),
  );

  let pagesChangedAfterCompress = false;
  let prevPages = state.pages;
  let targetTextPage = 0;
  let textColorInputInvalid = false;
  let borderColorInputInvalid = false;
  let textDraft = createDefaultTextDraft();
  $: {
    if (state.compressResult && state.pages !== prevPages) {
      pagesChangedAfterCompress = true;
    }
    if (!state.compressResult) pagesChangedAfterCompress = false;
    prevPages = state.pages;
  }
  $: if (targetTextPage >= state.pages.length) {
    targetTextPage = Math.max(0, state.pages.length - 1);
  }

  function createDefaultTextDraft() {
    return {
      text: '',
      fontId: 'source-serif' as TextFontId,
      colorId: '#000000' as TextColorId,
      borderEnabled: false,
      borderColorId: '#000000' as TextColorId,
      borderWidth: 1 as BorderWidthId,
    };
  }

  function patchTextDraft(patch: Partial<typeof textDraft>) {
    textDraft = { ...textDraft, ...patch };
  }

  function onTextColorChange(event: CustomEvent<{ value: string; valid: boolean }>) {
    textColorInputInvalid = !event.detail.valid;
    if (event.detail.valid) {
      patchTextDraft({ colorId: event.detail.value as TextColorId });
    }
  }

  function onBorderColorChange(event: CustomEvent<{ value: string; valid: boolean }>) {
    borderColorInputInvalid = !event.detail.valid;
    if (event.detail.valid) {
      patchTextDraft({ borderColorId: event.detail.value as TextColorId });
    }
  }

  async function onAddToolsText() {
    if (!textDraft.text.trim()) {
      toast($t('page.placeTextEmpty'), 'info');
      return;
    }
    if (textColorInputInvalid || (textDraft.borderEnabled && borderColorInputInvalid)) {
      toast($t('page.invalidHexColor'), 'info');
      return;
    }
    const placement = await createTextPlacementFromDraft({
      draft: textDraft,
      pageIndex: targetTextPage,
      x: 150,
      y: 100,
    });
    toolkitStore.addTextPlacement(placement);
  }

  function onPdfPicked(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    toolkitStore.loadPrimary(file);
  }

  function onMergePicked(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (!files || files.length === 0) return;
    toolkitStore.mergePdfs(files);
    (e.target as HTMLInputElement).value = '';
  }

  function onDeleteSelected(indices: number[]) {
    toolkitStore.deletePages(indices);
  }

  function startOver() {
    toolkitStore.reset();
  }

  let mergeInput: HTMLInputElement;
</script>

<svelte:head>
  {#if !embedded}
    <title>{$t('tools.pageTitle')}</title>
    <meta name="description" content={$t('tools.pageDesc')} />
    <link rel="canonical" href="https://www.signxpdf.com/en/merge-pdf/" />
  {/if}
</svelte:head>

<section class="tools-page" class:embedded data-tools-focus={focus}>

  <!-- Page header (skip competing H1 when embedded in SEO shell) -->
  {#if !embedded}
    <div class="page-header">
      <span class="eyebrow">{$t('tools.eyebrow')}</span>
      <h1 class="page-title">{$t('tools.title')}</h1>
      <p class="page-sub">{$t('tools.subtitle')}</p>
    </div>
  {:else}
    <div class="page-header compact">
      <p class="page-sub">{$t('tools.subtitle')}</p>
    </div>
  {/if}

  <div class="tools-layout">

    <!-- Left column -->
    <aside class="left-col">

      <!-- 1. Load -->
      <div class="card">
        <h3>{$t('tools.loadStep')}</h3>
        {#if state.pages.length === 0 && state.sourceEncryption !== 'password-required' && !canDirectSave}
          <label class="upload-zone">
            <input type="file" accept={DOCUMENT_ACCEPT} on:change={onPdfPicked} class="sr-only" />
            <span class="upload-icon">📄</span>
            <span><strong>{$t('tools.chooseFile')}</strong> {$t('tools.chooseHint')}</span>
          </label>
        {:else}
          {#if state.sourceEncryption === 'password-required'}
            <div class="file-chip">
              <span class="file-name">🔒 {state.primaryFilename}</span>
              <span class="file-meta">{$t('password.lockedMeta')}</span>
            </div>
          {:else if state.editingUnavailable && canDirectSave}
            <div class="file-chip">
              <span class="file-name">📄 {state.primaryFilename}</span>
              <span class="file-meta">{$t('password.editingUnavailable')}</span>
            </div>
          {:else if state.sourceNames.size <= 1}
            <div class="file-chip">
              <span class="file-name">📄 {state.primaryFilename}</span>
              <span class="file-meta">{$t('tools.pageCount', { n: state.pages.length })}</span>
            </div>
          {:else}
            <div class="file-list">
              {#each [...state.sourceNames.values()] as name}
                <div class="file-chip file-chip-row">
                  <span class="file-name">📄 {name}</span>
                </div>
              {/each}
              <span class="file-meta-total">{$t('tools.pageCount', { n: state.pages.length })} · {$t('tools.docCount', { n: state.sourceNames.size })}</span>
            </div>
          {/if}
          {#if state.pages.length > 0}
            <button type="button" class="btn btn-secondary btn-sm btn-full" on:click={() => mergeInput.click()}>
              {$t('tools.mergePdf')}
            </button>
          {/if}
          <button
            type="button"
            class="btn btn-secondary btn-sm btn-full btn-start-over"
            disabled={state.passwordBusy}
            on:click={startOver}
          >
            {$t('tools.startOver')}
          </button>
          <input bind:this={mergeInput} type="file" accept={DOCUMENT_ACCEPT} multiple on:change={onMergePicked} style="display:none" />
        {/if}
      </div>

      <PasswordProtection
        sourceEncryption={state.sourceEncryption}
        hasDocument={hasDocument}
        busy={state.passwordBusy || state.saving}
      />

      <!-- 2. Compress / edit / save (or direct password-only save) -->
      {#if canDirectSave}
        <div class="card">
          <h3>{$t('tools.saveStep')}</h3>
          <p class="hint">{$t('password.editingUnavailableHint')}</p>
          <button
            type="button"
            class="btn btn-primary btn-full"
            disabled={state.saving || state.passwordBusy}
            on:click={() => toolkitStore.save()}
          >
            {state.saving ? $t('tools.saving') : $t('tools.savePdf')}
          </button>
        </div>
      {:else if state.pages.length > 0}
        <div class="card">
          <h3>{$t('tools.addText')}</h3>
          <label class="field-label" for="tools-text-page">{$t('tools.textTargetPage')}</label>
          <select
            id="tools-text-page"
            class="text-select"
            value={String(targetTextPage)}
            on:change={(event) =>
              (targetTextPage = Number((event.currentTarget as HTMLSelectElement).value))}
          >
            {#each state.pages as _page, index}
              <option value={index}>{$t('tools.pageOption', { n: index + 1 })}</option>
            {/each}
          </select>

          <label class="field-label" for="tools-text-draft">{$t('page.textContent')}</label>
          <textarea
            id="tools-text-draft"
            class="text-area"
            rows="3"
            value={textDraft.text}
            on:input={(event) =>
              patchTextDraft({
                text: (event.currentTarget as HTMLTextAreaElement).value,
              })}
          ></textarea>

          <label class="field-label" for="tools-text-font">{$t('page.textFont')}</label>
          <select
            id="tools-text-font"
            class="text-select"
            value={textDraft.fontId}
            on:change={(event) =>
              patchTextDraft({
                fontId: (event.currentTarget as HTMLSelectElement).value as TextFontId,
              })}
          >
            {#each fontOptions as [fontId, label]}
              <option value={fontId}>{label}</option>
            {/each}
          </select>

          <ColorPicker
            label={$t('page.textColor')}
            value={textDraft.colorId}
            presets={TEXT_COLOR_PRESETS}
            hexLabel={$t('page.textColorHex')}
            presetLabel={$t('page.textColorPresets')}
            previewLabel={$t('page.textColorPreview')}
            validHelpText={$t('page.hexColorHelp')}
            invalidHelpText={$t('page.invalidHexColor')}
            on:change={onTextColorChange}
          />

          <label class="check-row">
            <input
              type="checkbox"
              checked={textDraft.borderEnabled}
              on:change={(event) =>
                patchTextDraft({
                  borderEnabled: (event.currentTarget as HTMLInputElement).checked,
                })}
            />
            <span>{$t('page.textBorder')}</span>
          </label>

          {#if textDraft.borderEnabled}
            <ColorPicker
              label={$t('page.borderColor')}
              value={textDraft.borderColorId}
              presets={TEXT_COLOR_PRESETS}
              collapsible={true}
              collapsed={true}
              hexLabel={$t('page.borderColorHex')}
              presetLabel={$t('page.borderColorPresets')}
              previewLabel={$t('page.borderColorPreview')}
              validHelpText={$t('page.hexColorHelp')}
              invalidHelpText={$t('page.invalidHexColor')}
              on:change={onBorderColorChange}
            />

            <label class="field-label" for="tools-text-border-width">{$t('page.borderThickness')}</label>
            <select
              id="tools-text-border-width"
              class="text-select"
              value={String(textDraft.borderWidth)}
              on:change={(event) =>
                patchTextDraft({
                  borderWidth: Number((event.currentTarget as HTMLSelectElement).value) as BorderWidthId,
                })}
            >
              {#each borderWidthOptions as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          {/if}

          <button
            class="btn btn-secondary btn-full"
            disabled={!textDraft.text.trim()}
            on:click={onAddToolsText}
          >
            {$t('tools.addTextToPage')}
          </button>

          {#if state.textPlacements.length > 0}
            <div class="text-placement-list" aria-label={$t('tools.textListLabel')}>
              {#each state.textPlacements as placement}
                <div class="text-placement-chip">
                  <span>{$t('tools.textChip', { n: placement.pageIndex + 1, text: placement.text })}</span>
                  <button
                    type="button"
                    class="chip-remove"
                    aria-label={$t('tools.removeText')}
                    on:click={() => toolkitStore.removeTextPlacement(placement.id)}
                  >×</button>
                </div>
              {/each}
            </div>
          {/if}
        </div>

        <div class="card">
          <h3>{$t('tools.compressStep')} <span class="optional">{$t('tools.optional')}</span></h3>
          <CompressPanel
            compressing={state.compressing}
            progress={state.compressProgress}
            result={state.compressResult}
            pagesChanged={pagesChangedAfterCompress}
            onCompress={kb => toolkitStore.compress(kb)}
          />
        </div>

        <!-- 3. Save -->
        <div class="card">
          <h3>{$t('tools.saveStep')}</h3>
          <button
            type="button"
            class="btn btn-primary btn-full"
            disabled={state.saving || state.passwordBusy || state.pages.length === 0}
            on:click={() => toolkitStore.save()}
          >
            {state.saving ? $t('tools.saving') : $t('tools.savePdf')}
          </button>
        </div>

      {/if}


    </aside>

    <!-- Right: Page manager -->
    <div class="card page-manager-card">
      {#if state.pages.length === 0}
        <div class="empty-state">
          <div class="empty-icon">📄</div>
          <p class="empty-title">{$t('tools.emptyTitle')}</p>
          <p class="empty-sub">{$t('tools.emptyHint')}</p>
        </div>
      {:else}
        <PageManager
          pages={state.pages}
          sources={state.sources}
          sourceNames={state.sourceNames}
          onReorder={(from, to) => toolkitStore.reorderPages(from, to)}
          onDeleteSelected={onDeleteSelected}
          onInsertBlank={after => toolkitStore.insertBlank(after)}
        />
      {/if}
    </div>

  </div>
</section>

<style>
  .tools-page {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: min(100%, calc(var(--max-content) + 2 * var(--ad-width) + 4rem));
    margin: 0 auto;
    padding: 0 1.5rem 2.5rem;
  }

  .page-header { display: flex; flex-direction: column; gap: .25rem; }
  .eyebrow {
    font-size: .72rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: .18em; color: var(--green-700);
  }
  .page-title {
    font-size: 1.65rem; font-weight: 700; letter-spacing: -.03em; color: var(--ink);
  }
  .page-sub { font-size: .9rem; color: var(--muted); }

  .tools-layout {
    display: grid;
    grid-template-columns: minmax(320px, 360px) 1fr;
    gap: 14px;
    align-items: start;
  }
  .left-col { display: flex; flex-direction: column; gap: 10px; }

  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 1rem 1.1rem;
    box-shadow: var(--shadow-sm);
    display: flex; flex-direction: column; gap: .75rem;
  }
  .page-manager-card { min-height: 200px; }

  /* h3 inside card — override global */
  .card :global(h3) {
    font-size: .72rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: .12em; color: var(--muted); margin-bottom: 0;
  }
  .optional { text-transform: none; font-weight: 400; letter-spacing: 0; color: var(--soft); }

  .upload-zone {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    border: 1.5px dashed var(--border-strong); border-radius: var(--radius);
    background: var(--paper); padding: 1rem; text-align: center;
    cursor: pointer; font-size: .85rem; color: var(--muted);
    transition: border-color .15s, background .15s;
  }
  .upload-zone:hover { border-color: var(--green-700); background: var(--green-50); }
  .upload-zone strong { color: var(--green-800); }
  .upload-icon { font-size: 1.5rem; }

  .file-chip {
    display: flex; align-items: center; justify-content: space-between;
    background: var(--green-50); border: 1px solid var(--green-100);
    border-radius: var(--radius-sm); padding: 6px 10px;
  }
  .file-chip-row { justify-content: flex-start; }
  .file-name {
    font-size: .85rem; font-weight: 600; color: var(--green-900);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .file-meta { font-size: .75rem; color: var(--green-600); flex-shrink: 0; }

  .file-list { display: flex; flex-direction: column; gap: 4px; }
  .file-meta-total { font-size: .75rem; color: var(--green-600); padding: 0 2px; }

  .field-label {
    font-size: .72rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: .1em; color: var(--muted);
  }
  .hint {
    margin: 0 0 0.55rem;
    color: var(--muted);
    font-size: 0.88rem;
    line-height: 1.4;
  }
  .text-area,
  .text-select {
    width: 100%;
    border: 1px solid var(--border-strong);
    border-radius: 12px;
    background: var(--surface-2);
    color: var(--ink);
    padding: .7rem .8rem;
    font: inherit;
  }
  .text-area { min-height: 4.75rem; resize: vertical; }
  .check-row {
    display: flex; align-items: center; gap: .5rem;
    color: var(--ink); font-size: .88rem;
  }
  .text-placement-list { display: flex; flex-direction: column; gap: 6px; }
  .text-placement-chip {
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
    border: 1px solid var(--green-100); border-radius: var(--radius-sm);
    background: var(--green-50); color: var(--green-900);
    padding: 6px 8px; font-size: .78rem;
  }
  .text-placement-chip span {
    min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .chip-remove {
    border: 0; border-radius: 999px; background: transparent; color: var(--danger);
    cursor: pointer; font-size: 1rem; line-height: 1; padding: 0 2px;
  }

  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: .4rem;
    font-family: var(--font-sans); font-weight: 500; font-size: .9rem;
    border-radius: 999px; padding: .6rem 1.1rem; border: 1px solid transparent;
    cursor: pointer; white-space: nowrap;
    transition: background .18s, border-color .18s, color .18s, transform .18s, box-shadow .18s;
  }
  .btn-primary {
    background: var(--green-900); color: #f4f1e6; border-color: var(--green-900);
    box-shadow: 0 1px 0 rgba(255,255,255,.08) inset, var(--shadow-sm);
  }
  .btn-primary:hover:not(:disabled) {
    background: var(--green-700); border-color: var(--green-700);
    transform: translateY(-1px); box-shadow: var(--shadow);
  }
  .btn-primary:disabled { background: var(--green-100); border-color: var(--green-100); color: var(--green-700); opacity: .7; cursor: not-allowed; }
  .btn-secondary { background: var(--surface); color: var(--ink); border-color: var(--border-strong); }
  .btn-secondary:hover:not(:disabled) { border-color: var(--green-700); color: var(--green-800); }
  .btn-start-over { color: var(--danger); }
  .btn-start-over:hover:not(:disabled) { border-color: rgba(168, 50, 31, .45); color: var(--danger); }
  .btn-sm { padding: .35rem .85rem; font-size: .82rem; }
  .btn-full { width: 100%; }

  .empty-state {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; gap: .5rem; padding: 2rem;
    text-align: center; min-height: 180px;
  }
  .empty-icon { font-size: 2rem; opacity: .4; }
  .empty-title { font-size: 1rem; font-weight: 600; color: var(--muted); }
  .empty-sub { font-size: .85rem; color: var(--soft); max-width: 260px; line-height: 1.5; }

  .sr-only {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0,0,0,0); white-space: nowrap; border: 0;
  }

  @media (max-width: 768px) {
    .tools-page { padding: 0 1rem 2rem; }
    .tools-layout { grid-template-columns: 1fr; }
  }
</style>
