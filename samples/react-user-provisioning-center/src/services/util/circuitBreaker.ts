import { delay } from './delay';

export type CircuitState = 'closed' | 'open' | 'halfOpen';

export interface ICircuitBreakerOptions {
  failureThreshold?: number;
  openMs?: number;
  maxOpenMs?: number;
}

const DEFAULT_FAILURE_THRESHOLD: number = 5;
const DEFAULT_OPEN_MS: number = 30_000;
const DEFAULT_MAX_OPEN_MS: number = 5 * 60_000;

export class CircuitOpenError extends Error {
  public readonly key: string;
  public readonly retryAfterMs: number;

  public constructor(key: string, retryAfterMs: number) {
    super(`Circuit open for ${key}; retry in ${Math.ceil(retryAfterMs / 1000)}s`);
    Object.setPrototypeOf(this, CircuitOpenError.prototype);
    this.name = 'CircuitOpenError';
    this.key = key;
    this.retryAfterMs = retryAfterMs;
  }
}

interface ICircuit {
  state: CircuitState;
  consecutiveFailures: number;
  openUntil: number;
  currentOpenMs: number;
  probing: boolean;
}

export class CircuitBreaker {
  private readonly _circuits: Map<string, ICircuit> = new Map();
  private readonly _failureThreshold: number;
  private readonly _openMs: number;
  private readonly _maxOpenMs: number;
  private _now: () => number = () => Date.now();

  public constructor(options?: ICircuitBreakerOptions) {
    this._failureThreshold = options?.failureThreshold ?? DEFAULT_FAILURE_THRESHOLD;
    this._openMs = options?.openMs ?? DEFAULT_OPEN_MS;
    this._maxOpenMs = options?.maxOpenMs ?? DEFAULT_MAX_OPEN_MS;
  }

  public setClock(now: () => number): void {
    this._now = now;
  }

  public stateOf(key: string): CircuitState {
    const circuit: ICircuit | undefined = this._circuits.get(key);
    if (!circuit) {
      return 'closed';
    }
    if (circuit.state === 'open' && this._now() >= circuit.openUntil) {
      circuit.state = 'halfOpen';
      circuit.probing = false;
    }
    return circuit.state;
  }

  public async execute<T>(
    key: string,
    action: () => Promise<T>,
    isFailure: (err: unknown) => boolean
  ): Promise<T> {
    const state: CircuitState = this.stateOf(key);
    const circuit: ICircuit = this._ensure(key);

    if (state === 'open') {
      throw new CircuitOpenError(key, Math.max(0, circuit.openUntil - this._now()));
    }
    if (state === 'halfOpen') {
      if (circuit.probing) {
        throw new CircuitOpenError(key, circuit.currentOpenMs);
      }
      circuit.probing = true;
    }

    try {
      const result: T = await action();
      this._onSuccess(circuit);
      return result;
    } catch (err) {
      if (isFailure(err)) {
        this._onFailure(circuit);
      } else {
        this._onSuccess(circuit);
      }
      throw err;
    } finally {
      circuit.probing = false;
    }
  }

  public reset(key?: string): void {
    if (key) {
      this._circuits.delete(key);
    } else {
      this._circuits.clear();
    }
  }

  public get openCircuits(): string[] {
    const open: string[] = [];
    this._circuits.forEach((_circuit, key) => {
      if (this.stateOf(key) !== 'closed') {
        open.push(key);
      }
    });
    return open;
  }

  private _ensure(key: string): ICircuit {
    let circuit: ICircuit | undefined = this._circuits.get(key);
    if (!circuit) {
      circuit = {
        state: 'closed',
        consecutiveFailures: 0,
        openUntil: 0,
        currentOpenMs: this._openMs,
        probing: false
      };
      this._circuits.set(key, circuit);
    }
    return circuit;
  }

  private _onSuccess(circuit: ICircuit): void {
    circuit.state = 'closed';
    circuit.consecutiveFailures = 0;
    circuit.currentOpenMs = this._openMs;
    circuit.openUntil = 0;
  }

  private _onFailure(circuit: ICircuit): void {
    circuit.consecutiveFailures++;
    const wasHalfOpen: boolean = circuit.state === 'halfOpen';
    if (wasHalfOpen || circuit.consecutiveFailures >= this._failureThreshold) {
      circuit.currentOpenMs = wasHalfOpen
        ? Math.min(circuit.currentOpenMs * 2, this._maxOpenMs)
        : circuit.currentOpenMs;
      circuit.state = 'open';
      circuit.openUntil = this._now() + circuit.currentOpenMs;
    }
  }
}

export async function awaitCircuit(
  breaker: CircuitBreaker,
  key: string,
  maxWaitMs: number,
  signal?: AbortSignal
): Promise<boolean> {
  const deadline: number = Date.now() + maxWaitMs;
  while (breaker.stateOf(key) === 'open' && Date.now() < deadline) {
    await delay(Math.min(2000, Math.max(250, deadline - Date.now())), signal);
  }
  return breaker.stateOf(key) !== 'open';
}
