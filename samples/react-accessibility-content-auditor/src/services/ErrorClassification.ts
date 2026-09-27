import { AuditErrorKind, IClassifiedError } from '../models/AuditModels';

const statusOf = (error: unknown): number | undefined => {
  if (!error || typeof error !== 'object') return undefined;
  const candidate = error as { status?: number; response?: { status?: number } };
  return candidate.status || candidate.response?.status;
};

export const classifyError = (error: unknown): IClassifiedError => {
  const status = statusOf(error);
  const message = error instanceof Error ? error.message : String(error || 'Unknown error');
  const lower = message.toLowerCase();
  let kind: AuditErrorKind = 'unknown';
  if (status === 401 || status === 403 || /access denied|forbidden|unauthori[sz]ed|permission/.test(lower)) kind = 'accessDenied';
  else if (status === 408 || status === 429 || (status !== undefined && status >= 500)) kind = 'transient';
  else if (/malformed|invalid json|parse error/.test(lower)) kind = 'malformed';
  return { kind, message };
};

export class ContentAuditError extends Error {
  public readonly kind: AuditErrorKind;
  public constructor(classified: IClassifiedError) {
    super(classified.message);
    this.name = 'ContentAuditError';
    this.kind = classified.kind;
  }
}
