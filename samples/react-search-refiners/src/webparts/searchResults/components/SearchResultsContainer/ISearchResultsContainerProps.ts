import ISearchDataProvider from "../../../dataProviders/SearchDataProvider/ISearchDataProvider";
import ITaxonomyDataProvider from "../../../dataProviders/TaxonomyProvider/ITaxonomyDataProvider";
import { DisplayMode } from "@microsoft/sp-core-library";

interface ISearchResultsContainerProps {

  /**
   * The search data provider instance
   */
  searchDataProvider: ISearchDataProvider;

  /**
   * The taxonomy data provider instance
   */
  taxonomyDataProvider: ITaxonomyDataProvider;

  /**
   * The search query keywords
   */
  queryKeywords: string;

  /**
   * Number of results to retrieve
   */
  maxResultsCount: number;

  /**
   * The SharePoint result source id to target
   */
  resultSourceId: string;

  /**
   * Enable SharePoint query rules
   */
  enableQueryRules: boolean;

  /**
   * Properties to retrieve
   */
  selectedProperties: string[];

  /**
   * The managed properties used as refiners for the query
   */
  refiners: { [key: string]: string };

  /**
   * Show the paging control
   */
  showPaging: boolean;

  /**
   * Show the page icon for individual result
   */
  showFileIcon: boolean;

  /**
   * Show the created date for individual result
   */
  showCreatedDate: boolean;

  /**
   * Show the result count and entered keywords
   */
  showResultsCount: boolean;

  /**
   * Show nothing if no result
   */
  showBlank: boolean;

  /** 
   * The current display mode of Web Part
   */
  displayMode: DisplayMode;
}

export default ISearchResultsContainerProps;