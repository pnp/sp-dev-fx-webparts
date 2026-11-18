import type { GraphService } from '../graph/GraphService';
import type { SharePointDataService, ICreateJobInput } from '../sharePointData/SharePointDataService';
import type { AuditService } from '../audit/AuditService';
import type { NamingPolicyService } from '../namingPolicy/NamingPolicyService';
import type { UserService } from '../users/UserService';
import type { SiteAccessService } from '../sites/SiteAccessService';
import type { TelemetryService } from '../telemetry/TelemetryService';
import { GraphServiceError, RequestAbortedError } from '../graph/GraphError';
import type { IAuthorizationService } from './IAuthorizationService';
import { AuthorizationError } from './AuthorizationError';
import { generateTempPassword } from '../passwords/passwordGenerator';
import { newGuid } from '../util/guid';
import * as strings from 'UpcStrings';
import type {
  AppPermission,
  IAppSettings,
  IApprovalDelegation,
  IDepartmentTemplate,
  IJobNote,
  IJobStep,
  IProvisioningJob,
  JobType
} from '../../models';
import { formatString } from '../util/formatString';
import { DEFAULT_APP_SETTINGS, isOnboardingPayload } from '../../models';
import { assertTransition, canStartJob, isTerminal } from './jobStateMachine';
import { stepsForJobType } from './stepRegistry';
import { StepFailure } from './stepTypes';
import type {
  ICredentialPresentation,
  IJobSecrets,
  IStepContext,
  IWorkflowStepDefinition
} from './stepTypes';
import { delay, targetUserOf } from './stepHelpers';

export interface IEngineDependencies {
  graph: GraphService;
  data: SharePointDataService;
  audit: AuditService;
  naming: NamingPolicyService;
  users: UserService;
  siteAccess: SiteAccessService;
  auth: IAuthorizationService;
  operatorUpn: string;
  operatorDisplayName?: string;
  settings?: IAppSettings;
  telemetry?: TelemetryService;
}

export interface IEngineCallbacks {
  onJobUpdated?: (job: IProvisioningJob) => void;
  presentCredentials?: (credential: ICredentialPresentation) => Promise<void>;
}

export interface IEngineOptions {
  stepBackoffBaseMs?: number;
  cancelPollMinMs?: number;
}

export interface ICreateJobRequest {
  jobType: JobType;
  payload: ICreateJobInput['payload'];
  steps: IJobStep[];
  scheduledFor: string | null;
  batchId?: string;
  initialStatus?: 'PendingApproval' | 'Approved';
}

export interface IRollbackOutcome {
  reverted: string[];
  failed: string[];
}

export interface IApprovalOutcome {
  satisfied: boolean;
  granted: number;
  required: number;
}

export class WorkflowEngine {
  private readonly _deps: IEngineDependencies;
  private readonly _backoffBaseMs: number;
  private readonly _runningItems: Set<number> = new Set();
  private readonly _pendingSkips: Map<number, Set<string>> = new Map();
  private readonly _lastCancelCheck: Map<number, number> = new Map();
  private readonly _cancelPollMinMs: number;
  private _settings: IAppSettings;

  public constructor(deps: IEngineDependencies, options?: IEngineOptions) {
    this._deps = deps;
    this._backoffBaseMs = options?.stepBackoffBaseMs ?? 1000;
    this._cancelPollMinMs = options?.cancelPollMinMs ?? 3000;
    this._settings = deps.settings ?? DEFAULT_APP_SETTINGS;
  }

  public updateSettings(settings: IAppSettings): void {
    this._settings = settings;
  }

  public buildInitialSteps(jobType: JobType = 'Onboard'): IJobStep[] {
    return stepsForJobType(jobType).map((definition) => ({
      stepId: definition.id,
      status: 'pending',
      attempts: 0,
      maxAttempts: definition.maxAttempts,
      lastError: null,
      startedUtc: null,
      completedUtc: null,
      skippable: definition.skippable
    }));
  }

  public isRunning(itemId: number): boolean {
    return this._runningItems.has(itemId);
  }

