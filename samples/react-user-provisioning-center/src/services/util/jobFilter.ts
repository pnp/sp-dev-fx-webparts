import { escapeODataLiteral } from './odata';
import type { IJobQuery, JobStatus, JobType } from '../../models';

export function buildJobFilter(query: IJobQuery | undefined): string {
  if (!query) {
    return '';
  }
  const clauses: string[] = [];
  const search: string = (query.search ?? '').trim();
  if (search) {
    const literal: string = escapeODataLiteral(search);
    clauses.push(`(startswith(TargetUpn,'${literal}') or startswith(Title,'${literal}'))`);
  }
  const statuses: JobStatus[] = (query.status ?? []).filter((s: JobStatus): boolean => !!s);
  if (statuses.length > 0) {
    clauses.push(
      `(${statuses.map((s: JobStatus) => `Status eq '${escapeODataLiteral(s)}'`).join(' or ')})`
    );
  }
  const types: JobType[] = (query.jobType ?? []).filter((t: JobType): boolean => !!t);
  if (types.length > 0) {
    clauses.push(
      `(${types.map((t: JobType) => `JobType eq '${escapeODataLiteral(t)}'`).join(' or ')})`
    );
  }
  if (query.createdFromUtc) {
    const from: string | undefined = toODataDate(query.createdFromUtc);
    if (from) {
      clauses.push(`Created ge datetime'${from}'`);
    }
  }
  if (query.createdToUtc) {
    const to: string | undefined = toODataDate(query.createdToUtc, true);
    if (to) {
      clauses.push(`Created le datetime'${to}'`);
    }
  }
  if (query.batchId?.trim()) {
    clauses.push(`BatchId eq '${escapeODataLiteral(query.batchId.trim())}'`);
  }
  if (query.requestedBy?.trim()) {
    clauses.push(`RequestedBy/Title eq '${escapeODataLiteral(query.requestedBy.trim())}'`);
  }
  return clauses.join(' and ');
}

function toODataDate(value: string, endOfDay: boolean = false): string | undefined {
  const isDateOnly: boolean = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const iso: string = isDateOnly
    ? `${value}T${endOfDay ? '23:59:59.999' : '00:00:00.000'}Z`
    : value;
  const parsed: number = Date.parse(iso);
  if (isNaN(parsed)) {
    return undefined;
  }
  return new Date(parsed).toISOString();
}
