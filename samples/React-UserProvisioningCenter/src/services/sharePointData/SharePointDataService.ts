import { spfi, SPFx, SPFI } from '@pnp/sp';
import { JSONHeaderParse } from '@pnp/queryable';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/site-users/web';
import '@pnp/sp/security';
import { PermissionKind } from '@pnp/sp/security';
import type { WebPartContext } from '@microsoft/sp-webpart-base';
import {
  LIST_APPLICATION_CATALOG,
  LIST_APPROVAL_DELEGATIONS,
  LIST_AUDIT_LOG,
  LIST_DEPARTMENT_TEMPLATES,
  LIST_LICENSE_COST_TABLE,
  LIST_PROVISIONING_JOBS,
  LIST_ROLES,
  LIST_SETTINGS,
  LIST_SITE_CATALOG,
  LIST_TASKS,
  LIST_TEAMS_CATALOG
} from '../../constants/listNames';
import { UPC_LIST_DEFINITIONS } from '../provisioning/listSchemas';
import { escapeODataLiteral } from '../util/odata';
import { sharePointRetry } from '../util/sharePointRetry';
import { ConcurrencyError } from '../util/ConcurrencyError';
import { JobConflictError, isEtagConflict } from '../util/JobConflictError';
import { buildJobFilter } from '../util/jobFilter';
import { buildAuditFilter } from '../util/auditFilter';
import type { IPagedResult } from '../util/pagedQuery';
import { fetchPaged } from '../util/pagedQuery';
import { assertTransition } from '../engine/jobStateMachine';
import type { TelemetryService } from '../telemetry/TelemetryService';
import type {
  ApplicationProvisioningType,
  AppPermission,
  AppRole,
  AuditResult,
  IAppSettings,
  IApplicationCatalogItem,
  IApprovalDelegation,
  IApprovalRecord,
  IAuditEntry,
  IAuditQuery,
  IBatchSummary,
  IDepartmentTemplate,
  IJobNote,
  IJobPayload,
  IJobQuery,
  IJobStep,
  IJobSummary,
  ILicenseCost,
  ILicenseCostItem,
  IProvisioningJob,
  IRoleDefinition,
  IRoleManagementItem,
  ISchemaGap,
  ISchemaValidationResult,
  IServiceDeskTask,
  ISiteCatalogItem,
  ITeamsCatalogItem,
  ITemplateListItem,
  JobStatus,
  JobType,
  TaskStatus,
  TaskType
} from '../../models';

interface IJobListItem {
  Id: number;
  Title: string;
  JobType: JobType;
  Status: JobStatus;
  PayloadJson: string;
  StepsJson: string;
  ScheduledFor: string | null;
  CorrelationId: string;
  BatchId: string | null;
  TargetUpn: string | null;
  TargetUserId: string | null;
  ApprovalsJson: string | null;
  NotesJson: string | null;
  Created: string;
  Modified: string;
  RunningSince: string | null;
  RequestedBy?: { Title: string } | null;
  ApprovedBy?: { Title: string } | null;
}

const JOB_SELECT: string[] = [
  'Id',
  'Title',
  'JobType',
  'Status',
  'PayloadJson',
  'StepsJson',
  'ScheduledFor',
  'CorrelationId',
  'BatchId',
  'TargetUpn',
  'TargetUserId',
  'ApprovalsJson',
  'NotesJson',
  'Created',
  'Modified',
  'RunningSince',
  'RequestedBy/Title',
  'ApprovedBy/Title'
];

interface IJobSummaryListItem {
  Id: number;
  Title: string;
  JobType: JobType;
  Status: JobStatus;
  CorrelationId: string;
  BatchId: string | null;
  TargetUpn: string | null;
  ScheduledFor: string | null;
  Created: string;
  Modified: string;
  RunningSince: string | null;
  RequestedBy?: { Title: string } | null;
  ApprovedBy?: { Title: string } | null;
}

const JOB_SUMMARY_SELECT: string[] = [
  'Id',
  'Title',
  'JobType',
  'Status',
  'CorrelationId',
  'BatchId',
  'TargetUpn',
  'ScheduledFor',
  'Created',
  'Modified',
  'RunningSince',
  'RequestedBy/Title',
  'ApprovedBy/Title'
];

function parseJob(item: IJobListItem, telemetry?: TelemetryService): IProvisioningJob {
  let payload: IJobPayload;
  let steps: IJobStep[];
  let approvals: IApprovalRecord[];
  try {
    payload = JSON.parse(item.PayloadJson) as IJobPayload;
  } catch {
    payload = {} as IJobPayload;
    telemetry?.trackEvent(
      'data.parseFailure',
      { list: LIST_PROVISIONING_JOBS, field: 'PayloadJson', itemId: item.Id },
      'warning'
    );
  }
  try {
    steps = item.StepsJson ? (JSON.parse(item.StepsJson) as IJobStep[]) : [];
  } catch {
    steps = [];
    telemetry?.trackEvent(
      'data.parseFailure',
      { list: LIST_PROVISIONING_JOBS, field: 'StepsJson', itemId: item.Id },
      'warning'
    );
  }
  try {
    approvals = item.ApprovalsJson ? (JSON.parse(item.ApprovalsJson) as IApprovalRecord[]) : [];
  } catch {
    approvals = [];
    telemetry?.trackEvent(
      'data.parseFailure',
      { list: LIST_PROVISIONING_JOBS, field: 'ApprovalsJson', itemId: item.Id },
      'warning'
    );
  }
  let notes: IJobNote[];
  try {
    notes = item.NotesJson ? (JSON.parse(item.NotesJson) as IJobNote[]) : [];
  } catch {
    notes = [];
    telemetry?.trackEvent(
      'data.parseFailure',
      { list: LIST_PROVISIONING_JOBS, field: 'NotesJson', itemId: item.Id },
      'warning'
    );
  }
  return {
    itemId: item.Id,
    jobId: item.Title,
    jobType: item.JobType,
    status: item.Status,
    payload,
    steps,
    approvals,
    notes,
    scheduledFor: item.ScheduledFor,
    requestedBy: item.RequestedBy?.Title ?? null,
    approvedBy: item.ApprovedBy?.Title ?? null,
    correlationId: item.CorrelationId,
    batchId: item.BatchId ?? '',
    targetUpn: item.TargetUpn ?? '',
    targetUserId: item.TargetUserId,
    createdUtc: item.Created ?? null,
    modifiedUtc: item.Modified ?? null,
    runningSince: item.RunningSince ?? null
  };
}

