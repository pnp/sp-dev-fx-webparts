import ISearchDataProvider from "../../../dataProviders/ISearchDataProvider";

interface ISearchContainerProps {
  searchDataProvider: ISearchDataProvider;
  queryKeywords: string;
  maxResultsCount: number;
  selectedProperties: string[];
  refiners: string;
  showPaging: boolean;
}

export default ISearchContainerProps;