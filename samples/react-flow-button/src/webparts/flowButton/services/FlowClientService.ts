import { WebPartContext } from '@microsoft/sp-webpart-base';
import { AadHttpClient } from '@microsoft/sp-http';

interface IEnvironment {
  name: string;
  location: string;
  id: string;
  type: string;
  properties: any;
}

interface IFlow {
  name: string;
  id: string;
  type: string;
  properties: any;
}

export default class FlowClientService {

  private static readonly endpoint: string = 'https://service.flow.microsoft.com';

  public static async create(context: WebPartContext): Promise<FlowClientService> {
    return new FlowClientService(await context.aadHttpClientFactory.getClient(FlowClientService.endpoint));
  }

  private httpClient: AadHttpClient;

  private constructor(httpClient: AadHttpClient) {
    this.httpClient = httpClient;
  }

  public async getEnvironments(): Promise<IEnvironment[]> {
    const response = await this.httpClient.get(
      'https://api.flow.microsoft.com/providers/Microsoft.ProcessSimple/environments' +
      '?api-version=2016-11-01',
      AadHttpClient.configurations.v1);
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json.value as IEnvironment[];
  }

  public async getFlows(environment: string): Promise<IFlow[]> {
    const response = await this.httpClient.get(
      `https://api.flow.microsoft.com/providers/Microsoft.ProcessSimple/environments/${environment}/flows` +
      '?api-version=2016-11-01',
      AadHttpClient.configurations.v1);
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json.value as IFlow[];
  }

  public async getFlow(id: string): Promise<IFlow> {
    const response = await this.httpClient.get(
      `https://api.flow.microsoft.com/${id}` +
      '?api-version=2016-11-01',
      AadHttpClient.configurations.v1);
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json as IFlow;
  }

}
