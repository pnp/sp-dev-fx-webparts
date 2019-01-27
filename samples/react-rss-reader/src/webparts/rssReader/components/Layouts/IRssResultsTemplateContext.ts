import { IRssResult } from '../../../../models/IRssReaderResponse';


/**
 * Handlebars template context for search results
 */
export interface IRssResultsTemplateContext {
    items: IRssResult[];
    strings: IRssReaderWebPartStrings;
    totalItemCount: number;
    returnedItemCount: number;
}
