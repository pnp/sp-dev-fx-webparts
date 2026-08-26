import { MSGraphClientV3 } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { PageInventoryItem } from '../../models/PageInventoryItem';
import { SiteReference } from '../../models/SiteReference';
import { EnumerationResult } from '../../models/OperationalTypes';
import { MigrationCancellationToken } from '../../utilities/CancellationToken';
import { toMessage } from '../../utilities/ErrorSerialization';
import {
  defaultRetryOptions,
  executeWithRetry,
  getErrorStatus,
  OperationCancelledError
} from '../../utilities/RetryHelper';
import { isSharePointHost, tryParseUrl } from '../../utilities/UrlUtilities';
import { Logger } from '../logging/Logger';

interface GraphCollectionResponse<T> {
  readonly value?: ReadonlyArray<T>;
  readonly '@odata.nextLink'?: string;
}

interface GraphSite {
  readonly id: string;
  readonly displayName?: string;
  readonly name?: string;
  readonly webUrl: string;
  readonly description?: string;
}

interface GraphPageUser {
  readonly user?: {
    readonly displayName?: string;
    readonly email?: string;
  };
}

interface GraphSitePage {
  readonly id: string;
  readonly name: string;
  readonly title?: string;
  readonly webUrl: string;
  readonly createdBy?: GraphPageUser;
  readonly lastModifiedBy?: GraphPageUser;
  readonly createdDateTime?: string;
  readonly lastModifiedDateTime?: string;
  readonly pageLayout?: string;
  readonly promotionKind?: string;
  readonly publishingState?: {
    readonly level?: string;
    readonly versionId?: string;
    readonly checkedOutBy?: GraphPageUser;
  };
  readonly reactions?: {
    readonly commentCount?: number;
    readonly likeCount?: number;
  };
}

const GRAPH_V1_ROOT = 'https://graph.microsoft.com/v1.0';
const GRAPH_BETA_ROOT = 'https://graph.microsoft.com/beta';

const MAX_SEARCH_RESULTS = 10;
const MAX_CACHE_ENTRIES = 20;
const CACHE_TTL_MS = 5 * 60 * 1000;

const SITE_SELECT = 'id,displayName,name,webUrl,description';
const PAGE_SELECT = 'id,name,title,webUrl,createdDateTime,lastModifiedDateTime,pageLayout,promotionKind,'
  + 'createdBy,lastModifiedBy,publishingState,reactions';
const PAGE_PAGE_SIZE = 100;

const MAX_PAGES = 5000;

interface CacheEntry {
  readonly results: ReadonlyArray<SiteReference>;
  readonly storedAt: number;
}

export const filterByModifiedSince = (
  pages: ReadonlyArray<PageInventoryItem>,
  modifiedSince: string | undefined
): ReadonlyArray<PageInventoryItem> => {
  if (!modifiedSince) {
    return pages;
  }

  const threshold = Date.parse(modifiedSince);
  if (Number.isNaN(threshold)) {
    return pages;
  }

  return pages.filter((page) => {
    const modified = Date.parse(page.lastModifiedDateTime);
    return Number.isNaN(modified) || modified >= threshold;
  });
};

export class GraphDiscoveryService {
  private readonly _context: WebPartContext;
  private readonly _logger: Logger;
  private readonly _searchCache = new Map<string, CacheEntry>();
  private _clientPromise?: Promise<MSGraphClientV3>;

  public constructor(context: WebPartContext, logger: Logger) {
    this._context = context;
    this._logger = logger;
  }

  public async searchSites(query: string): Promise<ReadonlyArray<SiteReference>> {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      return [];
    }

    const cached = this.getCached(trimmedQuery);
    if (cached) {
      return cached;
    }

    const client = await this.getClient();
    const sites = new Map<string, SiteReference>();

    const resolvedSite = await this.tryResolveSiteByUrl(client, trimmedQuery);
    if (resolvedSite) {
      sites.set(resolvedSite.id, resolvedSite);
    }

