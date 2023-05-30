import { AdaptiveCardExtensionContext } from '@microsoft/sp-adaptive-card-extension-base';
import { AadHttpClient } from '@microsoft/sp-http';

interface IAzdoProfile {
  displayName?: string;
  publicAlias?: string;
  emailAddress?: string;
  coreRevision?: number;
  timeStamp?: string;
  id?: string;
  revisionrevision?: number;
}

interface IAzdoAccount {
  accountId?: string;
  accountUri?: string;
  accountName?: string;
  properties?: unknown;
}

interface IAzdoWorkItemReference {
  id?: string;
  url?: string;
}

export default class AzureDevOpsClientService {

  private static readonly endpoint: string = '499b84ac-1321-427f-aa17-267ca6975798';

  public static async create(context: AdaptiveCardExtensionContext): Promise<AzureDevOpsClientService> {
    return new AzureDevOpsClientService(await context.aadHttpClientFactory.getClient(AzureDevOpsClientService.endpoint));
  }

  private client: AadHttpClient;

  private constructor(client: AadHttpClient) {
    this.client = client;
  }

  public async getProfile(): Promise<IAzdoProfile> {
    const response = await this.client.get(
      'https://app.vssps.visualstudio.com/_apis/profile/profiles/me?api-version=7.1-preview.3',
      AadHttpClient.configurations.v1);
    const json = await response.json();
    return json as IAzdoProfile;
  }

  public async getAccounts(memberId: string): Promise<IAzdoAccount[]> {
    const response = await this.client.get(
      `https://app.vssps.visualstudio.com/_apis/accounts?memberId=${memberId}&api-version=7.1-preview.1`,
      AadHttpClient.configurations.v1);
    const json = await response.json();
    return json.value as IAzdoAccount[];
  }

  public async getAssignedTasks(organizationName: string): Promise<IAzdoWorkItemReference[]> {
    const response = await this.client.post(
      `https://dev.azure.com/${organizationName}/_apis/wit/wiql?api-version=7.0`,
      AadHttpClient.configurations.v1,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "SELECT [System.Id] FROM WorkItems"
            + " WHERE [System.WorkItemType] = 'Task'"
            + " AND [State] <> 'Closed'"
            + " AND [State] <> 'Removed'"
            + " AND [System.AssignedTo] = @Me"
        })
      });
    const json = await response.json();
    return json.workItems as IAzdoWorkItemReference[];
  }

}