  public async createJob(request: ICreateJobRequest): Promise<number> {
    await this._deps.auth.require('createJobs');
    const jobId: string = newGuid();
    const input: ICreateJobInput = {
      jobId,
      jobType: request.jobType,
      payload: request.payload,
      steps: request.steps,
      scheduledFor: request.scheduledFor,
      correlationId: newGuid(),
      batchId: request.batchId,
      targetUpn: targetUserOf(request.payload),
      initialStatus: request.initialStatus
    };
    const itemId: number = await this._deps.data.createJob(input);
    if ((request.initialStatus ?? 'PendingApproval') === 'PendingApproval') {
      await this._notifyApprovalPending(input.targetUpn ?? '', request.jobType);
    }
    return itemId;
  }

  /**
   * Best-effort "a job is waiting for you" mail to the address configured in
   * Settings. Never fails the job creation it follows — a bounced notification
   * must not cost the operator the job they just submitted.
   */
  private async _notifyApprovalPending(targetUpn: string, jobType: JobType): Promise<void> {
    const to: string = (this._settings.approvalNotifyUpn ?? '').trim();
    if (!to) {
      return;
    }
    const body = {
      message: {
        subject: formatString(strings.MailApprovalPendingSubject, jobType, targetUpn),
        body: {
          contentType: 'Text',
          content: formatString(
            strings.MailApprovalPendingBody,
            jobType,
            targetUpn,
            this._deps.operatorDisplayName ?? this._deps.operatorUpn
          )
        },
        toRecipients: [{ emailAddress: { address: to } }]
      },
      saveToSentItems: false
    };
    try {
      await this._deps.graph.post<void>('/me/sendMail', body);
    } catch (err) {
      this._deps.telemetry?.trackEvent(
        'engine.approvalNotifyFailed',
        { to, message: err instanceof Error ? err.message : String(err) },
        'warning'
      );
    }
  }

  /**
   * Creates a fresh job carrying the same payload as an existing one, with a
   * new correlation id and a clean step pipeline. Used to re-run something
   * that was cancelled, rejected or rolled back without retyping the wizard.
   */
  public async duplicateJob(itemId: number): Promise<number> {
    await this._deps.auth.require('createJobs');
    const source: IProvisioningJob = await this._deps.data.getJob(itemId);
    return this.createJob({
      jobType: source.jobType,
      payload: source.payload,
      steps: this.buildInitialSteps(source.jobType),
      scheduledFor: null,
      initialStatus: this._settings.requireApproval ? 'PendingApproval' : 'Approved'
    });
  }

  public async addJobNote(itemId: number, text: string): Promise<IJobNote[]> {
    const trimmed: string = text.trim();
    if (!trimmed) {
      throw new Error('A note cannot be empty');
    }
    return this._deps.data.appendJobNote(itemId, this._note(trimmed, 'note'));
  }

  public async rejectJob(itemId: number, reason: string): Promise<void> {
    await this._deps.auth.require('approveJobs');
    const trimmed: string = reason.trim();
    if (!trimmed) {
      throw new Error('A rejection reason is required');
    }
    const job: IProvisioningJob = await this._deps.data.getJob(itemId);
    await this._deps.data.rejectJob(itemId, this._note(trimmed, 'rejection'));
    await this._deps.audit.log({
      jobId: job.jobId,
      action: 'reject-job',
      targetUser: targetUserOf(job.payload),
      graphEndpoint: '',
      requestSummary: JSON.stringify({ reason: trimmed }),
      responseCode: 0,
      durationMs: 0,
      result: 'Success',
      correlationId: job.correlationId
    });
  }

  private _note(text: string, kind: IJobNote['kind']): IJobNote {
    return {
      author: this._deps.operatorDisplayName ?? this._deps.operatorUpn,
      authorUpn: this._deps.operatorUpn,
      timestampUtc: new Date().toISOString(),
      text,
      kind
    };
  }

  private async _withLock<T>(itemId: number, fn: (instanceId: string, initialEtag: string) => Promise<T>): Promise<T> {
    const instanceId: string = newGuid();
    const etag: string = await this._deps.data.acquireJobLock(itemId, instanceId);
    try {
      return await fn(instanceId, etag);
    } finally {
      await this._deps.data.releaseJobLock(itemId, instanceId).catch(() => undefined);
    }
  }

