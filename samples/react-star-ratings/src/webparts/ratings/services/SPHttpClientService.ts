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
  AverageRating: number;
  RatingCount: number;
  RatedBy: IRetedBy[];
  Ratings: string;
}

export default class SPHttpClientService {

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

  public async getRating(loginName: string): Promise<[number, number, number]> {
    const response = await this.client.get(
      `${this.url}/_api/web/lists('${this.listId}')/items(${this.itemId})` +
      '?$select=AverageRating,RatingCount,Ratings,RatedBy/Id,RatedBy/Name' +
      '&$expand=RatedBy',
      SPHttpClient.configurations.v1);
    if (!response.ok) {
      throw new Error('Failed to fetch data.');
    }
    const json = await response.json();
    const value = json as IRating;
    const ratings = value.Ratings ? value.Ratings.slice(0, -1).split(',') : [];
    const average = value.AverageRating || 0;
    const count = value.RatingCount || 0;
    let rating = 0;
    if (value.RatedBy) {
      for (let index = 0; index < value.RatedBy.length; index += 1) {
        const ratedBy = value.RatedBy[index];
        if (ratedBy.Name === loginName) {
          if (index < ratings.length) {
            rating = Number(ratings[index]);
          }
        }
      }
    }
    return [
      average,
      count,
      rating
    ];
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
