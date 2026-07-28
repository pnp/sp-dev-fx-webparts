import { ContentKind, ISearchQuery, ISearchResult, ISearchTiming, SortOrder } from '../models/ISearchModels';
import { SearchFailure, SearchStatus } from '../models/SearchStatus';
import { failureOf, GraphSearchService, isCancelled } from '../services/GraphSearchService';
import { isSearchable, MINIMUM_QUERY_LENGTH } from '../utils/buildQuery';
import { filterByKind } from '../utils/normaliseResults';

export interface ISearchState {
  status: SearchStatus;
  failure?: SearchFailure;
  /** Results already filtered to the selected kinds. */
  results: ISearchResult[];
  /** What Microsoft Graph reported for the whole query, not this page. */
  total: number;
  moreResultsAvailable: boolean;
  /** The text these results belong to, so the empty state can quote it. */
  query: string;
  timing: ISearchTiming;
}

export const INITIAL_STATE: ISearchState = {
  status: 'idle',
  results: [],
  total: 0,
  moreResultsAvailable: false,
  query: '',
  timing: { durationMs: 0, resultCount: 0, fromCache: false, cancelled: false, pagesLoaded: 0 }
};

export interface ISearchSessionOptions {
  debounceMs?: number;
  pageSize?: number;
  /** Absolute site URL to restrict to, or nothing for no restriction. */
  sitePath?: string;
  /** Sort the page author chose as the starting point. */
  sort?: SortOrder;
  /** Injected so the timing is deterministic under test. */
  schedule?: (callback: () => void, delayMs: number) => unknown;
  cancelScheduled?: (handle: unknown) => void;
}

/**
 * Everything that happens between a keystroke and a rendered result.
 *
 * Deliberately free of React. The hook around it does nothing but hold this in
 * a ref and copy state into `useState`, which means the awkward part — debounce
 * racing an abort racing an unmount — is testable without a renderer, and the
 * same logic serves whatever the UI turns out to be.
 *
 * Two rules hold the concurrency together:
 *
 *  - every search takes a sequence number, and a response whose number is no
 *    longer the current one is dropped. Cancelling handles the network; this
 *    handles the case where a slow answer resolves anyway.
 *  - once disposed, nothing is reported. A component that has gone away must
 *    never be told about a result.
 */
export class SearchSession {
  private _state: ISearchState = INITIAL_STATE;
  private _text = '';
  private _kinds: ContentKind[] = [];
  private _sort: SortOrder = 'relevance';
  private _from = 0;
  private _pagesLoaded = 0;
  private _sequence = 0;
  private _pending: unknown;
  private _disposed = false;

  private readonly _debounceMs: number;
  private readonly _pageSize: number;
  private _sitePath?: string;
  private readonly _schedule: (callback: () => void, delayMs: number) => unknown;
  private readonly _cancelScheduled: (handle: unknown) => void;

  public constructor(
    private readonly service: GraphSearchService,
    private readonly onChange: (state: ISearchState) => void,
    options: ISearchSessionOptions = {}
  ) {
    this._debounceMs = options.debounceMs ?? 300;
    this._pageSize = options.pageSize ?? 25;
    this._sitePath = options.sitePath;
    this._sort = options.sort ?? 'relevance';
    this._schedule = options.schedule || ((callback, delay) => setTimeout(callback, delay));
    this._cancelScheduled = options.cancelScheduled || ((handle) => clearTimeout(handle as never));
  }

  public get state(): ISearchState {
    return this._state;
  }

  /** New text typed. Debounced, because every keystroke is not a search. */
  public setText(text: string): void {
    this._text = text;
    this._from = 0;
    this._pagesLoaded = 0;

    if (!isSearchable(text)) {
      // Nothing worth asking for. Abandon anything in flight so a late answer
      // to a longer query cannot land on an emptied box.
      this._cancelPending();
      this.service.cancelInFlight();
      this._sequence += 1;
      this._emit({ ...INITIAL_STATE, query: text });
      return;
    }

    this._scheduleSearch();
  }

  /** Filters changed. The current results no longer answer the question. */
  public setKinds(kinds: ContentKind[]): void {
    this._kinds = [...kinds];
    this._from = 0;
    this._pagesLoaded = 0;
    this._runIfSearchable();
  }

  /**
   * Where to look changed, which is a page-author decision.
   *
   * Whatever is on screen answered a different question, so it goes and the
   * search runs again rather than keeping results under a heading that has
   * stopped describing them.
   */
  public setScope(sitePath: string | undefined): void {
    this._sitePath = sitePath;
    this._from = 0;
    this._pagesLoaded = 0;

    if (!isSearchable(this._text)) {
      this._sequence += 1;
      this._emit({ ...INITIAL_STATE, query: this._text });
      return;
    }
    this._runDetached(false);
  }

