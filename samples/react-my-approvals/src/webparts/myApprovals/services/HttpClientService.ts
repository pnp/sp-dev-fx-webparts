import { WebPartContext } from '@microsoft/sp-webpart-base';
import { AadHttpClient, SPHttpClient } from '@microsoft/sp-http';

interface IEnvironment {
  name: string;
  location: string;
  id: string;
  type: string;
  properties: any;
}

interface IApproval {
  environment: string;
  name: string;
  type: string;
  id: string;
  properties: any;
}

export default class HttpClientService {

  private static readonly flowEndpoint: string = 'https://service.flow.microsoft.com';

  public static async create(context: WebPartContext): Promise<HttpClientService> {
    return new HttpClientService(
      await context.aadHttpClientFactory.getClient(HttpClientService.flowEndpoint),
      context.spHttpClient,
      context.pageContext.web.absoluteUrl);
  }

  private flowHttpClient: AadHttpClient;
  private spHttpClient: SPHttpClient;
  private spBaseUrl: string;

  private constructor(flowHttpClient: AadHttpClient, spHttpClient: SPHttpClient, spBaseUrl: string) {
    this.flowHttpClient = flowHttpClient;
    this.spHttpClient = spHttpClient;
    this.spBaseUrl = spBaseUrl;
  }

  public async getEnvironments(): Promise<IEnvironment[]> {
    const response = await this.flowHttpClient.get(
      'https://api.flow.microsoft.com/providers/Microsoft.ProcessSimple/environments' +
      '?api-version=2016-11-01',
      AadHttpClient.configurations.v1);
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json.value as IEnvironment[];
  }

  public async getApprovals(environments: string[]): Promise<IApproval[]> {
    const values = [];
    for (const environment of environments) {
      const response = await this.flowHttpClient.get(
        `https://api.flow.microsoft.com/providers/Microsoft.ProcessSimple/environments/${environment}/approvalViews` +
        '?$filter=properties/userRole eq \'Approver\' and properties/isActive eq \'true\' and properties/isDescending eq \'true\'' +
        '&api-version=2016-11-01',
        AadHttpClient.configurations.v1);
      const json = await response.json();
      if (json.error) {
        throw new Error(json.error);
      }
      for (const value of json.value) {
        values.push({
          ...value,
          environment: environment
        });
      }
    }
    return values;
  }

  public async convertUtcToLocal(date: string): Promise<string> {
    const response = await this.spHttpClient.get(
      `${this.spBaseUrl}/_api/web/RegionalSettings/TimeZone/utcToLocalTime(@date)?@date='${date}'`,
      SPHttpClient.configurations.v1
    );
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json.value;
  }

}