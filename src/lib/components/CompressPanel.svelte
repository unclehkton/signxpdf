<script lang="ts">
  import type { CompressResultState } from '$lib/stores/toolkitStore';
  import { t } from '$lib/i18n';

  export let compressing: boolean = false;
  export let progress: number = 0;
  export let result: CompressResultState | null = null;
  export let pagesChanged: boolean = false;
  export let onCompress: (targetKB: number) => void;

  let targetKB = 500;

  function fmt(kb: number): string {
    return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`;
  }
</script>

<div class="compress-panel">
  <div class="compress-row">
    <label for="target-kb">{$t('compress.target')}</label>
    <input
      id="target-kb"
      class="compress-input"
      type="number"
      min="50"
      step="50"
      bind:value={targetKB}
      disabled={compressing}
    />
    <span class="compress-unit">KB</span>
  </div>

  <button
    class="btn btn-secondary btn-sm btn-full"
    on:click={() => onCompress(targetKB)}
    disabled={compressing}
  >
    {#if compressing}
      <span class="spinner" aria-hidden="true"></span>
      {$t('compress.compressing')}
    {:else}
      {$t('compress.compress')}
    {/if}
  </button>

  {#if compressing}
    <div class="progress-bar" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
      <div class="progress-fill" style="width: {Math.round(progress * 100)}%"></div>
    </div>
    <span class="progress-label">{Math.round(progress * 100)}%</span>
  {/if}

  {#if result && !compressing}
    {#if result.reachedTarget}
      <div class="result success">
        {$t('compress.success', { from: fmt(result.fromKB), to: fmt(result.toKB) })}
      </div>
    {:else}
      <div class="result warning">
        {$t('compress.unreachable', { size: fmt(result.toKB) })}
      </div>
    {/if}
  {/if}

  {#if pagesChanged && result}
    <div class="stale-banner">{$t('compress.stale')}</div>
  {/if}
</div>

<style>
  .compress-panel { display: flex; flex-direction: column; gap: 8px; }

  .compress-row {
    display: flex; align-items: center; gap: 8px;
  }
  label { font-size: .82rem; color: var(--muted); flex-shrink: 0; }
  .compress-input {
    width: 72px; border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm); padding: 5px 8px;
    font-size: .85rem; background: var(--paper); color: var(--ink);
    font-family: var(--font-sans);
  }
  .compress-input:focus { outline: none; border-color: var(--green-700); }
  .compress-unit { font-size: .82rem; color: var(--muted); }

  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 5px;
    font-family: var(--font-sans); font-weight: 500; font-size: .85rem;
    border-radius: 999px; padding: .5rem 1rem; border: 1px solid transparent;
    cursor: pointer; white-space: nowrap;
    transition: background .15s, border-color .15s, color .15s;
  }
  .btn-secondary { background: var(--surface); color: var(--ink); border-color: var(--border-strong); }
  .btn-secondary:hover:not(:disabled) { border-color: var(--green-700); color: var(--green-800); }
  .btn-sm { padding: .35rem .8rem; font-size: .8rem; }
  .btn-full { width: 100%; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }

  .spinner {
    display: inline-block; width: 10px; height: 10px; border-radius: 50%;
    border: 2px solid var(--border-strong); border-top-color: var(--green-700);
    animation: spin .6s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .progress-bar {
    height: 4px; background: var(--border);
    border-radius: 999px; overflow: hidden;
  }
  .progress-fill {
    height: 100%; background: var(--green-500);
    border-radius: 999px; transition: width .2s ease;
  }
  .progress-label { font-size: .72rem; color: var(--soft); text-align: right; }

  .result {
    font-size: .82rem; padding: 5px 9px; border-radius: var(--radius-sm);
  }
  .result.success { background: #eafaf1; border: 1px solid #b5e8c8; color: #1a6b3a; }
  .result.warning { background: #fff8e1; border: 1px solid #ffe082; color: #7a5500; }

  .stale-banner {
    font-size: .75rem; color: var(--warning);
    background: #fff8e1; border: 1px solid #ffe082;
    border-radius: var(--radius-sm); padding: 4px 8px;
  }
</style>
