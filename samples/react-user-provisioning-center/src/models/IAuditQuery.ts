import type { AuditResult } from './IAudit';

export interface IAuditQuery {
  jobId?: string;
  actor?: string;
  targetUser?: string;
  result?: AuditResult[];
  fromUtc?: string;
  toUtc?: string;
  top?: number;
}

export function isEmptyAuditQuery(query: IAuditQuery | undefined): boolean {
  if (!query) {
    return true;
  }
  return (
    !query.jobId?.trim() &&
    !query.actor?.trim() &&
    !query.targetUser?.trim() &&
    (query.result ?? []).length === 0 &&
    !query.fromUtc &&
    !query.toUtc
  );
}
