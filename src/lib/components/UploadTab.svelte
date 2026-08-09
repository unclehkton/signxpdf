<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{ image: string }>();

  function onChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => dispatch('image', reader.result as string);
    reader.readAsDataURL(file);
  }
</script>

<input type="file" accept="image/*" on:change={onChange} />
