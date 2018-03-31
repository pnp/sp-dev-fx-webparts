export interface ISearchResultsWebPartProps {
  queryKeywords: string;
  queryTemplate: string;
  resultSourceId: string;
  enableQueryRules: boolean;
  maxResultsCount: number;
  selectedProperties: string;
  refiners: string;
  showPaging: boolean;
  showFileIcon: boolean;
  showCreatedDate: boolean;
  showResultsCount: boolean;
  useSearchBoxQuery: boolean;
}
