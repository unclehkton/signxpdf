<script lang="ts">
  import { toolkitStore } from '$lib/stores/toolkitStore';
  import ColorPicker from '$lib/components/ColorPicker.svelte';
  import PageManager from '$lib/components/PageManager.svelte';
  import CompressPanel from '$lib/components/CompressPanel.svelte';
  import PasswordProtection from '$lib/components/PasswordProtection.svelte';
  import { DOCUMENT_ACCEPT } from '$lib/pdf/loadDocument';
  import { TEXT_COLOR_PRESETS } from '$lib/text/colors';
  import {
    TEXT_BORDER_WIDTH_LABELS,
    TEXT_FONT_LABELS,
    type BorderWidthId,
    type TextColorId,
    type TextFontId,
  } from '$lib/text/fonts';
  import { createTextPlacementFromDraft } from '$lib/text/textPlacement';
  import { t } from '$lib/i18n';
  import { toast } from '$lib/components/Toast.svelte';
  import type { TextPlacement } from '$lib/types';

  /** When true, parent SEO page owns metadata and primary H1. */
  export let embedded = false;
  export let focus: 'merge' | 'compress' | 'reorder' | 'delete' | 'general' = 'general';
  void focus;

  let state = {
    pages: [],
    sources: new Map(),
    sourceNames: new Map(),
    primaryFilename: 'document',
    compressedBytes: null,
    saving: false,
    compressing: false,
    compressProgress: 0,
    compressResult: null,
    textPlacements: [] as TextPlacement[],
    originalSourceBytes: null as Uint8Array | null,
    sourceEncryption: 'unknown' as 'unknown' | 'unencrypted' | 'password-required',
    passwordOnlyOutputBytes: null as Uint8Array | null,
    passwordExportMode: 'none' as 'none' | 'remove-only' | 'add-open-password',
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
    display: inline-flex; align-items: ce…3688 tokens truncated….includes('--write-baseline');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.mjs': 'text/javascript',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

function fail(msg) {
  console.error('FAIL:', msg);
  process.exitCode = 1;
}

function gitBin() {
  // Minimal PATH shells (e.g. some agent sessions) may not include Git for Windows.
  const candidates = [
    process.env.GIT_BIN,
    'C:\\Program Files\\Git\\cmd\\git.exe',
    'git',
  ].filter(Boolean);
  for (const bin of candidates) {
    try {
      execSync(`"${bin}" --version`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      return bin;
    } catch {
      /* try next */
    }
  }
  return null;
}

function gitMeta() {
  const git = gitBin();
  if (!git) return { commit: 'unknown', branch: 'unknown', short: 'unknown' };
  try {
    const q = `"${git}"`;
    return {
      commit: execSync(`${q} rev-parse HEAD`, { cwd: ROOT, encoding: 'utf8' }).trim(),
      branch: execSync(`${q} rev-parse --abbrev-ref HEAD`, { cwd: ROOT, encoding: 'utf8' }).trim(),
      short: execSync(`${q} rev-parse --short HEAD`, { cwd: ROOT, encoding: 'utf8' }).trim(),
    };
  } catch {
    return { commit: 'unknown', branch: 'unknown', short: 'unknown' };
  }
}

function startServer() {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      let urlPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
      if (urlPath.endsWith('/')) urlPath += 'index.html';
      const filePath = join(BUILD, urlPath.replace(/^\//, ''));
      if (!filePath.startsWith(BUILD) || !existsSync(filePath)) {
        res.writeHead(404);
        res.end('not found');
        return;
      }
      res.writeHead(200, { 'content-type': MIME[extname(filePath)] ?? 'application/octet-stream' });
      res.end(readFileSync(filePath));
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
    server.on('error', reject);
  });
}

async function measureRoute(browser, path) {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.addInitScript(() => {
    window.__perfLab = { lcp: 0, cls: 0, tbt: 0, fcp: 0, longTasks: 0 };
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          window.__perfLab.lcp = e.startTime;
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {
      /* unsupported */
    }
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (!e.hadRecentInput) window.__perfLab.cls += e.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    } catch {
      /* unsupported */
    }
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          window.__perfLab.longTasks += 1;
          window.__perfLab.tbt += Math.max(0, e.duration - 50);
        }
      }).observe({ type: 'longtask', buffered: true });
    } catch {
      /* unsupported */
    }
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (e.name === 'first-contentful-paint') window.__perfLab.fcp = e.startTime;
        }
      }).observe({ type: 'paint', buffered: true });
    } catch {
      /* unsupported */
    }
  });

  await page.goto(`${ORIGIN}${path}`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(4000);

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const lab = window.__perfLab || { lcp: 0, cls: 0, tbt: 0, fcp: 0, longTasks: 0 };

    let lcp = lab.lcp;
    try {
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      if (lcpEntries.length) lcp = lcpEntries[lcpEntries.length - 1].startTime;
    } catch {
      /* ignore */
    }
    if (!lcp) {
      try {
        const paints = performance.getEntriesByType('paint');
        const fcp = paints.find((p) => p.name === 'first-contentful-paint');
        if (fcp) lcp = fcp.startTime;
        else if (lab.fcp) lcp = lab.fcp;
      } catch {
        /* ignore */
      }
    }
    if (!lcp && nav) lcp = nav.domContentLoadedEventEnd;

    let cls = lab.cls;
    try {
      let sum = 0;
      for (const e of performance.getEntriesByType('layout-shift')) {
        if (!e.hadRecentInput) sum += e.value;
      }
      if (lab.cls > 0) cls = lab.cls;
      else cls = sum;
    } catch {
      /* ignore */
    }

    let tbt = lab.tbt;
    try {
      let sum = 0;
      for (const e of performance.getEntriesByType('longtask')) {
        sum += Math.max(0, e.duration - 50);
      }
      if (sum > tbt) tbt = sum;
    } catch {
      /* ignore */
    }

    const resources = performance.getEntriesByType('resource');
    const transferredJs = resources
      .filter((r) => r.initiatorType === 'script' || /\.m?js(\?|$)/i.test(r.name))
      .reduce((s, r) => s + (r.transferSize || r.encodedBodySize || 0), 0);
    const transferredFonts = resources
      .filter((r) => /\.(woff2?|ttf|otf)(\?|$)/i.test(r.name))
      .reduce((s, r) => s + (r.transferSize || r.encodedBodySize || 0), 0);
    const transferredImages = resources
      .filter((r) => r.initiatorType === 'img' || /\.(png|jpe?g|webp|svg|gif)(\?|$)/i.test(r.name))
      .reduce((s, r) => s + (r.transferSize || r.encodedBodySize || 0), 0);

    return {
      lcpMs: Math.round(lcp),
      fcpMs: Math.round(lab.fcp || 0),
      cls: Number(cls.toFixed(4)),
      tbtMs: Math.round(tbt),
      longTaskCount: lab.longTasks,
      domContentLoadedMs: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
      loadEventMs: nav ? Math.round(nav.loadEventEnd) : null,
      transferredJsBytes: transferredJs,
      transferredFontBytes: transferredFonts,
      transferredImageBytes: transferredImages,
      resourceCount: resources.length,
    };
  });

  await context.close();
  return { route: path, ...metrics };
}

