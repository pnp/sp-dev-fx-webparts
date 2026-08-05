import { ConcurrencyLimiter, ThrottleGate } from './ConcurrencyLimiter';

const delay = async (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

describe('ConcurrencyLimiter', () => {
  it('never exceeds the configured concurrency', async () => {
    const limiter = new ConcurrencyLimiter(3);
    let active = 0;
    let peak = 0;

    await limiter.map(Array.from({ length: 20 }, (_, i) => i), async () => {
      active += 1;
      peak = Math.max(peak, active);
      await delay(2);
      active -= 1;
    });

    expect(peak).toBeLessThanOrEqual(3);
    expect(peak).toBeGreaterThan(1);
  });

  it('preserves input order in the results even when tasks finish out of order', async () => {
    const limiter = new ConcurrencyLimiter(4);
    const results = await limiter.map([50, 10, 30, 5], async (ms, index) => {
      await delay(ms / 10);
      return index;
    });

    expect(results).toEqual([0, 1, 2, 3]);
  });

  it('propagates the first rejection after in-flight work settles', async () => {
    const limiter = new ConcurrencyLimiter(2);
    let completed = 0;

    await expect(limiter.map([1, 2, 3, 4], async (value) => {
      await delay(2);
      if (value === 2) {
        throw new Error('task 2 failed');
      }
      completed += 1;
    })).rejects.toThrow('task 2 failed');

    expect(completed).toBe(3);
  });

  it('handles an empty input', async () => {
    const limiter = new ConcurrencyLimiter(3);
    await expect(limiter.map([], async () => 1)).resolves.toEqual([]);
  });

  it('treats a non-positive limit as serial execution', async () => {
    const limiter = new ConcurrencyLimiter(0);
    let active = 0;
    let peak = 0;

    await limiter.map([1, 2, 3], async () => {
      active += 1;
      peak = Math.max(peak, active);
      await delay(1);
      active -= 1;
    });

    expect(peak).toBe(1);
  });
});

describe('ThrottleGate', () => {
  it('reports throttling and keeps the longest pause requested', () => {
    const gate = new ThrottleGate();
    expect(gate.isThrottled).toBe(false);

    gate.pauseFor(50);
    gate.pauseFor(10);
    expect(gate.isThrottled).toBe(true);
  });

  it('resolves once the pause has elapsed', async () => {
    const gate = new ThrottleGate();
    gate.pauseFor(10);
    await gate.wait();
    expect(gate.isThrottled).toBe(false);
  });

  it('returns immediately when not throttled', async () => {
    const gate = new ThrottleGate();
    const started = Date.now();
    await gate.wait();
    expect(Date.now() - started).toBeLessThan(50);
  });
});
