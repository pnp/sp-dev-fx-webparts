import ISearchDataProvider from "./ISearchDataProvider";
import { ISearchResults, IRefinementFilter, ISearchResult } from "../models/ISearchResult";
import intersection from "lodash-es/intersection";
import clone from "lodash-es/clone";

class MockSearchDataProvider implements ISearchDataProvider {

    public selectedProperties: string[];

    private _itemsCount: number;

    public get resultsCount(): number { return this._itemsCount; }
    public set resultsCount(value: number) { this._itemsCount = value; }

    private _searchResults: ISearchResults;

    public constructor() {
     
        this._searchResults = {
            RelevantResults: [
                {
                    Title: "Document 1 -Educate",
                    Url: "http://document1.ca",
                    Created: "2017-07-22T15:38:54.0000000Z",
                    RefinementTokenValues: "ǂǂ446f63756d656e74, ǂǂ45647563617465",
                    GPContentCategory: "Document",
                    GPPageNumber: "37",
                },
                {
                    Title: "Document 2 - Advise",
                    Url: "http://document2.ca",
                    Created: "2017-07-22T15:38:54.0000000Z",
                    RefinementTokenValues: "ǂǂ446f63756d656e74, ǂǂ416476697365",
                    GPContentCategory: "Document",
                    GPPageNumber: "12",
                },
                {
                    Title: "Form 1",
                    Url: "http://form1.ca",
                    Created: "2017-07-22T15:38:54.0000000Z",
                    RefinementTokenValues:  "ǂǂ466f726d",
                    GPContentCategory: "Form",              
                },
                {
                    Title: "Video 1 - Educate",
                    Url: "https://www.youtube.com/embed/ZkW-K5RQdzo",
                    Created: "2017-07-22T15:38:54.0000000Z",
                    GPVideoExternalUrl: "https://www.youtube.com/embed/ZkW-K5RQdzo",
                    GPVideoDuration: "193",
                    RefinementTokenValues: "ǂǂ566964656f,ǂǂ45647563617465",
                    GPContentCategory: "Video",                    
                },
                {
                    Title: "Video 2 - Advise",
                    Url: "https://www.youtube.com/embed/IxuEtL7gxoM",
                    Created: "2017-07-22T15:38:54.0000000Z",
                    GPVideoDuration: "600",
                    GPVideoExternalUrl: "https://www.youtube.com/embed/IxuEtL7gxoM",
                    RefinementTokenValues: "ǂǂ566964656f,ǂǂ416476697365",
                    GPContentCategory: "Video",                                                
                },                                   
            ],
            RefinementResults: [
                {
                    FilterName: "Type",
                    Values: [
                        {
                            RefinementCount: 2,
                            RefinementName: "Document",
                            RefinementToken: "ǂǂ446f63756d656e74",
                            RefinementValue: "Document",   
                        },
                        {
                            RefinementCount: 2,
                            RefinementName: "Video",
                            RefinementToken: "ǂǂ566964656f",
                            RefinementValue: "Video",                               
                        },
                        {
                            RefinementCount: 1,
                            RefinementName: "Form",
                            RefinementToken: "ǂǂ466f726d",
                            RefinementValue: "Form",                               
                        }
                    ]
                },
                {
                    FilterName: "Theme",
                    Values: [
                        {
                            RefinementCount: 2,
                            RefinementName: "Educate",
                            RefinementToken: "ǂǂ45647563617465",
                            RefinementValue: "Educate",   
                        },
                        {
                            RefinementCount: 2,
                            RefinementName: "Advise",
                            RefinementToken: "ǂǂ416476697365",
                            RefinementValue: "Advise",                               
                        },
                    ]
                }
            ],      
            TotalRows: 5,      
        };
    }

    public search(query: string, refiners?: string, refinementFilters?: IRefinementFilter[], pageNumber?: number): Promise<ISearchResults> {
         
        const p1 = new Promise<ISearchResults>((resolve, reject) => {

            const filters: string[] = [];
            let searchResults = clone(this._searchResults);
            const filteredResults: ISearchResult[] = [];
            
            if (refinementFilters.length > 0) {
                refinementFilters.map((filter) => {
                    filters.push(filter.Value.RefinementToken);                                                     
                });
                
                searchResults.RelevantResults.map((searchResult) => {
                    searchResult.RefinementTokenValues.split(",");
                    const filtered = intersection(filters, searchResult.RefinementTokenValues.split(","));
                    if (filtered.length > 0) {
                        filteredResults.push(searchResult);
                    }
                });

                searchResults = {
                    RelevantResults: filteredResults,
                    RefinementResults: this._searchResults.RefinementResults,
                    TotalRows: filteredResults.length,
                };
            }

            // Return only the specified count
            searchResults.RelevantResults = this._paginate(searchResults.RelevantResults, this._itemsCount, pageNumber);

            // Simulate an async call
            setTimeout(() => {
                resolve(searchResults);
            }, 1000);
        });

        return p1;
    }

    private _paginate (array, pageSize: number, pageNumber: number) {
        let basePage = --pageNumber * pageSize;

        return pageNumber < 0 || pageSize < 1 || basePage >= array.length 
            ? [] 
            : array.slice(basePage, basePage + pageSize );
    }
}

export default MockSearchDataProvider;