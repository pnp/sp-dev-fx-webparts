import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Review } from './components/Review';
import { boundedSources, canFetchPage, httpMessage, MAX_ROWS, PAGE_SIZE, SELECT_FIELDS, safeListPath, safeNextLink, normalize, ReviewRow, RawRow } from './review';

export interface IExternalSharingSensitiveReviewWebPartProps { sourcePaths: string; }
export default class ExternalSharingSensitiveReviewWebPart extends BaseClientSideWebPart<IExternalSharingSensitiveReviewWebPartProps> {
  private rows: ReviewRow[] = []; private loading = false; private error?: string; private status = '';
  public render(): void { ReactDom.render(React.createElement(Review, { rows: this.rows, loading: this.loading, error: this.error, status: this.status, onRetry: () => this.load() }), this.domElement); if (!this.loading && !this.rows.length && !this.error) this.load(); }
  protected onInit(): Promise<void> { return super.onInit().then(() => { this.load(); }); }
  private async load(): Promise<void> { if (this.loading) return; this.loading = true; this.error = undefined; this.status = 'Loading read-only review data.'; this.render();
    try { const output: ReviewRow[] = []; const failures: string[] = []; const sources = boundedSources(this.properties.sourcePaths || ''); for (const source of sources) { try { const path = safeListPath(source); if (!path) throw new Error(`Invalid server-relative list path: ${source}`); await this.loadSource(path, output); } catch (e) { failures.push(e instanceof Error ? `${source}: ${e.message}` : `${source}: request failed`); } } this.rows = output; this.status = `Loaded ${output.length} row${output.length === 1 ? '' : 's'} from ${sources.length} source${sources.length === 1 ? '' : 's'}.`; if (failures.length) this.error = `Some sources could not be reviewed: ${failures.join(' | ')}`; }
    catch (e) { this.error = e instanceof Error ? e.message : 'Unable to load review data.'; this.status = 'Review load failed.'; } finally { this.loading = false; this.render(); }
  }
  private async loadSource(path: string, output: ReviewRow[]): Promise<void> { let next: string | undefined = `${this.context.pageContext.web.absoluteUrl.replace(/\/$/, '')}/_api/web/GetList(@path)/items?@path='${encodeURIComponent(path)}'&$top=${PAGE_SIZE}&$select=${SELECT_FIELDS.join(',')}`; let page = 0; const origin = this.context.pageContext.web.absoluteUrl;
    let sourceRows = 0; while (next && canFetchPage(page, sourceRows)) { const response: SPHttpClientResponse = await this.context.spHttpClient.get(next, SPHttpClient.configurations.v1, { headers: { Accept: 'application/json;odata=nometadata' } }); if (!response.ok) throw new Error(httpMessage(response.status, response.headers.get('Retry-After'))); const body = await response.json() as { value?: RawRow[]; '@odata.nextLink'?: unknown }; for (const row of Array.isArray(body.value) ? body.value : []) { if (sourceRows >= MAX_ROWS) break; sourceRows++; const parsed = normalize(row, path, origin, new Date()); if (parsed) output.push(parsed); } const candidate = safeNextLink(body['@odata.nextLink'], origin); next = candidate && candidate.startsWith(origin) ? candidate : undefined; page++; }
  }
  protected get dataVersion(): Version { return Version.parse('1.0'); }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration { return { pages: [{ header: { description: 'Review settings' }, groups: [{ groupName: 'Sources', groupFields: [PropertyPaneTextField('sourcePaths', { label: 'List or library paths', description: 'One server-relative path per line; maximum 4.' })] }] }] }; }
}
