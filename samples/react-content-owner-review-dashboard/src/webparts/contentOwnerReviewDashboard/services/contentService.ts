import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IContentRecord, IRawRow, ISource, FIELDS, EXPAND, PAGE_SIZE, MAX_PAGES, MAX_ROWS } from './model';
import { normalizeRow } from './normalize';
import { nextUrl, safeUrl, validatePath, validateWebUrl } from './safety';

export interface ILoadResult { rows: IContentRecord[]; warnings: string[]; }
export const httpMessage = (status: number): string => status === 401 ? 'Sign-in is required.' : status === 403 ? 'You do not have permission to read this source.' : status === 429 || status === 503 ? 'SharePoint is temporarily busy. Retry shortly.' : `SharePoint returned HTTP ${status}.`;
const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
const json = async (response: SPHttpClientResponse): Promise<{ value?: IRawRow[]; '@odata.nextLink'?: string }> => { if (!response.ok) throw new Error(httpMessage(response.status)); return response.json(); };
const retryAfter = (response: SPHttpClientResponse): number => Math.min(5000, Math.max(0, Number(response.headers.get('Retry-After') || 0) * 1000));

export async function loadSources(client: SPHttpClient, webUrl: string, sources: ISource[], referenceDate: string, dueWithinDays: number): Promise<ILoadResult> {
  validateWebUrl(webUrl);
  const rows: IContentRecord[] = [], warnings: string[] = [];
  for (const source of sources.slice(0, 4)) {
    let url: string | null = `${webUrl}/_api/web/GetList('${encodeURIComponent(validatePath(source.path))}')/items?$select=${FIELDS}&$expand=${EXPAND}&$top=${PAGE_SIZE}`;
    for (let page = 0; page < MAX_PAGES && rows.filter(r => r.source === source.path).length < MAX_ROWS && url; page++) {
      let response = await client.get(url, SPHttpClient.configurations.v1);
      if (response.status === 429 || response.status === 503) { await wait(retryAfter(response)); response = await client.get(url, SPHttpClient.configurations.v1); }
      try {
        const body = await json(response);
        (Array.isArray(body.value) ? body.value : []).slice(0, MAX_ROWS - rows.filter(r => r.source === source.path).length).forEach(row => rows.push(normalizeRow(row || {}, source.path, referenceDate, dueWithinDays)));
        url = nextUrl(body['@odata.nextLink'], webUrl);
        if (body['@odata.nextLink'] && !url) warnings.push(`${source.path}: unsafe pagination link ignored.`);
      } catch (error) { warnings.push(`${source.path}: ${error instanceof Error ? error.message : 'Unable to read source.'}`); break; }
    }
  }
  return { rows, warnings };
}
export { safeUrl };
