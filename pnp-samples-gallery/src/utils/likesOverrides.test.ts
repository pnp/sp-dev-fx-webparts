import { beforeEach, describe, expect, it, vi } from 'vitest';
import { readAllOverrides, readOverrideFor, upsertOverride, clearOverridesOlderThan, subscribe } from './likesOverrides';

// Because tests run in Node, jsdom provides localStorage. Vitest does that by default.

describe('likesOverrides', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it('upsert and read', () => {
        upsertOverride('sample-a', { count: 5, viewerReacted: true, updatedAt: '2020-01-01T00:00:00.000Z' });
        const all = readAllOverrides();
        expect(all.length).toBe(1);
        const a = readOverrideFor('sample-a');
        expect(a).not.toBeNull();
        expect(a?.count).toBe(5);
        expect(a?.viewerReacted).toBe(true);
        expect(a?.updatedAt).toBe('2020-01-01T00:00:00.000Z');
    });

    it('update existing entry', () => {
        upsertOverride('sample-b', { count: 2, updatedAt: '2020-01-02T00:00:00.000Z' });
        upsertOverride('sample-b', { count: 3, viewerReacted: false, updatedAt: '2020-01-03T00:00:00.000Z' });
        const b = readOverrideFor('sample-b');
        expect(b).not.toBeNull();
        expect(b?.count).toBe(3);
        expect(b?.viewerReacted).toBe(false);
        expect(b?.updatedAt).toBe('2020-01-03T00:00:00.000Z');
    });

    it('clearOverridesOlderThan filters correctly', () => {
        upsertOverride('old', { count: 1, updatedAt: '2020-01-01T00:00:00.000Z' });
        upsertOverride('new', { count: 10, updatedAt: '2021-01-01T00:00:00.000Z' });
        clearOverridesOlderThan('2020-06-01T00:00:00.000Z');
        const all = readAllOverrides();
        expect(all.find(x => x.sample === 'old')).toBeUndefined();
        expect(all.find(x => x.sample === 'new')).toBeDefined();
    });

    it('subscribe receives events on upsert', () => {
        const calls: Array<string | null> = [];
        const unsub = subscribe((sample) => calls.push(sample));
        upsertOverride('s1', { count: 1, updatedAt: '2022-01-01T00:00:00.000Z' });
        upsertOverride('s2', { count: 2, updatedAt: '2022-01-02T00:00:00.000Z' });
        unsub();
        upsertOverride('s3', { count: 3, updatedAt: '2022-01-03T00:00:00.000Z' });
        expect(calls).toContain('s1');
        expect(calls).toContain('s2');
        expect(calls).not.toContain('s3');
    });
});
