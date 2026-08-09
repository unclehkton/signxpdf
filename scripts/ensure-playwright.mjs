#!/usr/bin/env node
/**
 * Ensure Playwright can actually launch headless Chromium for this package revision.
 *
 * Important: chromium.executablePath() resolves to chrome.exe (full browser).
 * chromium.launch({ headless: true }) on Playwright ≥1.49 uses a *separate*
 * chromium-headless-shell artifact (headless_shell.exe). Checking only
 * executablePath() is a false positive when chrome is present but the shell is not.
 *
 * Idempotent — safe before every browser suite.
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

function installBrowsers() {
  console.log('ensure-playwright: installing chromium + chromium-headless-shell…');
  // Explicit shell package — chrome alone is not enough for default headless launch.
  execFileSync(
    'npx',
    ['playwright', 'install', 'chromium', 'chromium-headless-shell'],
    {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: process.platform === 'win32',
    },
  );
}

/**
 * Prove headless launch works (the same path e2e scripts use).
 * @returns {Promise<{ ok: true, mode: string, detail: string } | { ok: false, error: string }>}
 */
async function probeLaunch() {
  const { chromium } = await import('playwright');
  try {
    const browser = await chromium.launch({ headless: true });
    const version = browser.version();
    await browser.close();
    return { ok: true, mode: 'headless-default', detail: `version ${version}` };
  } catch (e) {
    const msg = e?.message ?? String(e);
    // Fallback: full chrome.exe binary in headless mode (when shell is missing)
    try {
      const chromePath = chromium.executablePath();
      if (!existsSync(chromePath)) {
        return { ok: false, error: msg };
      }
      const browser = await chromium.launch({ headless: true, executablePath: chromePath });
      const version = browser.version();
      await browser.close();
      return {
        ok: true,
        mode: 'chrome-executablePath-fallback',
        detail: `${chromePath} (version ${version})`,
      };
    } catch (e2) {
      return {
        ok: false,
        error: `${msg} | fallback also failed: ${e2?.message ?? e2}`,
      };
    }
  }
}

async function main() {
  let result = await probeLaunch();
  if (result.ok && result.mode === 'headless-default') {
    console.log(`ensure-playwright: ready (${result.mode}) ${result.detail}`);
    process.exit(0);
  }

  if (result.ok && result.mode === 'chrome-executablePath-fallback') {
    // The fallback is itself a verified Playwright launch. Do not turn a
    // runnable browser gate into a network-dependent download just to prefer
    // the separate shell artifact.
    console.log(
      `ensure-playwright: ready via verified fallback (${result.detail})`,
    );
    console.log(
      'ensure-playwright: WARN default headless shell is unavailable; e2e will launch with chrome executablePath.',
    );
    return;
  } else {
    console.log(`ensure-playwright: headless launch failed (${result.error}). Installing browsers…`);
  }

  installBrowsers();
  result = await probeLaunch();

  if (!result.ok) {
    console.error('ensure-playwright: still cannot launch headless Chromium after install.');
    console.error(result.error);
    console.error(
      'Hint: check PLAYWRIGHT_BROWSERS_PATH, disk space, and that headless_shell.exe exists under chromium_headless_shell-*/chrome-win/.',
    );
    process.exit(1);
  }

  if (result.mode !== 'headless-default') {
    // Leave a clear warning — e2e helpers will use the same fallback path.
    console.log(
      `ensure-playwright: ready via fallback (${result.mode}) ${result.detail}`,
    );
    console.log(
      'ensure-playwright: WARN default headless shell still unavailable; e2e will launch with chrome executablePath.',
    );
  } else {
    console.log(`ensure-playwright: ready (${result.mode}) ${result.detail}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
