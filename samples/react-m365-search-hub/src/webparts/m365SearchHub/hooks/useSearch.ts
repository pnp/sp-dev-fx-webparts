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

/**
 * Glue between React and {@link SearchSession}.
 *
 * **This hook must stay thin.** Everything awkward — debounce, superseded
 * responses, cancellation, error shape, query building, result normalisation —
 * lives in plain classes precisely so it can be tested without a renderer or a
 * jsdom environment. That is why there is no test file beside this one: there
 * is no behaviour here to test that the session's own tests do not already
 * cover.
 *
 * If a rule ever moves in here — when to invalidate the cache, how to treat an
 * error, how to build a query — then that reasoning is gone, and this hook has
 * earned tests and the test environment they need. Put the rule in the session
 * instead.
 */
export function useSearch(service: GraphSearchService, pageSize: number): IUseSearch {
  const [state, setState] = React.useState<ISearchState>(INITIAL_STATE);
  const sessionRef = React.useRef<SearchSession>();

  if (!sessionRef.current) {
    sessionRef.current = new SearchSession(service, setState, { pageSize });
  }

  React.useEffect(() => {
    const session = sessionRef.current;
    return () => session?.dispose();
  }, []);

  const session = sessionRef.current;

  return React.useMemo(
    () => ({
      state,
      setText: (text: string) => session.setText(text),
      setKinds: (kinds: ContentKind[]) => session.setKinds(kinds),
      setSort: (sort: SortOrder) => session.setSort(sort),
      loadMore: () => session.loadMore(),
      retry: () => session.retry()
    }),
    [state, session]
  );
}
