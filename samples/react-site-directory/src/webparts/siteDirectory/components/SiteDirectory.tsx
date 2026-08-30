import {
  Body1,
  Button,
  Caption1,
  Input,
  makeStyles,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Select,
  Spinner,
  Subtitle2,
  tokens
} from '@fluentui/react-components';
import * as React from 'react';
import type { ISiteDirectoryProps } from './ISiteDirectoryProps';
import type { ISiteDirectoryState, SiteDirectorySort } from './ISiteDirectoryState';
import SiteCard from './SiteCard';
import { validateConfig, type ISiteDirectoryQuery } from '../services/SiteDirectoryService';
import * as strings from 'SiteDirectoryWebPartStrings';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gap: tokens.spacingVerticalL,
    minWidth: 0,
    color: tokens.colorNeutralForeground1
  },
  heading: {
    margin: 0
  },
  controls: {
    display: 'grid',
    gridTemplateColumns: 'minmax(220px, 2fr) repeat(2, minmax(140px, 1fr))',
    gap: tokens.spacingHorizontalM,
    alignItems: 'end',
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr'
    }
  },
  control: {
    display: 'grid',
    gap: tokens.spacingVerticalXS,
    minWidth: 0
  },
  label: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1
  },
  results: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: tokens.spacingHorizontalM,
    minWidth: 0
  },
  liveStatus: {
    minHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2
  },
  centered: {
    display: 'grid',
    justifyItems: 'center',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalXL,
    textAlign: 'center'
  },
  setup: {
    display: 'grid',
    gap: tokens.spacingVerticalS
  },
  setupList: {
    margin: 0,
    paddingInlineStart: tokens.spacingHorizontalL
  },
  paging: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM
  },
  pageButtons: {
    display: 'flex',
    gap: tokens.spacingHorizontalS
  },
  error: {
    display: 'grid',
    gap: tokens.spacingVerticalM
  }
});

const initialState: ISiteDirectoryState = {
  items: [],
  status: 'loading',
  pageIndex: 0,
  hasNext: false
};

let nextSiteDirectoryId = 0;