  public async runJob(itemId: number, callbacks?: IEngineCallbacks, signal?: AbortSignal): Promise<IProvisioningJob> {
    if (this._runningItems.has(itemId)) {
      throw new Error(`Job ${itemId} is already running in this session`);
    }
    this._runningItems.add(itemId);
    const started: number = Date.now();
    try {
      await this._deps.auth.require('runJobs');
      return await this._withLock(itemId, async (_instanceId, etag) => {
        const job: IProvisioningJob = await this._execute(itemId, callbacks, signal, etag);
        if (this._deps.telemetry) {
          this._deps.telemetry.trackEvent(
            'engine.runJob.complete',
            { jobId: job.jobId, jobType: job.jobType, status: job.status, durationMs: Date.now() - started },
            job.status === 'Completed' ? 'info' : 'warning'
          );
        }
        return job;
      });
    } catch (err) {
      if (this._deps.telemetry && !(err instanceof RequestAbortedError)) {
        this._deps.telemetry.trackError(err, { jobId: String(itemId), durationMs: Date.now() - started });
      }
      throw err;
    } finally {
      this._runningItems.delete(itemId);
      this._pendingSkips.delete(itemId);
      this._lastCancelCheck.delete(itemId);
    }
  }

  public async retryStep(
    itemId: number,
    stepId: string,
    callbacks?: IEngineCallbacks,
    signal?: AbortSignal
  ): Promise<IProvisioningJob> {
    if (this._runningItems.has(itemId)) {
      throw new Error(`Job ${itemId} is currently running — wait for it to finish before retrying a step`);
    }
    this._runningItems.add(itemId);
    try {
      await this._deps.auth.require('retrySteps');
      return await this._withLock(itemId, async (_instanceId, lockEtag) => {
        const job: IProvisioningJob = await this._deps.data.getJob(itemId);
        const step: IJobStep | undefined = job.steps.filter((s) => s.stepId === stepId)[0];
        if (!step || step.status !== 'failed') {
          throw new Error(`Step ${stepId} is not in a retryable state`);
        }
        step.status = 'pending';
        step.attempts = 0;
        step.lastError = null;
        step.startedUtc = null;
        step.completedUtc = null;
        const etag: string = await this._deps.data.updateJobSteps(itemId, job.steps, lockEtag);
        return await this._execute(itemId, callbacks, signal, etag);
      });
    } finally {
      this._runningItems.delete(itemId);
      this._pendingSkips.delete(itemId);
      this._lastCancelCheck.delete(itemId);
    }
  }

  public async skipStep(
    itemId: number,
    stepId: string,
    callbacks?: IEngineCallbacks,
    signal?: AbortSignal
  ): Promise<IProvisioningJob> {
    await this._deps.auth.require('skipSteps');
    const runningNow: boolean = this._runningItems.has(itemId);

    if (runningNow) {
      const job: IProvisioningJob = await this._deps.data.getJob(itemId);
      const step: IJobStep | undefined = job.steps.filter((s) => s.stepId === stepId)[0];
      if (!step || !step.skippable) {
        throw new Error(`Step ${stepId} is not skippable`);
      }
      const pending: Set<string> = this._pendingSkips.get(itemId) ?? new Set<string>();
      pending.add(stepId);
      this._pendingSkips.set(itemId, pending);
      step.status = 'skipped';
      step.completedUtc = new Date().toISOString();
      await this._deps.data.updateJobSteps(itemId, job.steps);
      await this._deps.audit.log({
        jobId: job.jobId,
        action: `skip-step:${stepId}`,
        targetUser: targetUserOf(job.payload),
        graphEndpoint: '',
        requestSummary: '{}',
        responseCode: 0,
        durationMs: 0,
        result: 'Skipped',
        correlationId: job.correlationId
      });
      return job;
    }

    await this._withLock(itemId, async (_instanceId, lockEtag) => {
      const job: IProvisioningJob = await this._deps.data.getJob(itemId);
      const step: IJobStep | undefined = job.steps.filter((s) => s.stepId === stepId)[0];
      if (!step || !step.skippable) {
        throw new Error(`Step ${stepId} is not skippable`);
      }
      step.status = 'skipped';
      step.completedUtc = new Date().toISOString();
      await this._deps.data.updateJobSteps(itemId, job.steps, lockEtag);
      await this._deps.audit.log({
        jobId: job.jobId,
        action: `skip-step:${stepId}`,
        targetUser: targetUserOf(job.payload),
        graphEndpoint: '',
        requestSummary: '{}',
        responseCode: 0,
        durationMs: 0,
        result: 'Skipped',
        correlationId: job.correlationId
      });
    });
    return this.runJob(itemId, callbacks, signal);
  }

