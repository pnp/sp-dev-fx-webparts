export interface IPageRow { [key: string]: unknown; Id?: number; Title?: string; FileRef?: string; Created?: string; Modified?: string; PromotedState?: number; Description?: string; CanvasContent1?: string; LayoutWebpartsContent?: string; Author?: { Title?: string }; Editor?: { Title?: string }; File?: { TimeCreated?: string; TimeLastModified?: string }; CheckoutUser?: { Title?: string }; FSObjType?: number; }
export type GovernanceStatus = 'attention' | 'watch' | 'ok';
export interface IPage { id: number; title: string; fileRef: string; modified?: Date; owner: string; editor: string; status: GovernanceStatus; signals: string[]; }
export interface IReviewOptions { referenceDate: Date; oldModifiedDays: number; staleReviewBefore?: Date; }

const text = (value: unknown): string => typeof value === 'string' ? value.trim() : '';
const person = (value: unknown): string => value && typeof value === 'object' ? text((value as { Title?: unknown }).Title) : '';
const date = (value: unknown): Date | undefined => { const parsed = typeof value === 'string' ? new Date(value) : undefined; return parsed && !isNaN(parsed.getTime()) ? parsed : undefined; };

export function normalizePage(row: unknown): IPage | undefined {
  if (!row || typeof row !== 'object') return undefined;
  const value = row as IPageRow;
  if (typeof value.Id !== 'number' || !isFinite(value.Id)) return undefined;
  const modified = date(value.Modified) || date(value.File && value.File.TimeLastModified);
  const signals: string[] = [];
  if (!modified) signals.push('Modified date is missing or invalid');
  if (!person(value.Author)) signals.push('Owner is missing');
  if (!person(value.Editor)) signals.push('Editor is missing');
  if (value.PromotedState !== 2) signals.push('Page is not promoted');
  if (value.CheckoutUser && person(value.CheckoutUser)) signals.push('Page is checked out');
  if (!text(value.Description)) signals.push('Description is missing');
  if (!text(value.CanvasContent1) && !text(value.LayoutWebpartsContent)) signals.push('Canvas content is empty');
  return { id: value.Id, title: text(value.Title) || '(untitled page)', fileRef: text(value.FileRef), modified, owner: person(value.Author) || 'Unknown', editor: person(value.Editor) || 'Unknown', status: signals.length > 1 ? 'attention' : signals.length ? 'watch' : 'ok', signals };
}

export function classifyPage(page: IPage, options: IReviewOptions): IPage {
  const signals = page.signals.slice();
  const age = page.modified ? options.referenceDate.getTime() - page.modified.getTime() : Infinity;
  if (age > Math.max(0, options.oldModifiedDays) * 86400000 && signals.indexOf('Modified date is missing or invalid') < 0) signals.push('Modified date is older than the configured threshold');
  if (options.staleReviewBefore && (!page.modified || page.modified < options.staleReviewBefore)) signals.push('Review date is stale (modified-date proxy)');
  return { ...page, signals, status: signals.length > 1 ? 'attention' : signals.length ? 'watch' : 'ok' };
}

export function normalizeAndClassify(rows: unknown[], options: IReviewOptions): IPage[] { return rows.map(normalizePage).filter((page): page is IPage => !!page).map(page => classifyPage(page, options)); }
