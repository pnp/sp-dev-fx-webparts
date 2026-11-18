import { escapeODataLiteral } from './odata';
import type { AuditResult, IAuditQuery } from '../../models';

export function buildAuditFilter(query: IAuditQuery | undefined): string {
  if (!query) {
    return '';
  }
  const clauses: string[] = [];

  const jobId: string = (query.jobId ?? '').trim();
  if (jobId) {
    clauses.push(`JobId eq '${escapeODataLiteral(jobId)}'`);
  }

  const actor: string = (query.actor ?? '').trim();
  if (actor) {
    clauses.push(`startswith(Actor,'${escapeODataLiteral(actor)}')`);
  }

  const targetUser: string = (query.targetUser ?? '').trim();
  if (targetUser) {
    clauses.push(`startswith(TargetUser,'${escapeODataLiteral(targetUser)}')`);
  }

  const results: AuditResult[] = (query.result ?? []).filter((r: AuditResult): boolean => !!r);
  if (results.length > 0) {
    clauses.push(`(${results.map((r) => `Result eq '${escapeODataLiteral(r)}'`).join(' or ')})`);
  }

  if (query.fromUtc) {
    const from: string | undefined = toODataDate(query.fromUtc);
    if (from) {
      clauses.push(`TimestampUtc ge datetime'${from}'`);
    }
  }
  if (query.toUtc) {
    const to: string | undefined = toODataDate(query.toUtc, true);
    if (to) {
      clauses.push(`TimestampUtc le datetime'${to}'`);
    }
  }

  return clauses.join(' and ');
}

function toODataDate(value: string, endOfDay: boolean = false): string | undefined {
  const isDateOnly: boolean = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const iso: string = isDateOnly ? `${value}T${endOfDay ? '23:59:59.999' : '00:00:00.000'}Z` : value;
  const parsed: number = Date.parse(iso);
  if (isNaN(parsed)) {
    return undefined;
  }
  return new Date(parsed).toISOString();
}
