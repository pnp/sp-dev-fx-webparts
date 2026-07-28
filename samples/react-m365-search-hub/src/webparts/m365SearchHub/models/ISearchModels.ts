/**
 * The content this web part searches for.
 *
 * These are not Microsoft Graph entity types. Pages come back from Graph as
 * `driveItem`, the same as files, so the distinction a person cares about has
 * to be made from the result rather than from the request.
 */
export type ContentKind = 'document' | 'page' | 'site' | 'listItem';

export type SortOrder = 'relevance' | 'date';

/** One result, in the shape the components render. */
export interface ISearchResult {
  id: string;
  kind: ContentKind;
  title: string;
  /** Graph's own summary of the match. Plain text, never markup. */
  summary: string;
  url: string;
  lastModified?: Date;
  /** Where the item lives, for a person reading the list. */
  source?: string;
  fileExtension?: string;
}

export interface ISearchPage {
  results: ISearchResult[];
  /** Total matches for the query, not the size of this page. */
  total: number;
  moreResultsAvailable: boolean;
}

export interface ISearchQuery {
  text: string;
  kinds: ContentKind[];
  sort: SortOrder;
  from: number;
  size: number;
}

/** What the performance panel reports. Never leaves the browser. */
export interface ISearchTiming {
  durationMs: number;
  resultCount: number;
  fromCache: boolean;
  cancelled: boolean;
  pagesLoaded: number;
}
