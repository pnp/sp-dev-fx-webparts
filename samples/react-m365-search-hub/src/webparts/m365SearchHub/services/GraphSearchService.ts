import { ISearchPage, ISearchQuery } from '../models/ISearchModels';
import { SearchFailure } from '../models/SearchStatus';
import { buildSearchRequest, cacheKey } from '../utils/buildQuery';
import { normaliseSearchResponse } from '../utils/normaliseResults';
import { normaliseGraphError } from './normaliseGraphError';
import { SearchCache } from './SearchCache';

/** Raised when a request was abandoned because a newer one replaced it. */
export class SearchCancelled extends Error {
  public constructor() {
    super('Search cancelled');
    this.name = 'SearchCancelled';
  }
}

/**
 * A search that failed, carrying the one thing callers act on.
 *
 * A real Error rather than a plain object, so it survives a `throw` the way
 * every other error in the codebase does and keeps a stack.
 */
export class SearchError extends Error {
  public constructor(
    public readonly failure: SearchFailure,
    public readonly retryAfterSeconds?: number
  ) {
    super(`Search failed: ${failure}`);
    this.name = 'SearchError';
  }
}

export function isCancelled(error: unknown): boolean {
  return (error as { name?: string })?.name === 'SearchCancelled';
}

/** The outcome of a failed search, or undefined when it was not one. */
export function failureOf(error: unknown): SearchFailure | undefined {
  const candidate = error as { name?: string; failure?: SearchFailure };
  return candidate?.name === 'SearchError' ? candidate.failure : undefined;
}

/** What one call cost. Measured here, reported by the panel, sent nowhere. */
export interface ISearchOutcome {
  page: ISearchPage;
  durationMs: number;
  fromCache: boolean;
}

/**
 * The minimum this service needs from a Graph client.
 *
 * Narrowed to what is used so the service can be tested without the SharePoint
 * Framework, and so swapping the client is a small change.
 */
export interface IGraphPoster {
  post(path: string, body: unknown, signal?: AbortSignal): Promise<unknown>;
}

export interface IGraphSearchServiceOptions {
  cache?: SearchCache<ISearchPage>;
  now?: () => number;
}

/**
 * Runs searches against Microsoft Graph.
 *
 * Owns three things the components should not have to: cancelling a request
 * that a newer one has made pointless, a short cache, and turning whatever
 * Graph threw into a single normalised outcome.
 */
export class GraphSearchService {
  private readonly _cache: SearchCache<ISearchPage>;
  private readonly _now: () => number;
  private _inFlight?: AbortController;
  private _cancelledCount = 0;

  public constructor(
    private readonly poster: IGraphPoster,
    options: IGraphSearchServiceOptions = {}
  ) {
    this._cache = options.cache || new SearchCache<ISearchPage>();
    this._now =
      options.now ||
      (typeof performance !== 'undefined' && typeof performance.now === 'function'
        ? () => performance.now()
        : () => Date.now());
  }

  /** How many requests have been abandoned. Read by the performance panel. */
  public get cancelledCount(): number {
    return this._cancelledCount;
  }

  /**
   * The cached page for a query, without asking Graph and without waiting.
   *
   * Lets a caller answer synchronously when it can, so a repeated query does
   * not flash a spinner for the length of a microtask.
   */
  public tryCached(query: ISearchQuery): ISearchPage | undefined {
    return this._cache.get(cacheKey(query));
  }

  /**
   * Abandons whatever is in flight. Safe to call when nothing is.
   *
   * "Abandons", not "aborts": whether the request itself stops depends on the
   * poster. The client the SharePoint Framework provides has no `AbortSignal`
   * parameter, so with it the request completes and its answer is discarded.
   * A poster built on `fetch` would stop the request outright.
   */
  public cancelInFlight(): void {
    if (this._inFlight) {
      this._inFlight.abort();
      this._inFlight = undefined;
      this._cancelledCount += 1;
    }
  }

  /**
   * Runs one search.
   *
   * Any request still in flight is abandoned first: its answer is already
   * obsolete, and letting it through would mean a stale page arriving after a
   * fresh one. Whether the request also stops travelling is the poster's
   * business, and with the SharePoint Framework's Graph client it does not.
   *
   * @throws {SearchCancelled} when a newer search replaced this one
   * @throws {SearchError} normalised, for anything Graph refused
   */
  public async search(query: ISearchQuery): Promise<ISearchOutcome> {
    const key = cacheKey(query);
    const cached = this._cache.get(key);
    if (cached) {
      return { page: cached, durationMs: 0, fromCache: true };
    }

    this.cancelInFlight();

    const controller = new AbortController();
    this._inFlight = controller;
    const startedAt = this._now();

    try {
      const response = await this.poster.post(
        '/search/query',
        buildSearchRequest(query),
        controller.signal
      );

      if (controller.signal.aborted) {
        throw new SearchCancelled();
      }

      const page = normaliseSearchResponse(response);
      this._cache.set(key, page);

      return { page, durationMs: this._now() - startedAt, fromCache: false };
    } catch (error) {
      // An abort is not a failure worth showing anybody: it happened because
      // the person kept typing.
      if (controller.signal.aborted || isAbortError(error)) {
        throw new SearchCancelled();
      }
      const normalised = normaliseGraphError(error);
      throw new SearchError(normalised.failure, normalised.retryAfterSeconds);
    } finally {
      if (this._inFlight === controller) {
        this._inFlight = undefined;
      }
    }
  }

  public clearCache(): void {
    this._cache.clear();
  }
}

function isAbortError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    (error as { name?: string }).name === 'AbortError'
  );
}
