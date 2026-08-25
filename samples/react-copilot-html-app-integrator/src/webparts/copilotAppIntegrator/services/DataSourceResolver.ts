import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import { IHtmlDataSource } from '../models/IHtmlManifest';
import { ILiveDataResult } from '../models/ILiveDataResult';

interface IListItemsPage {
  value?: Record<string, unknown>[];
  '@odata.nextLink'?: string;
  'odata.nextLink'?: string;
}

export class DataSourceResolver {
  public constructor(private readonly spHttpClient: SPHttpClient) {}

  public async resolve(source: IHtmlDataSource): Promise<ILiveDataResult> {
    try {
      switch (source.kind) {
        case 'list':
          return await this.resolveList(source);

        case 'file':
          return await this.resolveTextFile(source);

        default:
          throw new Error(
            `Unsupported data-source kind: ${source.kind as string}`
          );
      }
    } catch (error) {
      return {
        label: source.label ?? source.spItemUrl,
        content: null,
        format: null,
        error: error instanceof Error ? error.message : String(error),
        errorCode: 'data-source-error'
      };
    }
  }

  private async resolveList(
    source: IHtmlDataSource
  ): Promise<ILiveDataResult> {
    const select = source.select?.length
      ? `&$select=${source.select.join(',')}`
      : '';

    const expand = source.expand?.length
      ? `&$expand=${source.expand.join(',')}`
      : '';

    let requestUrl =
      `${source.webUrl}/_api/web/` +
      `lists(guid'${source.listId}')/items` +
      `?$top=5000${select}${expand}`;

    const items: Record<string, unknown>[] = [];

    while (requestUrl) {
      const response: SPHttpClientResponse = await this.spHttpClient.get(
        requestUrl,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: 'application/json;odata.metadata=none'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`List request failed: ${response.status}`);
      }

      const page: IListItemsPage = await response.json();

      items.push(...(page.value ?? []));

      requestUrl =
        page['@odata.nextLink'] ??
        page['odata.nextLink'] ??
        '';
    }

    const headers = Array.from(
      new Set(
        items.flatMap(item =>
          Object.keys(item).filter(key => !key.startsWith('@odata.'))
        )
      )
    );

    const rows = items.map(item =>
      headers.map(header => this.serializeFieldValue(item[header]))
    );

    return {
      label: source.label ?? source.spItemUrl,
      format: 'rows',
      content: JSON.stringify({
        headers,
        rows
      })
    };
  }

  private serializeFieldValue(value: unknown): unknown {
    if (value === undefined || value === null) {
      return '';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return value;
  }

  private async resolveTextFile(
    source: IHtmlDataSource
  ): Promise<ILiveDataResult> {
    if (!source.fileServerRelativeUrl) {
      throw new Error('No file path was supplied.');
    }

    const escapedPath = source.fileServerRelativeUrl.replace(/'/g, "''");

    const requestUrl =
      `${source.webUrl}/_api/web/` +
      `GetFileByServerRelativePath(` +
      `decodedUrl='${escapedPath}')/$value`;

    const response = await this.spHttpClient.get(
      requestUrl,
      SPHttpClient.configurations.v1
    );

    if (!response.ok) {
      throw new Error(`File request failed: ${response.status}`);
    }

    return {
      label: source.label ?? source.spItemUrl,
      format: 'text',
      content: await response.text()
    };
  }
}
