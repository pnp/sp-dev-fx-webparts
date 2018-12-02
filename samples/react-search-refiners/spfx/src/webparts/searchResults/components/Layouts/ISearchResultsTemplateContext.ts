import { ISearchResult, IPromotedResult } from '../../../../models/ISearchResult';

/**
 * Handlebars template context for search results
 */
interface ISearchResultsTemplateContext {
    items: ISearchResult[];
    promotedResults?: IPromotedResult[];
    strings: ISearchResultsWebPartStrings;
    totalRows: number;
    keywords: string;
    showResultsCount: boolean;
    siteUrl: string;
    webUrl: string;
    maxResultsCount: number;
    actualResultsCount: number;
}

export default ISearchResultsTemplateContext;