  public async cancelJob(itemId: number): Promise<void> {
    await this._deps.auth.require('cancelJobs');
    const job: IProvisioningJob = await this._deps.data.getJob(itemId);
    assertTransition(job.status, 'Cancelled');
    await this._deps.data.updateJobStatus(itemId, 'Cancelled');
    await this._deps.audit.log({
      jobId: job.jobId,
      action: 'cancel-job',
      targetUser: targetUserOf(job.payload),
      graphEndpoint: '',
      requestSummary: '{}',
      responseCode: 0,
      durationMs: 0,
      result: 'Success',
      correlationId: job.correlationId
    });
  }

  public async approveJob(itemId: number, onBehalfOf?: string): Promise<IApprovalOutcome> {
    await this._deps.auth.require('approveJobs');
    const job: IProvisioningJob = await this._deps.data.getJob(itemId);
    const result = await this._deps.data.recordApproval(
      itemId,
      {
        actor: this._deps.operatorDisplayName ?? this._deps.operatorUpn,
        actorUpn: this._deps.operatorUpn,
        timestampUtc: new Date().toISOString(),
        onBehalfOf
      },
      this._settings.requiredApprovals
    );
    await this._deps.audit.log({
      jobId: job.jobId,
      action: result.satisfied ? 'approve-job' : 'approve-job-partial',
      targetUser: targetUserOf(job.payload),
      graphEndpoint: '',
      requestSummary: JSON.stringify({ granted: result.granted, required: result.required, onBehalfOf: onBehalfOf ?? null }),
      responseCode: 0,
      durationMs: 0,
      result: 'Success',
      correlationId: job.correlationId
    });
    return result;
  }

  public async regenerateCredentials(itemId: number, callbacks?: IEngineCallbacks, signal?: AbortSignal): Promise<void> {
    await this._deps.auth.require('runJobs');
    const job: IProvisioningJob = await this._deps.data.getJob(itemId);
    if (job.status !== 'Completed' && job.status !== 'PartiallyFailed') {
      throw new Error('Credentials can only be regenerated for a completed job');
    }
    if (job.jobType !== 'Onboard' && job.jobType !== 'Clone') {
      throw new Error('Credential regeneration only applies to onboarding and clone jobs');
    }
    if (!isOnboardingPayload(job.payload)) {
      throw new Error('Job payload is not an onboarding payload');
    }
    const payload = job.payload;
    if (payload.identity.accountType === 'guest') {
      throw new Error('Guest invitations have no password or TAP to regenerate');
    }
    if (!job.targetUserId) {
      throw new Error('This job has no target user');
    }
    const userId: string = job.targetUserId;
    const upn: string = payload.identity.userPrincipalName;
    const mode = payload.accountSettings.credentialMode;
    const started: number = Date.now();
    const endpoint: string =
      mode === 'tap' ? `/users/${userId}/authentication/temporaryAccessPassMethods` : `/users/${userId}`;

    try {
      let value: string;
      if (mode === 'tap') {
        const existing: { value: { id: string }[] } = await this._deps.graph.get<{ value: { id: string }[] }>(endpoint, { signal });
        for (const method of existing.value ?? []) {
          await this._deps.graph.delete<void>(`${endpoint}/${method.id}`, { signal });
        }
        const created: { temporaryAccessPass: string } = await this._deps.graph.post<{ temporaryAccessPass: string }>(
          endpoint,
          {},
          { signal }
        );
        value = created.temporaryAccessPass;
      } else {
        value = generateTempPassword();
        const body = { passwordProfile: { password: value, forceChangePasswordNextSignIn: true } };
        await this._deps.graph.patch<void>(endpoint, body, { signal });
      }
      await this._deps.audit.log({
        jobId: job.jobId,
        action: 'regenerate-credentials',
        targetUser: upn,
        graphEndpoint: endpoint,
        requestSummary: JSON.stringify({ mode }),
        responseCode: 200,
        durationMs: Date.now() - started,
        result: 'Success',
        correlationId: job.correlationId
      });
      await callbacks?.presentCredentials?.({ kind: mode, value, userPrincipalName: upn });
    } catch (err) {
      if (err instanceof RequestAbortedError) {
        throw err;
      }
      const graphError: GraphServiceError =
        err instanceof GraphServiceError ? err : new GraphServiceError((err as Error)?.message ?? 'Unknown error', 0, 'UnknownError', '');
      await this._deps.audit.log({
        jobId: job.jobId,
        action: 'regenerate-credentials',
        targetUser: upn,
        graphEndpoint: endpoint,
        requestSummary: JSON.stringify({ mode }),
        responseCode: graphError.statusCode,
        durationMs: Date.now() - started,
        result: 'Failure',
        correlationId: job.correlationId
      });
      throw graphError;
    }
  }

