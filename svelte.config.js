import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    files: {
      assets: 'public',
    },
    // SVELTEKIT_ADAPTER_OUT isolates production builds (e.g. vitest bootstrap) from the shared build/.
    adapter: adapter({
      pages: process.env.SVELTEKIT_ADAPTER_OUT || 'build',
      assets: process.env.SVELTEKIT_ADAPTER_OUT || 'build',
    }),
    prerender: { entries: ['*'] },
  },
};
