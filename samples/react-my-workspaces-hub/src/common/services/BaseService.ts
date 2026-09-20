import { SPFI } from '@pnp/sp';
import { GraphFI } from '@pnp/graph';
import { getCached, setCached } from '../utils/cache';

/** Dependencies every service needs: configured PnPjs roots. */
export interface IServiceContext {
  sp: SPFI | undefined;
  graph: GraphFI | undefined;
}

/**
 * Thin base for all domain services. Holds the PnPjs roots and provides
 * cross-cutting helpers (localStorage caching, error normalization) so the
 * concrete services stay focused on their domain queries.
 */
export abstract class BaseService {
  protected readonly sp: SPFI | undefined;
  protected readonly graph: GraphFI | undefined;

  public constructor(ctx: IServiceContext) {
    this.sp = ctx.sp;
    this.graph = ctx.graph;
  }

  /**
   * Run `factory`, caching its resolved value in localStorage for `ttlMs`
   * (default 1 day). Subsequent calls within the TTL skip the network.
   */
  protected async withCache<T>(
    key: string,
    factory: () => Promise<T>,
    ttlMs?: number
  ): Promise<T> {
    const cached = getCached<T>(key);
    if (cached !== undefined) {
      return cached;
    }
    const value = await factory();
    setCached(key, value, ttlMs);
    return value;
  }

  /** Normalize an unknown error into an `Error` prefixed with the call site. */
  protected toError(error: unknown, context: string): Error {
    if (error instanceof Error) {
      error.message = `[${context}] ${error.message}`;
      return error;
    }
    return new Error(`[${context}] ${String(error)}`);
  }
}