    if (sites.size < MAX_SEARCH_RESULTS) {
      try {
        const response = await executeWithRetry(
          async () => client
            .api(`/sites?search=${encodeURIComponent(trimmedQuery)}&$select=${SITE_SELECT}&$top=${MAX_SEARCH_RESULTS.toString()}`)
            .version('v1.0')
            .get() as Promise<GraphCollectionResponse<GraphSite>>,
          defaultRetryOptions
        );

        (response.value ?? []).forEach((site) => {
          if (sites.size < MAX_SEARCH_RESULTS && !sites.has(site.id)) {
            sites.set(site.id, this.mapSite(site));
          }
        });
      } catch (error) {
        this._logger.error('Graph site search failed.', { query: trimmedQuery, error });
        if (sites.size === 0) {
          throw error;
        }
      }
    }

    const results = Array.from(sites.values());
    this.setCached(trimmedQuery, results);
    return results;
  }

  private getCached(query: string): ReadonlyArray<SiteReference> | undefined {
    const key = query.toLowerCase().trim();
    const entry = this._searchCache.get(key);
    if (!entry) {
      return undefined;
    }

    if (Date.now() - entry.storedAt > CACHE_TTL_MS) {
      this._searchCache.delete(key);
      return undefined;
    }

    return entry.results;
  }

  private setCached(query: string, results: ReadonlyArray<SiteReference>): void {
    const key = query.toLowerCase().trim();

    if (this._searchCache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = this._searchCache.keys().next().value;
      if (oldestKey !== undefined) {
        this._searchCache.delete(oldestKey);
      }
    }

    this._searchCache.set(key, { results, storedAt: Date.now() });
  }

  public async getSitePages(
    siteId: string,
    options?: {
      readonly modifiedSince?: string;
      readonly onProgress?: (loaded: number) => void;
      readonly cancellationToken?: MigrationCancellationToken;
    }
  ): Promise<EnumerationResult<PageInventoryItem>> {
    const client = await this.getClient();
    const items: PageInventoryItem[] = [];
    let scanned = 0;

    const useServerFilter = !!options?.modifiedSince
      && !(await this.serverFilterRejected(client, siteId, options.modifiedSince));

    const filter = useServerFilter && options?.modifiedSince
      ? `&$filter=lastModifiedDateTime ge ${options.modifiedSince}`
      : '';

    let nextPath: string =
      `/sites/${siteId}/pages/microsoft.graph.sitePage` +
      `?$select=${PAGE_SELECT}&$top=${PAGE_PAGE_SIZE.toString()}${filter}`;

    while (nextPath) {
      if (options?.cancellationToken?.isCancelled) {
        return { items, isComplete: false, error: 'Cancelled by user.' };
      }

      try {
        const response = await executeWithRetry(
          async () => client.api(nextPath).version('v1.0').get() as Promise<GraphCollectionResponse<GraphSitePage>>,
          { ...defaultRetryOptions, signal: options?.cancellationToken }
        );

        const mapped = (response.value ?? []).map((page) => this.mapPage(page));
        scanned += mapped.length;
        items.push(...(useServerFilter ? mapped : filterByModifiedSince(mapped, options?.modifiedSince)));
        options?.onProgress?.(items.length);

        if (scanned >= MAX_PAGES) {
          this._logger.warning('Page enumeration hit the safety ceiling.', { siteId, ceiling: MAX_PAGES, scanned });
          return {
            items: items.slice(0, MAX_PAGES),
            isComplete: false,
            error: `Only the first ${MAX_PAGES.toString()} pages were read.`
          };
        }

        const link = response['@odata.nextLink'];
        nextPath = link ? link.replace(GRAPH_V1_ROOT, '') : '';
      } catch (error) {
        if (error instanceof OperationCancelledError) {
          return { items, isComplete: false, error: 'Cancelled by user.' };
        }

        this._logger.error('Graph page enumeration failed.', { siteId, loaded: items.length, error });
        return { items, isComplete: false, error: toMessage(error, 'Page enumeration failed.') };
      }
    }

    this._logger.info(`Enumerated ${items.length.toString()} pages from Graph.`, { siteId });
    return { items, isComplete: true };
  }

  public async getPageTemplates(
    siteId: string,
    options?: { readonly cancellationToken?: MigrationCancellationToken }
  ): Promise<ReadonlyArray<PageInventoryItem>> {
    const client = await this.getClient();
    const items: PageInventoryItem[] = [];
    let nextPath = `/sites/${siteId}/pageTemplates/microsoft.graph.pageTemplate`
      + `?$select=${PAGE_SELECT}&$top=${PAGE_PAGE_SIZE.toString()}`;

    try {
      while (nextPath) {
        if (options?.cancellationToken?.isCancelled) {
          return items;
        }

        const response = await executeWithRetry(
          async () => client.api(nextPath).version('beta').get() as Promise<GraphCollectionResponse<GraphSitePage>>,
          { ...defaultRetryOptions, signal: options?.cancellationToken }
        );

        items.push(...(response.value ?? []).map((page) => ({
          ...this.mapPage(page),
          isTemplate: true
        })));

        if (items.length >= MAX_PAGES) {
          break;
        }

        const link = response['@odata.nextLink'];
        nextPath = link ? link.replace(GRAPH_BETA_ROOT, '').replace(GRAPH_V1_ROOT, '') : '';
      }
    } catch (error) {
      this._logger.info('Page templates are unavailable for this site.', { siteId, error });
      return items;
    }

    this._logger.info(`Enumerated ${items.length.toString()} page template(s).`, { siteId });
    return items;
  }

  private async serverFilterRejected(
    client: MSGraphClientV3,
    siteId: string,
    modifiedSince: string
  ): Promise<boolean> {
    const probe = `/sites/${siteId}/pages/microsoft.graph.sitePage`
      + `?$select=id&$top=1&$filter=lastModifiedDateTime ge ${modifiedSince}`;

    try {
      await client.api(probe).version('v1.0').get();
      return false;
    } catch (error) {
      const status = getErrorStatus(error);
      const rejected = status === 400 || status === 501;

      if (rejected) {
        this._logger.info('This tenant rejects the page date filter; filtering the results instead.', {
          siteId,
          status
        });
      }
      return rejected;
    }
  }

  private async getClient(): Promise<MSGraphClientV3> {
    if (!this._clientPromise) {
      this._clientPromise = this._context.msGraphClientFactory.getClient('3').catch((error: unknown) => {
        this._clientPromise = undefined;
        throw error;
      });
    }
    return this._clientPromise;
  }

  private async tryResolveSiteByUrl(client: MSGraphClientV3, query: string): Promise<SiteReference | undefined> {
    const parsedUrl = tryParseUrl(query);
    if (!parsedUrl || !isSharePointHost(parsedUrl.hostname)) {
      return undefined;
    }

    const normalizedPath = parsedUrl.pathname === '/' ? '' : parsedUrl.pathname.replace(/\/$/, '');
    const path = `/sites/${parsedUrl.hostname}:${normalizedPath}?$select=${SITE_SELECT}`;

    try {
      const site = await client.api(path).version('v1.0').get() as GraphSite;
      return this.mapSite(site);
    } catch {
      return undefined;
    }
  }

  private mapSite(site: GraphSite): SiteReference {
    const siteUrl = new URL(site.webUrl);
    return {
      id: site.id,
      displayName: site.displayName || site.name || siteUrl.pathname,
      webUrl: site.webUrl,
      hostname: siteUrl.hostname,
      path: siteUrl.pathname,
      description: site.description
    };
  }

  private mapPage(page: GraphSitePage): PageInventoryItem {
    const epoch = new Date(0).toISOString();
    return {
      key: page.id,
      id: page.id,
      pageId: page.id,
      title: page.title ?? page.name,
      name: page.name,
      webUrl: page.webUrl,
      authorName: page.lastModifiedBy?.user?.displayName ?? page.createdBy?.user?.displayName ?? '',
      authorEmail: page.lastModifiedBy?.user?.email ?? page.createdBy?.user?.email,
      createdDateTime: page.createdDateTime ?? epoch,
      lastModifiedDateTime: page.lastModifiedDateTime ?? epoch,
      layout: page.pageLayout ?? 'Article',
      promotionState: page.promotionKind ?? 'page',
      checkedOutBy: page.publishingState?.checkedOutBy?.user?.displayName,
      checkedOutByEmail: page.publishingState?.checkedOutBy?.user?.email,
      publishingLevel: page.publishingState?.level,
      commentCount: page.reactions?.commentCount ?? 0,
      migrationStatus: 'NotStarted',
      warningCount: 0
    };
  }
}
