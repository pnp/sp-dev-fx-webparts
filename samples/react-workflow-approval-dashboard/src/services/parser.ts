import { DashboardError } from './errors';
import { classifyStatus } from './classification';
import { DashboardConfig, ApprovalStage, WorkflowRequest, WorkflowSourceConfig } from '../webparts/workflowApprovalDashboard/models';

const MAX_SOURCES = 4;
const MAX_PAGE_SIZE = 50;
const MAX_PAGES = 5;
const MAX_ITEMS = 200;

function text(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) { return value.trim(); }
  if (typeof value === 'number') { return String(value); }
  if (value && typeof value === 'object') {
    const item = value as Record<string, unknown>;
    return text(item.Title) || text(item.displayName) || text(item.email) || text(item.Email);
  }
  return undefined;
}

function list(value: unknown): string[] {
  if (Array.isArray(value)) { return value.map(text).filter((item): item is string => !!item); }
  return text(value)?.split(/[;,\n]/).map(item => item.trim()).filter(Boolean) || [];
}

function stages(value: unknown): ApprovalStage[] {
  if (!Array.isArray(value)) { return []; }
  return value.map((stage: unknown, index) => {
    const item = (stage && typeof stage === 'object' ? stage : {}) as Record<string, unknown>;
    return { name: text(item.name) || text(item.title) || `Stage ${index + 1}`, status: text(item.status) || 'Unknown', approver: text(item.approver) || text(item.assignedTo) };
  });
}

export function validateConfig(input: unknown): DashboardConfig {
  if (!input || typeof input !== 'object') { throw new DashboardError('invalid-config', 'Dashboard configuration must be an object.'); }
  const value = input as Partial<DashboardConfig>;
  const limits = value.limits;
  const reviewSettings = value.reviewSettings;
  if (!limits || !reviewSettings || !Array.isArray(value.sources) || value.sources.length === 0 || value.sources.length > MAX_SOURCES) {
    throw new DashboardError('invalid-config', 'Configuration must define one to four sources, limits, and review settings.');
  }
  if (limits.maxSources !== MAX_SOURCES || limits.pageSize < 1 || limits.pageSize > MAX_PAGE_SIZE || limits.maxPagesPerSource < 1 || limits.maxPagesPerSource > MAX_PAGES || limits.maxItemsPerSource < 1 || limits.maxItemsPerSource > MAX_ITEMS || reviewSettings.overdueAfterDays < 0 || reviewSettings.overdueAfterDays > 3650) {
    throw new DashboardError('invalid-config', 'Configuration limits are outside the supported bounds.');
  }
  const sources = value.sources.map((source: WorkflowSourceConfig) => {
    if (!source || !source.id || !source.label || !source.endpoint || typeof source.enabled !== 'boolean') { throw new DashboardError('invalid-config', 'Every source needs an id, label, endpoint, and enabled flag.'); }
    return source;
  });
  return { configVersion: value.configVersion || 1, limits, reviewSettings, sources };
}

export function parseWorkflowItems(payload: unknown, source: WorkflowSourceConfig, config: DashboardConfig, now: Date): WorkflowRequest[] {
  if (!payload || typeof payload !== 'object' || !Array.isArray((payload as { value?: unknown }).value)) {
    throw new DashboardError('malformed-response', `The ${source.label} response did not contain an item collection.`);
  }
  const requests: WorkflowRequest[] = [];
  ((payload as { value: unknown[] }).value).slice(0, config.limits.maxItemsPerSource).forEach((raw: unknown, index: number) => {
    const item = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
    const created = text(item.Created) || text(item.createdDateTime);
    if (!created || !text(item.Title) && !text(item.displayName)) { return; }
    const status = text(item.Status) || text(item.status) || 'Unknown';
    const dueDate = text(item.DueDate) || text(item.dueDate);
    const result = classifyStatus(status, created, now, config.reviewSettings.overdueAfterDays, dueDate);
    requests.push({
      id: text(item.Id) || text(item.id) || `${source.id}-${index}`,
      title: text(item.Title) || text(item.displayName) || 'Untitled request',
      status,
      state: result.state,
      created,
      modified: text(item.Modified) || text(item.lastModifiedDateTime),
      requester: text(item.Requester) || text(item.requester) || text(item.createdBy),
      approvers: list(item.Approvers || item.approvers),
      stages: stages(item.Stages || item.stages),
      dueDate,
      overdue: result.overdue,
      sourceLabel: source.label
    });
  });
  return requests;
}
