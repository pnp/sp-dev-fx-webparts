import type { IOnboardingPayload } from './IOnboardingPayload';
import type { IOffboardingPayload } from './IOffboardingPayload';
import type { ITransferPayload } from './ITransferPayload';
import type { IApprovalRecord } from './IApproval';

export type JobType = 'Onboard' | 'Offboard' | 'Transfer' | 'Clone' | 'Bulk';

export type IJobPayload = IOnboardingPayload | IOffboardingPayload | ITransferPayload;

export function isOffboardingPayload(payload: IJobPayload): payload is IOffboardingPayload {
  return payload.kind === 'offboard';
}

export function isOnboardingPayload(payload: IJobPayload): payload is IOnboardingPayload {
  return payload.kind === 'onboard';
}

export function isTransferPayload(payload: IJobPayload): payload is ITransferPayload {
  return payload.kind === 'transfer';
}

export type JobStatus =
  | 'PendingApproval'
  | 'Approved'
  | 'Scheduled'
  | 'Running'
  | 'PartiallyFailed'
  | 'Failed'
  | 'Completed'
  | 'Cancelled'
  | 'Rejected';

export type JobNoteKind = 'note' | 'rejection';

export interface IJobNote {
  author: string;
  authorUpn: string;
  timestampUtc: string;
  text: string;
  kind: JobNoteKind;
}

export type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

export interface IStepError {
  graphCode: string;
  message: string;
  retryable: boolean;
}

export interface IJobStep {
  stepId: string;
  status: StepStatus;
  attempts: number;
  maxAttempts: number;
  lastError: IStepError | null;
  startedUtc: string | null;
  completedUtc: string | null;
  skippable: boolean;
}

export interface IProvisioningJob {
  itemId: number;
  jobId: string;
  jobType: JobType;
  status: JobStatus;
  payload: IJobPayload;
  steps: IJobStep[];
  approvals: IApprovalRecord[];
  notes: IJobNote[];
  scheduledFor: string | null;
  requestedBy: string | null;
  approvedBy: string | null;
  correlationId: string;
  batchId: string;
  targetUpn: string;
  targetUserId: string | null;
  createdUtc: string | null;
  modifiedUtc: string | null;
  runningSince: string | null;
}
