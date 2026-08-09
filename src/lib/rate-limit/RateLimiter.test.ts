import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RateLimiter } from './RateLimiter';

describe('RateLimiter', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-28T10:00:00Z'));
  });

  it('starts with 5 remaining and canExport=true', () => {
    const r = new RateLimiter(5, 24 * 60 * 60 * 1000);
    expect(r.remaining()).toBe(5);
    expect(r.canExport()).toBe(true);
  });

  it('blocks after 5 exports within 24h', () => {
    const r = new RateLimiter(5, 24 * 60 * 60 * 1000);
    for (let i = 0; i < 5; i++) r.recordExport();
    expect(r.remaining()).toBe(0);
    expect(r.canExport()).toBe(false);
  });

  it('frees up a slot after 24h rolling window', () => {
    const r = new RateLimiter(5, 24 * 60 * 60 * 1000);
    for (let i = 0; i < 5; i++) r.recordExport();
    expect(r.canExport()).toBe(false);
    vi.setSystemTime(new Date('2026-04-29T10:00:01Z'));
    expect(r.canExport()).toBe(true);
    expect(r.remaining()).toBe(5);
  });

  it('persists across instances via localStorage', () => {
    const a = new RateLimiter(5, 24 * 60 * 60 * 1000);
    a.recordExport();
    const b = new RateLimiter(5, 24 * 60 * 60 * 1000);
    expect(b.remaining()).toBe(4);
  });

  it('resetTime returns when oldest export exits the window', () => {
    const r = new RateLimiter(5, 24 * 60 * 60 * 1000);
    for (let i = 0; i < 5; i++) r.recordExport();
    const reset = r.resetTime();
    expect(reset?.toISOString()).toBe('2026-04-29T10:00:00.000Z');
  });
});
