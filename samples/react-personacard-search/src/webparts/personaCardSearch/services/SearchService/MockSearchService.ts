import { 
    ISearchService, 
    ISearchResults, 
    ISearchResult 
} from './SearchService.types';
import { clone } from '@microsoft/sp-lodash-subset';

export class MockSearchService implements ISearchService {
    private _itemsCount: number;
    private _resultSourceId: string;
    private query:string;

    public get resultsCount(): number { return this._itemsCount; }
    public set resultsCount(value: number) { this._itemsCount = value; }
    public get resultSourceId(): string { return this._resultSourceId; }
    public set resultSourceId(value: string) { this._resultSourceId = value; }

    private _searchResults: ISearchResults;

    public constructor() {
     
        this._searchResults = {
            RelevantResults: [
                {
                    PreferredName:'User One',
                    AccountName: 'i:0#.f|membership|user1@microsoft.com'                    
                },
                {
                    PreferredName:'User Two',
                    AccountName: 'i:0#.f|membership|user2@microsoft.com' 
                },
                {
                    PreferredName:'User Thre)',
                    AccountName: 'i:0#.f|membership|user3@microsoft.com'   
                },
                {
                    PreferredName:'User Four',
                    AccountName: 'i:0#.f|membership|user4@microsoft.com'               
                },
                {
                    PreferredName:'User Five',
                    AccountName: 'i:0#.f|membership|user5@microsoft.com'                                         
                },                                   
            ],                  
            TotalRows: 5,      
        };
    }

    public people(query: string, pageNumber?: number): Promise<ISearchResults> {
        this.query = query;
        const p1 = new Promise<ISearchResults>((resolve, reject) => {
         
            let searchResults = clone(this._searchResults);
            const filteredResults: ISearchResult[] = [];
            
            searchResults.RelevantResults.filter((result:any) =>{
                let prefferedName = <string>result.PreferredName;

                if(prefferedName.toLowerCase().indexOf(query.toLowerCase()) !== -1){
                    filteredResults.push(result);
                }
            });

            searchResults.RelevantResults = filteredResults;

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