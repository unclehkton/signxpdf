<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { t } from '../i18n';
  const dispatch = createEventDispatcher<{ image: string }>();

  function onChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => dispatch('image', reader.result as string);
    reader.readAsDataURL(file);
  }
</script>

<input type="file" accept="image/*" capture="environment" on:change={onChange} />
<p class="hint">{$t('camera.tip')}</p>

<style>.hint { color: var(--muted); font-size: .85rem; }</style>
