/**
 * Launch Chromium for e2e scripts the same way ensure-playwright validates.
 *
 * Playwright ≥1.49 default headless uses chromium-headless-shell (headless_shell.exe).
 * If that artifact is missing but full chrome.exe is present, fall back to launching
 * chrome via executablePath so gates stay runnable after a partial install.
 */
import { existsSync } from 'node:fs';
import { chromium } from 'playwright';

/**
 * @param {import('playwright').LaunchOptions} [options]
 * @returns {Promise<import('playwright').Browser>}
 */
export async function launchChromium(options = {}) {
  const opts = { headless: true, ...options };

  try {
    return await chromium.launch(opts);
  } catch (primaryError) {
    // If caller forced a custom executablePath, do not second-guess it.
    if (opts.executablePath) throw primaryError;

    let chromePath;
    try {
      chromePath = chromium.executablePath();
    } catch {
      throw primaryError;
    }

    if (!chromePath || !existsSync(chromePath)) {
      throw primaryError;
    }

    console.warn(
      `launch-chromium: default headless launch failed (${primaryError?.message ?? primaryError}); ` +
        `retrying with chrome executablePath=${chromePath}`,
    );
    return await chromium.launch({ ...opts, executablePath: chromePath });
  }
}
