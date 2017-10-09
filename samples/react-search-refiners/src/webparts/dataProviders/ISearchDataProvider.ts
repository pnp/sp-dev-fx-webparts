import { ISearchResults, IRefinementFilter } from "../models/ISearchResult";

interface ISearchDataProvider {

    /**
     * Determines the number of items ot retrieve in REST requests
     */
    resultsCount: number;
    selectedProperties: string[];

    /**
     * Perfoms a search query
     */
    search(kqlQuery: string, refiners?: string, refinementFilters?: IRefinementFilter[], pageNumber?: number): Promise<ISearchResults>;
}

 export default ISearchDataProvider;