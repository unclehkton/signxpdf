import { beforeEach, describe, expect, it } from 'vitest';
import { SignatureLibrary } from './SignatureLibrary';
import { LimitReachedError } from '../types';

const makeBlob = () => new Blob([new Uint8Array([0x89, 0x50, 0x4e, 0x47])], { type: 'image/png' });

describe('SignatureLibrary', () => {
  let lib: SignatureLibrary;

  beforeEach(async () => {
    indexedDB.deleteDatabase('signxpdf');
    lib = new SignatureLibrary({ max: 2 });
    await lib.ready();
  });

  it('starts empty', async () => {
    expect(await lib.list()).toEqual([]);
    expect(await lib.count()).toBe(0);
  });

  it('saves and lists signatures', async () => {
    const saved = await lib.save(makeBlob(), 'A', { width: 100, height: 300 });
    expect(saved.name).toBe('A');
    expect(saved.width).toBe(100);
    expect(saved.height).toBe(300);
    expect(await lib.count()).toBe(1);
    const all = await lib.list();
    expect(all.length).toBe(1);
    expect(all[0]!.name).toBe('A');
  });

  it('throws LimitReachedError beyond max=2', async () => {
    await lib.save(makeBlob(), 'A');
    await lib.save(makeBlob(), 'B');
    await expect(lib.save(makeBlob(), 'C')).rejects.toBeInstanceOf(LimitReachedError);
  });

  it('deletes by id', async () => {
    const saved = await lib.save(makeBlob(), 'A');
    await lib.delete(saved.id);
    expect(await lib.count()).toBe(0);
  });
});
