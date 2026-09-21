import type { SPHttpClient, SPHttpClientConfiguration } from '@microsoft/sp-http';
import { DashboardConfig, WorkflowRequest, WorkflowSourceConfig } from '../webparts/workflowApprovalDashboard/models';
import { DashboardError, classifyHttpError } from './errors';
import { IWorkflowSourceService, WorkflowLoadResult } from './IWorkflowSourceService';
import { parseWorkflowItems } from './parser';
import { toSafeTenantUrl } from './urlSafety';

interface ResponseLike {
  ok: boolean;
  status: number;
  headers: Headers;
  json(): Promise<unknown>;
}

export class SharePointWorkflowService implements IWorkflowSourceService {
  public constructor(private readonly client: SPHttpClient, private readonly tenantUrl: string, private readonly now: () => Date = () => new Date(), private readonly configuration: SPHttpClientConfiguration) {}

  public async load(config: DashboardConfig): Promise<WorkflowLoadResult> {
    const active = config.sources.filter(source => source.enabled).slice(0, config.limits.maxSources);
    const results = await Promise.all(active.map(async source => {
      try { return { sourceLabel: source.label, requests: await this.fetchSource(source, config) }; }
      catch (error) { return { sourceLabel: source.label, error: this.asDashboardError(error) }; }
    }));
    const requests: WorkflowRequest[] = [];
    const errors: Array<{ sourceLabel: string; error: DashboardError }> = [];
    results.forEach(result => {
      if (result.requests !== undefined) { requests.push(...result.requests); }
      else if (result.error) { errors.push({ sourceLabel: result.sourceLabel, error: result.error }); }
    });
    return { requests, errors };
  }

  private async fetchSource(source: WorkflowSourceConfig, config: DashboardConfig): Promise<WorkflowRequest[]> {
    const requests: WorkflowRequest[] = [];
    let next = toSafeTenantUrl(source.endpoint, this.tenantUrl);
    for (let page = 0; page < config.limits.maxPagesPerSource && next && requests.length < config.limits.maxItemsPerSource; page += 1) {
      const response = await this.client.get(next, this.configuration, { headers: { Accept: 'application/json;odata=nometadata' } }) as unknown as ResponseLike;
      if (!response.ok) { throw classifyHttpError(response.status, response.headers.get('Retry-After')); }
      const payload = await response.json() as { value?: unknown[]; '@odata.nextLink'?: string };
      requests.push(...parseWorkflowItems(payload, source, config, this.now()));
      next = payload['@odata.nextLink'] ? toSafeTenantUrl(payload['@odata.nextLink'], this.tenantUrl) : '';
    }
    return requests.slice(0, config.limits.maxItemsPerSource);
  }

  private asDashboardError(error: unknown): DashboardError {
    if (error instanceof DashboardError) { return error; }
    return new DashboardError('network', 'The source could not be reached.');
  }
}