function parseJobSummary(item: IJobSummaryListItem): IJobSummary {
  return {
    itemId: item.Id,
    jobId: item.Title,
    jobType: item.JobType,
    status: item.Status,
    targetUpn: item.TargetUpn ?? '',
    scheduledFor: item.ScheduledFor,
    requestedBy: item.RequestedBy?.Title ?? null,
    approvedBy: item.ApprovedBy?.Title ?? null,
    correlationId: item.CorrelationId,
    batchId: item.BatchId ?? '',
    createdUtc: item.Created ?? null,
    modifiedUtc: item.Modified ?? null,
    runningSince: item.RunningSince ?? null
  };
}

interface IAuditListItem {
  Title: string;
  JobId: string;
  Actor: string | null;
  Action: string;
  TargetUser: string | null;
  GraphEndpoint: string | null;
  RequestSummary: string | null;
  ResponseCode: number | null;
  DurationMs: number | null;
  Result: AuditResult;
  CorrelationId: string | null;
  TimestampUtc: string | null;
}

const AUDIT_SELECT: string[] = [
  'Title',
  'JobId',
  'Actor',
  'Action',
  'TargetUser',
  'GraphEndpoint',
  'RequestSummary',
  'ResponseCode',
  'DurationMs',
  'Result',
  'CorrelationId',
  'TimestampUtc'
];

function parseAuditEntry(i: IAuditListItem): IAuditEntry {
  return {
    entryId: i.Title,
    jobId: i.JobId,
    actor: i.Actor ?? '',
    action: i.Action,
    targetUser: i.TargetUser ?? '',
    graphEndpoint: i.GraphEndpoint ?? '',
    requestSummary: i.RequestSummary ?? '',
    responseCode: i.ResponseCode ?? 0,
    durationMs: i.DurationMs ?? 0,
    result: i.Result,
    correlationId: i.CorrelationId ?? '',
    timestampUtc: i.TimestampUtc ?? ''
  };
}

export interface ICreateJobInput {
  jobId: string;
  jobType: JobType;
  payload: IJobPayload;
  steps: IJobStep[];
  scheduledFor: string | null;
  correlationId: string;
  batchId?: string;
  targetUpn?: string;
  initialStatus?: 'PendingApproval' | 'Approved';
}

interface IDelegationListItem {
  Id: number;
  Title: string;
  DelegateUpn: string;
  StartUtc: string | null;
  EndUtc: string | null;
  Reason: string | null;
  IsActive: boolean;
}

function parseDelegation(item: IDelegationListItem): IApprovalDelegation {
  return {
    itemId: item.Id,
    delegatorUpn: item.Title,
    delegateUpn: item.DelegateUpn,
    startUtc: item.StartUtc,
    endUtc: item.EndUtc,
    reason: item.Reason ?? '',
    isActive: item.IsActive
  };
}

export class SharePointDataService {
  private readonly _sp: SPFI;
  private _telemetry: TelemetryService | undefined;
  private _currentUser: { Id: number; Title: string; LoginName: string } | undefined;
  private readonly _fieldCache: Map<string, Set<string>> = new Map();

  public constructor(context: WebPartContext);
  public constructor(sp: SPFI);
  public constructor(contextOrSp: WebPartContext | SPFI) {
    this._sp =
      contextOrSp && typeof contextOrSp === 'object' && 'web' in contextOrSp
        ? (contextOrSp as SPFI)
        : spfi().using(SPFx(contextOrSp as WebPartContext));
  }

  public setTelemetry(telemetry: TelemetryService): void {
    this._telemetry = telemetry;
  }

  public static readonly DEFAULT_JOBS_TOP: number = 500;
  private static readonly DEFAULT_LOCK_STALE_MS: number = 10 * 60 * 1000;

  // PnPJS's item .update() resolves the etag from the response's ETag header
  // itself (see @pnp/sp/items ItemUpdatedParser) and returns it as `.etag` —
  // not as an `odata.etag` body property.
  private _etagFromItem(item: unknown): string {
    return (item as { etag?: string } | undefined)?.etag ?? '*';
  }

  // Selecting the `odata.etag` pseudo-field in $select 400s against this
  // tenant's REST configuration ("The field or property 'odata.etag' does
  // not exist") — the default Accept header PnPJS sends doesn't request the
  // OData metadata level that pseudo-field requires. The ETag is always
  // present as a plain HTTP response header regardless of metadata level, so
  // read it from there instead via JSONHeaderParse.
  private async _getJobWithEtag<T>(itemId: number, selectFields: string[]): Promise<{ item: T; etag: string }> {
    const result: { data: T; headers: Headers } = await this._jobs()
      .items.getById(itemId)
      .select(...selectFields)
      .using(JSONHeaderParse())();
    return { item: result.data, etag: result.headers.get('etag') ?? '*' };
  }

  private async _me(): Promise<{ Id: number; Title: string; LoginName: string }> {
    if (!this._currentUser) {
      const fetched: { Id: number; Title: string; LoginName: string } = await sharePointRetry(
        () => this._sp.web.currentUser.select('Id', 'Title', 'LoginName')(),
        { circuitKey: 'sharepoint:currentUser' }
      );
      this._currentUser = fetched;
    }
    return this._currentUser;
  }

  private async _availableFields(listTitle: string): Promise<Set<string> | undefined> {
    const cached: Set<string> | undefined = this._fieldCache.get(listTitle);
    if (cached) {
      return cached;
    }
    try {
      const fields: { InternalName: string }[] = await sharePointRetry(
        () => this._sp.web.lists.getByTitle(listTitle).fields.select('InternalName').top(500)(),
        { circuitKey: listTitle, maxAttempts: 2 }
      );
      const names: Set<string> = new Set(fields.map((f) => f.InternalName.toLowerCase()));
      this._fieldCache.set(listTitle, names);
      return names;
    } catch {
      return undefined;
    }
  }

  private async _supportedSelect(listTitle: string, desired: string[]): Promise<string[]> {
    const available: Set<string> | undefined = await this._availableFields(listTitle);
    if (!available) {
      return desired;
    }
    const supported: string[] = desired.filter((field) => available.has(field.split('/')[0].toLowerCase()));
    const dropped: string[] = desired.filter((field) => !available.has(field.split('/')[0].toLowerCase()));
    if (dropped.length > 0) {
      this._telemetry?.trackEvent(
        'data.select.degraded',
        { list: listTitle, dropped: dropped.join(',') },
        'warning'
      );
    }
    return supported.length > 0 ? supported : desired;
  }

