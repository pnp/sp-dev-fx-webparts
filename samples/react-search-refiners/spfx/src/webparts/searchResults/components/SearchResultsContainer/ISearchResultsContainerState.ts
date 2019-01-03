import { ISearchResults, IRefinementFilter, IRefinementResult } from '../../../../models/ISearchResult';
import { SortDirection } from "@pnp/sp";

interface ISearchResultsContainerState {
    
    /**
     * The current search results to display
     */
    results: ISearchResults;

    /**
     * Number of results
     */
    resultCount: number;
    
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
     * Keeps the last query in case you change the query in the propery panel
     */
    lastQuery: string;

    /**
     * Keeps the field on which the results need to be sorted (after initial sort)
     */
    sortField?: string;

    /**
     * Keeps the order in which the results need to be sorted (after initial sort)
     */
    sortDirection?: SortDirection;
    /**
     *  Guid for the current mounting node
     */
    mountingNodeGuid: string;
}

export default ISearchResultsContainerState;