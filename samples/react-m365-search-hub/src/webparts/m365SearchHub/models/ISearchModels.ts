/**
 * The content this web part searches for.
 *
 * These are not Microsoft Graph entity types. Pages come back from Graph as
 * `driveItem`, the same as files, so the distinction a person cares about has
 * to be made from the result rather than from the request.
 */
export type ContentKind = 'document' | 'page' | 'site' | 'listItem';

export type SortOrder = 'relevance' | 'date';

/**
 * Where to look.
 *
 * `site` becomes a KQL path restriction on the current site; `tenant` sends no
 * restriction at all and Microsoft Graph searches everything the person can
 * already see. There is no third option here because there is no third
 * behaviour: a scope this web part cannot actually apply has no business
 * appearing in the property pane.
 */
export type SearchScope = 'tenant' | 'site';

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
  /**
   * Who last changed it, when Microsoft Graph knows.
   *
   * Present for files and list items, absent for sites, which have no author.
   * Measured against live responses: 10 out of 10 for driveItem and listItem,
   * 0 out of 10 for site.
   */
  modifiedBy?: { name: string; email?: string };
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
  /** Absolute URL of the site to restrict to. Absent means no restriction. */
  sitePath?: string;
}

/** What the performance panel reports. Never leaves the browser. */
export interface ISearchTiming {
  durationMs: number;
  resultCount: number;
  fromCache: boolean;
  cancelled: boolean;
  pagesLoaded: number;
}
