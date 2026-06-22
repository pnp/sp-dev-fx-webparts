import { MSGraphClientV3 } from '@microsoft/sp-http';
import { DriveItem, Site } from '@microsoft/microsoft-graph-types';

export interface IGraphFile {
  id: string;
  name: string;
  webUrl: string;
  type: 'file' | 'folder';
  size?: number;
  lastModified?: Date;
}

export interface IGraphSite {
  id: string;
  name: string;
  webUrl: string;
  description?: string;
}

export class GraphService {
  private _graphClient: MSGraphClientV3;

  constructor(graphClient: MSGraphClientV3) {
    this._graphClient = graphClient;
  }

  /**
   * Get current user's sites
   */
  public async getMySites(): Promise<IGraphSite[]> {
    try {
      const response = await this._graphClient
        .api('/me/followedSites')
        .version('v1.0')
        .select('id,name,webUrl,description')
        .top(50)
        .get();

      return response.value.map((site: Site) => ({
        id: site.id || '',
        name: site.name || '',
        webUrl: site.webUrl || '',
        description: site.description || ''
      }));
    } catch (error) {
      console.error('Error fetching sites:', error);
      return [];
    }
  }

  /**
   * Get files from a site's document library
   */
  public async getSiteFiles(siteId: string, folderId?: string): Promise<IGraphFile[]> {
    try {
      const endpoint = folderId
        ? `/sites/${siteId}/drive/items/${folderId}/children`
        : `/sites/${siteId}/drive/root/children`;

      const response = await this._graphClient
        .api(endpoint)
        .version('v1.0')
        .select('id,name,webUrl,size,lastModifiedDateTime,folder,file')
        .top(100)
        .get();

      return response.value.map((item: DriveItem) => ({
        id: item.id || '',
        name: item.name || '',
        webUrl: item.webUrl || '',
        type: item.folder ? 'folder' : 'file',
        size: item.size,
        lastModified: item.lastModifiedDateTime ? new Date(item.lastModifiedDateTime) : undefined
      }));
    } catch (error) {
      console.error('Error fetching files:', error);
      return [];
    }
  }

  /**
   * Upload QR code to SharePoint library
   */
  public async uploadQRCode(
    siteId: string,
    fileName: string,
    blob: Blob,
    folderId?: string
  ): Promise<string | undefined> {
    try {
      const endpoint = folderId
        ? `/sites/${siteId}/drive/items/${folderId}:/${fileName}:/content`
        : `/sites/${siteId}/drive/root:/${fileName}:/content`;

      const response = await this._graphClient
        .api(endpoint)
        .version('v1.0')
        .putStream(blob);

      return response.webUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return undefined;
    }
  }

  /**
   * Search for sites
   */
  public async searchSites(query: string): Promise<IGraphSite[]> {
    try {
      const response = await this._graphClient
        .api('/sites')
        .version('v1.0')
        .filter(`search('${query}')`)
        .select('id,name,webUrl,description')
        .top(20)
        .get();

      return response.value.map((site: Site) => ({
        id: site.id || '',
        name: site.name || '',
        webUrl: site.webUrl || '',
        description: site.description || ''
      }));
    } catch (error) {
      console.error('Error searching sites:', error);
      return [];
    }
  }
}
