<script lang="ts">
  import { toolkitStore } from '$lib/stores/toolkitStore';
  import { t } from '$lib/i18n';
  import type { QpdfErrorCode } from '$lib/pdf/qpdf-worker.types';

  export let sourceEncryption: 'unknown' | 'unencrypted' | 'password-required' = 'unknown';
  export let hasDocument = false;
  export let busy = false;

  let protectPassword = '';
  let protectConfirm = '';
  let removePassword = '';
  let showProtect = false;
  let showRemove = false;
  let localError = '';
  let localInfo = '';
  let submitting = false;

  $: locked = sourceEncryption === 'password-required';
  $: canProtect = hasDocument && !locked;
  $: disabled = busy || submitting;

  function clearFields() {
    protectPassword = '';
    protectConfirm = '';
    removePassword = '';
  }

  function mapError(code: QpdfErrorCode): string {
    switch (code) {
      case 'incorrect-password':
        return $t('password.errorIncorrect');
      case 'unsupported-encryption':
        return $t('password.errorUnsupported');
      case 'malformed-pdf':
        return $t('password.errorMalformed');
      case 'cancelled':
        return '';
      default:
        return $t('password.errorEngine');
    }
  }

  async function onProtect() {
    localError = '';
    localInfo = '';
    if (!protectPassword) {
      localError = $t('password.errorEmpty');
      return;
    }
    if (protectPassword !== protectConfirm) {
      localError = $t('password.errorMismatch');
      return;
    }
    submitting = true;
    try {
      const result = await toolkitStore.addOpenPassword(protectPassword);
      if (!result.ok) {
        localError = mapError(result.code);
        return;
      }
      localInfo = $t('password.protectStaged');
    } finally {
      clearFields();
      submitting = false;
    }
  }

  async function onRemove() {
    localError = '';
    localInfo = '';
    // Empty password is valid for unlock: many PDFs use an empty user password
    // with a non-empty owner password. Protect still requires a non-empty value.
    if (!locked && !removePassword) {
      localError = $t('password.errorEmpty');
      return;
    }
    submitting = true;
    try {
      const result = locked
        ? await toolkitStore.unlockPrimary(removePassword)
        : await toolkitStore.removePassword(removePassword);
      if (!result.ok) {
        if (result.code === 'cancelled') return;
        localError = mapError(result.code);
        return;
      }
      localInfo = locked ? $t('password.unlocked') : $t('password.removeStaged');
    } finally {
      clearFields();
      submitting = false;
    }
  }
</script>

{#if locked || canProtect}
  <div class="card password-card" data-testid="password-protection">
    <h3>{$t('password.title')}</h3>
    <p class="warning" role="note">{$t('password.signatureWarning')}</p>

    {#if locked}
      <p class="hint">{$t('password.unlockHint')}</p>
      <label class="field-label" for="pdf-remove-password">{$t('password.currentPassword')}</label>
      <div class="password-row">
        <input
          id="pdf-remove-password"
          class="text-input"
          type={showRemove ? 'text' : 'password'}
          autocomplete="current-password"
          disabled={disabled}
          bind:value={removePassword}
        />
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          disabled={disabled}
          on:click={() => (showRemove = !showRemove)}
        >
          {showRemove ? $t('password.hide') : $t('password.show')}
        </button>
      </div>
      <button
        type="button"
        class="btn btn-primary btn-sm btn-full"
        disabled={disabled}
        on:click={onRemove}
      >
        {$t('password.unlockAction')}
      </button>
    {:else}
      <p class="hint">{$t('password.protectHint')}</p>
      <label class="field-label" for="pdf-protect-password">{$t('password.newPassword')}</label>
      <div class="password-row">
        <input
          id="pdf-protect-password"
          class="text-input"
          type={showProtect ? 'text' : 'password'}
          autocomplete="new-password"
          disabled={disabled}
          bind:value={protectPassword}
        />
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          disabled={disabled}
          on:click={() => (showProtect = !showProtect)}
        >
          {showProtect ? $t('password.hide') : $t('password.show')}
        </button>
      </div>
      <label class="field-label" for="pdf-protect-confirm">{$t('password.confirmPassword')}</label>
      <input
        id="pdf-protect-confirm"
        class="text-input"
        type={showProtect ? 'text' : 'password'}
        autocomplete="new-password"
        disabled={disabled}
        bind:value={protectConfirm}
      />
      <button
        type="button"
        class="btn btn-primary btn-sm btn-full"
        disabled={disabled}
        on:click={onProtect}
      >
        {$t('password.protectAction')}
      </button>
    {/if}

    {#if localError}
      <p class="error" role="alert">{localError}</p>
    {/if}
    {#if localInfo}
      <p class="info" role="status">{localInfo}</p>
    {/if}
  </div>
{/if}

<style>
  .password-card {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .warning {
    margin: 0;
    padding: 0.55rem 0.7rem;
    border-radius: var(--radius-sm);
    background: #fff7e8;
    border: 1px solid #efd3a0;
    color: var(--warning);
    font-size: 0.86rem;
    line-height: 1.4;
  }

  .hint {
    margin: 0;
    color: var(--muted);
    font-size: 0.88rem;
  }

  .password-row {
    display: flex;
    gap: 0.4rem;
  }

  .text-input {
    flex: 1;
    width: 100%;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    padding: 0.45rem 0.55rem;
    font: inherit;
    background: var(--surface);
  }

  .error {
    margin: 0;
    color: var(--danger);
    font-size: 0.86rem;
  }

  .info {
    margin: 0;
    color: var(--green-700);
    font-size: 0.86rem;
  }
</style>
