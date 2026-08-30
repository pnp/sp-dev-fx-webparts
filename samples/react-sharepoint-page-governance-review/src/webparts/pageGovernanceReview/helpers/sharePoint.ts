import { SPHttpClient } from '@microsoft/sp-http';
import { MAX_PAGES, MAX_ROWS, requestUrl, responseMessage, safeNextLink, validateWebUrl } from './safety';

export interface ISource { label: string; path: string; }
export interface ISourceResult { source: ISource; rows: unknown[]; error?: string; }
export async function readSource(client: SPHttpClient, webUrl: string, source: ISource): Promise<ISourceResult> {
  try {
    const base = validateWebUrl(webUrl); let next = requestUrl(webUrl, source.path); const rows: unknown[] = [];
    for (let page = 0; page < MAX_PAGES && next && rows.length < MAX_ROWS; page++) {
      const response = await client.get(next, SPHttpClient.configurations.v1, { headers: { Accept: 'application/json;odata=nometadata' } });
      if (!response.ok) return { source, rows, error: responseMessage(response.status, response.headers.get('Retry-After')) };
      const payload = await response.json() as { value?: unknown[]; '@odata.nextLink'?: unknown; 'odata.nextLink'?: unknown };
      if (Array.isArray(payload.value)) rows.push(...payload.value.slice(0, MAX_ROWS - rows.length));
      next = safeNextLink(payload['@odata.nextLink'] || payload['odata.nextLink'], base) || '';
    }
    return { source, rows };
  } catch (error) { return { source, rows: [], error: error instanceof Error ? error.message : 'Unable to read source.' }; }
}
