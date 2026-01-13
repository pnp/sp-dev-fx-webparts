import { describe, it, expect } from 'vitest';
import { normalizeLikes } from './likesNormalizer';
import type { LikesJson } from '../types/likes';

describe('normalizeLikes', () => {
  it('returns empty maps for null/undefined', () => {
    const out = normalizeLikes(null);
    expect(out.totals.size).toBe(0);
    expect(out.reactorsMap.size).toBe(0);
  });

  it('parses discussions shape with totals and reactors', () => {
    const raw: LikesJson = {
      discussions: {
        'sample:foo': { totalReactions: 3, allReactors: ['Alice', 'bob'] },
        'bar': { totalReactions: 1, allReactors: [] },
      }
    } as any;

    const out = normalizeLikes(raw);
    expect(out.totals.get('foo')).toBe(3);
    expect(out.totals.get('bar')).toBe(1);
    expect(out.reactorsMap.get('foo')).toEqual(['alice', 'bob']);
  });

  it('parses legacy likes shape with count', () => {
    const raw: LikesJson = {
      likes: {
        'sample:foo': { count: 5 },
        'baz': { count: 2 }
      }
    } as any;

    const out = normalizeLikes(raw);
    expect(out.totals.get('foo')).toBe(5);
    expect(out.totals.get('baz')).toBe(2);
  });

  it('prefers discussions totals over likes when both present', () => {
    const raw: LikesJson = {
      discussions: { 'foo': { totalReactions: 9 } },
      likes: { 'foo': { count: 1 } }
    } as any;

    const out = normalizeLikes(raw);
    expect(out.totals.get('foo')).toBe(9);
  });
});
