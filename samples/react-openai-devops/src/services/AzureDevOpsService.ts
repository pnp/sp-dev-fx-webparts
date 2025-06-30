import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  IAccount,
  ICommitDetail,
  IProfile,
  IWorkItem,
  IWorkItemReference,
} from "../interfaces/webpart.types";
import { LogHelper } from "../helpers/LogHelper";
import { AadHttpClient } from "@microsoft/sp-http";

export default class AzureDevOpsService {
  private static client: AadHttpClient;
  private static readonly endpoint: string =
    "499b84ac-1321-427f-aa17-267ca6975798";

  public static async Init(context: WebPartContext): Promise<void> {
    this.client = await context.aadHttpClientFactory.getClient(
      AzureDevOpsService.endpoint
    );
    LogHelper.info("AzureDevOpsService", "Init", "Aad HttpClient Initialized");
  }
  public static async getProfile(): Promise<IProfile> {
    const response = await this.client.get(
      "https://app.vssps.visualstudio.com/_apis/profile/profiles/me?api-version=7.1-preview.3",
      AadHttpClient.configurations.v1
    );
    const json = await response.json();
    return json as IProfile;
  }
  public static async getAccounts(memberId: string): Promise<IAccount[]> {
    const response = await this.client.get(
      `https://app.vssps.visualstudio.com/_apis/accounts?memberId=${memberId}&api-version=7.1-preview.1`,
      AadHttpClient.configurations.v1
    );
    const json = await response.json();
    return json.value as IAccount[];
  }

  public static async getWorkItemsAsync(
    ids: string[],
    projectName: string,
    organizationName: string
  ): Promise<IWorkItem[]> {
    const response = await this.client.get(
      `https://dev.azure.com/${organizationName}/${projectName}/_apis/wit/workitems?ids=${ids}&api-version=7.0`,
      AadHttpClient.configurations.v1
    );
    const json = await response.json();
    return json.value as IWorkItem[];
  }

  public static async getAssignedTasks(
    projectName: string,
    organizationName: string
  ): Promise<IWorkItem[]> {
    const response = await this.client.post(
      `https://dev.azure.com/${organizationName}/${projectName}/_apis/wit/wiql?api-version=7.0`,
      AadHttpClient.configurations.v1,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query:
            "SELECT [System.Id],[System.Title],[System.State] FROM WorkItems" +
            " WHERE [System.WorkItemType] = 'Task'" +
            " AND [State] <> 'Closed'" +
            " AND [State] <> 'Removed'" +
            " AND [System.AssignedTo] = @Me",
        }),
      }
    );
    const json = await response.json();
    const workItems = json.workItems as IWorkItemReference[];
    const ids: any[] = workItems.map((item) => item.id);
    // some error handling
    if (ids.length === 0) {
      return [] as IWorkItem[];
    }
    const result = await this.getWorkItemsAsync(
      ids,
      projectName,
      organizationName
    );
    return result;
  }
  public static async getAssignedBugs(
    projectName: string,
    organizationName: string
  ): Promise<IWorkItem[]> {
    const response = await this.client.post(
      `https://dev.azure.com/${organizationName}/${projectName}/_apis/wit/wiql?api-version=7.0`,
      AadHttpClient.configurations.v1,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query:
            "SELECT [System.Id],[System.Title],[System.State] FROM WorkItems" +
            " WHERE [System.WorkItemType] = 'Bug'" +
            " AND [State] <> 'Closed'" +
            " AND [State] <> 'Removed'" +
            " AND [System.AssignedTo] = @Me",
        }),
      }
    );
    const json = await response.json();
    const workItems = json.workItems as IWorkItemReference[];
    const ids: any[] = workItems.map((item) => item.id);
    // some error handling
    if (ids.length === 0) {
      return [] as IWorkItem[];
    }
    const result = await this.getWorkItemsAsync(
      ids,
      projectName,
      organizationName
    );
    return result;
  }

  public static async getRecentCommitsAsync(
    projectName: string,
    repositoryName: string,
    organizationName: string
  ): Promise<ICommitDetail[]> {
    const requestUrl = `https://dev.azure.com/${organizationName}/${projectName}/_apis/git/repositories/${repositoryName}/commits?api-version=7.0`;
    const response = await this.client.get(
      requestUrl,
      AadHttpClient.configurations.v1
    );
    const json = await response.json();
    return json.value as ICommitDetail[];
  }
}
