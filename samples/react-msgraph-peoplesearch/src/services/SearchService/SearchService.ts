import { ISearchService } from "./ISearchService";
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { MSGraphClientFactory } from '@microsoft/sp-http';
import { isEmpty } from "@microsoft/sp-lodash-subset";
import { PageCollection } from "../../models/PageCollection";

export class SearchService implements ISearchService {
  private _msGraphClientFactory: MSGraphClientFactory;
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

  constructor(msGraphClientFactory: MSGraphClientFactory) {
    this._msGraphClientFactory = msGraphClientFactory;
  }

  public async searchUsers(): Promise<PageCollection<MicrosoftGraph.User>> {
    const graphClient = await this._msGraphClientFactory.getClient();

    let resultQuery = graphClient
      .api('/users')
      .version("beta")
      .header("ConsistencyLevel", "eventual")
      .count(true)
      .top(this.pageSize);

    if (!isEmpty(this.selectParameter)) {
      resultQuery = resultQuery.select(this.selectParameter);
    }

    if (!isEmpty(this.filterParameter)) {
      resultQuery = resultQuery.filter(this.filterParameter);
    }

    if (!isEmpty(this.orderByParameter)) {
      resultQuery = resultQuery.orderby(this.orderByParameter);
    }

    if (!isEmpty(this.searchParameter)) {
      resultQuery = resultQuery.query({ $search: `"displayName:${this.searchParameter}"` });
    }

    return await resultQuery.get();
  }

  public async fetchPage(pageLink: string): Promise<PageCollection<MicrosoftGraph.User>>  {
    const graphClient = await this._msGraphClientFactory.getClient();

    let resultQuery = graphClient.api(pageLink).header("ConsistencyLevel", "eventual");

    return await resultQuery.get();
  }
}
