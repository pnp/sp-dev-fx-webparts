import { ISearchService } from "./ISearchService";
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import * as peopleSearchResults from './MockSearchServiceResults.json';
import { PageCollection } from "../../models/PageCollection";

export class MockSearchService implements ISearchService {
    private _selectParameter: string[];
    private _filterParameter: string;
    private _orderByParameter: string;
    private _searchParameter: string;
    private _pageSize: number;
  
    public get selectParameter(): string[] { return this._selectParameter; }
    public set selectParameter(value: string[]) { this._selectParameter = value; }
  
    public get filterParameter(): string { return this._filterParameter; }
    public set filterParameter(value: string) { this._filterParameter = value; }
  
    public get orderByParameter(): string { return this._orderByParameter; }
    public set orderByParameter(value: string) { this._orderByParameter = value; }

    public get searchParameter(): string { return this._searchParameter; }
    public set searchParameter(value: string) { this._searchParameter = value; }

    public get pageSize(): number { return this._pageSize; }
    public set pageSize(value: number) { this._pageSize = value; }
    
    public async searchUsers(): Promise<PageCollection<MicrosoftGraph.User>> {
        const timeout = Math.floor(Math.random() * (1000)) + 1;
        
        let resultData: PageCollection<MicrosoftGraph.User> = this.getResultData("1");

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(resultData);
            }, timeout);
        });
    }

    public async fetchPage(currentPage: string): Promise<PageCollection<MicrosoftGraph.User>> {
        const timeout = Math.floor(Math.random() * (1000)) + 1;
        
        let resultData: PageCollection<MicrosoftGraph.User> = this.getResultData(currentPage);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(resultData);
            }, timeout);
        });
    }

    private getResultData(currentPage: string): PageCollection<MicrosoftGraph.User> {
        let resultData: PageCollection<MicrosoftGraph.User> = {
            "@odata.count": peopleSearchResults["@odata.count"],
            value: peopleSearchResults.value as MicrosoftGraph.User[]
        };
        let peopleResults = resultData.value;

        //TODO: Implement select
        //TODO: Implement filter
        //TODO: Implement orderBy

        //Pagination
        let totalPages = Math.ceil(resultData["@odata.count"] / this.pageSize);
        let currentPageNumber = parseInt(currentPage);
        let currentPageZeroBased = currentPageNumber-1;
        peopleResults = peopleResults.slice(currentPageZeroBased * this.pageSize, (currentPageZeroBased * this.pageSize) + this.pageSize);

        if (currentPageNumber < totalPages) {
            resultData["@odata.nextLink"] = (currentPageNumber + 1).toString();
        }

        if (currentPageNumber > 0) {
            resultData["@odata.prevLink"] = (currentPageNumber - 1).toString();
        }

        resultData.value = peopleResults;

        return resultData;
    }
}