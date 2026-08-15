import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { IScanService } from './IScanService';
import { IDocumentFacts, ILibraryFacts, ILibrarySummary } from '../models/ScanTypes';

/** Document library. */
const TEMPLATE_DOCUMENT_LIBRARY: number = 101;
/** Site Pages library. */
const TEMPLATE_SITE_PAGES: number = 119;

/**
 * Internal name of the out of the box sensitivity label column in SharePoint Online.
 * Not present on every library, so every read of it is guarded and a failure
 * downgrades the label rules to "not evaluated" rather than to "passed".
 */
const SENSITIVITY_FIELD: string = '_DisplayName';

const PAGE_SIZE: number = 200;

interface IListResponseItem {
  Id: number;
  Title?: string;
  ItemCount?: number;
  BaseTemplate?: number;
  RootFolder?: { ServerRelativeUrl?: string };
}

interface IItemResponseItem {
  Id: number;
  FileLeafRef?: string;
  FileRef?: string;
  Modified?: string;
  File?: { Length?: string | number };
  _DisplayName?: string;
}

interface IODataCollection<T> {
  value: T[];
  '@odata.nextLink'?: string;
}

const jsonOptions: ISPHttpClientOptions = {
  headers: { Accept: 'application/json;odata=nometadata' }
};

const extensionOf = (fileName: string): string => {
  const dot = fileName.lastIndexOf('.');
  return dot > 0 ? fileName.substring(dot + 1).toLowerCase() : '';
};

export class SharePointScanService implements IScanService {
  private readonly _client: SPHttpClient;
  private readonly _webUrl: string;
  private readonly _origin: string;

  public constructor(client: SPHttpClient, webAbsoluteUrl: string) {
    this._client = client;
    this._webUrl = webAbsoluteUrl.replace(/\/$/, '');
    const match = /^(https?:\/\/[^/]+)/.exec(this._webUrl);
    this._origin = match ? match[1] : '';
  }

  private async _getJson<T>(url: string): Promise<T> {
    const response: SPHttpClientResponse = await this._client.get(url, SPHttpClient.configurations.v1, jsonOptions);
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`${response.status} ${response.statusText} for ${url}. ${body.substring(0, 400)}`);
    }
    return (await response.json()) as T;
  }

  public async listLibraries(): Promise<ILibrarySummary[]> {
    const url =
      `${this._webUrl}/_api/web/lists` +
      `?$select=Id,Title,ItemCount,BaseTemplate,RootFolder/ServerRelativeUrl` +
      `&$expand=RootFolder` +
      `&$filter=(BaseTemplate eq ${TEMPLATE_DOCUMENT_LIBRARY} or BaseTemplate eq ${TEMPLATE_SITE_PAGES}) and Hidden eq false`;

    const data = await this._getJson<IODataCollection<IListResponseItem>>(url);

    return data.value.map(list => ({
      id: String(list.Id),
      title: list.Title || '(untitled)',
      webUrl: this._origin + (list.RootFolder && list.RootFolder.ServerRelativeUrl ? list.RootFolder.ServerRelativeUrl : ''),
      itemCount: list.ItemCount || 0,
      isPagesLibrary: list.BaseTemplate === TEMPLATE_SITE_PAGES
    }));
  }

  private _itemsUrl(listId: string, includeSensitivity: boolean): string {
    const select = [
      'Id',
      'FileLeafRef',
      'FileRef',
      'Modified',
      'File/Length'
    ];
    if (includeSensitivity) {
      select.push(SENSITIVITY_FIELD);
    }
    return (
      `${this._webUrl}/_api/web/lists(guid'${listId}')/items` +
      `?$select=${select.join(',')}` +
      `&$expand=File` +
      `&$filter=FSObjType eq 0` +
      `&$top=${PAGE_SIZE}`
    );
  }

  /**
   * Reads items, preferring the request that includes the sensitivity label
   * column. If SharePoint rejects that request the column does not exist on
   * this library, so fall back and report labels as unavailable.
   */
  private async _readItems(
    listId: string,
    maxItems: number
  ): Promise<{ items: IItemResponseItem[]; sensitivityAvailable: boolean; truncated: boolean }> {
    let sensitivityAvailable = true;
    let url: string | undefined = this._itemsUrl(listId, true);
    const items: IItemResponseItem[] = [];
    let truncated = false;

    while (url) {
      let page: IODataCollection<IItemResponseItem>;
      try {
        page = await this._getJson<IODataCollection<IItemResponseItem>>(url);
      } catch (error) {
        if (sensitivityAvailable && items.length === 0) {
          // Retry once without the label column before giving up.
          sensitivityAvailable = false;
          url = this._itemsUrl(listId, false);
          continue;
        }
        throw error;
      }

      items.push(...page.value);
      if (items.length >= maxItems) {
        truncated = true;
        break;
      }
      url = page['@odata.nextLink'];
    }

    return { items: items.slice(0, maxItems), sensitivityAvailable, truncated };
  }

  public async scanLibrary(library: ILibrarySummary, maxItems: number): Promise<ILibraryFacts> {
    const { items, sensitivityAvailable, truncated } = await this._readItems(library.id, maxItems);

    const documents: IDocumentFacts[] = items.map(item => {
      const name = item.FileLeafRef || `Item ${item.Id}`;
      const length = item.File && item.File.Length !== undefined ? Number(item.File.Length) : 0;
      return {
        id: String(item.Id),
        name,
        webUrl: this._origin + (item.FileRef || ''),
        extension: extensionOf(name),
        sizeBytes: isNaN(length) ? 0 : length,
        lastModified: item.Modified || new Date(0).toISOString(),
        sensitivityLabel: sensitivityAvailable ? item._DisplayName : undefined
      };
    });

    return {
      id: library.id,
      title: library.title,
      webUrl: library.webUrl,
      totalItemCount: library.itemCount,
      isPagesLibrary: library.isPagesLibrary,
      sensitivityLabelsAvailable: sensitivityAvailable,
      truncated,
      documents
    };
  }
}
