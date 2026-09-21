import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IArticle, ISourceResult, normalizeRow } from './model';
import { isValidServerRelativePath, limits, safeItemUrl, safeNextUrl, retryAfter } from './safety';
const SELECT = 'Id,Title,Description,Body,FileRef,Created,Modified,ContentType/Name,Author/Title,Editor/Title,Taxonomy,Topic,Category,ReviewDate,Owner/Title';
const EXPAND = 'ContentType,Author,Editor,Owner';
const wait = (milliseconds: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, milliseconds));
export function responseMessage(response: SPHttpClientResponse): string { if (response.status === 401) return 'Sign-in is required to review this source.'; if (response.status === 403) return 'You do not have permission to read this source.'; if (response.status === 429 || response.status === 503) return 'The source is temporarily busy. Retry shortly.'; return `The source returned HTTP ${response.status}.`; }
async function getJson(client: SPHttpClient, url: string): Promise<{ value?: unknown[]; '@odata.nextLink'?: unknown; [key: string]: unknown }> {
  let attempt = 0;
  while (true) { const response = await client.get(url, SPHttpClient.configurations.v1); if (response.ok) return response.json(); if ((response.status === 429 || response.status === 503) && attempt < 2) { attempt += 1; await wait(retryAfter(response) || attempt * 500); continue; } throw new Error(responseMessage(response)); }
}
export async function readSource(client: SPHttpClient, webUrl: string, source: string, referenceDate: string): Promise<ISourceResult> {
  if (!isValidServerRelativePath(source)) return { source, rows: [], error: 'Invalid server-relative source path.' };
  const base = `${webUrl.replace(/\/$/, '')}/_api/web/GetList(@path)/items?@path='${encodeURIComponent(source).replace(/'/g, "''")}'&$select=${SELECT}&$expand=${EXPAND}&$top=${limits.MAX_PAGE_SIZE}`;
  const rows: IArticle[] = []; let next: string | undefined = base;
  try { for (let page = 0; next && page < limits.MAX_PAGES && rows.length < limits.MAX_ROWS; page += 1) { const json = await getJson(client, next); const values = Array.isArray(json.value) ? json.value : []; values.slice(0, Math.min(limits.MAX_PAGE_SIZE, limits.MAX_ROWS - rows.length)).forEach((row) => { const raw = row as { FileRef?: unknown }; const article = normalizeRow(row, referenceDate, safeItemUrl(webUrl, typeof raw.FileRef === 'string' ? raw.FileRef : '')); if (article) rows.push(article); }); next = safeNextUrl(webUrl, json['@odata.nextLink']); } return { source, rows }; } catch (error) { return { source, rows, error: error instanceof Error ? error.message : 'Unable to read source.' }; }
}
