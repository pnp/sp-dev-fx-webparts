import {
  calculateDelta,
  getThresholdState,
  getTrend,
  mapKpiCards,
  normalizeNumber,
  safeDisplayNumber
} from './kpiUtils';

describe('KPI utilities', () => {
  it('normalizes valid numbers and rejects missing or invalid values', () => {
    expect(normalizeNumber(12.5)).toBe(12.5);
    expect(normalizeNumber(' 12.5 ')).toBe(12.5);
    expect(normalizeNumber('')).toBeUndefined();
    expect(normalizeNumber('12abc')).toBeUndefined();
    expect(normalizeNumber(Infinity)).toBeUndefined();
    expect(normalizeNumber(undefined)).toBeUndefined();
  });

  it('uses deterministic threshold boundaries', () => {
    expect(getThresholdState(100, 100)).toBe('onTrack');
    expect(getThresholdState(80, 100)).toBe('attention');
    expect(getThresholdState(79.99, 100)).toBe('atRisk');
    expect(getThresholdState(undefined, 100)).toBe('unknown');
    expect(getThresholdState(100, undefined)).toBe('unknown');
  });

  it('calculates signed deltas and trends, including nulls', () => {
    expect(calculateDelta(12, 10)).toBe(2);
    expect(calculateDelta(10, 12)).toBe(-2);
    expect(calculateDelta(10, undefined)).toBeUndefined();
    expect(getTrend(0)).toBe('steady');
    expect(getTrend(undefined)).toBe('unknown');
  });

  it('selects the latest observation and a deterministic prior observation', () => {
    expect(mapKpiCards([
      { id: 2, title: 'Sales', value: 90, target: 100, status: 'Open', date: '2026-01-02T00:00:00.000Z' },
      { id: 1, title: 'Sales', value: 80, target: 100, status: 'Open', date: '2026-01-01T00:00:00.000Z' },
      { id: 3, title: 'Empty', value: undefined, target: undefined, status: '', date: '2026-01-02T00:00:00.000Z' }
    ])).toEqual([
      expect.objectContaining({ title: 'Empty', value: undefined, delta: undefined, threshold: 'unknown' }),
      expect.objectContaining({ title: 'Sales', value: 90, delta: 10, trend: 'rising', threshold: 'attention' })
    ]);
  });

  it('never emits unsafe display text for a missing value', () => {
    expect(safeDisplayNumber(undefined)).toBe('—');
  });
});
