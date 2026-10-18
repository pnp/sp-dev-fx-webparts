import '@pnp/sp/search';
import { SearchQueryBuilder, SortDirection } from '@pnp/sp/search';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { BaseService, IServiceContext } from './BaseService';
import { IRecentFile } from '../types/IGraphModels';
import { SearchRow } from '../utils/siteMapper';

export interface IInsightsServiceContext extends IServiceContext {
  context: WebPartContext;
}

interface IGraphInsightUsed {
  id: string;
  lastUsed?: { lastAccessedDateTime?: string };
  resourceVisualization?: { title?: string; type?: string; containerDisplayName?: string };
  resourceReference?: { webUrl?: string; id?: string };
}

const DEFAULT_TOP = 20;
const INSIGHTS_FETCH_MULTIPLIER = 4;
const NON_FILE_RESOURCE_TYPES = new Set([
  'drive',
  'folder',
  'library',
  'list',
  'site',
  'spsite',
  'spweb',
  'web'
]);

function normalizeResourceType(type: string | undefined): string {
  return (type ?? '').replace(/\s+/g, '').toLowerCase();
}

function hasFileExtension(webUrl: string | undefined): boolean {
  return /\/[^/?#]+\.[a-z0-9]{1,12}(?:[?#]|$)/i.test(webUrl ?? '');
}

function isFileInsight(entry: IGraphInsightUsed): boolean {
  const resourceType = normalizeResourceType(entry.resourceVisualization?.type);
  if (NON_FILE_RESOURCE_TYPES.has(resourceType)) {
    return false;
  }
  return hasFileExtension(entry.resourceReference?.webUrl) || resourceType.length > 0;
}

function getLinkFromReference(entry: IGraphInsightUsed): string | undefined {
  const webUrl = entry.resourceReference?.webUrl;
  if (webUrl) {
    return webUrl;
  }
  const id = entry.resourceReference?.id;
  return id && /^https?:\/\//i.test(id) ? id : undefined;
}

function normalizeFileName(name: string | undefined): string {
  return (name ?? '')
    .replace(/\.[a-z0-9]{1,12}$/i, '')
    .trim()
    .toLowerCase();
}

/**
 * Surfaces the current user's recently used files. Prefers Graph
 * `/me/insights/used`; falls back to a SharePoint Search document query when
 * insights is unavailable or returns nothing.
 */
export class InsightsService extends BaseService {
  private readonly context: WebPartContext;

  public constructor(ctx: IInsightsServiceContext) {
    super(ctx);
    this.context = ctx.context;
  }

  public async getRecentFiles(top: number = DEFAULT_TOP): Promise<IRecentFile[]> {
    const fromInsights = await this.tryInsights(top);
    if (fromInsights.length > 0) {
      return this.hydrateMissingLinks(fromInsights, top);
    }
    return this.fromSearch(top);
  }

  private async tryInsights(top: number): Promise<IRecentFile[]> {
    try {
      const client = await this.context.msGraphClientFactory.getClient('3');
      const response = await client.api('/me/insights/used').top(top * INSIGHTS_FETCH_MULTIPLIER).get();
      const value = (response.value ?? []) as IGraphInsightUsed[];
      return value
        .filter(isFileInsight)
        .slice(0, top)
        .map((entry) => ({
          id: entry.id,
          name: entry.resourceVisualization?.title ?? 'Untitled',
          webUrl: getLinkFromReference(entry),
          type: entry.resourceVisualization?.type,
          lastUsed: entry.lastUsed?.lastAccessedDateTime,
          containerName: entry.resourceVisualization?.containerDisplayName
        }));
    } catch {
      return [];
    }
  }

  private async hydrateMissingLinks(files: IRecentFile[], top: number): Promise<IRecentFile[]> {
    if (!files.some((file) => !file.webUrl)) {
      return files;
    }
    const searchFiles = await this.fromSearch(top * INSIGHTS_FETCH_MULTIPLIER).catch(() => []);
    const byName = new Map<string, IRecentFile>();
    for (const file of searchFiles) {
      const key = normalizeFileName(file.name);
      if (key && file.webUrl && !byName.has(key)) {
        byName.set(key, file);
      }
    }
    return files.map((file) => {
      if (file.webUrl) {
        return file;
      }
      const match = byName.get(normalizeFileName(file.name));
      return match?.webUrl ? { ...file, webUrl: match.webUrl } : file;
    });
  }

  private async fromSearch(top: number): Promise<IRecentFile[]> {
    try {
      const query = SearchQueryBuilder('IsDocument:true')
        .rowLimit(top)
        .enableSorting.sortList({
          Property: 'LastModifiedTime',
          Direction: SortDirection.Descending
        })
        .selectProperties('Title', 'Path', 'FileType', 'LastModifiedTime', 'SiteTitle');
      const results = await this.sp?.search(query);
      const rows = (results?.PrimarySearchResults ?? []) as unknown as SearchRow[];
      return rows.map((row, index) => ({
        id: String(row.Path ?? index),
        name: String(row.Title ?? 'Untitled'),
        webUrl: row.Path ? String(row.Path) : undefined,
        type: row.FileType ? String(row.FileType) : undefined,
        lastUsed: row.LastModifiedTime ? String(row.LastModifiedTime) : undefined,
        containerName: row.SiteTitle ? String(row.SiteTitle) : undefined
      }));
    } catch (error) {
      throw this.toError(error, 'InsightsService.getRecentFiles');
    }
  }
}
