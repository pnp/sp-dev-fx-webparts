import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFI } from '@pnp/sp';
import { SPFx } from '@pnp/sp/behaviors/spfx';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { buildRemediationUrl } from './UrlSafety';
import { classifyError, ContentAuditError } from './ErrorClassification';
import { getQueryBounds, normalizeAuditConfig } from '../models/AuditConfig';
import { IAuditConfig, IContentItem, IContentReadResult, ISharePointContentService } from '../models/AuditModels';

export class SharePointContentService implements ISharePointContentService {
  private readonly sp: SPFI;
  private readonly siteUrl: string;

  public constructor(context: WebPartContext) {
    this.sp = spfi().using(SPFx(context));
    this.siteUrl = context.pageContext.web.absoluteUrl;
  }

  public async read(inputConfig: IAuditConfig): Promise<IContentReadResult> {
    const config = normalizeAuditConfig(inputConfig);
    const bounds = getQueryBounds(config);
    const listTitle = config.sourceType === 'page' ? 'Site Pages' : config.listTitle;
    try {
      const query = this.sp.web.lists.getByTitle(listTitle).items
        .select(...bounds.fields)
        .top(bounds.itemLimit);
      const rows = config.sourceType === 'page'
        ? await query.filter(`FileLeafRef eq '${this.pageName(config.pagePath).replace(/'/g, "''")}'`)()
        : await query();
      const failures: string[] = [];
      const items: IContentItem[] = [];
      rows.forEach((row: Record<string, unknown>, index: number) => {
        try {
          const id = String(row.Id || '');
          if (!id) throw new Error('Item has no Id');
          const title = String(row.Title || row.FileLeafRef || `${listTitle} item ${index + 1}`);
          const fields: Record<string, unknown> = {};
          config.contentFields.forEach((field) => { fields[field] = row[field]; });
          items.push({
            id,
            title,
            sourceUrl: String(row.FileRef || ''),
            remediationUrl: buildRemediationUrl(this.siteUrl, config.sourceType, listTitle, id),
            fields
          });
        } catch (error) {
          failures.push(`Item ${index + 1}: ${classifyError(error).message}`);
        }
      });
      return { items, failures, sourceLabel: config.sourceType === 'page' ? config.pagePath : listTitle };
    } catch (error) {
      throw new ContentAuditError(classifyError(error));
    }
  }

  private pageName(pagePath: string): string {
    const clean = pagePath.split('?')[0].replace(/\\/g, '/');
    return clean.substring(clean.lastIndexOf('/') + 1) || 'Home.aspx';
  }
}
