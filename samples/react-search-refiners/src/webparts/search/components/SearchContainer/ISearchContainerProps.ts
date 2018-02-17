import ISearchDataProvider from "../../../dataProviders/ISearchDataProvider";

interface ISearchContainerProps {
  searchDataProvider: ISearchDataProvider;
  queryKeywords: string;
  maxResultsCount: number;
  selectedProperties: string[];
  refiners: string;
  showPaging: boolean;
  showFileIcon: boolean;
  showCreatedDate: boolean;
}

export default ISearchContainerProps;