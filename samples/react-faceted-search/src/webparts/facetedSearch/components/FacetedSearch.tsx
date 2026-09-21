import * as React from 'react';
import {
  Button,
  Checkbox,
  Field,
  Input,
  MessageBar,
  MessageBarBody,
  Spinner
} from '@fluentui/react-components';
import { IRefinerEntry, ISearchRefiner, ISearchResponse, ISelectedRefiner, SearchErrorKind } from '../models/ISearchModels';
import { SearchService } from '../services/SearchService';
import {
  DEFAULT_PAGE_SIZE,
  classifySearchError
} from '../utils/searchUtils';
import { IFacetedSearchProps } from './IFacetedSearchProps';
import styles from './FacetedSearch.module.scss';

interface IErrorState {
  kind: SearchErrorKind;
  message: string;
}

function errorText(error: IErrorState): string {
  if (error.kind === 'accessDenied') {
    return 'You do not have permission to search this site.';
  }
  if (error.kind === 'throttled') {
    return 'SharePoint Search is temporarily busy. Please retry.';
  }
  return error.message;
}

function formatDate(value: string | null): string {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}

function isSelected(selected: ISelectedRefiner[], refiner: ISearchRefiner, entry: IRefinerEntry): boolean {
  return selected.some(item => item.name === refiner.name && item.token === entry.token);
}

export const FacetedSearch: React.FC<IFacetedSearchProps> = ({ httpClient, siteUrl, title }) => {
  const service = React.useMemo(() => new SearchService(httpClient, siteUrl), [httpClient, siteUrl]);
  const [query, setQuery] = React.useState('');
  const [selectedRefiners, setSelectedRefiners] = React.useState<ISelectedRefiner[]>([]);
  const [response, setResponse] = React.useState<ISearchResponse | null>(null);
  const [error, setError] = React.useState<IErrorState | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const lastRequest = React.useRef<{ query: string; selectedRefiners: ISelectedRefiner[] } | null>(null);
  const requestNumber = React.useRef(0);

  const runSearch = React.useCallback(async (nextQuery: string, refiners: ISelectedRefiner[]) => {
    const request = { query: nextQuery, selectedRefiners: refiners };
    lastRequest.current = request;
    const currentRequest = ++requestNumber.current;
    setIsLoading(true);
    setError(null);
    try {
      const result = await service.search({ ...request, pageSize: DEFAULT_PAGE_SIZE });
      if (currentRequest === requestNumber.current) {
        setResponse(result);
      }
    } catch (caughtError) {
      if (currentRequest === requestNumber.current) {
        setError({
          kind: classifySearchError(caughtError),
          message: caughtError instanceof Error ? caughtError.message : 'Search failed.'
        });
        setResponse(null);
      }
    } finally {
      if (currentRequest === requestNumber.current) {
        setIsLoading(false);
      }
    }
  }, [service]);

  const submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    void runSearch(query, selectedRefiners);
  };

  const toggleRefiner = (refiner: ISearchRefiner, entry: IRefinerEntry, checked: boolean): void => {
    const next = checked
      ? [...selectedRefiners, { name: refiner.name, label: entry.label, token: entry.token }]
      : selectedRefiners.filter(item => item.token !== entry.token || item.name !== refiner.name);
    setSelectedRefiners(next);
    if (query.trim()) {
      void runSearch(query, next);
    }
  };

  const retry = (): void => {
    if (lastRequest.current) {
      void runSearch(lastRequest.current.query, lastRequest.current.selectedRefiners);
    }
  };

  return (
    <section className={styles.facetedSearch} aria-labelledby="faceted-search-title">
      <h1 id="faceted-search-title" className={styles.title}>{title || 'Faceted search'}</h1>
      <form className={styles.searchForm} onSubmit={submit}>
        <Field label="Search SharePoint" validationMessage={error && error.message === 'Enter a search query.' ? error.message : undefined}>
          <Input
            value={query}
            onChange={(_, data) => setQuery(data.value)}
            placeholder="Search this site"
            aria-label="Search SharePoint"
          />
        </Field>
        <Button appearance="primary" type="submit" disabled={isLoading} aria-label="Run search">
          Search
        </Button>
      </form>

      {error && (
        <MessageBar intent="error" role="alert">
          <MessageBarBody>
            {errorText(error)} <Button appearance="transparent" onClick={retry}>Retry</Button>
          </MessageBarBody>
        </MessageBar>
      )}

      <div className={styles.layout}>
        {response && response.refiners.length > 0 && (
          <aside className={styles.facets} aria-label="Search filters">
            <h2>Filter results</h2>
            {response.refiners.map(refiner => (
              <fieldset key={refiner.name} className={styles.refiner}>
                <legend>{refiner.name}</legend>
                {refiner.entries.map(entry => (
                  <Checkbox
                    key={entry.token}
                    label={`${entry.label} (${entry.count})`}
                    checked={isSelected(selectedRefiners, refiner, entry)}
                    onChange={(_, data) => toggleRefiner(refiner, entry, data.checked === true)}
                  />
                ))}
              </fieldset>
            ))}
          </aside>
        )}

        <div className={styles.resultList} aria-live="polite" aria-busy={isLoading}>
          {isLoading && <Spinner label="Searching SharePoint" />}
          {!isLoading && response && response.results.length === 0 && <p>No results found.</p>}
          {!isLoading && response && response.results.length > 0 && (
            <>
              <p className={styles.resultCount}>{response.totalRows} result{response.totalRows === 1 ? '' : 's'} found.</p>
              {response.results.map(result => (
                <article key={`${result.path || result.title}-${result.lastModifiedTime || ''}`} className={styles.result}>
                  <h2>
                    {result.path ? <a href={result.path}>{result.title || result.path}</a> : (result.title || 'Untitled result')}
                  </h2>
                  {result.fileType && <span className={styles.meta}>{result.fileType}</span>}
                  {result.description && <p>{result.description}</p>}
                  {result.summary && <p>{result.summary}</p>}
                  {result.lastModifiedTime && <time dateTime={result.lastModifiedTime}>Modified {formatDate(result.lastModifiedTime)}</time>}
                </article>
              ))}
            </>
          )}
          {!isLoading && !response && !error && <p>Enter a search term to find SharePoint content.</p>}
        </div>
      </div>
    </section>
  );
};
