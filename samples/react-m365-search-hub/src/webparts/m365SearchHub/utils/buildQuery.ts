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

/**
 * Properties asked for.
 *
 * Every one of these was checked against real responses rather than picked
 * from the documentation: without asking, a hit comes back with only
 * `@odata.type`, `name`, `webUrl` and `lastModifiedDateTime`, and the title
 * shown would be a file name and the location a guess made from the URL.
 *
 * `authorOWSUSER` is deliberately absent. It carries a claims token alongside
 * the address, and nothing here needs it: `lastModifiedBy` gives a display
 * name for the same person without it.
 */
export const REQUESTED_FIELDS = [
  'title',
  'name',
  'webUrl',
  'lastModifiedDateTime',
  'fileType',
  'contentclass',
  'siteTitle',
  'createdBy',
  'lastModifiedBy'
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
/**
 * Tidies a site URL before it becomes a KQL restriction.
 *
 * A trailing slash makes `path:` match nothing on some tenants, and the URL
 * arrives from the SPFx page context with or without one depending on how the
 * site was created. Whitespace is trimmed for the same reason.
 */
export function normaliseSitePath(url: string | undefined): string | undefined {
  const trimmed = (url || '').trim().replace(/\/+$/, '');
  return trimmed.length > 0 ? trimmed : undefined;
}

export function buildQueryString(text: string, sitePath?: string): string {
  const collapsed = text.trim().replace(/\s+/g, ' ');
  if (collapsed.length === 0) {
    return '';
  }

  const phrase = `"${escapeKql(collapsed)}"`;
  const site = normaliseSitePath(sitePath);
  // KQL restricts by location with `path:`. The site URL is escaped the same
  // way as the typed text, so a site whose URL somehow contains a quote cannot
  // break out of the restriction either.
  return site ? `${phrase} path:"${escapeKql(site)}"` : phrase;
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
        query: { queryString: buildQueryString(query.text, query.sitePath) },
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
  return [
    query.text.trim().toLowerCase(),
    kinds,
    query.sort,
    query.from,
    query.size,
    normaliseSitePath(query.sitePath) || ''
  ].join('|');
}

export type { ContentKind };
