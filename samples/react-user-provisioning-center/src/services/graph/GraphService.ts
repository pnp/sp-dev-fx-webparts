import type { MSGraphClientV3 } from '@microsoft/sp-http';
import { GraphServiceError, RequestAbortedError, RETRYABLE_STATUS_CODES, toGraphServiceError } from './GraphError';
import { delay } from '../util/delay';
import { CircuitBreaker, CircuitOpenError } from '../util/circuitBreaker';
import type { TelemetryService } from '../telemetry/TelemetryService';

export type GraphVersion = 'v1.0' | 'beta';
export type GraphRetryPolicy = 'safe' | 'mutation';

export interface IGraphRequestOptions {
  version?: GraphVersion;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  maxAttempts?: number;
  timeoutMs?: number;
  retryPolicy?: GraphRetryPolicy;
  circuitKey?: string;
}

export interface IBatchRequest {
  id: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  url: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export interface IBatchResponse<T = unknown> {
  id: string;
  status: number;
  body: T;
  headers?: Record<string, string>;
}

export async function batchTyped<TMap extends Record<string, { method: IBatchRequest['method']; url: string; body?: unknown; headers?: Record<string, string> }>>(
  graph: GraphService,
  requests: TMap,
  options?: IGraphRequestOptions
): Promise<{ [K in keyof TMap]: IBatchResponse<unknown> }> {
  const ids = Object.keys(requests);
  const reqList: IBatchRequest[] = ids.map((id) => ({ id, ...requests[id] }));
  const raw: Map<string, IBatchResponse> = await graph.batch(reqList, options);
  const out = {} as { [K in keyof TMap]: IBatchResponse<unknown> };
  for (const id of ids) {
    out[id as keyof TMap] = (raw.get(id) ?? { id, status: 0, body: undefined }) as IBatchResponse<unknown>;
  }
  return out;
}

const DEFAULT_MAX_ATTEMPTS: number = 4;
const BASE_BACKOFF_MS: number = 1000;

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new RequestAbortedError();
  }
}

