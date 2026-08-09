import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import { LimitReachedError, type Signature } from '../types';

interface DB extends DBSchema {
  signatures: { key: string; value: Signature };
}

export class SignatureLibrary {
  private dbPromise: Promise<IDBPDatabase<DB>> | null = null;
  private readonly max: number;

  constructor(opts: { max: number } = { max: 2 }) {
    this.max = opts.max;
  }

  private getDb(): Promise<IDBPDatabase<DB>> {
    if (this.dbPromise) return this.dbPromise;
    if (typeof indexedDB === 'undefined') {
      return Promise.reject(new Error('Signature storage is only available in a browser.'));
    }

    const dbPromise = openDB<DB>('signxpdf', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('signatures')) {
          db.createObjectStore('signatures', { keyPath: 'id' });
        }
      },
    });
    this.dbPromise = dbPromise;
    void dbPromise.then((db) => {
      db.addEventListener('versionchange', () => db.close());
    });
    return dbPromise;
  }

  ready(): Promise<unknown> { return this.getDb(); }

  async list(): Promise<Signature[]> {
    const db = await this.getDb();
    const all = await db.getAll('signatures');
    return all.sort((a, b) => a.createdAt - b.createdAt);
  }

  async count(): Promise<number> {
    const db = await this.getDb();
    return db.count('signatures');
  }

  async save(blob: Blob, name: string, dimensions?: { width: number; height: number }): Promise<Signature> {
    if ((await this.count()) >= this.max) {
      throw new LimitReachedError(`Free plan saves ${this.max} signatures.`);
    }
    const sig: Signature = {
      id: crypto.randomUUID(),
      name,
      blob,
      width: dimensions?.width,
      height: dimensions?.height,
      createdAt: Date.now(),
    };
    const db = await this.getDb();
    await db.put('signatures', sig);
    return sig;
  }

  async delete(id: string): Promise<void> {
    const db = await this.getDb();
    await db.delete('signatures', id);
  }
}
