export interface ISearchResult {
  title: string;
  path: string | null;
  description: string;
  summary: string;
  fileType: string | null;
  contentClass: string | null;
  lastModifiedTime: string | null;
}

export interface IRefinerEntry {
  label: string;
  token: string;
  count: number;
}

export interface ISearchRefiner {
  name: string;
  entries: IRefinerEntry[];
}

export interface ISelectedRefiner {
  name: string;
  label: string;
  token: string;
}

export interface ISearchResponse {
  results: ISearchResult[];
  refiners: ISearchRefiner[];
  totalRows: number;
}

export interface ISearchRequestOptions {
  query: string;
  pageSize?: number;
  startRow?: number;
  selectedRefiners?: ISelectedRefiner[];
}

export type SearchErrorKind = 'accessDenied' | 'throttled' | 'generic';