  public setSort(sort: SortOrder): void {
    this._sort = sort;
    this._from = 0;
    this._pagesLoaded = 0;
    this._runIfSearchable();
  }

  /** Asks for the next page and appends it, rather than replacing. */
  public loadMore(): void {
    if (!this._state.moreResultsAvailable || this._state.status === 'loading') {
      return;
    }
    this._from += this._pageSize;
    this._runDetached(true);
  }

  /** Runs the same search again, after a failure the person chose to retry. */
  public retry(): void {
    this._runIfSearchable();
  }

  /** Stops everything. Nothing is reported after this. */
  public dispose(): void {
    this._disposed = true;
    this._cancelPending();
    this.service.cancelInFlight();
  }

  /**
   * Starts a search nobody awaits.
   *
   * `_run` reports outcomes through `onChange` and swallows what it should, so
   * there is no result to wait for. The catch is a backstop: an unhandled
   * rejection here would surface as a console error with no owner.
   */
  private _runDetached(append: boolean): void {
    this._run(append).catch(() => undefined);
  }

  private _runIfSearchable(): void {
    if (isSearchable(this._text)) {
      this._runDetached(false);
    }
  }

  private _scheduleSearch(): void {
    this._cancelPending();
    this._pending = this._schedule(() => {
      this._pending = undefined;
      this._runDetached(false);
    }, this._debounceMs);
  }

  private _cancelPending(): void {
    if (this._pending !== undefined) {
      this._cancelScheduled(this._pending);
      this._pending = undefined;
    }
  }

  private _query(): ISearchQuery {
    return {
      text: this._text,
      kinds: this._kinds,
      sort: this._sort,
      from: this._from,
      size: this._pageSize,
      sitePath: this._sitePath
    };
  }

  private async _run(append: boolean): Promise<void> {
    if (this._disposed) {
      return;
    }

    const query = this._query();
    const sequence = ++this._sequence;

    // A cached page is already here. Showing a spinner for the length of a
    // microtask would be a flash of nothing useful.
    const cached = this.service.tryCached(query);
    if (cached) {
      this._pagesLoaded += 1;
      this._report(sequence, append, {
        results: filterByKind(cached.results, this._kinds),
        total: cached.total,
        moreResultsAvailable: cached.moreResultsAvailable,
        durationMs: 0,
        fromCache: true
      });
      return;
    }

    this._emit({ ...this._state, status: 'loading', query: this._text });

    try {
      const outcome = await this.service.search(query);
      this._pagesLoaded += 1;
      this._report(sequence, append, {
        results: filterByKind(outcome.page.results, this._kinds),
        total: outcome.page.total,
        moreResultsAvailable: outcome.page.moreResultsAvailable,
        durationMs: outcome.durationMs,
        fromCache: outcome.fromCache
      });
    } catch (error) {
      if (this._disposed || sequence !== this._sequence || isCancelled(error)) {
        // Superseded, cancelled, or gone. None of these is worth showing.
        return;
      }

      const failure = failureOf(error) || 'unknown';
      this._emit({
        ...this._state,
        status: failure === 'permissionDenied' ? 'permissionDenied' : 'error',
        failure,
        query: this._text,
        timing: { ...this._state.timing, cancelled: this.service.cancelledCount > 0 }
      });
    }
  }

  private _report(
    sequence: number,
    append: boolean,
    page: {
      results: ISearchResult[];
      total: number;
      moreResultsAvailable: boolean;
      durationMs: number;
      fromCache: boolean;
    }
  ): void {
    // Superseded work is dropped here; work whose owner has gone is dropped by
    // `_emit`, which is the single way anything leaves this class.
    if (sequence !== this._sequence) {
      return;
    }

    const results = append ? [...this._state.results, ...page.results] : page.results;

    this._emit({
      status: results.length === 0 ? 'empty' : 'success',
      failure: undefined,
      results,
      total: page.total,
      moreResultsAvailable: page.moreResultsAvailable,
      query: this._text,
      timing: {
        durationMs: page.durationMs,
        resultCount: results.length,
        fromCache: page.fromCache,
        cancelled: this.service.cancelledCount > 0,
        pagesLoaded: this._pagesLoaded
      }
    });
  }

  private _emit(state: ISearchState): void {
    if (this._disposed) {
      return;
    }
    this._state = state;
    this.onChange(state);
  }
}

export { MINIMUM_QUERY_LENGTH };
