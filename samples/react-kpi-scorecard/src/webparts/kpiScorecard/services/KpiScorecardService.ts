import type { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFx, type SPFI } from '@pnp/sp';
import '@pnp/sp/items';
import '@pnp/sp/lists';
import '@pnp/sp/webs';
import type { IKpiObservation, KpiLoadErrorKind } from '../models/IKpiScorecard';
import { normalizeDate, normalizeNumber, normalizeText, mapKpiCards } from '../utils/kpiUtils';
import type { IKpiCard } from '../models/IKpiScorecard';

export const MAX_QUERY_ITEMS = 100;
const INTERNAL_NAME_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export interface IKpiScorecardConfig {
  readonly listTitle: string;
  readonly rootPath: string;
  readonly titleField: string;
  readonly valueField: string;
  readonly targetField: string;
  readonly statusField: string;
  readonly dateField: string;
  readonly dateFilter: string;
}

export interface IKpiQuery {
  readonly fields: ReadonlyArray<string>;
  readonly filter?: string;
  readonly top: number;
}

export class KpiDataError extends Error {
  public constructor(public readonly kind: KpiLoadErrorKind, message: string) {
    super(message);
    this.name = 'KpiDataError';
  }
}

export function validateInternalName(value: string, required: boolean): string | undefined {
  const trimmed = value.trim();
  if (!trimmed && !required) {
    return undefined;
  }
  return INTERNAL_NAME_PATTERN.test(trimmed) ? trimmed : undefined;
}

export function validateRootPath(rootPath: string): boolean {
  const value = rootPath.trim();
  if (!value) {
    return true;
  }
  let decoded: string;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    return false;
  }
  return decoded.startsWith('/')
    && !decoded.startsWith('//')
    && !/[?#\\]/.test(decoded)
    && !decoded.split('/').some((part) => part === '..' || part === '.');
}

export function validateDateFilter(dateFilter: string): boolean {
  if (!dateFilter.trim()) {
    return true;
  }
  if (!ISO_DATE_PATTERN.test(dateFilter.trim())) {
    return false;
  }
  const [year, month, day] = dateFilter.trim().split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function validateConfig(config: IKpiScorecardConfig): ReadonlyArray<string> {
  const errors: string[] = [];
  if (!config.listTitle.trim()) {
    errors.push('Set a SharePoint list title.');
  }
  if (!validateRootPath(config.rootPath)) {
    errors.push('Root path must be a site-relative path without a URL, query, or parent traversal.');
  }
  (['titleField', 'valueField', 'targetField', 'statusField'] as const).forEach((key) => {
    if (!validateInternalName(config[key], true)) {
      errors.push(`${key} must be a valid SharePoint internal field name.`);
    }
  });
  if (config.dateField.trim() && !validateInternalName(config.dateField, false)) {
    errors.push('dateField must be a valid SharePoint internal field name when supplied.');
  }
  if (!validateDateFilter(config.dateFilter)) {
    errors.push('Date filter must use the YYYY-MM-DD format and be a real calendar date.');
  }
  if (config.dateFilter.trim() && !config.dateField.trim()) {
    errors.push('Set a date field before using a date filter.');
  }
  return errors;
}

function escapeODataLiteral(value: string): string {
  return value.replace(/'/g, "''");
}

export function buildKpiQuery(config: IKpiScorecardConfig): IKpiQuery {
  const errors = validateConfig(config);
  if (errors.length) {
    throw new Error(errors.join(' '));
  }

  const fields = Array.from(new Set([
    'Id',
    config.titleField.trim(),
    config.valueField.trim(),
    config.targetField.trim(),
    config.statusField.trim(),
    config.dateField.trim()
  ].filter(Boolean)));
  const filter = config.dateFilter.trim()
    ? `${config.dateField.trim()} ge datetime'${escapeODataLiteral(`${config.dateFilter.trim()}T00:00:00Z`)}'`
    : undefined;
  return { fields, filter, top: MAX_QUERY_ITEMS };
}

export function resolveRootWebUrl(rootPath: string, currentWebUrl: string): string {
  if (!validateRootPath(rootPath)) {
    throw new Error('The root path is not safe.');
  }
  const current = new URL(currentWebUrl);
  const path = rootPath.trim() || new URL(currentWebUrl).pathname;
  const resolved = new URL(path, current.origin);
  if (resolved.origin !== current.origin) {
    throw new Error('The root path must use the current SharePoint origin.');
  }
  return resolved.toString().replace(/\/$/, '');
}

function mapObservation(item: Record<string, unknown>, config: IKpiScorecardConfig): IKpiObservation | undefined {
  const id = normalizeNumber(item.Id);
  const title = normalizeText(item[config.titleField.trim()]);
  if (id === undefined || !Number.isInteger(id) || id < 1 || !title) {
    return undefined;
  }
  return {
    id,
    title,
    value: normalizeNumber(item[config.valueField.trim()]),
    target: normalizeNumber(item[config.targetField.trim()]),
    status: normalizeText(item[config.statusField.trim()]),
    date: config.dateField.trim() ? normalizeDate(item[config.dateField.trim()]) : undefined
  };
}

export function mapRawKpiItems(items: ReadonlyArray<Record<string, unknown>>, config: IKpiScorecardConfig): IKpiCard[] {
  return mapKpiCards(items
    .map((item) => mapObservation(item, config))
    .filter((item): item is IKpiObservation => !!item));
}

function errorStatus(error: unknown): number | undefined {
  if (!error || typeof error !== 'object') {
    return undefined;
  }
  const record = error as Record<string, unknown>;
  const status = record.status ?? record.statusCode;
  return typeof status === 'number' ? status : Number(status);
}

export function classifyKpiError(error: unknown): KpiDataError {
  if (error instanceof KpiDataError) {
    return error;
  }
  const status = errorStatus(error);
  if (status === 401 || status === 403) {
    return new KpiDataError('accessDenied', 'SharePoint denied access to the configured KPI source.');
  }
  if (status === 404) {
    return new KpiDataError('notFound', 'The configured KPI web or list was not found.');
  }
  if (status === 429 || status === 503) {
    return new KpiDataError('throttled', 'SharePoint is temporarily throttling the KPI request.');
  }
  return new KpiDataError('generic', 'The KPI source could not be loaded.');
}

export class KpiScorecardService {
  private readonly sp: SPFI;

  public constructor(context: WebPartContext, rootPath: string) {
    const rootUrl = resolveRootWebUrl(rootPath, context.pageContext.web.absoluteUrl);
    this.sp = spfi(rootUrl).using(SPFx(context));
  }

  public async getCards(config: IKpiScorecardConfig): Promise<IKpiCard[]> {
    const query = buildKpiQuery(config);
    try {
      let request = this.sp.web.lists.getByTitle(config.listTitle.trim()).items.select(...Array.from(query.fields)).top(query.top);
      if (query.filter) {
        request = request.filter(query.filter);
      }
      const items = await request();
      return mapRawKpiItems(items as Array<Record<string, unknown>>, config);
    } catch (error) {
      throw classifyKpiError(error);
    }
  }
}