  private async _execute(
    itemId: number,
    callbacks?: IEngineCallbacks,
    signal?: AbortSignal,
    initialEtag?: string
  ): Promise<IProvisioningJob> {
    const job: IProvisioningJob = await this._deps.data.getJob(itemId);
    if (!canStartJob(job.status)) {
      throw new Error(`Job ${job.jobId} cannot start from status ${job.status} — approval is required first`);
    }

    let etag: string = initialEtag ?? '*';
    if (job.status !== 'Running') {
      assertTransition(job.status, 'Running');
      etag = await this._deps.data.updateJobStatus(itemId, 'Running', etag);
      job.status = 'Running';
      callbacks?.onJobUpdated?.(job);
    }

    const pipeline = stepsForJobType(job.jobType);
    const persisted: Map<string, IJobStep> = new Map(job.steps.map((s) => [s.stepId, s]));
    job.steps = pipeline.map(
      (definition) =>
        persisted.get(definition.id) ?? {
          stepId: definition.id,
          status: 'pending',
          attempts: 0,
          maxAttempts: definition.maxAttempts,
          lastError: null,
          startedUtc: null,
          completedUtc: null,
          skippable: definition.skippable
        }
    );

    const secrets: IJobSecrets = {};
    const ctx: IStepContext = {
      graph: this._deps.graph,
      data: this._deps.data,
      audit: this._deps.audit,
      naming: this._deps.naming,
      users: this._deps.users,
      siteAccess: this._deps.siteAccess,
      job,
      secrets,
      signal,
      settings: this._settings,
      presentCredentials: async (credential: ICredentialPresentation): Promise<void> => {
        if (callbacks?.presentCredentials) {
          await callbacks.presentCredentials(credential);
        }
      }
    };

    let blocked: boolean = false;
    let cancelledRemotely: boolean = false;
    for (const definition of pipeline) {
      const state: IJobStep = job.steps.filter((s) => s.stepId === definition.id)[0];
      if (state.status === 'completed' || state.status === 'skipped') {
        continue;
      }
      if (await this._isCancelRequested(itemId)) {
        cancelledRemotely = true;
        break;
      }
      if (state.status === 'failed' && state.attempts >= state.maxAttempts) {
        if (!definition.continueOnFailure) {
          blocked = true;
          break;
        }
        continue;
      }

      try {
        etag = await this._runStepWithRetries(definition, state, ctx, itemId, callbacks, signal, etag);
      } catch (err) {
        if (err instanceof RequestAbortedError) {
          return job;
        }
        throw err;
      }

      if (state.status === 'failed' && !definition.continueOnFailure) {
        blocked = true;
        break;
      }
    }

    if (cancelledRemotely) {
      job.status = 'Cancelled';
      await this._deps.data.updateJobSteps(itemId, job.steps);
      callbacks?.onJobUpdated?.(job);
      if (this._deps.telemetry) {
        this._deps.telemetry.trackEvent(
          'engine.runJob.cancelledRemotely',
          { jobId: job.jobId, jobType: job.jobType },
          'warning'
        );
      }
      return job;
    }

    const anyFailed: boolean = job.steps.some((s) => s.status === 'failed');
    const allDone: boolean = job.steps.every((s) => s.status === 'completed' || s.status === 'skipped');
    let finalStatus: IProvisioningJob['status'];
    if (allDone) {
      finalStatus = 'Completed';
    } else if (blocked && anyFailed) {
      finalStatus = 'Failed';
    } else if (blocked || anyFailed) {
      finalStatus = 'PartiallyFailed';
    } else {
      finalStatus = 'Completed';
    }
    assertTransition(job.status, finalStatus);
    etag = await this._deps.data.updateJobStatus(itemId, finalStatus, etag);
    job.status = finalStatus;
    delete secrets.temporaryPassword;
    delete secrets.temporaryAccessPass;
    callbacks?.onJobUpdated?.(job);
    return job;
  }