  private async _traceQuery<T>(name: string, list: string, action: () => Promise<T>): Promise<T> {
    const started: number = Date.now();
    try {
      const result: T = await action();
      this._telemetry?.trackEvent('data.query.end', { name, list, durationMs: Date.now() - started }, 'info');
      return result;
    } catch (err) {
      this._telemetry?.trackEvent(
        'data.query.fail',
        {
          name,
          list,
          durationMs: Date.now() - started,
          message: err instanceof Error ? err.message : String(err),
          errorName: err instanceof Error ? err.name : 'unknown',
          status: typeof err === 'object' && err !== null && 'status' in err ? String((err as { status: unknown }).status) : ''
        },
        'error'
      );
      throw err;
    }
  }

  private _jobs(): ReturnType<SPFI['web']['lists']['getByTitle']> {
    return this._sp.web.lists.getByTitle(LIST_PROVISIONING_JOBS);
  }

  private async _updateJob(
    itemId: number,
    fields: Record<string, unknown>,
    etag?: string
  ): Promise<string> {
    return sharePointRetry(
      async () => {
        const useEtag: string = etag ?? (await this._getJobWithEtag<{ Id: number }>(itemId, ['Id'])).etag;
        try {
          const updated = await this._jobs().items.getById(itemId).update(fields, useEtag);
          return this._etagFromItem(updated);
        } catch (err) {
          if (isEtagConflict(err)) {
            throw new JobConflictError(itemId);
          }
          throw err;
        }
      },
      { circuitKey: LIST_PROVISIONING_JOBS }
    );
  }

  public async getJobs(top: number = SharePointDataService.DEFAULT_JOBS_TOP): Promise<IProvisioningJob[]> {
    const page = await this.getJobsPaged(top);
    return page.items;
  }

  public async getJobsPaged(top: number = SharePointDataService.DEFAULT_JOBS_TOP): Promise<IPagedResult<IProvisioningJob>> {
    // Degrade like getJob does: an install that predates a column (NotesJson,
    // ApprovalsJson, …) must still list jobs rather than 400 on $select.
    const jobSelect: string[] = await this._supportedSelect(LIST_PROVISIONING_JOBS, JOB_SELECT);
    const query = this._jobs()
      .items.select(...jobSelect)
      .expand('RequestedBy', 'ApprovedBy')
      .orderBy('Id', false)
      .top(top) as unknown as AsyncIterable<IJobListItem[]>;
    const page = await fetchPaged<IJobListItem>(query, top, (action) =>
      sharePointRetry(action, { circuitKey: LIST_PROVISIONING_JOBS })
    );
    return {
      items: page.items.map((item) => parseJob(item, this._telemetry)),
      truncated: page.truncated,
      next: page.next
        ? async () => {
            const nextPage = await page.next!();
            return {
              items: nextPage.items.map((item) => parseJob(item, this._telemetry)),
              truncated: nextPage.truncated
            };
          }
        : undefined
    };
  }

  public async getJobSummariesPaged(query?: IJobQuery): Promise<IPagedResult<IJobSummary>> {
    return this._traceQuery('getJobSummariesPaged', LIST_PROVISIONING_JOBS, () =>
      this._getJobSummariesPaged(query)
    );
  }

  private async _getJobSummariesPaged(query?: IJobQuery): Promise<IPagedResult<IJobSummary>> {
    const top: number = query?.top ?? SharePointDataService.DEFAULT_JOBS_TOP;
    const filter: string = buildJobFilter(query);
    const select: string[] = await this._supportedSelect(LIST_PROVISIONING_JOBS, JOB_SUMMARY_SELECT);
    let request = this._jobs()
      .items.select(...select)
      .expand('RequestedBy', 'ApprovedBy')
      .orderBy('Id', false)
      .top(top);
    if (filter) {
      request = request.filter(filter);
    }
    const iterableRequest = request as unknown as AsyncIterable<IJobSummaryListItem[]>;
    const page = await fetchPaged<IJobSummaryListItem>(iterableRequest, top, (action) =>
      sharePointRetry(action, { circuitKey: LIST_PROVISIONING_JOBS })
    );
    return {
      items: page.items.map(parseJobSummary),
      truncated: page.truncated,
      next: page.next
        ? async () => {
            const nextPage = await page.next!();
            return { items: nextPage.items.map(parseJobSummary), truncated: nextPage.truncated };
          }
        : undefined
    };
  }

  public async getJobsChangeToken(): Promise<{ latestModifiedUtc: string; runningCount: number }> {
    return this._traceQuery('getJobsChangeToken', LIST_PROVISIONING_JOBS, () =>
      this._getJobsChangeToken()
    );
  }

  private async _getJobsChangeToken(): Promise<{ latestModifiedUtc: string; runningCount: number }> {
    return sharePointRetry(
      async () => {
        const newest: { Modified: string }[] = await this._jobs()
          .items.select('Modified')
          .orderBy('Modified', false)
          .top(1)();
        const running: { Id: number }[] = await this._jobs()
          .items.select('Id')
          .filter("Status eq 'Running'")
          .top(50)();
        return {
          latestModifiedUtc: newest[0]?.Modified ?? '',
          runningCount: running.length
        };
      },
      { circuitKey: LIST_PROVISIONING_JOBS }
    );
  }

  public async getBatchSummary(batchId: string): Promise<IBatchSummary> {
    const literal: string = escapeODataLiteral(batchId);
    const items: { Id: number; Status: JobStatus }[] = await sharePointRetry(
      () =>
        this._jobs()
          .items.select('Id', 'Status')
          .filter(`BatchId eq '${literal}'`)
          .top(SharePointDataService.DEFAULT_JOBS_TOP)(),
      { circuitKey: LIST_PROVISIONING_JOBS }
    );
    const byStatus: Partial<Record<JobStatus, number>> = {};
    for (const item of items) {
      byStatus[item.Status] = (byStatus[item.Status] ?? 0) + 1;
    }
    const failedItemIds: number[] = items
      .filter((i) => i.Status === 'Failed' || i.Status === 'PartiallyFailed')
      .map((i) => i.Id);
    return { batchId, total: items.length, byStatus, failedItemIds };
  }