function defaultBudgets() {
  // Lab budgets for local static serve (not field RUM). Generous to absorb machine variance.
  return {
    perRoute: {
      lcpMsMax: 5000,
      clsMax: 0.25,
      tbtMsMax: 2000,
    },
    home: {
      lcpMsMax: 4000,
      clsMax: 0.15,
      tbtMsMax: 1500,
    },
    // Regression vs committed baseline (relative + absolute slack)
    regression: {
      lcpMsFactor: 1.75,
      lcpMsSlack: 800,
      clsFactor: 2.0,
      clsSlack: 0.05,
      tbtMsFactor: 2.0,
      tbtMsSlack: 400,
    },
  };
}

function enforceBudgets(results, baseline) {
  const budgets = baseline?.budgets ?? defaultBudgets();
  const byRoute = Object.fromEntries((baseline?.results ?? []).map((r) => [r.route, r]));

  for (const r of results) {
    if (r.lcpMs <= 0) {
      fail(`${r.route}: LCP/FCP/DCL is 0 — instrumentation failed`);
    }
    if (r.lcpMs > budgets.perRoute.lcpMsMax) {
      fail(`${r.route}: LCP ${r.lcpMs}ms exceeds budget ${budgets.perRoute.lcpMsMax}ms`);
    }
    if (r.cls > budgets.perRoute.clsMax) {
      fail(`${r.route}: CLS ${r.cls} exceeds budget ${budgets.perRoute.clsMax}`);
    }
    if (r.tbtMs > budgets.perRoute.tbtMsMax) {
      fail(`${r.route}: TBT ${r.tbtMs}ms exceeds budget ${budgets.perRoute.tbtMsMax}ms`);
    }

    const before = byRoute[r.route];
    if (before) {
      const reg = budgets.regression;
      const lcpLimit = Math.ceil(before.lcpMs * reg.lcpMsFactor) + reg.lcpMsSlack;
      const clsLimit = before.cls * reg.clsFactor + reg.clsSlack;
      const tbtLimit = Math.ceil(before.tbtMs * reg.tbtMsFactor) + reg.tbtMsSlack;
      if (r.lcpMs > lcpLimit) {
        fail(`${r.route}: LCP regression ${r.lcpMs}ms > baseline ${before.lcpMs}ms (limit ${lcpLimit})`);
      }
      if (r.cls > clsLimit) {
        fail(`${r.route}: CLS regression ${r.cls} > baseline ${before.cls} (limit ${clsLimit})`);
      }
      if (r.tbtMs > tbtLimit) {
        fail(`${r.route}: TBT regression ${r.tbtMs}ms > baseline ${before.tbtMs}ms (limit ${tbtLimit})`);
      }
    }
  }

  const home = results.find((r) => r.route === '/en/');
  if (home) {
    if (home.lcpMs > budgets.home.lcpMsMax) {
      fail(`home LCP ${home.lcpMs}ms exceeds home budget ${budgets.home.lcpMsMax}ms`);
    }
    if (home.cls > budgets.home.clsMax) {
      fail(`home CLS ${home.cls} exceeds home budget ${budgets.home.clsMax}`);
    }
    if (home.tbtMs > budgets.home.tbtMsMax) {
      fail(`home TBT ${home.tbtMs}ms exceeds home budget ${budgets.home.tbtMsMax}ms`);
    }
  }
}

