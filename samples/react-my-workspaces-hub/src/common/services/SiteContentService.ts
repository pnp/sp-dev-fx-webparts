import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { BaseService, IServiceContext } from './BaseService';
import { IAppDetails, ISiteContentItem, IDriveDetails } from '../types/ISiteContent';
import { mapTilesToItems } from '../utils/siteContentMapper';

export interface ISiteContentServiceContext extends IServiceContext {
  context: WebPartContext;
}

/**
 * Reads the lists and libraries of an arbitrary site (via `/_api/web/apptiles`)
 * and resolves Graph drive details on demand. Ported from the
 * react-site-content-ribbon-extension sample.
 */
export class SiteContentService extends BaseService {
  private readonly context: WebPartContext;

  public constructor(ctx: ISiteContentServiceContext) {
    super(ctx);
    this.context = ctx.context;
  }

  /** Fetch the lists/libraries of the given site as normalized items. */
  public async getSiteContent(siteAbsoluteUrl: string): Promise<ISiteContentItem[]> {
    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        `${siteAbsoluteUrl}/_api/web/apptiles`,
        SPHttpClient.configurations.v1
      );
      if (!response.ok) {
        throw new Error(`apptiles request failed: ${response.statusText} (${response.status})`);
      }
      const json = await response.json();
      const tiles = (json.value ?? []) as IAppDetails[];
      return mapTilesToItems(tiles);
    } catch (error) {
      throw this.toError(error, 'SiteContentService.getSiteContent');
    }
  }

  /** Resolve Graph drive details for a library within the given site. */
  public async getDriveDetails(
    siteAbsoluteUrl: string,
    listName: string
  ): Promise<IDriveDetails> {
    try {
      const client = await this.context.msGraphClientFactory.getClient('3');
      const url = new URL(siteAbsoluteUrl);
      const site = await client
        .api(`/sites/${url.hostname}:${url.pathname}`)
        .select('id')
        .get();
      const drive = await client
        .api(`/sites/${site.id}/lists/${encodeURIComponent(listName)}/drive`)
        .get();
      return { id: drive.id, description: drive.description, webUrl: drive.webUrl };
    } catch (error) {
      throw this.toError(error, 'SiteContentService.getDriveDetails');
    }
  }
}