  public async getJobStatus(itemId: number): Promise<JobStatus> {
    const item: { Status: JobStatus } = await sharePointRetry(
      () => this._jobs().items.getById(itemId).select('Status')(),
      { circuitKey: LIST_PROVISIONING_JOBS, maxAttempts: 2 }
    );
    return item.Status;
  }

  public async getJob(itemId: number): Promise<IProvisioningJob> {
    const jobSelect: string[] = await this._supportedSelect(LIST_PROVISIONING_JOBS, JOB_SELECT);
    const item: IJobListItem = await sharePointRetry(
      () =>
        this._jobs()
          .items.getById(itemId)
          .select(...jobSelect)
          .expand('RequestedBy', 'ApprovedBy')(),
      { circuitKey: LIST_PROVISIONING_JOBS }
    );
    return parseJob(item, this._telemetry);
  }

  public async createJob(input: ICreateJobInput): Promise<number> {
    const me = await this._me();
    return sharePointRetry(
      async () => {
        const result = await this._jobs().items.add({
          Title: input.jobId,
          JobType: input.jobType,
          Status: input.initialStatus ?? 'PendingApproval',
          PayloadJson: JSON.stringify(input.payload),
          StepsJson: JSON.stringify(input.steps),
          ScheduledFor: input.scheduledFor,
          CorrelationId: input.correlationId,
          BatchId: input.batchId ?? '',
          TargetUpn: input.targetUpn ?? '',
          ApprovalsJson: '[]',
          RequestedById: me.Id
        });
        return (result as { Id: number }).Id;
      },
      { idempotent: false, circuitKey: LIST_PROVISIONING_JOBS }
    );
  }

  public async findJobIdByTitle(jobId: string): Promise<number | undefined> {
    const items: { Id: number }[] = await sharePointRetry(
      () => this._jobs().items.select('Id').filter(`Title eq '${escapeODataLiteral(jobId)}'`).top(1)(),
      { circuitKey: LIST_PROVISIONING_JOBS }
    );
    return items[0]?.Id;
  }

  public async updateJobStatus(
    itemId: number,
    status: JobStatus,
    etag?: string,
    options?: { skipTransitionCheck?: boolean }
  ): Promise<string> {
    if (!options?.skipTransitionCheck) {
      const current: { Status: JobStatus } = await sharePointRetry(
        () => this._jobs().items.getById(itemId).select('Status')(),
        { circuitKey: LIST_PROVISIONING_JOBS }
      );
      if (current.Status !== status) {
        assertTransition(current.Status, status);
      }
    }
    return this._updateJob(itemId, { Status: status }, etag);
  }

  public async approveJob(itemId: number, etag?: string): Promise<string> {
    const me = await this._me();
    const job: { Status: JobStatus } = await sharePointRetry(
      () => this._jobs().items.getById(itemId).select('Status')(),
      { circuitKey: LIST_PROVISIONING_JOBS }
    );
    assertTransition(job.Status, 'Approved');
    return this._updateJob(itemId, { Status: 'Approved', ApprovedById: me.Id }, etag);
  }

  public async recordApproval(
    itemId: number,
    approval: IApprovalRecord,
    requiredApprovals: number
  ): Promise<{ satisfied: boolean; granted: number; required: number }> {
    const job: IProvisioningJob = await this.getJob(itemId);
    const existing: IApprovalRecord[] = job.approvals ?? [];
    const alreadyByMe: boolean = existing.some(
      (a) => (a.actorUpn ?? '').toLowerCase() === approval.actorUpn.toLowerCase()
    );
    const approvals: IApprovalRecord[] = alreadyByMe ? existing : [...existing, approval];
    const distinct: number = new Set(
      approvals.map((a) => (a.actorUpn ?? '').toLowerCase()).filter((v) => v.length > 0)
    ).size;
    const required: number = Math.max(1, Math.floor(requiredApprovals) || 1);
    const satisfied: boolean = distinct >= required;

    const fields: Record<string, unknown> = { ApprovalsJson: JSON.stringify(approvals) };
    if (satisfied) {
      assertTransition(job.status, 'Approved');
      const me = await this._me();
      fields.Status = 'Approved';
      fields.ApprovedById = me.Id;
    }
    await this._updateJob(itemId, fields);
    return { satisfied, granted: distinct, required };
  }

  public async updateJobSteps(itemId: number, steps: IJobStep[], etag?: string): Promise<string> {
    return this._updateJob(itemId, { StepsJson: JSON.stringify(steps) }, etag);
  }

  /**
   * Appends a note to the job. Read-modify-write against NotesJson: notes are
   * low-frequency and human-authored, so the etag on _updateJob is enough to
   * turn a lost update into a visible JobConflictError rather than silent loss.
   */
  public async appendJobNote(itemId: number, note: IJobNote): Promise<IJobNote[]> {
    const job: IProvisioningJob = await this.getJob(itemId);
    const notes: IJobNote[] = [...(job.notes ?? []), note];
    await this._updateJob(itemId, { NotesJson: JSON.stringify(notes) });
    return notes;
  }

  /** Rejects a pending job, recording the reason as a rejection note. */
  public async rejectJob(itemId: number, note: IJobNote): Promise<void> {
    const job: IProvisioningJob = await this.getJob(itemId);
    assertTransition(job.status, 'Rejected');
    const notes: IJobNote[] = [...(job.notes ?? []), note];
    await this._updateJob(itemId, { Status: 'Rejected', NotesJson: JSON.stringify(notes) });
  }

  public async setJobTargetUser(itemId: number, targetUserId: string, etag?: string): Promise<string> {
    return this._updateJob(itemId, { TargetUserId: targetUserId }, etag);
  }

  public async acquireJobLock(
    itemId: number,
    instanceId: string,
    maxLockAgeMs: number = SharePointDataService.DEFAULT_LOCK_STALE_MS
  ): Promise<string> {
    return sharePointRetry(
      async () => {
        const { item, etag } = await this._getJobWithEtag<{ RunningInstanceId?: string | null; RunningSince?: string | null }>(
          itemId,
          ['Id', 'RunningInstanceId', 'RunningSince']
        );

        const currentLock: string | null = item.RunningInstanceId ?? null;
        const currentSince: string | null = item.RunningSince ?? null;
        const stale: boolean =
          !currentLock ||
          (currentSince !== undefined &&
            currentSince !== null &&
            Date.now() - new Date(currentSince).getTime() > maxLockAgeMs);

        if (currentLock && !stale) {
          throw new ConcurrencyError(`Job ${itemId} is already running in session ${currentLock}`);
        }

        const updated = await this._jobs()
          .items.getById(itemId)
          .update({ RunningInstanceId: instanceId, RunningSince: new Date().toISOString() }, etag);
        return this._etagFromItem(updated);
      },
      { circuitKey: LIST_PROVISIONING_JOBS }
    );
  }

