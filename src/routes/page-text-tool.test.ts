import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('Add Text feature wiring', () => {
  it('keeps the text editor available on the Sign PDF workspace', () => {
    const source = readFileSync('src/routes/sign-app/+page.svelte', 'utf8');

    expect(source).toContain('createTextPlacementFromDraft');
    expect(source).toMatch(/editorStore\.setActiveTool\(["']text["']\)/);
    expect(source).toMatch(/\$t\(["']page\.addText["']\)/);
  });

  it('keeps text controls and export wiring available on PDF Tools', () => {
    const source = readFileSync('src/routes/tools/+page.svelte', 'utf8');
    const store = readFileSync('src/lib/stores/toolkitStore.ts', 'utf8');
    const exporter = readFileSync('src/lib/pdf/PdfToolkit.ts', 'utf8');

    expect(source).toContain('createTextPlacementFromDraft');
    expect(source).toMatch(/\$t\(["']tools\.addText["']\)/);
    expect(source).toContain('toolkitStore.addTextPlacement');
    expect(store).toContain('addTextPlacement');
    expect(exporter).toContain('textPlacements');
  });
});
