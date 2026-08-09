import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import PageManager from './PageManager.svelte';
import type { PageRef } from '$lib/types';

function createBlankPage(id: string): PageRef {
  return {
    id,
    sourceKey: 'blank',
    pageIndex: 0,
  };
}

describe('PageManager', () => {
  it('does not enter drag mode when the delete control is pressed', async () => {
    HTMLElement.prototype.setPointerCapture ??= () => {};

    const onDeleteSelected = vi.fn();
    const { container } = render(PageManager, {
      pages: [createBlankPage('page-1')],
      sourceNames: new Map(),
      sources: new Map(),
      onReorder: vi.fn(),
      onDeleteSelected,
      onInsertBlank: vi.fn(),
    });

    const deleteButton = screen.getByLabelText('Delete page 1');

    expect(screen.queryByRole('status')).toBeNull();

    await fireEvent.pointerDown(deleteButton, { button: 0 });

    expect(screen.queryByRole('status')).toBeNull();
    expect(container.querySelector('.thumbs-grid')?.classList.contains('is-dragging')).toBe(false);
    expect(onDeleteSelected).not.toHaveBeenCalled();
  });
});
