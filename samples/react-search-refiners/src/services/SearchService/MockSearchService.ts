import ISearchService from                                       './ISearchService';
import { ISearchResults, IRefinementFilter, ISearchResult } from '../../models/ISearchResult';
import { intersection, clone } from '@microsoft/sp-lodash-subset';

class MockSearchService implements ISearchService {

    public selectedProperties: string[];
    private _suggestions: string[];

    private _itemsCount: number;

    public get resultsCount(): number { return this._itemsCount; }
    public set resultsCount(value: number) { this._itemsCount = value; }

    private _searchResults: ISearchResults;

    public constructor() {
     
        this._searchResults = {
            RelevantResults: [
                {
                    Title: 'Document 1 - Category 1',
                    Path: 'http://document1.ca',
                    Created: '2017-07-22T15:38:54.0000000Z',
                    RefinementTokenValues: 'ǂǂ446f63756d656e74,ǂǂ45647563617465',
                    ContentCategory: 'Document',
                },
                {
                    Title: 'Document 2 - Category 2',
                    Path: 'http://document2.ca',
                    Created: '2017-07-22T15:38:54.0000000Z',
                    RefinementTokenValues: 'ǂǂ446f63756d656e74,ǂǂ416476697365',
                    ContentCategory: 'Document',
                },
                {
                    Title: 'Form 1',
                    Path: 'http://form1.ca',
                    Created: '2017-07-22T15:38:54.0000000Z',
                    RefinementTokenValues:  'ǂǂ466f726d',
                    ContentCategory: 'Form',              
                },
                {
                    Title: 'Video 1 - Category 1',
                    Path: 'https://www.youtube.com/watch?v=S93e6UU7y9o',
                    Created: '2017-07-22T15:38:54.0000000Z',
                    RefinementTokenValues: 'ǂǂ566964656f,ǂǂ45647563617465',
                    ContentCategory: 'Video',                    
                },
                {
                    Title: 'Video 2 - Category 2',
                    Path: 'https://www.youtube.com/watch?v=8Nl_dKVQ1O8',
                    Created: '2017-07-22T15:38:54.0000000Z',
                    RefinementTokenValues: 'ǂǂ566964656f,ǂǂ416476697365',
                    ContentCategory: 'Video',                                                
                },                                   
            ],
            RefinementResults: [
                {
                    FilterName: 'Type',
                    Values: [
                        {
                            RefinementCount: 2,
                            RefinementName: 'Document',
                            RefinementToken: 'ǂǂ446f63756d656e74',
                            RefinementValue: 'Document',   
                        },
                        {
                            RefinementCount: 2,
                            RefinementName: 'Video',
                            RefinementToken: 'ǂǂ566964656f',
                            RefinementValue: 'Video',                               
                        },
                        {
                            RefinementCount: 1,
                            RefinementName: 'Form',
                            RefinementToken: 'ǂǂ466f726d',
                            RefinementValue: 'Form',                               
                        }
                    ]
                },
                {
                    FilterName: 'Theme',
                    Values: [
                        {
                            RefinementCount: 2,
                            RefinementName: 'Category 1',
                            RefinementToken: 'ǂǂ45647563617465',
                            RefinementValue: 'Category 1',   
                        },
                        {
                            RefinementCount: 2,
                            RefinementName: 'Category 2',
                            RefinementToken: 'ǂǂ416476697365',
                            RefinementValue: 'Category 2',                               
                        },
                    ]
                }
            ],      
            TotalRows: 5,      
        };

        this._suggestions = [
            "sharepoint",
            "analysis document",
            "project document",
            "office 365",
            "azure cloud architecture",
            "architecture document",
            "sharepoint governance guide",
            "hr policies",
            "human resources procedures"
        ];
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
                    const filtered = intersection(filters, searchResult.RefinementTokenValues.split(','));
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

    public async suggest(keywords: string): Promise<string[]> {
       
        let proposedSuggestions: string[] = [];

        const p1 = new Promise<string[]>((resolve, reject) => {
            this._suggestions.map(suggestion => {

                const idx = suggestion.toLowerCase().indexOf(keywords.toLowerCase());
                if (idx !== -1) {

                    const preMatchedText = suggestion.substring(0, idx);
                    const postMatchedText = suggestion.substring(idx + keywords.length, suggestion.length);
                    const matchedText = suggestion.substr(idx, keywords.length);

                    proposedSuggestions.push(`${preMatchedText}<B>${matchedText}</B>${postMatchedText}`);
                }
            });
            
            // Simulate an async call
            setTimeout(() => {
                resolve(proposedSuggestions);
            }, 100);

        });
        
        return p1;
    }
}

export default MockSearchService;