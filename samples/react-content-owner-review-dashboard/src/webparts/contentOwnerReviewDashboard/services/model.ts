export interface ISource { path: string; }
export interface IRawRow { [key: string]: unknown; }
export type ReviewState = 'overdue' | 'due-soon' | 'not-set' | 'current' | 'unknown';
export interface IContentRecord { id: number | null; title: string; url: string | null; source: string; owner: string | null; reviewer: string | null; modified: string | null; reviewDate: string | null; reviewState: ReviewState; status: string; contentType: string; incomplete: boolean; }
export const MAX_SOURCES = 4, PAGE_SIZE = 50, MAX_PAGES = 5, MAX_ROWS = 200;
export const FIELDS = 'Id,Title,FileRef,Created,Modified,Author/Title,Editor/Title,Owner/Title,ContentOwner/Title,ReviewDate,Status,ContentType/Name,DocumentStatus';
export const EXPAND = 'Author,Editor,Owner,ContentOwner,ContentType';
