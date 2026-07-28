import { ContentKind, ISearchQuery, SortOrder } from '../models/ISearchModels';

/**
 * Entity types asked of Microsoft Graph.
 *
 * Always the same three. Pages are not an entity type of their own: Graph
 * documents `driveItem` as "files, folders, pages, and news", so the kind a
 * person filters by is worked out from the result, not requested here. The
 * combination is one Graph permits to interleave.
 */
export const ENTITY_TYPES = ['driveItem', 'listItem', 'site'] as const;

/** Properties asked for, to keep the response smaller than the default. */
export const REQUESTED_FIELDS = [
  'title',
  'name',
  'webUrl',
  'lastModifiedDateTime',
  'fileType',
  'contentclass',
  'siteTitle'
];

/** Below this a query costs a request and returns noise. */
export const MINIMUM_QUERY_LENGTH = 3;

/**
 * Escapes a term so it cannot change the meaning of the KQL query.
 *
 * The query string is KQL, so a stray quote or a bare `AND` would let typed
 * text restructure the query rather than be searched for. Double quotes are
 * doubled, which is how KQL escapes them inside a phrase.
 */
export function escapeKql(term: string): string {
  return term.replace(/"/g, '""');
}

/**
 * Wraps the typed text so operators in it are searched for, not obeyed.
 *
 * A person typing `budget AND forecast` means those three words. Quoting keeps
 * it that way. Whitespace is collapsed so a pasted line break does not become
 * part of the phrase.
 */
export function buildQueryString(text: string): string {
  const collapsed = text.trim().replace(/\s+/g, ' ');
  return collapsed.length === 0 ? '' : `"${escapeKql(collapsed)}"`;
}

/** True when the text is worth spending a request on. */
export function isSearchable(text: string): boolean {
  return text.trim().length >= MINIMUM_QUERY_LENGTH;
}

/** The `sortProperties` Graph expects, or nothing when sorting by relevance. */
export function buildSortProperties(
  sort: SortOrder
): { name: string; isDescending: boolean }[] | undefined {
  // Relevance is Graph's own default, and sending an empty array is not the
  // same thing as sending nothing.
  return sort === 'date'
    ? [{ name: 'lastModifiedDateTime', isDescending: true }]
    : undefined;
}

export interface IGraphSearchRequestBody {
  requests: {
    entityTypes: string[];
    query: { queryString: string };
    fields: string[];
    from: number;
    size: number;
    sortProperties?: { name: string; isDescending: boolean }[];
  }[];
}

/**
 * The body posted to `/search/query`.
 *
 * `kinds` deliberately does not reach Graph. Filtering by kind happens over the
 * normalised results, because the kinds a person cares about do not map onto
 * entity types one for one.
 */
export function buildSearchRequest(query: ISearchQuery): IGraphSearchRequestBody {
  const sortProperties = buildSortProperties(query.sort);

  return {
    requests: [
      {
        entityTypes: [...ENTITY_TYPES],
        query: { queryString: buildQueryString(query.text) },
        fields: [...REQUESTED_FIELDS],
        from: Math.max(0, query.from),
        // Graph caps a page at 1000 and charges latency for large pages.
        size: Math.min(Math.max(1, query.size), 1000),
        ...(sortProperties ? { sortProperties } : {})
      }
    ]
  };
}

/** A stable key for the cache: the same query must produce the same string. */
export function cacheKey(query: ISearchQuery): string {
  const kinds = [...query.kinds].sort().join(',');
  return [query.text.trim().toLowerCase(), kinds, query.sort, query.from, query.size].join('|');
}

export type { ContentKind };
