import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [sveltekit(), svelteTesting()],
  assetsInclude: ['**/qpdf/*.wasm'],
  worker: { format: 'es' },
  optimizeDeps: { exclude: ['pdfjs-dist'] },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [fileURLToPath(new URL('./vitest.setup.ts', import.meta.url))],
    exclude: ['tests/e2e/**', 'node_modules/**', '.svelte-kit/**', 'build/**', '.codex-review-*/**'],
  },
});
