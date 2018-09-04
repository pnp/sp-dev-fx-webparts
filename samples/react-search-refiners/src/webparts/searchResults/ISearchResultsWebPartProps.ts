import ResultsLayoutOption from '../../models/ResultsLayoutOption';

export interface ISearchResultsWebPartProps {
  queryKeywords: string;
  queryTemplate: string;
  resultSourceId: string;
  enableQueryRules: boolean;
  maxResultsCount: number;
  selectedProperties: string;
  refiners: string;
  showPaging: boolean;
  showResultsCount: boolean;
  showBlank: boolean;
  useSearchBoxQuery: boolean;
  selectedLayout: ResultsLayoutOption;
  externalTemplateUrl: string;
  inlineTemplateText: string;
  dynamicDataSourceId: string;
  dynamicDataSourcePropertyId: string;
  dynamicDataSourceComponentId: string;
}
