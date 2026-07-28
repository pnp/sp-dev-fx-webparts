import * as React from 'react';
import { ContentKind, SortOrder } from '../models/ISearchModels';
import { GraphSearchService } from '../services/GraphSearchService';
import { INITIAL_STATE, ISearchState, SearchSession } from './SearchSession';

export interface IUseSearch {
  state: ISearchState;
  setText: (text: string) => void;
  setKinds: (kinds: ContentKind[]) => void;
  setSort: (sort: SortOrder) => void;
  loadMore: () => void;
  retry: () => void;
}

export interface IUseSearchOptions {
  pageSize: number;
  /** Absolute site URL to restrict to, or nothing for no restriction. */
  sitePath?: string;
}

/**
 * Glue between React and {@link SearchSession}.
 *
 * **This hook must stay thin.** Everything awkward — debounce, superseded
 * responses, cancellation, error shape, query building, result normalisation —
 * lives in plain classes precisely so it can be tested without a renderer or a
 * jsdom environment. If a rule ever moves in here, that reasoning is gone and
 * this hook has earned tests and the environment they need.
 *
 * Two things here are load-bearing and were learned the hard way.
 *
 * The actions are memoised on the session alone, never on the state. Rebuilding
 * them whenever a result arrives changes their identity, and any effect
 * depending on one of them re-runs, calls it, produces a new state, and runs
 * again: a search that never stops. That is not a theoretical risk — an earlier
 * version of this file sent 1605 requests to Microsoft Graph in a few seconds.
 *
 * The scope effect keys on the URL string rather than on a callback, for the
 * same reason.
 */
export function useSearch(service: GraphSearchService, options: IUseSearchOptions): IUseSearch {
  const [state, setState] = React.useState<ISearchState>(INITIAL_STATE);
  const sessionRef = React.useRef<SearchSession>();

  if (!sessionRef.current) {
    sessionRef.current = new SearchSession(service, setState, {
      pageSize: options.pageSize,
      sitePath: options.sitePath
    });
  }

  const session = sessionRef.current;

  React.useEffect(() => {
    return () => session.dispose();
  }, [session]);

  // The page author changed where to look. Skipped on the first render, when
  // the session was built with this scope already.
  const sitePath = options.sitePath;
  const applied = React.useRef(sitePath);
  React.useEffect(() => {
    if (applied.current === sitePath) {
      return;
    }
    applied.current = sitePath;
    session.setScope(sitePath);
  }, [sitePath, session]);

  return React.useMemo(
    () => ({
      state,
      setText: (text: string) => session.setText(text),
      setKinds: (kinds: ContentKind[]) => session.setKinds(kinds),
      setSort: (sort: SortOrder) => session.setSort(sort),
      loadMore: () => session.loadMore(),
      retry: () => session.retry()
    }),
    // `state` is here because it is returned, not because the actions need it;
    // the actions close over `session`, which does not change.
    [state, session]
  );
}
