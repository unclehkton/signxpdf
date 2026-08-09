const KEY = 'signxpdf.rateLimit';

export class RateLimiter {
  constructor(
    private readonly max: number = 5,
    private readonly windowMs: number = 24 * 60 * 60 * 1000,
  ) {}

  private read(): number[] {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr.filter((n) => typeof n === 'number') : [];
    } catch (error) {
      console.warn('RateLimiter read failed, falling back to an empty window.', error);
      return [];
    }
  }

  private write(arr: number[]): void {
    try {
      localStorage.setItem(KEY, JSON.stringify(arr));
    } catch (error) {
      console.warn('RateLimiter write failed, export usage could not be persisted.', error);
    }
  }

  private prune(arr: number[]): number[] {
    const cutoff = Date.now() - this.windowMs;
    return arr.filter((t) => t >= cutoff);
  }

  remaining(): number {
    const pruned = this.prune(this.read());
    return Math.max(0, this.max - pruned.length);
  }

  canExport(): boolean {
    return this.remaining() > 0;
  }

  recordExport(): void {
    const pruned = this.prune(this.read());
    pruned.push(Date.now());
    this.write(pruned);
  }

  resetTime(): Date | null {
    const pruned = this.prune(this.read()).sort((a, b) => a - b);
    if (pruned.length < this.max) return null;
    return new Date(pruned[0]! + this.windowMs);
  }
}
