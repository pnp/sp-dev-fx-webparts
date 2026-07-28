import * as React from 'react';
import {
  Body1Strong,
  Button,
  Divider,
  ProgressBar,
  SearchBox,
  Subtitle1
} from '@fluentui/react-components';
import * as strings from 'M365SearchHubWebPartStrings';
import type { IM365SearchHubProps } from './IM365SearchHubProps';
import { SearchFilters } from './SearchFilters';
import { SearchResults } from './SearchResults';
import { SearchStatusMessage } from './SearchStatusMessage';
import { PerformancePanel } from './PerformancePanel';
import { useHubStyles } from './useHubStyles';
import { useSearch } from '../hooks/useSearch';
import { ContentKind, SortOrder } from '../models/ISearchModels';
import { MINIMUM_QUERY_LENGTH } from '../utils/buildQuery';
import { resultCountMessage } from '../utils/resultCount';

const M365SearchHub: React.FunctionComponent<IM365SearchHubProps> = (props) => {
  const styles = useHubStyles();
  const { state, setText, setKinds, setSort, loadMore, retry } = useSearch(props.service, {
    pageSize: props.pageSize,
    sitePath: props.scope === 'site' ? props.currentSiteUrl : undefined,
  });
  const [text, setLocalText] = React.useState('');
  const [kinds, setLocalKinds] = React.useState<ContentKind[]>([]);
  const [sort, setLocalSort] = React.useState<SortOrder>('relevance');

  const onText = React.useCallback(
    (value: string) => {
      setLocalText(value);
      setText(value);
    },
    [setText]
  );

  const onKinds = React.useCallback(
    (next: ContentKind[]) => {
      setLocalKinds(next);
      setKinds(next);
    },
    [setKinds]
  );

  const onSort = React.useCallback(
    (next: SortOrder) => {
      setLocalSort(next);
      setSort(next);
    },
    [setSort]
  );

  const hasResults = state.results.length > 0;

  /*
   * Results already on screen stay there, at full strength, while the next
   * answer arrives. Dimming them read as "disabled" rather than "updating",
   * so the fact that something is happening is carried by a progress bar
   * above the list instead, and the results stay readable throughout.
   */
  const refreshing = state.status === 'loading' && hasResults;

  /*
   * The interface has three phases, and showing them all at once made it feel
   * heavier than it is:
   *
   *   1. search      — the box, on its own, with nothing competing
   *   2. understand  — how many results there are
   *   3. refine      — filters and sort, once there is something to refine
   *
   * The toolbar in phase 3 appears once a search has produced something, and
   * stays after that, including while an emptied filter combination returns
   * nothing, so the way back is never taken away.
   */
  const [hasSearched, setHasSearched] = React.useState(false);
  React.useEffect(() => {
    if (state.status === 'success' || state.status === 'empty') {
      setHasSearched(true);
    }
    if (state.status === 'idle') {
      setHasSearched(false);
    }
  }, [state.status]);

  const countMessage = resultCountMessage(state.results.length, state.total, kinds.length > 0);

  return (
    <section className={styles.root}>
      {props.title ? <Subtitle1 as="h2">{props.title}</Subtitle1> : undefined}

      <div role="search" className={styles.header}>
        {/*
          Fluent's own dismiss button is used as it comes: it already clears the
          value and returns focus to the input, so there is nothing to
          reimplement. Only its accessible name is replaced, because Fluent
          hardcodes the English word "clear" and this sample claims every name a
          person can hear comes from the string files.
        */}
        <SearchBox
          size="large"
          className={styles.searchBox}
          placeholder={strings.SearchBoxPlaceholder}
          aria-label={strings.SearchBoxLabel}
          value={text}
          onChange={(_, data) => onText(data.value)}
          dismiss={{ 'aria-label': strings.ClearSearchLabel }}
        />
      </div>

      {hasSearched ? (
        <div className={styles.resultsBar}>
          <Body1Strong>{countMessage}</Body1Strong>
          <SearchFilters kinds={kinds} sort={sort} onKindsChange={onKinds} onSortChange={onSort} />
        </div>
      ) : undefined}

      {/*
        One live region for what a person needs to be told without looking.
        Polite, so it waits for a pause rather than interrupting typing. The
        count is repeated here rather than moved, because on screen it belongs
        beside the controls that change it.
      */}
      <div aria-live="polite" className={styles.status}>
        {countMessage ? <span className={styles.srOnly}>{countMessage}</span> : undefined}

        {/* The progress bar above the list already says a newer answer is on
            its way, so the status line stays quiet while results are showing
            and speaks only when there is nothing on screen. */}
        {refreshing ? undefined : (
          <SearchStatusMessage
            status={state.status}
            failure={state.failure}
            query={state.query}
            minimumQueryLength={MINIMUM_QUERY_LENGTH}
            onRetry={retry}
          />
        )}
      </div>

      {hasResults ? (
        <>
          <Divider />
          {refreshing ? <ProgressBar aria-label={strings.StatusLoading} /> : undefined}
          <SearchResults results={state.results} />
        </>
      ) : undefined}

      {state.moreResultsAvailable ? (
        <Button
          appearance="secondary"
          onClick={loadMore}
          disabled={state.status === 'loading'}
          className={styles.loadMore}
        >
          {strings.LoadMoreLabel}
        </Button>
      ) : undefined}

      {props.showPerformancePanel ? <PerformancePanel timing={state.timing} /> : undefined}
    </section>
  );
};

export default M365SearchHub;
