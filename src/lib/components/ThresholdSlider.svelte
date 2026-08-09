<script lang="ts">
  import { t } from '../i18n';
  export let value: number | null = null;
  export let onChange: (v: number | null) => void;
</script>

<div class="slider">
  <label>
    <input type="checkbox" checked={value === null}
           on:change={(e) => onChange((e.currentTarget as HTMLInputElement).checked ? null : (value ?? 128))} />
    {$t('threshold.auto')}
  </label>
  {#if value !== null}
    <input type="range" min="0" max="255" step="1" {value}
           on:input={(e) => onChange(Number((e.currentTarget as HTMLInputElement).value))} />
    <span>{value}</span>
  {/if}
</div>

<style>
  .slider { display: flex; gap: .5rem; align-items: center; }
  input[type=range] { flex: 1; }
</style>
