import { IContentRecord, IRawRow, ReviewState } from './model';

const text = (v: unknown): string | null => typeof v === 'string' && v.trim() ? v.trim() : null;
const person = (v: unknown): string | null => text(v) || (v && typeof v === 'object' ? text((v as { Title?: unknown }).Title) : null);
const date = (v: unknown): string | null => { const s = text(v); return s && !isNaN(Date.parse(s)) ? s : null; };
export const classifyReview = (reviewDate: string | null, referenceDate: string, dueWithinDays: number): ReviewState => {
  if (!reviewDate) return 'not-set';
  const d = Date.parse(reviewDate), ref = Date.parse(referenceDate);
  if (isNaN(d) || isNaN(ref)) return 'unknown';
  const delta = (d - ref) / 86400000;
  return delta < 0 ? 'overdue' : delta <= dueWithinDays ? 'due-soon' : 'current';
};
export const normalizeRow = (row: IRawRow, source: string, referenceDate: string, dueWithinDays: number): IContentRecord => {
  const reviewDate = date(row.ReviewDate);
  const title = text(row.Title) || text(row.FileLeafRef) || '(untitled)';
  const owner = person(row.ContentOwner) || person(row.Owner) || person(row.Author);
  const reviewer = person(row.Editor);
  const url = text(row.FileRef);
  return { id: typeof row.Id === 'number' ? row.Id : null, title, url, source, owner, reviewer, modified: date(row.Modified), reviewDate, reviewState: classifyReview(reviewDate, referenceDate, dueWithinDays), status: text(row.DocumentStatus) || text(row.Status) || 'Not stated', contentType: person(row.ContentType) || 'Not stated', incomplete: !owner || !reviewDate || !url };
};
