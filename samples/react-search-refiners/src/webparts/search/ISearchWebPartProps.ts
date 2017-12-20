export interface ISearchWebPartProps {
  queryKeywords: string;
  queryTemplate: string;
  maxResultsCount: number;
  selectedProperties: string;
  refiners: string;
  showPaging: boolean;
}
