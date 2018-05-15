import { IRefinementFilter, ISearchResults } from "../../models/ISearchResult";

interface ISearchDataProvider {

    /**
     * Determines the number of items ot retrieve in REST requests
     */
    resultsCount: number;
    
    /**
     * Selected managed properties to retrieve when a search query is performed 
     */
    selectedProperties: string[];
    
    /**
     * Determines the query template to apply in REST requests
     */
    queryTemplate?: string;

    /**
     * The SharePoint result source id to target
     */
    resultSourceId?: string;

    /**
     * Indicates wheter or not the query rules should be applied in the query
     */
    enableQueryRules?: boolean;

    /**
     * Performs a search query.
     * @returns ISearchResults object. Use the "RelevantResults" property to acces results proeprties (returned as key/value pair object => item.[<Managed property name>])
     */
    search(kqlQuery: string, refiners?: string, refinementFilters?: IRefinementFilter[], pageNumber?: number): Promise<ISearchResults>;

    /**
     * Retrieves search query suggestions
     * @param query the term to suggest from
     */
    suggest(query: string): Promise<string[]>;
}

 export default ISearchDataProvider;