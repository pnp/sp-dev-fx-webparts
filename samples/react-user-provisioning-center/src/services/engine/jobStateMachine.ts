import type { JobStatus } from '../../models';

const TRANSITIONS: Record<JobStatus, JobStatus[]> = {
  PendingApproval: ['Approved', 'Rejected', 'Cancelled'],
  Approved: ['Scheduled', 'Running', 'Cancelled'],
  Scheduled: ['Running', 'Cancelled'],
  Running: ['Completed', 'PartiallyFailed', 'Failed', 'Cancelled'],
  PartiallyFailed: ['Running', 'Completed', 'Cancelled'],
  Failed: ['Running', 'Cancelled'],
  Completed: [],
  Cancelled: [],
  Rejected: []
};

const STARTABLE: JobStatus[] = ['Approved', 'Scheduled', 'Running', 'PartiallyFailed', 'Failed'];

export function canTransition(from: JobStatus, to: JobStatus): boolean {
  return (TRANSITIONS[from] ?? []).indexOf(to) !== -1;
}

export function assertTransition(from: JobStatus, to: JobStatus): void {
  if (!canTransition(from, to)) {
    throw new Error(`Invalid job transition ${from} -> ${to}`);
  }
}

export function canStartJob(status: JobStatus): boolean {
  return STARTABLE.indexOf(status) !== -1;
}

export function isTerminal(status: JobStatus): boolean {
  return (TRANSITIONS[status] ?? []).length === 0;
}
