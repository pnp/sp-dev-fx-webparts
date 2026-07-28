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

  const contentClass = (text(resource, 'contentclass') || '').toLowerCase();
  if (contentClass.indexOf('sitepage') >= 0 || contentClass === 'sts_listitem_sitepages') {
    return 'page';
  }

  const name = text(resource, 'name') || '';
  const extension = fileExtensionOf(name);
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

/** The extension, lowercased, or undefined when the name has none. */
export function fileExtensionOf(name: string): string | undefined {
  const dot = name.lastIndexOf('.');
  if (dot <= 0 || dot === name.length - 1) {
    return undefined;
  }
  return name.slice(dot + 1).toLowerCase();
}

/** Graph's summary carries `<c0>` markers around matches. Plain text only. */
export function stripHitHighlight(summary: string): string {
  return summary.replace(/<\/?c\d+>/g, '');
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

  const name = text(resource, 'name');
  const title = text(resource, 'title') || name || url;

  return {
    id: hit.hitId || `${url}#${index}`,
    kind: classify(resource),
    title,
    summary: stripHitHighlight(hit.summary || ''),
    url,
    lastModified: parseDate(text(resource, 'lastModifiedDateTime')),
    source: text(resource, 'siteTitle'),
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
