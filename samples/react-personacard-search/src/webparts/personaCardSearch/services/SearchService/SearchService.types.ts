export interface ISearchService {    
    resultsCount: number;
    resultSourceId: string; 
    /**
     * Performs a SharePoint search query
     */
    people: (kqlQuery: string, pageNumber?: number) => Promise<ISearchResults>;    
}
export interface ISearchResults {
    RelevantResults: ISearchResult[];   
    TotalRows?: number;
}

export interface ISearchResult {
    [key: string]: any;
    AccountName?:string;    
}