  public async releaseJobLock(itemId: number, instanceId: string): Promise<void> {
    await sharePointRetry(
      async () => {
        const { item, etag } = await this._getJobWithEtag<{ RunningInstanceId?: string | null }>(itemId, [
          'RunningInstanceId'
        ]);

        if (item.RunningInstanceId !== instanceId) {
          return;
        }

        await this._jobs()
          .items.getById(itemId)
          .update({ RunningInstanceId: null, RunningSince: null }, etag);
      },
      { circuitKey: LIST_PROVISIONING_JOBS }
    );
  }

  public async addAuditEntry(entry: IAuditEntry): Promise<void> {
    await sharePointRetry(
      () =>
        this._sp.web.lists.getByTitle(LIST_AUDIT_LOG).items.add({
          Title: entry.entryId,
          JobId: entry.jobId,
          Actor: entry.actor,
          Action: entry.action,
          TargetUser: entry.targetUser,
          GraphEndpoint: entry.graphEndpoint,
          RequestSummary: entry.requestSummary,
          ResponseCode: entry.responseCode,
          DurationMs: entry.durationMs,
          Result: entry.result,
          CorrelationId: entry.correlationId,
          TimestampUtc: entry.timestampUtc
        }),
      { idempotent: false, circuitKey: LIST_AUDIT_LOG }
    );
  }

  public async getAuditEntries(jobId: string, top: number = 100): Promise<IAuditEntry[]> {
    const literal: string = escapeODataLiteral(jobId);
    const items: IAuditListItem[] = await sharePointRetry(
      () =>
        this._sp.web.lists
          .getByTitle(LIST_AUDIT_LOG)
          .items.select(...AUDIT_SELECT)
          .filter(`JobId eq '${literal}'`)
          .orderBy('Id', true)
          .top(top)(),
      { circuitKey: LIST_AUDIT_LOG }
    );
    return items.map(parseAuditEntry);
  }

  public async searchAuditEntries(query?: IAuditQuery): Promise<IPagedResult<IAuditEntry>> {
    const top: number = query?.top ?? 200;
    const filter: string = buildAuditFilter(query);
    let request = this._sp.web.lists
      .getByTitle(LIST_AUDIT_LOG)
      .items.select(...AUDIT_SELECT)
      .orderBy('Id', false)
      .top(top);
    if (filter) {
      request = request.filter(filter);
    }
    const iterableRequest = request as unknown as AsyncIterable<IAuditListItem[]>;
    const page = await fetchPaged<IAuditListItem>(iterableRequest, top, (action) =>
      sharePointRetry(action, { circuitKey: LIST_AUDIT_LOG })
    );
    return {
      items: page.items.map(parseAuditEntry),
      truncated: page.truncated,
      next: page.next
        ? async () => {
            const nextPage = await page.next!();
            return { items: nextPage.items.map(parseAuditEntry), truncated: nextPage.truncated };
          }
        : undefined
    };
  }

  public async getRoleDefinitions(): Promise<IRoleDefinition[]> {
    return this._traceQuery('getRoleDefinitions', LIST_ROLES, () => this._getRoleDefinitions());
  }

  private async _getRoleDefinitions(): Promise<IRoleDefinition[]> {
    const items: { Title: AppRole; MemberGroupId: string; PermissionsJson: string | null }[] = await sharePointRetry(
      () => this._sp.web.lists.getByTitle(LIST_ROLES).items.select('Title', 'MemberGroupId', 'PermissionsJson').top(50)(),
      { circuitKey: LIST_ROLES }
    );
    return items
      .filter((i) => !!i.MemberGroupId)
      .map((i) => {
        let permissions: AppPermission[] = [];
        try {
          permissions = i.PermissionsJson ? (JSON.parse(i.PermissionsJson) as AppPermission[]) : [];
        } catch {
          permissions = [];
          this._telemetry?.trackEvent('data.parseFailure', { list: 'UPC_Roles', field: 'PermissionsJson', role: i.Title }, 'warning');
        }
        return { role: i.Title, memberGroupId: i.MemberGroupId, permissions };
      });
  }

  public async getRoleDefinitionsForManagement(): Promise<IRoleManagementItem[]> {
    const items: { Id: number; Title: AppRole; MemberGroupId: string | null; PermissionsJson: string | null }[] =
      await sharePointRetry(
        () =>
          this._sp.web.lists
            .getByTitle(LIST_ROLES)
            .items.select('Id', 'Title', 'MemberGroupId', 'PermissionsJson')
            .top(50)(),
        { circuitKey: LIST_ROLES }
      );
    return items.map((i) => {
      let permissions: AppPermission[] = [];
      try {
        permissions = i.PermissionsJson ? (JSON.parse(i.PermissionsJson) as AppPermission[]) : [];
      } catch {
        permissions = [];
        this._telemetry?.trackEvent('data.parseFailure', { list: 'UPC_Roles', field: 'PermissionsJson', role: i.Title }, 'warning');
      }
      return { itemId: i.Id, role: i.Title, memberGroupId: i.MemberGroupId ?? '', permissions };
    });
  }

  public async updateRoleDefinition(itemId: number, memberGroupId: string, permissions: AppPermission[]): Promise<void> {
    await sharePointRetry(
      () =>
        this._sp.web.lists
          .getByTitle(LIST_ROLES)
          .items.getById(itemId)
          .update({ MemberGroupId: memberGroupId, PermissionsJson: JSON.stringify(permissions) }),
      { circuitKey: LIST_ROLES }
    );
  }

  public async getActiveDelegationsFor(delegateUpn: string): Promise<IApprovalDelegation[]> {
    const literal: string = escapeODataLiteral(delegateUpn);
    const items: IDelegationListItem[] = await sharePointRetry(
      () =>
        this._sp.web.lists
          .getByTitle(LIST_APPROVAL_DELEGATIONS)
          .items.select('Id', 'Title', 'DelegateUpn', 'StartUtc', 'EndUtc', 'Reason', 'IsActive')
          .filter(`IsActive eq 1 and DelegateUpn eq '${literal}'`)
          .top(50)(),
      { circuitKey: LIST_APPROVAL_DELEGATIONS }
    );
    return items.map(parseDelegation);
  }

