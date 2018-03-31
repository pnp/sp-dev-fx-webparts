import ISearchDataProvider from "../../../dataProviders/ISearchDataProvider";

interface ISearchResultsContainerProps {
  searchDataProvider: ISearchDataProvider;
  queryKeywords: string;
  maxResultsCount: number;
  resultSourceId: string;
  enableQueryRules: boolean;
  selectedProperties: string[];
  refiners: { [key: string]: string };
  showPaging: boolean;
  showFileIcon: boolean;
  showCreatedDate: boolean;
  showResultsCount: boolean;
}

export default ISearchResultsContainerProps;