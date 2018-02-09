import ISearchDataProvider from "../../../dataProviders/ISearchDataProvider";

interface ISearchResultsContainerProps {
  searchDataProvider: ISearchDataProvider;
  queryKeywords: string;
  maxResultsCount: number;
  resultSourceId: string;
  enableQueryRules: boolean;
  selectedProperties: string[];
  refiners: string;
  showPaging: boolean;
  showFileIcon: boolean;
  showCreatedDate: boolean;
}

export default ISearchResultsContainerProps;