  public async getAllDelegations(): Promise<IApprovalDelegation[]> {
    const items: IDelegationListItem[] = await sharePointRetry(
      () =>
        this._sp.web.lists
          .getByTitle(LIST_APPROVAL_DELEGATIONS)
          .items.select('Id', 'Title', 'DelegateUpn', 'StartUtc', 'EndUtc', 'Reason', 'IsActive')
          .top(200)(),
      { circuitKey: LIST_APPROVAL_DELEGATIONS }
    );
    return items.map(parseDelegation);
  }

  public async createDelegation(delegation: Omit<IApprovalDelegation, 'itemId'>): Promise<number> {
    const result = await sharePointRetry(
      () =>
        this._sp.web.lists.getByTitle(LIST_APPROVAL_DELEGATIONS).items.add({
          Title: delegation.delegatorUpn,
          DelegateUpn: delegation.delegateUpn,
          StartUtc: delegation.startUtc,
          EndUtc: delegation.endUtc,
          Reason: delegation.reason,
          IsActive: delegation.isActive
        }),
      { idempotent: false, circuitKey: LIST_APPROVAL_DELEGATIONS }
    );
    return (result as { Id: number }).Id;
  }

  public async setDelegationActive(itemId: number, isActive: boolean): Promise<void> {
    await sharePointRetry(
      () =>
        this._sp.web.lists
          .getByTitle(LIST_APPROVAL_DELEGATIONS)
          .items.getById(itemId)
          .update({ IsActive: isActive }),
      { circuitKey: LIST_APPROVAL_DELEGATIONS }
    );
  }

  public async getLicenseCosts(): Promise<ILicenseCost[]> {
    const items: { Title: string; MonthlyCost: number; Currency: string }[] = await sharePointRetry(
      () => this._sp.web.lists.getByTitle(LIST_LICENSE_COST_TABLE).items.select('Title', 'MonthlyCost', 'Currency').top(500)(),
      { circuitKey: LIST_LICENSE_COST_TABLE }
    );
    return items.map((i) => ({ skuPartNumber: i.Title, monthlyCost: i.MonthlyCost, currency: i.Currency }));
  }

  public async getTeamsCatalog(): Promise<ITeamsCatalogItem[]> {
    const items: { Id: number; Title: string; TeamId: string; Category: string | null; DefaultRole: string | null }[] =
      await sharePointRetry(
        () =>
          this._sp.web.lists
            .getByTitle(LIST_TEAMS_CATALOG)
            .items.select('Id', 'Title', 'TeamId', 'Category', 'DefaultRole')
            .top(500)(),
        { circuitKey: LIST_TEAMS_CATALOG }
      );
    return items.map((i) => ({
      itemId: i.Id,
      title: i.Title,
      teamId: i.TeamId,
      category: i.Category ?? '',
      defaultRole: i.DefaultRole === 'owner' ? 'owner' : 'member'
    }));
  }

  public async getSiteCatalog(): Promise<ISiteCatalogItem[]> {
    const items: {
      Id: number;
      Title: string;
      SiteUrl: string;
      BusinessOwner?: { Title: string } | null;
      Category: string | null;
    }[] = await sharePointRetry(
      () =>
        this._sp.web.lists
          .getByTitle(LIST_SITE_CATALOG)
          .items.select('Id', 'Title', 'SiteUrl', 'BusinessOwner/Title', 'Category')
          .expand('BusinessOwner')
          .top(500)(),
      { circuitKey: LIST_SITE_CATALOG }
    );
    return items.map((i) => ({
      itemId: i.Id,
      title: i.Title,
      siteUrl: i.SiteUrl,
      businessOwner: i.BusinessOwner?.Title ?? null,
      category: i.Category ?? ''
    }));
  }

  public async getApplicationCatalog(): Promise<IApplicationCatalogItem[]> {
    const items: {
      Id: number;
      Title: string;
      Owner?: { Title: string } | null;
      ProvisioningType: string | null;
      TargetGroupId: string | null;
      ApprovalRequired: boolean | null;
      Instructions: string | null;
      IsActive: boolean | null;
    }[] = await sharePointRetry(
      () =>
        this._sp.web.lists
          .getByTitle(LIST_APPLICATION_CATALOG)
          .items.select(
            'Id',
            'Title',
            'Owner/Title',
            'ProvisioningType',
            'TargetGroupId',
            'ApprovalRequired',
            'Instructions',
            'IsActive'
          )
          .expand('Owner')
          .filter('IsActive eq 1')
          .top(500)(),
      { circuitKey: LIST_APPLICATION_CATALOG }
    );
    return items.map((i) => ({
      itemId: i.Id,
      title: i.Title,
      owner: i.Owner?.Title ?? null,
      provisioningType: (i.ProvisioningType === 'GroupBased' ? 'GroupBased' : 'Manual') as ApplicationProvisioningType,
      targetGroupId: i.TargetGroupId,
      approvalRequired: !!i.ApprovalRequired,
      instructions: i.Instructions ?? '',
      isActive: i.IsActive !== false
    }));
  }

  // ---------------------------------------------------------------- Catalog management
  // The read paths above are tuned for the wizards (active rows only). The
  // Catalogs tab needs every row, including deactivated ones, so it gets its
  // own unfiltered reader.

  public async getApplicationCatalogAll(): Promise<IApplicationCatalogItem[]> {
    const items: {
      Id: number;
      Title: string;
      Owner?: { Title: string } | null;
      ProvisioningType: string | null;
      TargetGroupId: string | null;
      ApprovalRequired: boolean | null;
      Instructions: string | null;
      IsActive: boolean | null;
    }[] = await sharePointRetry(
      () =>
        this._sp.web.lists
          .getByTitle(LIST_APPLICATION_CATALOG)
          .items.select(
            'Id',
            'Title',
            'Owner/Title',
            'ProvisioningType',
            'TargetGroupId',
            'ApprovalRequired',
            'Instructions',
            'IsActive'
          )
          .expand('Owner')
          .top(500)(),
      { circuitKey: LIST_APPLICATION_CATALOG }
    );
    return items.map((i) => ({
      itemId: i.Id,
      title: i.Title,
      owner: i.Owner?.Title ?? null,
      provisioningType: (i.ProvisioningType === 'GroupBased' ? 'GroupBased' : 'Manual') as ApplicationProvisioningType,
      targetGroupId: i.TargetGroupId,
      approvalRequired: !!i.ApprovalRequired,
      instructions: i.Instructions ?? '',
      isActive: i.IsActive !== false
    }));
  }

