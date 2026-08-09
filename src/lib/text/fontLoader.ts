import sourceSerifUrl from "$lib/assets/fonts/SourceSerif4-Regular.otf?url";
import sourceSansUrl from "$lib/assets/fonts/SourceSans3-Regular.otf?url";
import courierPrimeUrl from "$lib/assets/fonts/CourierPrime-Regular.ttf?url";

import type { TextFontId } from "./fonts";

const fontDefinitions: Record<TextFontId, { family: string; url: string }> = {
  "source-serif": { family: "Source Serif 4", url: sourceSerifUrl },
  "source-sans": { family: "Source Sans 3", url: sourceSansUrl },
  "courier-prime": { family: "Courier Prime", url: courierPrimeUrl },
};

const loaded = new Set<TextFontId>();
const loading = new Map<TextFontId, Promise<void>>();

async function loadFont(fontId: TextFontId) {
  if (
    loaded.has(fontId) ||
    typeof document === "undefined" ||
    !("fonts" in document) ||
    typeof FontFace === "undefined"
  ) {
    loaded.add(fontId);
    return;
  }

  const pending = loading.get(fontId);
  if (pending) {
    await pending;
    return;
  }

  const definition = fontDefinitions[fontId];
  const promise = (async () => {
    const fontFace = new FontFace(definition.family, `url(${definition.url})`);
    const loadedFace = await fontFace.load();
    document.fonts.add(loadedFace);
    loaded.add(fontId);
  })();

  loading.set(fontId, promise);
  try {
    await promise;
  } finally {
    loading.delete(fontId);
  }
}

export async function ensureTextFontsLoaded(
  fontIds: TextFontId[] = Object.keys(fontDefinitions) as TextFontId[],
) {
  await Promise.all(fontIds.map((fontId) => loadFont(fontId)));
}
