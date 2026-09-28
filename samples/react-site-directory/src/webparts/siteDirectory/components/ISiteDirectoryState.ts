import type { ISiteDirectoryItem } from '../models/ISiteDirectoryItem';

export type SiteDirectoryStatus = 'loading' | 'loadingMore' | 'success' | 'empty' | 'error';
export type SiteDirectorySort = 'asc' | 'desc';

export interface ISiteDirectoryState {
  readonly items: ReadonlyArray<ISiteDirectoryItem>;
  readonly status: SiteDirectoryStatus;
  readonly pageIndex: number;
  readonly hasNext: boolean;
  readonly error?: string;
}
