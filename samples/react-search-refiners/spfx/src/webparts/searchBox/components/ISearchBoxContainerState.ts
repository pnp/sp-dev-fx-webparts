import { INlpResponse } from "../../../models/INlpResponse";

interface ISearchBoxContainerState {
    
    /**
     * The enhanced query response
     */
    enhancedQuery: INlpResponse;

    /**
     * List of proposed suggestions in the dropdown list
     */
    proposedQuerySuggestions: string[];

    /**
     * The list of suggestions explicitly selected by the user
     */
    selectedQuerySuggestions: string[];

    /**
     * The current value of the input string
     */
    searchInputValue: string;
    
    /**
     * Term used as basis to get suggestion
     */
    termToSuggestFrom: string;

    /**
     * Indicates the component is retrieving suggestions
     */
    isRetrievingSuggestions: boolean;

    /**
     * Error message
     */
    errorMessage: string;
}

export default ISearchBoxContainerState;