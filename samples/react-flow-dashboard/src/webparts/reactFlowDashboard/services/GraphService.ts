import { WebPartContext } from '@microsoft/sp-webpart-base';
import { AadHttpClient } from '@microsoft/sp-http';

interface IUser {
  id: string;
  displayName: string;
}

export default class GraphService {

  private static readonly endpoint: string = 'https://graph.microsoft.com';

  public static async create(context: WebPartContext): Promise<GraphService> {
    return new GraphService(await context.aadHttpClientFactory.getClient(GraphService.endpoint));
  }

  private httpClient: AadHttpClient;

  private constructor(httpClient: AadHttpClient) {
    this.httpClient = httpClient;
  }

  public async getUser(id: string, token : any): Promise<IUser> {
    const response = await this.httpClient.get(
      `https://graph.microsoft.com/v1.0/users/${id}`,
      AadHttpClient.configurations.v1,
      {
        headers: {
          authorization: `Bearer ${token}`,
          accept: "application/json"
          },
      }
      );
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json as IUser;
  }

}