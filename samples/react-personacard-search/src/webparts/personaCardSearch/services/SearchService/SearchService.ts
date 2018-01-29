import { ISearchService,
    ISearchResults,
    ISearchResult 
} from './SearchService.types';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import pnp, { 
    ConsoleListener,
    Logger,
    LogLevel,
    SearchQuery,   
    SearchResults,
    setup,
    Web,
    Sort,
    SortDirection 
} from 'sp-pnp-js';


export class SearchService implements ISearchService {
    private _resultsCount: number;
    private _context: IWebPartContext;
    private _resultSourceId:string;

    public get resultsCount(): number { return this._resultsCount; }
    public set resultsCount(value: number) { this._resultsCount = value; }
    public get resultSourceId(): string { return this._resultSourceId; }
    public set resultSourceId(value: string) { this._resultSourceId = value; }

    public constructor(webPartContext: IWebPartContext) {
        this._context = webPartContext;
        const consoleListener = new ConsoleListener();
        
        Logger.subscribe(consoleListener);
       
        setup({
            sp: {
                headers: {
                    Accept: 'application/json; odata=nometadata',
                },
            },
            spfxContext: this._context,
        });
    }

    public async people(query?: string, pageNumber?: number): Promise<ISearchResults> {
        const searchQuery: SearchQuery = {};
        const selectedProperties:string[ ] =  ['AccountName','PreferredName'];  
        const page:number = pageNumber ? pageNumber: 1;       
        
        searchQuery.ClientType = 'PeopleResultsQuery';
        searchQuery.SourceId = this._resultSourceId;
        searchQuery.QueryTemplate = query;

        searchQuery.RowLimit = this._resultsCount;
        searchQuery.SelectProperties = selectedProperties;       
        searchQuery.TrimDuplicates = false;

        let sortList: Sort[] = [
            {
                Property: 'PreferredName',
                Direction: SortDirection.Descending
            }
        ];

        searchQuery.SortList = sortList;      
        
        let results: ISearchResults = {
            RelevantResults : [],            
            TotalRows: 0,
        };

        try {
    
            const r = await pnp.sp.search(searchQuery);            
           if (r.RawSearchResults.PrimaryQueryResult) { 
                const r2 = await r.getPage(page, this._resultsCount);
                const resultRows = r2.RawSearchResults.PrimaryQueryResult.RelevantResults.Table.Rows;                

                if(resultRows && resultRows.length > 0){
                    resultRows.map((elt) => {                   
                        let result: ISearchResult = {};
    
                        elt.Cells.map((item) => {
                            result[item.Key] = item.Value;
                        });
                        results.RelevantResults.push(result);      
                    });
                }

                results.TotalRows = r.TotalRows;
            }
            return results;

        } catch (error) {
            Logger.write('[SharePointSerachService.people()]: Error: ' + error, LogLevel.Error);
            throw error;
        }       
    }
}
