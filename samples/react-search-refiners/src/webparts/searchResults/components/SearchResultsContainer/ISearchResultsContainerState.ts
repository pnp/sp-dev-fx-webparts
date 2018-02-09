import { ISearchResults, IRefinementFilter, IRefinementResult } from "../../../models/ISearchResult";

interface ISearchResultsContainerState {
    
    /**
     * The current search results to display
     */
    results: ISearchResults;
    
    /**
     * Current selected filters to apply to the search query. We need this information during page transition to keep existing filters
     */
    selectedFilters: IRefinementFilter[];

    /**
     * Available filters in the filter panel
     */
    availableFilters: IRefinementResult[];

    /**
     * The current result page number
     */
    currentPage: number;

    /**
     * Error message display in the message bar
     */
    errorMessage: string;

    /**
     * Indicates whether or not there is an error in the component
     */
    hasError: boolean;

    /**
     * Indicates whether or not the resutls arre currenty loading due to a refinement or new query
     */
    areResultsLoading: boolean;

    /**
     * Indicates whether or not the componetn loads for the first time
     */
    isComponentLoading: boolean;

    /**
     * Keeps the last query in case you change the query in the propery panel
     */
    lastQuery: string;
}

export default ISearchResultsContainerState;