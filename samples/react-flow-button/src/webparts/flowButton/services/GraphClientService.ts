import { WebPartContext } from '@microsoft/sp-webpart-base';
import { AadHttpClient } from '@microsoft/sp-http';

interface IUser {
  id: string;
  displayName: string;
}

export default class GraphClientService {

  private static readonly endpoint: string = 'https://graph.microsoft.com';

  public static async create(context: WebPartContext): Promise<GraphClientService> {
    return new GraphClientService(await context.aadHttpClientFactory.getClient(GraphClientService.endpoint));
  }

  private httpClient: AadHttpClient;

  private constructor(httpClient: AadHttpClient) {
    this.httpClient = httpClient;
  }

  public async getUser(id: string): Promise<IUser> {
    const response = await this.httpClient.get(
      `https://graph.microsoft.com/v1.0/users/${id}`,
      AadHttpClient.configurations.v1);
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json as IUser;
  }

}