  public async getLicenseCostsForManagement(): Promise<ILicenseCostItem[]> {
    const items: { Id: number; Title: string; MonthlyCost: number; Currency: string }[] = await sharePointRetry(
      () =>
        this._sp.web.lists
          .getByTitle(LIST_LICENSE_COST_TABLE)
          .items.select('Id', 'Title', 'MonthlyCost', 'Currency')
          .top(500)(),
      { circuitKey: LIST_LICENSE_COST_TABLE }
    );
    return items.map((i) => ({
      itemId: i.Id,
      skuPartNumber: i.Title,
      monthlyCost: i.MonthlyCost ?? 0,
      currency: i.Currency ?? ''
    }));
  }

  public async saveTeamsCatalogItem(item: Omit<ITeamsCatalogItem, 'itemId'> & { itemId?: number }): Promise<void> {
    const fields: Record<string, unknown> = {
      Title: item.title,
      TeamId: item.teamId,
      Category: item.category,
      DefaultRole: item.defaultRole
    };
    await this._saveCatalogItem(LIST_TEAMS_CATALOG, fields, item.itemId);
  }

  public async saveSiteCatalogItem(item: Omit<ISiteCatalogItem, 'itemId' | 'businessOwner'> & { itemId?: number }): Promise<void> {
    const fields: Record<string, unknown> = {
      Title: item.title,
      SiteUrl: item.siteUrl,
      Category: item.category
    };
    await this._saveCatalogItem(LIST_SITE_CATALOG, fields, item.itemId);
  }

  public async saveApplicationCatalogItem(
    item: Omit<IApplicationCatalogItem, 'itemId' | 'owner'> & { itemId?: number }
  ): Promise<void> {
    const fields: Record<string, unknown> = {
      Title: item.title,
      ProvisioningType: item.provisioningType,
      TargetGroupId: item.targetGroupId ?? '',
      ApprovalRequired: item.approvalRequired,
      Instructions: item.instructions,
      IsActive: item.isActive
    };
    await this._saveCatalogItem(LIST_APPLICATION_CATALOG, fields, item.itemId);
  }

  public async saveLicenseCostItem(item: Omit<ILicenseCostItem, 'itemId'> & { itemId?: number }): Promise<void> {
    const fields: Record<string, unknown> = {
      Title: item.skuPartNumber,
      MonthlyCost: item.monthlyCost,
      Currency: item.currency
    };
    await this._saveCatalogItem(LIST_LICENSE_COST_TABLE, fields, item.itemId);
  }

  public async deleteCatalogItem(listTitle: string, itemId: number): Promise<void> {
    await sharePointRetry(() => this._sp.web.lists.getByTitle(listTitle).items.getById(itemId).delete(), {
      idempotent: false,
      circuitKey: listTitle
    });
  }

  private async _saveCatalogItem(
    listTitle: string,
    fields: Record<string, unknown>,
    itemId?: number
  ): Promise<void> {
    await sharePointRetry(
      async () => {
        const list = this._sp.web.lists.getByTitle(listTitle);
        if (itemId === undefined) {
          await list.items.add(fields);
        } else {
          await list.items.getById(itemId).update(fields);
        }
      },
      { idempotent: false, circuitKey: listTitle }
    );
  }

  public async getActiveTemplates(): Promise<ITemplateListItem[]> {
    const items: { Id: number; Title: string; TemplateJson: string; IsActive: boolean; Version: number }[] =
      await sharePointRetry(
        () =>
          this._sp.web.lists
            .getByTitle(LIST_DEPARTMENT_TEMPLATES)
            .items.select('Id', 'Title', 'TemplateJson', 'IsActive', 'Version')
            .filter('IsActive eq 1')
            .top(200)(),
        { circuitKey: LIST_DEPARTMENT_TEMPLATES }
      );
    const templates: ITemplateListItem[] = [];
    for (const i of items) {
      try {
        templates.push({
          itemId: i.Id,
          title: i.Title,
          template: JSON.parse(i.TemplateJson),
          isActive: i.IsActive,
          version: i.Version
        });
      } catch (parseErr) {
        void parseErr;
      }
    }
    return templates;
  }

  public async getAllTemplates(): Promise<ITemplateListItem[]> {
    const items: { Id: number; Title: string; TemplateJson: string; IsActive: boolean; Version: number }[] =
      await sharePointRetry(
        () =>
          this._sp.web.lists
            .getByTitle(LIST_DEPARTMENT_TEMPLATES)
            .items.select('Id', 'Title', 'TemplateJson', 'IsActive', 'Version')
            .top(200)(),
        { circuitKey: LIST_DEPARTMENT_TEMPLATES }
      );
    return items.map((i) => {
      let template: IDepartmentTemplate;
      try {
        template = JSON.parse(i.TemplateJson) as IDepartmentTemplate;
      } catch {
        this._telemetry?.trackEvent('data.parseFailure', { list: 'UPC_DepartmentTemplates', field: 'TemplateJson', itemId: i.Id }, 'warning');
        template = {
          department: '',
          licenses: [],
          securityGroups: [],
          m365Groups: [],
          teams: [],
          sharePointSites: [],
          applications: [],
          approverGroupId: null,
          expirationPolicyDays: null,
          usageLocationDefault: ''
        };
      }
      template.approverGroupId = template.approverGroupId ?? null;
      return { itemId: i.Id, title: i.Title, template, isActive: i.IsActive, version: i.Version };
    });
  }

  public async createTemplate(title: string, template: IDepartmentTemplate): Promise<number> {
    const result = await sharePointRetry(
      () =>
        this._sp.web.lists.getByTitle(LIST_DEPARTMENT_TEMPLATES).items.add({
          Title: title,
          TemplateJson: JSON.stringify(template),
          IsActive: true,
          Version: 1
        }),
      { idempotent: false, circuitKey: LIST_DEPARTMENT_TEMPLATES }
    );
    return (result as { Id: number }).Id;
  }

  public async updateTemplate(itemId: number, title: string, template: IDepartmentTemplate, currentVersion: number): Promise<void> {
    await sharePointRetry(
      () =>
        this._sp.web.lists
          .getByTitle(LIST_DEPARTMENT_TEMPLATES)
          .items.getById(itemId)
          .update({ Title: title, TemplateJson: JSON.stringify(template), Version: currentVersion + 1 }),
      { circuitKey: LIST_DEPARTMENT_TEMPLATES }
    );
  }