  private async _runStepWithRetries(
    definition: IWorkflowStepDefinition,
    state: IJobStep,
    ctx: IStepContext,
    itemId: number,
    callbacks?: IEngineCallbacks,
    signal?: AbortSignal,
    etag?: string
  ): Promise<string> {
    while (state.attempts < state.maxAttempts) {
      state.status = 'running';
      if (!state.startedUtc) {
        state.startedUtc = new Date().toISOString();
      }
      etag = await this._persist(itemId, ctx.job, callbacks, etag);

      try {
        await definition.run(ctx);
        if (this._consumePendingSkip(itemId, definition.id)) {
          state.status = 'skipped';
          state.completedUtc = state.completedUtc ?? new Date().toISOString();
          return etag;
        }
        state.status = 'completed';
        state.completedUtc = new Date().toISOString();
        state.lastError = null;
        etag = await this._persist(itemId, ctx.job, callbacks, etag);
        return etag;
      } catch (err) {
        if (err instanceof RequestAbortedError) {
          const refreshed: IProvisioningJob = await this._deps.data.getJob(itemId);
          const refreshedStep: IJobStep | undefined = refreshed.steps.filter((s) => s.stepId === definition.id)[0];
          this._consumePendingSkip(itemId, definition.id);
          if (refreshedStep && refreshedStep.status === 'skipped') {
            state.status = 'skipped';
            state.completedUtc = refreshedStep.completedUtc;
          } else {
            state.status = 'pending';
          }
          etag = await this._persist(itemId, ctx.job, callbacks, etag);
          throw err;
        }
        if (this._consumePendingSkip(itemId, definition.id)) {
          state.status = 'skipped';
          state.completedUtc = state.completedUtc ?? new Date().toISOString();
          return etag;
        }
        const failure: StepFailure =
          err instanceof StepFailure ? err : new StepFailure((err as Error)?.message ?? 'Unknown error', 'UnknownError', false);
        state.attempts += 1;
        state.status = 'failed';
        state.lastError = { graphCode: failure.graphCode, message: failure.message, retryable: failure.retryable };
        etag = await this._persist(itemId, ctx.job, callbacks, etag);
        if (!failure.retryable || state.attempts >= state.maxAttempts) {
          return etag;
        }
        await delay(this._backoffBaseMs * Math.pow(2, state.attempts - 1), signal);
      }
    }
    return etag ?? '*';
  }

  private async _isCancelRequested(itemId: number): Promise<boolean> {
    const now: number = Date.now();
    const last: number = this._lastCancelCheck.get(itemId) ?? 0;
    if (now - last < this._cancelPollMinMs) {
      return false;
    }
    this._lastCancelCheck.set(itemId, now);
    try {
      return (await this._deps.data.getJobStatus(itemId)) === 'Cancelled';
    } catch {
      return false;
    }
  }

  private _consumePendingSkip(itemId: number, stepId: string): boolean {
    const pending: Set<string> | undefined = this._pendingSkips.get(itemId);
    if (!pending || !pending.has(stepId)) {
      return false;
    }
    pending.delete(stepId);
    if (pending.size === 0) {
      this._pendingSkips.delete(itemId);
    }
    return true;
  }

  private async _persist(itemId: number, job: IProvisioningJob, callbacks?: IEngineCallbacks, etag?: string): Promise<string> {
    const newEtag = await this._deps.data.updateJobSteps(itemId, job.steps, etag);
    callbacks?.onJobUpdated?.(job);
    return newEtag;
  }

