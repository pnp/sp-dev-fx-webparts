import { SPFI } from '@pnp/sp';
import '@pnp/sp/items';
import '@pnp/sp/lists';
import '@pnp/sp/webs';
import { DashboardConfig, InventoryItem, InventoryResult, SourceConfig, SourceFailure } from '../models/RetentionRecordsModels';
import { classifyRetention, missingFields } from './retentionClassification';
import { safeTenantUrl } from './configuration';
import { classifyError } from './errors';

const FIXED_FIELDS = ['Id', 'Title', 'FileRef', 'Modified', 'FSObjType', 'ContentType/Name', 'ComplianceAssetId', 'IsRecord', 'RetentionLabel', 'RetentionLabelAppliedDate'];

export interface PagedResult<T> { results: T[]; hasNext: boolean; }

export function boundedPageResults<T>(pages: PagedResult<T>[], maxPages: number): { items: T[]; truncated: boolean } {
  const used = pages.slice(0, maxPages);
  return { items: used.reduce<T[]>((items, page) => items.concat(page.results), []), truncated: used.length === maxPages && used[used.length - 1].hasNext };
}

export class SharePointInventoryService {
  public constructor(private readonly sp: SPFI, private readonly tenantOrigin: string, private readonly siteFactory: (siteUrl: string) => SPFI = () => this.sp) {}

  public async load(config: DashboardConfig): Promise<InventoryResult> {
    const enabled = config.sources.filter(source => source.enabled !== false).slice(0, config.maxSources);
    const results = await Promise.all(enabled.map(source => this.readSource(source, config)));
    return results.reduce<InventoryResult>((result, current) => ({
      items: result.items.concat(current.items),
      failures: result.failures.concat(current.failures),
      truncatedSources: result.truncatedSources.concat(current.truncatedSources)
    }), { items: [], failures: [], truncatedSources: [] });
  }

  private async readSource(source: SourceConfig, config: DashboardConfig): Promise<InventoryResult> {
    try {
      const site = safeTenantUrl(source.siteUrl || this.tenantOrigin, this.tenantOrigin);
      const siteSp = source.siteUrl ? this.siteFactory(site.href.replace(/\/$/, '')) : this.sp;
      const list = siteSp.web.getList(source.libraryServerRelativeUrl);
      const fields = FIXED_FIELDS.concat(config.reviewFields.map(field => field.key));
      const query = list.items.select(...fields).expand('ContentType').filter(`FileDirRef eq '${source.folderServerRelativeUrl.replace(/'/g, "''")}' and FSObjType eq 0`).top(config.pageSize);
      const pages: PagedResult<Record<string, unknown>>[] = [];
      const iterator = query[Symbol.asyncIterator]();
      while (pages.length < config.maxPages) {
        const next = await iterator.next();
        if (next.done) break;
        const results = next.value as Record<string, unknown>[];
        pages.push({ results, hasNext: results.length === config.pageSize });
      }
      const pageResult = boundedPageResults(pages, config.maxPages);
      return {
        items: pageResult.items.map(item => this.toInventoryItem(item, source, config)),
        failures: [],
        truncatedSources: pageResult.truncated ? [source.label] : []
      };
    } catch (error) {
      const classified = classifyError(error);
      const failure: SourceFailure = { sourceLabel: source.label, kind: classified.kind, message: classified.message };
      return { items: [], failures: [failure], truncatedSources: [] };
    }
  }

  private toInventoryItem(item: Record<string, unknown>, source: SourceConfig, config: DashboardConfig): InventoryItem {
    const reviewValues = config.reviewFields.reduce<Record<string, unknown>>((values, field) => { values[field.key] = item[field.key]; return values; }, {});
    const isRecord = typeof item.IsRecord === 'boolean' ? item.IsRecord : null;
    const retentionLabel = typeof item.RetentionLabel === 'string' && item.RetentionLabel ? item.RetentionLabel : null;
    const missingReviewMetadata = missingFields(reviewValues, config.reviewFields);
    return {
      id: Number(item.Id), title: String(item.Title || item.FileLeafRef || 'Untitled item'), path: String(item.FileRef || ''),
      modified: typeof item.Modified === 'string' ? item.Modified : null,
      contentType: typeof item.ContentType === 'object' && item.ContentType ? String((item.ContentType as { Name?: unknown }).Name || '') : null,
      isRecord, retentionLabel,
      retentionLabelAppliedDate: typeof item.RetentionLabelAppliedDate === 'string' ? item.RetentionLabelAppliedDate : null,
      reviewValues, missingReviewMetadata,
      classification: classifyRetention(isRecord, retentionLabel, missingReviewMetadata), sourceLabel: source.label
    };
  }
}