function defaultCircuitKey(path: string): string {
  const cleaned: string = path.replace(/^\//, '');
  const segment: string = cleaned.split(/[/?]/)[0] ?? 'graph';
  return `graph:${segment || 'root'}`;
}

export function isRetryableUnderPolicy(error: GraphServiceError, policy: GraphRetryPolicy): boolean {
  if (policy === 'safe') {
    return error.retryable;
  }
  if (error.statusCode === 429) {
    return true;
  }
  return error.statusCode === 503 && error.retryAfterSeconds !== undefined;
}

export class GraphService {
  private readonly _client: MSGraphClientV3;
  private _telemetry: TelemetryService | undefined;
  public readonly circuit: CircuitBreaker = new CircuitBreaker({
    failureThreshold: 6,
    openMs: 30_000,
    maxOpenMs: 5 * 60_000
  });

  public constructor(client: MSGraphClientV3) {
    this._client = client;
  }

  public setTelemetry(telemetry: TelemetryService): void {
    this._telemetry = telemetry;
  }

  public async get<T>(path: string, options?: IGraphRequestOptions): Promise<T> {
    return this._execute<T>('GET', path, undefined, options);
  }

  public async post<T>(path: string, body: unknown, options?: IGraphRequestOptions): Promise<T> {
    return this._execute<T>('POST', path, body, options);
  }

  public async patch<T>(path: string, body: unknown, options?: IGraphRequestOptions): Promise<T> {
    return this._execute<T>('PATCH', path, body, options);
  }

  public async put<T>(path: string, body: unknown, options?: IGraphRequestOptions): Promise<T> {
    return this._execute<T>('PUT', path, body, options);
  }

  public async delete<T>(path: string, options?: IGraphRequestOptions): Promise<T> {
    return this._execute<T>('DELETE', path, undefined, options);
  }

  public async batch(
    requests: IBatchRequest[],
    options?: IGraphRequestOptions
  ): Promise<Map<string, IBatchResponse>> {
    const map: Map<string, IBatchResponse> = new Map();
    let pending: IBatchRequest[] = requests;
    const maxRounds: number = 3;
    for (let round = 1; round <= maxRounds && pending.length > 0; round++) {
      const payload = {
        requests: pending.map((r) => ({
          id: r.id,
          method: r.method,
          url: r.url,
          body: r.body,
          headers: r.body ? { 'Content-Type': 'application/json', ...r.headers } : r.headers
        }))
      };
      const result: { responses: IBatchResponse[] } = await this._execute<{
        responses: IBatchResponse[];
      }>('POST', '/$batch', payload, options);

      const retryableIds: Set<string> = new Set();
      for (const response of result.responses ?? []) {
        map.set(response.id, response);
        if (RETRYABLE_STATUS_CODES.indexOf(response.status) !== -1) {
          retryableIds.add(response.id);
        }
      }
      if (retryableIds.size === 0 || round === maxRounds) {
        break;
      }
      const retryAfterMs: number = Math.max(
        0,
        ...pending
          .filter((r) => retryableIds.has(r.id))
          .map((r) => {
            const seconds: string | undefined = map.get(r.id)?.headers?.['Retry-After'];
            const parsed: number = seconds ? parseInt(seconds, 10) : NaN;
            return isNaN(parsed) ? 0 : parsed * 1000;
          })
      );
      const waitMs: number =
        retryAfterMs > 0 ? retryAfterMs : BASE_BACKOFF_MS * Math.pow(2, round - 1) + Math.random() * 250;
      await delay(waitMs, options?.signal);
      pending = pending.filter((r) => retryableIds.has(r.id));
    }
    return map;
  }

  private async _execute<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    path: string,
    body: unknown,
    options?: IGraphRequestOptions
  ): Promise<T> {
    const maxAttempts: number = options?.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;
    const policy: GraphRetryPolicy = options?.retryPolicy ?? (method === 'GET' ? 'safe' : 'mutation');
    const circuitKey: string = options?.circuitKey ?? defaultCircuitKey(path);
    let lastError: GraphServiceError | undefined;
    const started: number = Date.now();

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      throwIfAborted(options?.signal);
      try {
        const result: T = await this.circuit.execute(
          circuitKey,
          () => this._send<T>(method, path, body, options),
          (err) => {
            const asGraph: GraphServiceError = toGraphServiceError(err);
            return asGraph.statusCode === 429 || asGraph.statusCode >= 500 || asGraph.statusCode === 0;
          }
        );
        if (this._telemetry) {
          this._telemetry.trackGraphCall(method, path, 200, Date.now() - started, attempt > 1);
        }
        return result;
      } catch (err) {
        if (err instanceof RequestAbortedError) {
          throw err;
        }
        if (err instanceof CircuitOpenError) {
          if (this._telemetry) {
            this._telemetry.trackEvent(
              'graph.circuitOpen',
              { method, path, circuitKey, retryAfterMs: err.retryAfterMs },
              'warning'
            );
          }
          throw new GraphServiceError(err.message, 429, 'UPC_CircuitOpen', '', Math.ceil(err.retryAfterMs / 1000));
        }
        const graphError: GraphServiceError = toGraphServiceError(err);
        lastError = graphError;
        if (this._telemetry) {
          this._telemetry.trackGraphCall(method, path, graphError.statusCode, Date.now() - started, attempt > 1);
        }
        if (!isRetryableUnderPolicy(graphError, policy) || attempt === maxAttempts) {
          throw graphError;
        }
        const waitMs: number =
          graphError.retryAfterSeconds !== undefined
            ? graphError.retryAfterSeconds * 1000
            : BASE_BACKOFF_MS * Math.pow(2, attempt - 1) + Math.random() * 250;
        await delay(waitMs, options?.signal);
      }
    }
    throw lastError ?? new GraphServiceError('Unknown Graph error', 0, 'UnknownError', '');
  }

  private async _send<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    path: string,
    body: unknown,
    options?: IGraphRequestOptions
  ): Promise<T> {
    let timeoutMs: number | undefined = options?.timeoutMs;
    if (timeoutMs !== undefined && method !== 'GET') {
      if (this._telemetry) {
        this._telemetry.trackEvent('graph.timeoutIgnored', { method, path }, 'warning');
      }
      timeoutMs = undefined;
    }

    let request = this._client.api(path).version(options?.version ?? 'v1.0');
    if (options?.headers) {
      request = request.headers(options.headers);
    }

    const sendPromise: Promise<T> = (() => {
      switch (method) {
        case 'GET':
          return request.get() as Promise<T>;
        case 'POST':
          return request.post(body) as Promise<T>;
        case 'PATCH':
          return request.patch(body) as Promise<T>;
        case 'PUT':
          return request.put(body) as Promise<T>;
        case 'DELETE':
          return request.delete() as Promise<T>;
        default:
          throw new Error(`Unsupported method ${method as string}`);
      }
    })();

    if (timeoutMs === undefined) {
      return sendPromise;
    }

    let timeoutTimer: number | undefined;
    const timeoutPromise: Promise<never> = new Promise<never>((_resolve, reject) => {
      timeoutTimer = window.setTimeout(
        () => reject(new GraphServiceError(`Request to ${path} timed out after ${timeoutMs}ms`, 408, 'RequestTimeout', '')),
        timeoutMs
      );
    });

    try {
      return await Promise.race([sendPromise, timeoutPromise]);
    } finally {
      if (timeoutTimer !== undefined) {
        window.clearTimeout(timeoutTimer);
      }
      sendPromise.catch(() => undefined);
    }
  }
}
