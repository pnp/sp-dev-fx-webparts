import ISearchService from '../../../../services/SearchService/ISearchService';
import ITaxonomyService from '../../../../services/TaxonomyService/ITaxonomyService';
import { DisplayMode } from '@microsoft/sp-core-library';
import TemplateService from '../../../../services/TemplateService/TemplateService';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import IRefinerConfiguration from '../../../../models/IRefinerConfiguration';
import { Sort } from '@pnp/sp';
import ISortableFieldConfiguration from '../../../../models/ISortableFieldConfiguration';
import { ISearchResultType } from '../../../../models/ISearchResultType';
import IResultService from '../../../../services/ResultService/IResultService';
import {ICustomTemplateFieldValue} from '../../../../services/ResultService/ResultService';

interface ISearchResultsContainerProps {

    /**
     * The web part title
     */
    webPartTitle: string;

    /**
     * The search data provider instance
     */
    searchService: ISearchService;

    /**
     * The taxonomy data provider instance
     */
    taxonomyService: ITaxonomyService;

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
     * The sort order of the results
     */
    sortList: Sort[];

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
    refiners: IRefinerConfiguration[];

    /**
     * The managed properties used as sortable fields for the query
     */
    sortableFields: ISortableFieldConfiguration[];

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

    /** The configured result types */
    resultTypes: ISearchResultType[];
    /**
     * The name of the CustomAction that should render this data. 
     */
    rendererId: string;
    /**
     * The data passing service for custom action renderers
     */
    resultService: IResultService;
    useCodeRenderer: boolean;
    customTemplateFieldValues:  ICustomTemplateFieldValue[];
}

export default ISearchResultsContainerProps;