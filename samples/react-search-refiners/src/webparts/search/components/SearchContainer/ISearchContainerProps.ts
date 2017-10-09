import ISearchDataProvider from "../../../dataProviders/ISearchDataProvider";

interface ISearchContainerProps {
  dataProvider: ISearchDataProvider;
  searchQuery: string;
  resultsCount: number;
  selectedProperties: string[];
  refiners: string;
  showPaging: boolean;
}

export default ISearchContainerProps;