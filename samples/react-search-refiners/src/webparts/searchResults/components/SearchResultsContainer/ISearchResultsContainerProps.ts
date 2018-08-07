import ISearchService from      '../../../../services/SearchService/ISearchService';
import ITaxonomyService from    '../../../../services/TaxonomyService/ITaxonomyService';
import { DisplayMode } from     '@microsoft/sp-core-library';
import TemplateService from     '../../../../services/TemplateService/TemplateService';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface ISearchResultsContainerProps {

  /**
   * The search data provider instance
   */
  searchDataProvider: ISearchService;

  /**
   * The taxonomy data provider instance
   */
  taxonomyDataProvider: ITaxonomyService;

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

  /**
   * The template helper instance
   */
  templateService: TemplateService;

  /** 
   * The template raw content to display
   */
  templateContent: string;

  /**
   * The web part context
   */
  context: WebPartContext;
}

export default ISearchResultsContainerProps;