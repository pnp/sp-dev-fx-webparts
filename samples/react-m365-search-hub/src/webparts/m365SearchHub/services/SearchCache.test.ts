import { SearchCache } from './SearchCache';

describe('SearchCache', () => {
  let clock: number;
  const now = (): number => clock;

  beforeEach(() => {
    clock = 1000;
  });

  it('returns what was stored', () => {
    const cache = new SearchCache<string>(10, 1000, now);
    cache.set('a', 'first');

    expect(cache.get('a')).toEqual('first');
  });

  it('misses on a key it never saw', () => {
    expect(new SearchCache<string>(10, 1000, now).get('missing')).toBeUndefined();
  });

  it('forgets an entry once its time is up', () => {
    const cache = new SearchCache<string>(10, 1000, now);
    cache.set('a', 'first');

    clock += 1000;

    expect(cache.get('a')).toBeUndefined();
  });

  it('still serves an entry a moment before it expires', () => {
    const cache = new SearchCache<string>(10, 1000, now);
    cache.set('a', 'first');

    clock += 999;

    expect(cache.get('a')).toEqual('first');
  });

  it('drops an expired entry rather than keeping it around', () => {
    const cache = new SearchCache<string>(10, 1000, now);
    cache.set('a', 'first');
    clock += 1000;
    cache.get('a');

    expect(cache.size).toEqual(0);
  });

  it('never grows past the limit it was given', () => {
    const cache = new SearchCache<number>(3, 10_000, now);
    [1, 2, 3, 4, 5].forEach((n) => cache.set(`k${n}`, n));

    expect(cache.size).toEqual(3);
  });

  it('evicts what has gone longest without being read, not what was written first', () => {
    const cache = new SearchCache<number>(3, 10_000, now);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);

    // Reading 'a' should save it from the next eviction.
    cache.get('a');
    cache.set('d', 4);

    expect(cache.get('a')).toEqual(1);
    expect(cache.get('b')).toBeUndefined();
  });

  it('replaces a value without growing', () => {
    const cache = new SearchCache<string>(10, 10_000, now);
    cache.set('a', 'first');
    cache.set('a', 'second');

    expect(cache.get('a')).toEqual('second');
    expect(cache.size).toEqual(1);
  });

  it('restarts the clock when a value is replaced', () => {
    const cache = new SearchCache<string>(10, 1000, now);
    cache.set('a', 'first');

    clock += 900;
    cache.set('a', 'second');
    clock += 900;

    expect(cache.get('a')).toEqual('second');
  });

  it('empties on clear', () => {
    const cache = new SearchCache<string>(10, 10_000, now);
    cache.set('a', 'first');
    cache.clear();

    expect(cache.size).toEqual(0);
    expect(cache.get('a')).toBeUndefined();
  });
});
