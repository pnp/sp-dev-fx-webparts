import { Guid } from '@microsoft/sp-core-library';
import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface IUser {
  Id: number;
  LoginName: string;
}

interface IRetedBy {
  Id: string;
  Name: string;
}

interface IRating {
  RatedBy: IRetedBy[];
  Ratings: string;
}

export default class SPSPHttpClientService {

  private client: SPHttpClient;
  private url: string;
  private listId: Guid;
  private itemId: number;

  public constructor(context: WebPartContext) {
    this.client = context.spHttpClient;
    this.url = context.pageContext.web.absoluteUrl;
    this.listId = context.pageContext.list.id;
    this.itemId = context.pageContext.listItem.id;
  }

  public async ensureFeatureEnabled(): Promise<void> {
    const response = await this.client.get(
      `${this.url}/_api/web/lists('${this.listId}')/rootfolder/properties`,
      SPHttpClient.configurations.v1);
    if (!response.ok) {
      throw new Error('Failed to fetch data.');
    }
    const json = await response.json();
    const value = json['Ratings_x005f_VotingExperience'];
    if (value !== 'Ratings') {
      throw new Error('"Ratings" site collection feature is not enabled.');
    }
  }

  public async getCurrentUser(): Promise<IUser> {
    const response = await this.client.get(
      `${this.url}/_api/web/currentuser` +
      '?$select=Id,LoginName',
      SPHttpClient.configurations.v1);
    if (!response.ok) {
      throw new Error('Failed to fetch data.');
    }
    const json = await response.json();
    const value = json as IUser;
    return value;
  }

  public async getRatings(): Promise<Map<string, number>> {
    const response = await this.client.get(
      `${this.url}/_api/web/lists('${this.listId}')/items(${this.itemId})` +
      '?$select=Ratings,RatedBy/Id,RatedBy/Name' +
      '&$expand=RatedBy',
      SPHttpClient.configurations.v1);
    if (!response.ok) {
      throw new Error('Failed to fetch data.');
    }
    const json = await response.json();
    const value = json as IRating;
    if (value.Ratings) {
      return new Map(value.Ratings
        .slice(0, -1)
        .split(',')
        .map(item => Number(item))
        .map((item, index) => ([value.RatedBy[index].Name, item])));
    } else {
      return new Map();
    }
  }

  public async setRating(rating: number): Promise<void> {
    const response = await this.client.post(
      `${this.url}/_api/Microsoft.Office.Server.ReputationModel.Reputation.SetRating(listid=@a1,itemid=@a2,rating=@a3)` +
      `?@a1='${this.listId}'` +
      `&@a2=${this.itemId}` +
      `&@a3=${rating}`,
      SPHttpClient.configurations.v1,
      {});
    if (!response.ok) {
      throw new Error('Failed to fetch data.');
    }
  }

}
