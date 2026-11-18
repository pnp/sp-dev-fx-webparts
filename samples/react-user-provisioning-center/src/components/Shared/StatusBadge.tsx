import * as React from 'react';
import { Badge } from '@fluentui/react-components';
import * as strings from 'UpcStrings';
import type { JobStatus, JobType, StepStatus } from '../../models';

type BadgeColor = 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | 'success' | 'warning';

const JOB_STATUS_META: Record<JobStatus, { color: BadgeColor; label: () => string }> = {
  PendingApproval: { color: 'warning', label: () => strings.StatusPendingApproval },
  Approved: { color: 'brand', label: () => strings.StatusApproved },
  Scheduled: { color: 'informative', label: () => strings.StatusScheduled },
  Running: { color: 'brand', label: () => strings.StatusRunning },
  PartiallyFailed: { color: 'severe', label: () => strings.StatusPartiallyFailed },
  Failed: { color: 'danger', label: () => strings.StatusFailed },
  Completed: { color: 'success', label: () => strings.StatusCompleted },
  Cancelled: { color: 'subtle', label: () => strings.StatusCancelled },
  Rejected: { color: 'danger', label: () => strings.JobStatusRejected }
};

const STEP_STATUS_META: Record<StepStatus, { color: BadgeColor; label: () => string }> = {
  pending: { color: 'subtle', label: () => strings.StepStatusPending },
  running: { color: 'brand', label: () => strings.StepStatusRunning },
  completed: { color: 'success', label: () => strings.StepStatusCompleted },
  failed: { color: 'danger', label: () => strings.StepStatusFailed },
  skipped: { color: 'informative', label: () => strings.StepStatusSkipped }
};

const UNKNOWN_JOB_STATUS_META: { color: BadgeColor; label: () => string } = {
  color: 'subtle',
  label: () => ''
};

export function jobStatusLabel(status: JobStatus): string {
  return (JOB_STATUS_META[status] ?? UNKNOWN_JOB_STATUS_META).label();
}

export const JobStatusBadge: React.FC<{ status: JobStatus }> = ({ status }) => {
  const meta = JOB_STATUS_META[status] ?? UNKNOWN_JOB_STATUS_META;
  return (
    <Badge appearance="tint" color={meta.color}>
      {meta.label()}
    </Badge>
  );
};

export const StepStatusBadge: React.FC<{ status: StepStatus }> = ({ status }) => {
  const meta = STEP_STATUS_META[status] ?? STEP_STATUS_META.pending;
  return (
    <Badge appearance="tint" color={meta.color}>
      {meta.label()}
    </Badge>
  );
};

const JOB_TYPE_LABELS: Record<JobType, () => string> = {
  Onboard: () => strings.JobTypeOnboard,
  Offboard: () => strings.JobTypeOffboard,
  Transfer: () => strings.JobTypeTransfer,
  Clone: () => strings.JobTypeClone,
  Bulk: () => strings.JobTypeBulk
};

export function jobTypeLabel(jobType: JobType): string {
  return (JOB_TYPE_LABELS[jobType] ?? (() => jobType))();
}

const STEP_LABELS: Record<string, () => string> = {
  'validate-input': () => strings.StepValidateInput,
  'create-user': () => strings.StepCreateUser,
  'set-usage-location': () => strings.StepSetUsageLocation,
  'assign-manager': () => strings.StepAssignManager,
  'assign-licenses': () => strings.StepAssignLicenses,
  'present-credentials': () => strings.StepPresentCredentials,
  'finalize-audit': () => strings.StepFinalizeAudit,
  'validate-target': () => strings.StepValidateTarget,
  'block-sign-in': () => strings.StepBlockSignIn,
  'remove-licenses': () => strings.StepRemoveLicenses,
  'remove-groups': () => strings.StepRemoveGroups,
  'create-handover-tasks': () => strings.StepCreateHandoverTasks
};

export function stepDisplayName(stepId: string): string {
  return (STEP_LABELS[stepId] ?? (() => stepId))();
}
