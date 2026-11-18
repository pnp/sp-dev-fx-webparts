import { GraphServiceError, RequestAbortedError } from '../graph/GraphError';
import { summarizeRequest } from '../audit/AuditService';
import { StepFailure, type IStepContext } from './stepTypes';
import type { IJobPayload } from '../../models';

export { delay } from '../util/delay';

export function targetUserOf(payload: IJobPayload): string {
  return payload.kind === 'transfer' ? payload.target.userPrincipalName : payload.identity?.userPrincipalName ?? '';
}

export async function auditedGraphWrite<T>(
  ctx: IStepContext,
  action: string,
  method: string,
  endpoint: string,
  body: unknown,
  call: () => Promise<T>
): Promise<T> {
  const started: number = Date.now();
  try {
    const result: T = await call();
    await ctx.audit.log({
      jobId: ctx.job.jobId,
      action,
      targetUser: targetUserOf(ctx.job.payload),
      graphEndpoint: endpoint,
      requestSummary: summarizeRequest(method, endpoint, body),
      responseCode: 200,
      durationMs: Date.now() - started,
      result: 'Success',
      correlationId: ctx.job.correlationId
    });
    return result;
  } catch (err) {
    if (err instanceof RequestAbortedError) {
      throw err;
    }
    const graphError: GraphServiceError =
      err instanceof GraphServiceError
        ? err
        : new GraphServiceError((err as Error)?.message ?? 'Unknown error', 0, 'UnknownError', '');
    await ctx.audit.log({
      jobId: ctx.job.jobId,
      action,
      targetUser: targetUserOf(ctx.job.payload),
      graphEndpoint: endpoint,
      requestSummary: summarizeRequest(method, endpoint, body),
      responseCode: graphError.statusCode,
      durationMs: Date.now() - started,
      result: 'Failure',
      correlationId: graphError.requestId || ctx.job.correlationId
    });
    throw new StepFailure(graphError.message, graphError.graphCode, graphError.retryable);
  }
}

export async function getOrNull<T>(read: () => Promise<T>): Promise<T | null> {
  try {
    return await read();
  } catch (err) {
    if (err instanceof GraphServiceError && err.statusCode === 404) {
      return null;
    }
    throw err;
  }
}

export async function runFinalizeAudit(ctx: IStepContext): Promise<void> {
  const failed: string[] = ctx.job.steps.filter((s) => s.status === 'failed').map((s) => s.stepId);
  await ctx.audit.log({
    jobId: ctx.job.jobId,
    action: 'job-finalized',
    targetUser: targetUserOf(ctx.job.payload),
    graphEndpoint: '',
    requestSummary: JSON.stringify({ failedSteps: failed }),
    responseCode: 0,
    durationMs: 0,
    result: failed.length === 0 ? 'Success' : 'Failure',
    correlationId: ctx.job.correlationId
  });
}
