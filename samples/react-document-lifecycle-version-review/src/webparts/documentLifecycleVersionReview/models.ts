export interface ISource { siteUrl?: string; listTitle: string; }
export interface IReviewItem { id: string; name: string; url: string; library: string; contentType: string; owner: string; modified: string; created: string; version: string; versionCount: number | null; size: string; checkedOut: string; state: string; signals: string[]; source: string; }
export type LoadState = 'loading' | 'ready' | 'empty' | 'partial' | 'permission' | 'throttled' | 'retry' | 'error';
export interface ISourceResult { source: string; items: IReviewItem[]; state: LoadState; message?: string; }
