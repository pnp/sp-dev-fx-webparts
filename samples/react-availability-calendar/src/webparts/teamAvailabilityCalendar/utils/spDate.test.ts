import { parseSpDateOnly } from './spDate';

function ymd(d: Date | undefined): [number, number, number] | undefined {
  return d ? [d.getFullYear(), d.getMonth(), d.getDate()] : undefined;
}

describe('parseSpDateOnly', () => {
  it('keeps the authored day for a UTC-midnight Date-only value', () => {
    expect(ymd(parseSpDateOnly('2026-09-01T00:00:00Z'))).toEqual([2026, 8, 1]);
  });

  it('accepts a bare date', () => {
    expect(ymd(parseSpDateOnly('2026-09-01'))).toEqual([2026, 8, 1]);
  });

  it('ignores the time and offset part, so no viewer time zone can shift the day', () => {
    expect(ymd(parseSpDateOnly('2026-09-01T23:30:00-08:00'))).toEqual([2026, 8, 1]);
    expect(ymd(parseSpDateOnly('2026-09-01T00:00:00+13:00'))).toEqual([2026, 8, 1]);
  });

  it('handles month and year boundaries', () => {
    expect(ymd(parseSpDateOnly('2026-12-31T00:00:00Z'))).toEqual([2026, 11, 31]);
    expect(ymd(parseSpDateOnly('2027-01-01T00:00:00Z'))).toEqual([2027, 0, 1]);
    expect(ymd(parseSpDateOnly('2028-02-29T00:00:00Z'))).toEqual([2028, 1, 29]);
  });

  it('returns local midnight', () => {
    const d = parseSpDateOnly('2026-09-01T00:00:00Z') as Date;
    expect([d.getHours(), d.getMinutes(), d.getSeconds()]).toEqual([0, 0, 0]);
  });

  it('falls back to Date parsing for a non-ISO string and drops the time', () => {
    const d = parseSpDateOnly('Sep 1, 2026 14:30') as Date;
    expect(ymd(d)).toEqual([2026, 8, 1]);
    expect(d.getHours()).toBe(0);
  });

  it('returns undefined for empty or unparseable input', () => {
    expect(parseSpDateOnly(undefined)).toBeUndefined();
    expect(parseSpDateOnly('')).toBeUndefined();
    expect(parseSpDateOnly('not a date')).toBeUndefined();
  });
});
