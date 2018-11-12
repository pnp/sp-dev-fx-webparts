interface ISearchQuery {

    /**
     * The search query as it appears in the search box input
     */
    rawInputValue: string;

    /**
     * The enhanced query retreived from NLP service
     */
    enhancedQuery: string;
}

export default ISearchQuery;