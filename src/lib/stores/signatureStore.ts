import { writable } from 'svelte/store';
import type { Signature } from '../types';
import { SignatureLibrary } from '../signatures/SignatureLibrary';

const lib = new SignatureLibrary({ max: 2 });
export const signatureLibrary = lib;

function createStore() {
  const { subscribe, set } = writable<Signature[]>([]);
  return {
    subscribe,
    async refresh() { set(await lib.list()); },
    async save(blob: Blob, name: string, dimensions?: { width: number; height: number }) {
      const saved = await lib.save(blob, name, dimensions);
      await this.refresh();
      return saved;
    },
    async remove(id: string) { await lib.delete(id); await this.refresh(); },
  };
}

export const signatureStore = createStore();
