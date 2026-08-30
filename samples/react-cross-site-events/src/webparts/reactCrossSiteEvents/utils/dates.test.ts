import { createDateRange, parseGraphDateTime } from './dates';

describe('dates', () => {
  it('parses a Windows time-zone wall clock without using the machine time zone', () => {
    expect(parseGraphDateTime('2026-01-15T09:00:00', 'Eastern Standard Time').toISOString()).toBe('2026-01-15T14:00:00.000Z');
  });

  it('creates UTC calendar-day boundaries', () => {
    const range = createDateRange(new Date('2026-08-30T21:00:00.000Z'), 1, 2);
    expect(range.start.toISOString()).toBe('2026-08-29T00:00:00.000Z');
    expect(range.end.toISOString()).toBe('2026-09-02T00:00:00.000Z');
  });
});
