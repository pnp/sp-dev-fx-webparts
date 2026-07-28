import { ContentKind, ISearchPage, ISearchResult } from '../models/ISearchModels';

/**
 * The parts of a Graph search response this code reads.
 *
 * Typed structurally and defensively: interleaved results are not uniform,
 * `listItem` is the superclass of `driveItem`, and Graph omits properties it
 * has nothing for rather than sending them empty.
 */
interface IGraphHit {
  hitId?: string;
  summary?: string;
  resource?: Record<string, unknown>;
}

interface IGraphHitsContainer {
  hits?: IGraphHit[];
  total?: number;
  moreResultsAvailable?: boolean;
}

interface IGraphSearchResponse {
  value?: { hitsContainers?: IGraphHitsContainer[] }[];
}

function text(source: Record<string, unknown> | undefined, key: string): string | undefined {
  const value = source?.[key];
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

/**
 * The requested fields for a file or list item, which Graph nests.
 *
 * `title` and `siteTitle` do not arrive beside `webUrl`; they arrive under
 * `listItem.fields`. Reading only the top level is why the list showed file
 * names and URL fragments before.
 */
function listItemFields(
  resource: Record<string, unknown> | undefined
): Record<string, unknown> | undefined {
  const listItem = resource?.listItem as { fields?: Record<string, unknown> } | undefined;
  return listItem?.fields;
}

/** `createdBy` and `lastModifiedBy` arrive as `{ user: { displayName, email } }`. */
function identity(
  resource: Record<string, unknown> | undefined,
  key: string
): { name: string; email?: string } | undefined {
  const holder = resource?.[key] as { user?: { displayName?: string; email?: string } } | undefined;
  const name = holder?.user?.displayName;
  return name ? { name, email: holder?.user?.email } : undefined;
}

/**
 * Works out what a result actually is.
 *
 * Graph does not say. A site is recognisable by its own odata type, a modern
 * page by the SharePoint content class SharePoint stamps on it, and everything
 * that has a file extension is a document. What is left is a list item.
 */
export function classify(resource: Record<string, unknown> | undefined): ContentKind {
  const odataType = (text(resource, '@odata.type') || '').toLowerCase();
  if (odataType.indexOf('site') >= 0) {
    return 'site';
  }

  const fields = listItemFields(resource);
  const contentClass = (
    text(fields, 'contentclass') || text(resource, 'contentclass') || ''
  ).toLowerCase();
  if (contentClass.indexOf('sitepage') >= 0 || contentClass === 'sts_listitem_sitepages') {
    return 'page';
  }

  // Many hits arrive with a link and no name at all, so the extension has to be
  // looked for in both places. A page found this way was being labelled a list
  // item before, which is how this came to light.
  const name = text(resource, 'name') || '';
  const extension = fileExtensionOf(name) || fileExtensionOf(lastPathSegment(text(resource, 'webUrl')));
  if (extension === 'aspx') {
    return 'page';
  }
  if (extension) {
    return 'document';
  }

  // A driveItem with no extension is a folder; treat it as a document so it is
  // still reachable rather than silently dropped.
  return odataType.indexOf('driveitem') >= 0 ? 'document' : 'listItem';
}

/**
 * The last part of a link's path, decoded, or an empty string.
 *
 * Used both to spot an extension when the hit carries no name, and to show
 * something readable instead of a whole URL.
 */
export function lastPathSegment(url: string | undefined): string {
  if (!url) {
    return '';
  }
  const withoutQuery = url.split(/[?#]/)[0];
  const segment = withoutQuery.split('/').filter(Boolean).pop() || '';
  try {
    return decodeURIComponent(segment);
  } catch {
    // A link with a stray percent sign is still worth showing as it came.
    return segment;
  }
}

/**
 * Where a result lives, in words rather than a URL.
 *
 * Graph gives `siteTitle` when it has one. When it does not, the link still
 * says where the thing is, and "Finance / Shared Documents" tells somebody far
 * more than repeating the word "Documents" on every row. The file name itself
 * is dropped: it is already the title.
 */
export function locationOf(siteTitle: string | undefined, url: string | undefined): string {
  if (siteTitle) {
    return siteTitle;
  }
  if (!url) {
    return '';
  }

  const path = url.split(/[?#]/)[0].replace(/^https?:\/\/[^/]+/i, '');
  const segments = path.split('/').filter(Boolean).map(decodeSafely);

  // Drop the leading "sites" or "teams", which every path has and nobody reads.
  const meaningful = segments[0] === 'sites' || segments[0] === 'teams'
    ? segments.slice(1)
    : segments;

  // The last segment is the item; what is left is where it sits.
  return meaningful.slice(0, -1).slice(0, 2).join(' / ');
}

function decodeSafely(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/** The extension, lowercased, or undefined when the name has none. */
export function fileExtensionOf(name: string): string | undefined {
  const dot = name.lastIndexOf('.');
  if (dot <= 0 || dot === name.length - 1) {
    return undefined;
  }
  return name.slice(dot + 1).toLowerCase();
}

/**
 * Turns Graph's summary into plain text.
 *
 * The Search API documents `summary` only as "a summary of the result" and says
 * nothing about its format. In practice it arrives carrying two markers
 * inherited from SharePoint's hit-highlighted summaries: `<c0>…</c0>` around
 * each matched term, and `<ddd/>` where text was cut out. Both were seen in
 * live responses rather than read in a specification, which is why only these
 * two are handled and everything else is left exactly as it came.
 *
 * Leaving the rest alone is deliberate. The summary is rendered as text, so
 * anything that looks like markup is shown rather than interpreted, and
 * stripping tags wholesale would quietly eat content that belongs to the
 * document.
 */
export function stripHitHighlight(summary: string): string {
  return summary
    .replace(/<\/?c\d+>/g, '')
    .replace(/<ddd\/>/g, '…')
    .replace(/\s+…/g, ' …')
    .trim();
}

function parseDate(value: string | undefined): Date | undefined {
  if (!value) {
    return undefined;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function toResult(hit: IGraphHit, index: number): ISearchResult | undefined {
  const resource = hit.resource;
  const url = text(resource, 'webUrl');
  if (!url) {
    // Without a link the result cannot be opened, so it is not worth showing.
    return undefined;
  }

  const fields = listItemFields(resource);
  const name = text(resource, 'name');
  // A whole URL is not a title. When the hit carries neither a title nor a
  // name, the last part of the link at least reads like the thing it points to.
  const title =
    text(fields, 'title') || text(resource, 'title') || name || lastPathSegment(url) || url;

  return {
    id: hit.hitId || `${url}#${index}`,
    kind: classify(resource),
    title,
    summary: stripHitHighlight(hit.summary || ''),
    url,
    lastModified: parseDate(text(resource, 'lastModifiedDateTime')),
    source: locationOf(text(fields, 'siteTitle') || text(resource, 'siteTitle'), url) || undefined,
    modifiedBy: identity(resource, 'lastModifiedBy') || identity(resource, 'createdBy'),
    fileExtension: name ? fileExtensionOf(name) : undefined
  };
}

/**
 * Turns a Graph search response into the shape the components render.
 *
 * Anything unusable is dropped rather than rendered half-formed, and duplicates
 * are removed: the same item can arrive twice when it matches as both a
 * driveItem and the listItem it also is.
 */
export function normaliseSearchResponse(response: unknown): ISearchPage {
  const container = (response as IGraphSearchResponse)?.value?.[0]?.hitsContainers?.[0];
  const hits = container?.hits || [];

  const seen = new Set<string>();
  const results: ISearchResult[] = [];

  hits.forEach((hit, index) => {
    const result = toResult(hit, index);
    if (!result) {
      return;
    }
    const key = result.url.toLowerCase();
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    results.push(result);
  });

  return {
    results,
    total: typeof container?.total === 'number' ? container.total : results.length,
    moreResultsAvailable: container?.moreResultsAvailable === true
  };
}

/** Narrows a page to the kinds a person selected. No kinds means all of them. */
export function filterByKind(results: ISearchResult[], kinds: ContentKind[]): ISearchResult[] {
  if (kinds.length === 0) {
    return results;
  }
  return results.filter((result) => kinds.indexOf(result.kind) >= 0);
}