  public async rollbackJob(itemId: number, callbacks?: IEngineCallbacks, signal?: AbortSignal): Promise<IRollbackOutcome> {
    if (this._runningItems.has(itemId)) {
      throw new Error(`Job ${itemId} is currently running — wait for it to finish before rolling it back`);
    }
    this._runningItems.add(itemId);
    try {
      await this._deps.auth.require('rollbackJobs');
      return await this._withLock(itemId, async (_instanceId, lockEtag) => {
        const job: IProvisioningJob = await this._deps.data.getJob(itemId);
        if (isTerminal(job.status) && job.status !== 'Completed') {
          throw new Error(`Job ${job.jobId} cannot be rolled back from status ${job.status}`);
        }

        const pipeline: IWorkflowStepDefinition[] = stepsForJobType(job.jobType);
        const byId: Map<string, IWorkflowStepDefinition> = new Map(pipeline.map((d) => [d.id, d]));
        const secrets: IJobSecrets = {};
        const ctx: IStepContext = {
          graph: this._deps.graph,
          data: this._deps.data,
          audit: this._deps.audit,
          naming: this._deps.naming,
          users: this._deps.users,
          siteAccess: this._deps.siteAccess,
          job,
          secrets,
          signal,
          settings: this._settings,
          presentCredentials: async () => undefined
        };

        const reverted: string[] = [];
        const failed: string[] = [];
        const completed: IJobStep[] = job.steps.filter((s) => s.status === 'completed');
        for (let i = completed.length - 1; i >= 0; i--) {
          const state: IJobStep = completed[i];
          const definition: IWorkflowStepDefinition | undefined = byId.get(state.stepId);
          if (!definition?.compensate) {
            continue;
          }
          try {
            await definition.compensate(ctx);
            state.status = 'skipped';
            reverted.push(state.stepId);
          } catch (err) {
            if (err instanceof RequestAbortedError) {
              throw err;
            }
            failed.push(state.stepId);
          }
        }

        const stepsEtag: string = await this._deps.data.updateJobSteps(itemId, job.steps, lockEtag);
        await this._deps.data.updateJobStatus(itemId, 'Cancelled', stepsEtag, { skipTransitionCheck: true });
        job.status = 'Cancelled';
        callbacks?.onJobUpdated?.(job);

        await this._deps.audit.log({
          jobId: job.jobId,
          action: 'rollback-job',
          targetUser: targetUserOf(job.payload),
          graphEndpoint: '',
          requestSummary: JSON.stringify({ reverted, failed }),
          responseCode: 0,
          durationMs: 0,
          result: failed.length === 0 ? 'Success' : 'Failure',
          correlationId: job.correlationId
        });

        return { reverted, failed };
      });
    } finally {
      this._runningItems.delete(itemId);
      this._pendingSkips.delete(itemId);
      this._lastCancelCheck.delete(itemId);
    }
  }

  public async completeTask(itemId: number): Promise<void> {
    await this._deps.auth.require('manageTasks');
    await this._deps.data.completeTask(itemId);
  }

  public async createTemplate(title: string, template: IDepartmentTemplate): Promise<number> {
    await this._deps.auth.require('manageTemplates');
    return this._deps.data.createTemplate(title, template);
  }

  public async updateTemplate(
    itemId: number,
    title: string,
    template: IDepartmentTemplate,
    currentVersion: number
  ): Promise<void> {
    await this._deps.auth.require('manageTemplates');
    await this._deps.data.updateTemplate(itemId, title, template, currentVersion);
  }

  public async setTemplateActive(itemId: number, isActive: boolean): Promise<void> {
    await this._deps.auth.require('manageTemplates');
    await this._deps.data.setTemplateActive(itemId, isActive);
  }

  public async saveAppSettings(settings: IAppSettings): Promise<void> {
    await this._deps.auth.require('manageSettings');
    await this._deps.data.saveAppSettings(settings);
    this._settings = settings;
  }

  public async updateRoleDefinition(
    itemId: number,
    memberGroupId: string,
    permissions: AppPermission[]
  ): Promise<void> {
    await this._deps.auth.require('manageSettings');
    await this._deps.data.updateRoleDefinition(itemId, memberGroupId, permissions);
  }

  public async createDelegation(delegation: Omit<IApprovalDelegation, 'itemId'>): Promise<number> {
    await this._requireDelegationRights(delegation.delegatorUpn);
    return this._deps.data.createDelegation(delegation);
  }

  public async revokeDelegation(itemId: number): Promise<void> {
    const delegations: IApprovalDelegation[] = await this._deps.data.getAllDelegations();
    const target: IApprovalDelegation | undefined = delegations.filter((d) => d.itemId === itemId)[0];
    await this._requireDelegationRights(target?.delegatorUpn ?? '');
    await this._deps.data.setDelegationActive(itemId, false);
  }

  private async _requireDelegationRights(delegatorUpn: string): Promise<void> {
    const canManageAll: boolean = await this._deps.auth.has('manageDelegations');
    if (canManageAll) {
      return;
    }
    const isSelf: boolean =
      !!delegatorUpn && delegatorUpn.toLowerCase() === this._deps.operatorUpn.toLowerCase();
    if (!isSelf) {
      throw new AuthorizationError('manageDelegations');
    }
    await this._deps.auth.require('approveJobs');
  }
}
