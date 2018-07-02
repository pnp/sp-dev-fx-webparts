import { ISearchResult } from '../../../../models/ISearchResult';

/**
 * Handlebars template context for search results
 */
interface ISearchResultsTemplateContext {
    items: ISearchResult[];
    totalRows: number;
    keywords: string;
    showResultsCount: boolean;
}

export default ISearchResultsTemplateContext;