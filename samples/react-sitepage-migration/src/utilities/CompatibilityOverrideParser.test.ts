import { parseCompatibilityOverrides } from './CompatibilityOverrideParser';
import { createCompatibilityResolver, getCompatibilityMatrix } from '../compat/WebPartCompatibilityRegistry';
import { formatString } from './formatString';

describe('parseCompatibilityOverrides', () => {
  it('accepts an empty or blank configuration', () => {
    expect(parseCompatibilityOverrides('')).toEqual([]);
    expect(parseCompatibilityOverrides('   ')).toEqual([]);
    expect(parseCompatibilityOverrides('[]')).toEqual([]);
  });

  it('normalises the id to lower case so lookups are case-insensitive', () => {
    const [override] = parseCompatibilityOverrides(JSON.stringify([{
      id: 'ABCDEF12-0000-0000-0000-000000000000',
      title: 'Custom',
      compatibility: 'PartiallySupported',
      notes: 'Reviewed.'
    }]));

    expect(override.id).toBe('abcdef12-0000-0000-0000-000000000000');
  });

  it('rejects anything that is not an array', () => {
    expect(() => parseCompatibilityOverrides('{"id":"x"}')).toThrow(/array/i);
  });

  it('rejects entries with a missing or invalid compatibility level', () => {
    expect(() => parseCompatibilityOverrides(JSON.stringify([{ id: 'a', title: 'T', notes: 'N' }]))).toThrow();
    expect(() => parseCompatibilityOverrides(JSON.stringify([{
      id: 'a', title: 'T', notes: 'N', compatibility: 'MostlyFine'
    }]))).toThrow();
  });

  it('rejects malformed JSON', () => {
    expect(() => parseCompatibilityOverrides('[{')).toThrow();
  });
});

describe('createCompatibilityResolver', () => {
  it('resolves known first-party web parts from the built-in registry', () => {
    const resolve = createCompatibilityResolver();
    expect(resolve('d1d91016-032f-456d-98a4-721247c305e8').compatibility).toBe('FullySupported');
  });

  it('treats an unknown web part as unsupported rather than assuming it is fine', () => {
    const resolve = createCompatibilityResolver();
    const result = resolve('11111111-2222-3333-4444-555555555555');
    expect(result.compatibility).toBe('Unsupported');
  });

  it('lets a tenant override win over the built-in registry', () => {
    const resolve = createCompatibilityResolver([{
      id: 'd1d91016-032f-456d-98a4-721247c305e8',
      title: 'Image (restricted)',
      compatibility: 'Unsupported',
      notes: 'Blocked by policy.'
    }]);

    expect(resolve('D1D91016-032F-456D-98A4-721247C305E8').compatibility).toBe('Unsupported');
  });
});

describe('getCompatibilityMatrix', () => {
  it('replaces rather than duplicates an overridden entry', () => {
    const matrix = getCompatibilityMatrix([{
      id: 'd1d91016-032f-456d-98a4-721247c305e8',
      title: 'Image (custom)',
      compatibility: 'PartiallySupported',
      notes: 'Custom note.'
    }]);

    const matches = matrix.filter((entry) => entry.id.toLowerCase() === 'd1d91016-032f-456d-98a4-721247c305e8');
    expect(matches).toHaveLength(1);
    expect(matches[0].title).toBe('Image (custom)');
  });
});

describe('formatString', () => {
  it('substitutes positional placeholders', () => {
    expect(formatString('{0} of {1}', 3, 10)).toBe('3 of 10');
  });

  it('replaces every occurrence of a placeholder', () => {
    expect(formatString('{0}-{0}', 'x')).toBe('x-x');
  });

  it('leaves unmatched placeholders alone', () => {
    expect(formatString('{0} and {1}', 'only')).toBe('only and {1}');
  });
});