const SiteDirectory: React.FC<ISiteDirectoryProps> = ({ service, config, title, currentOrigin }) => {
  const styles = useStyles();
  const [instanceId] = React.useState(() => `site-directory-${++nextSiteDirectoryId}`);
  const validationErrors = React.useMemo(() => validateConfig(config), [config]);
  const [state, setState] = React.useState<ISiteDirectoryState>(initialState);
  const [query, setQuery] = React.useState<ISiteDirectoryQuery>({
    searchText: '',
    category: '',
    sort: 'asc',
    pageIndex: 0,
    pageSize: config.pageSize
  });
  const requestId = React.useRef(0);

  const load = React.useCallback(async (nextQuery: ISiteDirectoryQuery, paging: boolean): Promise<void> => {
    const currentRequest = ++requestId.current;
    setState(current => ({
      ...current,
      status: paging ? 'loadingMore' : 'loading',
      error: undefined
    }));

    try {
      const page = await service.getPage(nextQuery);
      if (currentRequest !== requestId.current) return;
      setState({
        items: page.items,
        status: page.items.length ? 'success' : 'empty',
        pageIndex: page.pageIndex,
        hasNext: page.hasNext
      });
    } catch (error) {
      if (currentRequest !== requestId.current) return;
      setState(current => ({
        ...current,
        status: 'error',
        error: error instanceof Error ? error.message : strings.UnknownError
      }));
    }
  }, [service]);

  React.useEffect(() => {
    if (validationErrors.length) return undefined;
    const firstQuery: ISiteDirectoryQuery = {
      searchText: '',
      category: '',
      sort: 'asc',
      pageIndex: 0,
      pageSize: config.pageSize
    };
    requestId.current += 1;
    setQuery(firstQuery);
    load(firstQuery, false).catch(() => undefined);
    return () => {
      requestId.current += 1;
    };
  }, [config.pageSize, load, validationErrors.length]);

  const updateQuery = (change: Partial<ISiteDirectoryQuery>): void => {
    const nextQuery: ISiteDirectoryQuery = {
      ...query,
      ...change,
      pageIndex: 0
    };
    setQuery(nextQuery);
    load(nextQuery, false).catch(() => undefined);
  };

  const changePage = (offset: number): void => {
    const nextPageIndex = query.pageIndex + offset;
    if (nextPageIndex < 0 || (offset > 0 && !state.hasNext)) return;
    const nextQuery = { ...query, pageIndex: nextPageIndex };
    setQuery(nextQuery);
    load(nextQuery, true).catch(() => undefined);
  };

  const categories = Array.from(new Set([
    query.category,
    ...state.items.map(item => item.category)
  ].map(category => category.trim()).filter(Boolean))).sort((left, right) => left.localeCompare(right));
  const heading = title.trim() || strings.DefaultTitle;
  const headingId = `${instanceId}-heading`;
  const searchId = `${instanceId}-search`;
  const categoryId = `${instanceId}-category`;
  const sortId = `${instanceId}-sort`;
  const isBusy = state.status === 'loading' || state.status === 'loadingMore';

  if (validationErrors.length) {
    return (
      <section className={styles.root} aria-labelledby={`${instanceId}-setup-heading`}>
        <div className={styles.setup}>
          <Subtitle2 as="h2" id={`${instanceId}-setup-heading`}>{strings.SetupTitle}</Subtitle2>
          <Body1>{strings.SetupDescription}</Body1>
          <ul className={styles.setupList}>
            {validationErrors.map(error => <li key={error}>{error}</li>)}
          </ul>
        </div>
      </section>
    );
  }

  const statusText = state.status === 'loading'
    ? strings.LoadingMessage
    : state.status === 'loadingMore'
      ? strings.LoadingMoreMessage
      : state.status === 'success'
        ? strings.ResultsMessage.replace('{0}', String(state.items.length))
        : state.status === 'empty'
          ? strings.EmptyMessage
          : '';

  return (
    <section className={styles.root} aria-labelledby={headingId}>
      <h2 className={styles.heading} id={headingId}>{heading}</h2>

      <div className={styles.controls}>
        <div className={styles.control}>
          <label className={styles.label} htmlFor={searchId}>{strings.SearchLabel}</label>
          <Input
            id={searchId}
            aria-label={strings.SearchLabel}
            value={query.searchText}
            placeholder={strings.SearchPlaceholder}
            onChange={(_event, data) => updateQuery({ searchText: data.value })}
          />
        </div>
        {config.categoryField ? (
          <div className={styles.control}>
            <label className={styles.label} htmlFor={categoryId}>{strings.CategoryLabel}</label>
            <Select
              id={categoryId}
              aria-label={strings.CategoryLabel}
              value={query.category}
              onChange={(_event, data) => updateQuery({ category: data.value })}
            >
              <option value="">{strings.AllCategories}</option>
              {categories.map(category => <option key={category} value={category}>{category}</option>)}
            </Select>
          </div>
        ) : null}
        <div className={styles.control}>
          <label className={styles.label} htmlFor={sortId}>{strings.SortLabel}</label>
          <Select
            id={sortId}
            aria-label={strings.SortLabel}
            value={query.sort}
            onChange={(_event, data) => updateQuery({ sort: data.value as SiteDirectorySort })}
          >
            <option value="asc">{strings.SortAscending}</option>
            <option value="desc">{strings.SortDescending}</option>
          </Select>
        </div>
      </div>

      <div className={styles.liveStatus} role="status" aria-live="polite">{statusText}</div>

      {state.status === 'error' ? (
        <div className={styles.error} role="alert">
          <MessageBar intent="error">
            <MessageBarTitle>{strings.ErrorTitle}</MessageBarTitle>
            <MessageBarBody>{state.error || strings.UnknownError}</MessageBarBody>
          </MessageBar>
          <Button appearance="secondary" onClick={() => load(query, false).catch(() => undefined)}>{strings.TryAgain}</Button>
        </div>
      ) : null}

      {isBusy && !state.items.length ? (
        <div className={styles.centered}>
          <Spinner label={strings.LoadingMessage} />
        </div>
      ) : null}

      {state.status === 'empty' ? (
        <div className={styles.centered}>
          <Subtitle2 as="h3">{strings.NoResultsTitle}</Subtitle2>
          <Caption1>{strings.NoResultsDescription}</Caption1>
        </div>
      ) : null}

      {state.items.length ? (
        <>
          <div className={styles.results} role="list" aria-label={strings.ResultsLabel}>
            {state.items.map(item => <SiteCard key={item.key} item={item} currentOrigin={currentOrigin} />)}
          </div>
          <div className={styles.paging}>
            <Caption1>{strings.PageMessage.replace('{0}', String(state.pageIndex + 1))}</Caption1>
            <div className={styles.pageButtons}>
              <Button
                appearance="secondary"
                disabled={isBusy || state.pageIndex === 0}
                aria-label={strings.PreviousLabel}
                onClick={() => changePage(-1)}
              >
                {strings.PreviousLabel}
              </Button>
              <Button
                appearance="secondary"
                disabled={isBusy || !state.hasNext}
                aria-label={strings.NextLabel}
                onClick={() => changePage(1)}
              >
                {strings.NextLabel}
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default SiteDirectory;
