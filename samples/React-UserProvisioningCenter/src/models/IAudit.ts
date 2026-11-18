export type AuditResult = 'Success' | 'Failure' | 'Skipped';

export interface IAuditEntry {
  entryId: string;
  jobId: string;
  actor: string;
  action: string;
  targetUser: string;
  graphEndpoint: string;
  requestSummary: string;
  responseCode: number;
  durationMs: number;
  result: AuditResult;
  correlationId: string;
  timestampUtc: string;
}

export type IAuditInput = Omit<IAuditEntry, 'entryId' | 'timestampUtc' | 'actor'>;
