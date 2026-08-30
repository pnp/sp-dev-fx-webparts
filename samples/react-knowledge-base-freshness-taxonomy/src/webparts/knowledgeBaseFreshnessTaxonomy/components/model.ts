export type Freshness = 'fresh' | 'due soon' | 'stale' | 'missing review date';
import { classifyFreshness as sharedClassifyFreshness, parseTaxonomy as sharedParseTaxonomy } from './shared';
export interface IArticle { id: number; title: string; description: string; fileRef: string; created?: string; modified?: string; contentType: string; author: string; editor: string; taxonomy: string[]; categories: string[]; reviewDate?: string; owner: string; link?: string; freshness: Freshness; }
export interface ISourceResult { source: string; rows: IArticle[]; error?: string; }

export const DAYS_UNTIL_DUE = 30;
export function classifyFreshness(reviewDate: string | undefined, referenceDate: string): Freshness {
  return sharedClassifyFreshness(reviewDate, referenceDate);
}

function text(value: unknown): string { return typeof value === 'string' ? value.trim() : ''; }
function people(value: unknown): string { return value && typeof value === 'object' ? text((value as { Title?: unknown; Name?: unknown }).Title) || text((value as { Name?: unknown }).Name) : text(value); }
export function parseTaxonomy(value: unknown): string[] {
  return sharedParseTaxonomy(value);
}
export function parseCategories(...values: unknown[]): string[] { const parsed: string[] = []; values.forEach((value) => { parseTaxonomy(value).forEach((term) => { if (parsed.indexOf(term) < 0) parsed.push(term); }); }); return parsed; }
export function normalizeRow(row: unknown, referenceDate: string, link?: string): IArticle | undefined {
  if (!row || typeof row !== 'object') return undefined;
  const r = row as { Id?: unknown; Title?: unknown; Description?: unknown; Body?: unknown; FileRef?: unknown; Created?: unknown; Modified?: unknown; ContentType?: unknown; Author?: unknown; Editor?: unknown; Taxonomy?: unknown; Topic?: unknown; Category?: unknown; ReviewDate?: unknown; Owner?: unknown };
  const id = typeof r.Id === 'number' ? r.Id : Number(r.Id);
  if (!isFinite(id) || id <= 0) return undefined;
  const taxonomy = parseTaxonomy(r.Taxonomy);
  return { id, title: text(r.Title) || '(untitled)', description: text(r.Description) || text(r.Body), fileRef: text(r.FileRef), created: text(r.Created) || undefined, modified: text(r.Modified) || undefined, contentType: people(r.ContentType), author: people(r.Author), editor: people(r.Editor), taxonomy, categories: parseCategories(r.Topic, r.Category), reviewDate: text(r.ReviewDate) || undefined, owner: people(r.Owner), link, freshness: classifyFreshness(text(r.ReviewDate) || undefined, referenceDate) };
}
