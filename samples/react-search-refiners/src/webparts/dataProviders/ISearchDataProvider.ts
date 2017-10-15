import { ISearchResults, IRefinementFilter } from "../models/ISearchResult";

interface ISearchDataProvider {

    /**
     * Determines the number of items ot retrieve in search REST requests
     */
    resultsCount: number;
    selectedProperties: string[];

    /**
     * Performs a SharePoint search query
     */
    search(kqlQuery: string, refiners?: string, refinementFilters?: IRefinementFilter[], pageNumber?: number): Promise<ISearchResults>;
}

 export default ISearchDataProvider;