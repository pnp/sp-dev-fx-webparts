import { buildGroups } from '../grouping';

describe('buildGroups', () => {
  it('returns [] for empty names', () => {
    expect(buildGroups([], 3)).toEqual([]);
  });

  it('returns [] for a single name', () => {
    expect(buildGroups(['Alice'], 3)).toEqual([]);
  });

  it('filters blank lines before counting', () => {
    expect(buildGroups(['', '  ', 'Alice'], 3)).toEqual([]);
  });

  it('returns one group when groupSize equals names count', () => {
    const names = ['A','B','C','D','E','F','G','H','I','J'];
    const result = buildGroups(names, 10);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(10);
  });

  it('returns one group when groupSize exceeds names count', () => {
    const names = ['A','B','C','D','E','F','G','H','I','J'];
    const result = buildGroups(names, 15);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(10);
  });

  it('creates three groups of 3 for 9 people size 3', () => {
    const result = buildGroups(['A','B','C','D','E','F','G','H','I'], 3);
    expect(result).toHaveLength(3);
    result.forEach(g => expect(g).toHaveLength(3));
  });

  it('caps group size: 10 people size 3 → groups of [3,3,3,1]', () => {
    const names = ['A','B','C','D','E','F','G','H','I','J'];
    const result = buildGroups(names, 3);
    expect(result).toHaveLength(4);
    const sizes = result.map(g => g.length).sort((a, b) => b - a);
    expect(sizes).toEqual([3, 3, 3, 1]);
  });

  it('contains all input names exactly once', () => {
    const names = ['Alice','Bob','Carol','Dave','Eve','Frank','Grace','Heidi','Ivan','Judy'];
    const allMembers = buildGroups(names, 3).flat();
    expect(allMembers).toHaveLength(names.length);
    expect(new Set(allMembers).size).toBe(names.length);
    names.forEach(n => expect(allMembers).toContain(n));
  });

  it('treats groupSize < 2 as 2', () => {
    const result = buildGroups(['A','B','C','D'], 1);
    result.forEach(g => expect(g.length).toBeGreaterThanOrEqual(2));
  });

  it('filters blanks and groups remaining correctly', () => {
    const names = ['A','','B','  ','C','D','E','F','G','H','I','J'];
    const result = buildGroups(names, 3);
    expect(result.flat()).toHaveLength(10);
  });
});