async function main() {
  if (!existsSync(join(BUILD, 'en', 'index.html'))) {
    console.error('Missing build — run npm run build first');
    process.exit(1);
  }

  let browser;
  try {
    browser = await launchChromium({ headless: true });
  } catch (e) {
    console.error(
      'Chromium launch failed. Run: node scripts/ensure-playwright.mjs\n',
      '(needs chromium-headless-shell / headless_shell.exe for default headless, or chrome.exe fallback)\n',
      e?.message ?? e,
    );
    process.exit(1);
  }

  const server = await startServer();
  const results = [];
  try {
    for (const path of ROUTES) {
      results.push(await measureRoute(browser, path));
    }

    const git = gitMeta();
    const report = {
      generatedAt: new Date().toISOString(),
      provenance: {
        branch: git.branch,
        commit: git.commit,
        shortCommit: git.short,
        command: 'npm run build && npm run ensure:playwright && npm run test:perf-lab',
        buildDir: 'build',
        scope: 'Lab Playwright metrics against local static build (not field RUM).',
      },
      note: 'LCP falls back to FCP/DCL when LCP API yields 0. Compared to tests/build/phase2-perf-lab-baseline.json.',
      results,
      budgets: defaultBudgets(),
    };

    if (!existsSync(BUILD)) mkdirSync(BUILD, { recursive: true });
    writeFileSync(OUT, JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
    console.log(`\nWrote artifact ${OUT}`);

    if (WRITE_BASELINE) {
      writeFileSync(BASELINE_PATH, JSON.stringify(report, null, 2));
      console.log(`Wrote committed baseline ${BASELINE_PATH}`);
    }

    if (!existsSync(BASELINE_PATH)) {
      fail(`committed lab baseline missing: ${BASELINE_PATH} (run with --write-baseline once)`);
    } else {
      const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
      if (!baseline.provenance?.command && !baseline.generatedAt) {
        fail('lab baseline missing provenance');
      }
      enforceBudgets(results, baseline);
    }

    if (!process.exitCode) {
      console.log('PASS: perf lab budgets + baseline regression checks');
    }
  } finally {
    await browser.close();
    await new Promise((r) => server.close(r));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
