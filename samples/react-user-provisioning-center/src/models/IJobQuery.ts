import type { JobStatus, JobType } from './IJob';

export interface IJobQuery {
  search?: string;
  status?: JobStatus[];
  jobType?: JobType[];
  createdFromUtc?: string;
  createdToUtc?: string;
  requestedBy?: string;
  batchId?: string;
  top?: number;
}

export interface IJobSummary {
  itemId: number;
  jobId: string;
  jobType: JobType;
  status: JobStatus;
  targetUpn: string;
  scheduledFor: string | null;
  requestedBy: string | null;
  approvedBy: string | null;
  correlationId: string;
  batchId: string;
  createdUtc: string | null;
  modifiedUtc: string | null;
  runningSince: string | null;
}

export const JOB_STALE_AFTER_MS: number = 10 * 60 * 1000;

export function isJobStalled(
  job: Pick<IJobSummary, 'status' | 'runningSince'>,
  nowMs: number = Date.now(),
  staleAfterMs: number = JOB_STALE_AFTER_MS
): boolean {
  if (job.status !== 'Running' || !job.runningSince) {
    return false;
  }
  const since: number = new Date(job.runningSince).getTime();
  if (isNaN(since)) {
    return false;
  }
  return nowMs - since > staleAfterMs;
}

export function isEmptyJobQuery(query: IJobQuery | undefined): boolean {
  if (!query) {
    return true;
  }
  return (
    !query.search?.trim() &&
    (query.status ?? []).length === 0 &&
    (query.jobType ?? []).length === 0 &&
    !query.createdFromUtc &&
    !query.createdToUtc &&
    !query.requestedBy &&
    !query.batchId
  );
}

export interface IBatchSummary {
  batchId: string;
  total: number;
  byStatus: Partial<Record<JobStatus, number>>;
  failedItemIds: number[];
}