  public async setTemplateActive(itemId: number, isActive: boolean): Promise<void> {
    await sharePointRetry(
      () => this._sp.web.lists.getByTitle(LIST_DEPARTMENT_TEMPLATES).items.getById(itemId).update({ IsActive: isActive }),
      { circuitKey: LIST_DEPARTMENT_TEMPLATES }
    );
  }

  public async getAppSettings(): Promise<Partial<IAppSettings>> {
    const items: { Id: number; SettingsJson: string | null }[] = await sharePointRetry(
      () => this._sp.web.lists.getByTitle(LIST_SETTINGS).items.select('Id', 'SettingsJson').filter("Title eq 'app'").top(1)(),
      { circuitKey: LIST_SETTINGS }
    );
    if (items.length === 0) {
      return {};
    }
    try {
      return JSON.parse(items[0].SettingsJson ?? '{}') as Partial<IAppSettings>;
    } catch {
      this._telemetry?.trackEvent('data.parseFailure', { list: 'UPC_Settings', field: 'SettingsJson', itemId: items[0].Id }, 'warning');
      return {};
    }
  }

  public async saveAppSettings(settings: IAppSettings): Promise<void> {
    await sharePointRetry(
      async () => {
        const list = this._sp.web.lists.getByTitle(LIST_SETTINGS);
        const items: { Id: number }[] = await list.items.select('Id').filter("Title eq 'app'").top(1)();
        const payload = { Title: 'app', SettingsJson: JSON.stringify(settings) };
        if (items.length > 0) {
          await list.items.getById(items[0].Id).update(payload);
        } else {
          await list.items.add(payload);
        }
      },
      { circuitKey: LIST_SETTINGS }
    );
  }

  public async getTasks(top: number = 500): Promise<IServiceDeskTask[]> {
    const page = await this.getTasksPaged(top);
    return page.items;
  }

  public async getTasksPaged(top: number = 500): Promise<IPagedResult<IServiceDeskTask>> {
    const query = this._sp.web.lists
      .getByTitle(LIST_TASKS)
      .items.select('Id', 'Title', 'JobId', 'TaskType', 'Instructions', 'Status', 'CompletedBy', 'CompletedUtc', 'AssignedTo/Title')
      .expand('AssignedTo')
      .orderBy('Id', false)
      .top(top) as unknown as AsyncIterable<
      {
        Id: number;
        Title: string;
        JobId: string | null;
        TaskType: TaskType;
        Instructions: string | null;
        Status: TaskStatus;
        CompletedBy: string | null;
        CompletedUtc: string | null;
        AssignedTo?: { Title: string } | null;
      }[]
    >;
    const toTask = (i: {
      Id: number;
      Title: string;
      JobId: string | null;
      TaskType: TaskType;
      Instructions: string | null;
      Status: TaskStatus;
      CompletedBy: string | null;
      CompletedUtc: string | null;
      AssignedTo?: { Title: string } | null;
    }): IServiceDeskTask => ({
      itemId: i.Id,
      title: i.Title,
      jobId: i.JobId ?? '',
      taskType: i.TaskType,
      instructions: i.Instructions ?? '',
      assignedTo: i.AssignedTo?.Title ?? null,
      status: i.Status,
      completedBy: i.CompletedBy ?? null,
      completedUtc: i.CompletedUtc ?? null
    });
    const page = await fetchPaged(query, top, (action) => sharePointRetry(action, { circuitKey: LIST_TASKS }));
    return {
      items: page.items.map(toTask),
      truncated: page.truncated,
      next: page.next
        ? async () => {
            const nextPage = await page.next!();
            return { items: nextPage.items.map(toTask), truncated: nextPage.truncated };
          }
        : undefined
    };
  }

  public async completeTask(itemId: number): Promise<void> {
    const me = await this._me();
    await sharePointRetry(
      () =>
        this._sp.web.lists
          .getByTitle(LIST_TASKS)
          .items.getById(itemId)
          .update({ Status: 'Done', CompletedBy: me.Title, CompletedUtc: new Date().toISOString() }),
      { circuitKey: LIST_TASKS }
    );
  }

  public async createTask(jobId: string, taskType: TaskType, title: string, instructions: string): Promise<void> {
    await sharePointRetry(
      () =>
        this._sp.web.lists.getByTitle(LIST_TASKS).items.add({
          Title: title,
          JobId: jobId,
          TaskType: taskType,
          Instructions: instructions,
          Status: 'Open'
        }),
      { idempotent: false, circuitKey: LIST_TASKS }
    );
  }

  public async probeWriteAccess(): Promise<boolean> {
    return sharePointRetry(
      () => this._sp.web.lists.getByTitle(LIST_TASKS).currentUserHasPermissions(PermissionKind.AddListItems),
      { circuitKey: LIST_TASKS }
    );
  }

  public async canManageWeb(): Promise<boolean> {
    try {
      return await sharePointRetry(
        () => this._sp.web.currentUserHasPermissions(PermissionKind.ManageWeb),
        { circuitKey: 'sharepoint:permissions', maxAttempts: 2 }
      );
    } catch {
      return false;
    }
  }

  public async validateSchema(): Promise<ISchemaValidationResult> {
    const results: (ISchemaGap | undefined)[] = await Promise.all(
      UPC_LIST_DEFINITIONS.map(async (definition) => {
        try {
          const fields: { InternalName: string }[] = await sharePointRetry(
            () => this._sp.web.lists.getByTitle(definition.title).fields.select('InternalName').top(500)(),
            { circuitKey: definition.title, maxAttempts: 2 }
          );
          const present: Set<string> = new Set(fields.map((f) => f.InternalName));
          const missingFields: string[] = definition.fields
            .map((f) => f.name)
            .filter((name) => !present.has(name));
          if (missingFields.length === 0) {
            return undefined;
          }
          return { list: definition.title, missingList: false, missingFields, error: '' };
        } catch (err) {
          const status: number =
            typeof err === 'object' && err !== null && 'status' in err
              ? Number((err as { status: unknown }).status)
              : 0;
          return {
            list: definition.title,
            missingList: status === 404,
            missingFields: [],
            error: err instanceof Error ? err.message : String(err)
          };
        }
      })
    );
    return {
      gaps: results.filter((g): g is ISchemaGap => g !== undefined),
      checkedLists: UPC_LIST_DEFINITIONS.length
    };
  }
}
