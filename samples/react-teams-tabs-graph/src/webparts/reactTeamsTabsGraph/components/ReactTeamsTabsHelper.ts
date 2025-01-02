import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse, MSGraphClientV3 } from "@microsoft/sp-http";
import { IWebPropertiesResult, IChannel, ITab } from "./IReactTeamsTabsGraphProps";


export class ReactTeamsTabsHelper {

  /**
   * Get the GroupId from the site property bag
   */
  public static async getGroupId(context: WebPartContext): Promise<string> {
    try {
      const url = `${context.pageContext.web.absoluteUrl}/_api/web?$select=AllProperties&$expand=AllProperties`;

      const response: SPHttpClientResponse = await context.spHttpClient.get(
        url,
        SPHttpClient.configurations.v1
      );
      if (!response.ok) {
        throw new Error(`Failed to retrieve site properties. Status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as IWebPropertiesResult;
      return data?.AllProperties?.GroupId || "";
    } catch (err) {
      console.error("Error in getGroupId:", err);
      return "";
    }
  }

  /**
   * Get channels for the specified group/team using MSGraphClientV3
   */
  public static async getChannels(context: WebPartContext, groupId: string): Promise<IChannel[]> {
    try {
      if (!groupId) return [];

      const client: MSGraphClientV3 = await context.msGraphClientFactory.getClient("3");
      // Make a GET call to /teams/{groupId}/channels
      const result = await client
        .api(`/teams/${groupId}/channels`)
        .version("v1.0")
        .get();

      // Channels are typically in result.value
      return result?.value || [];
    } catch (error) {
      console.error("Error getting channels:", error);
      return [];
    }
  }

  /**
   * Get tabs from a specific channel
   */
  public static async getTabsFromChannel(
    context: WebPartContext,
    groupId: string,
    channelId: string
  ): Promise<ITab[]> {
    try {
      if (!groupId || !channelId) return [];

      const client: MSGraphClientV3 = await context.msGraphClientFactory.getClient("3");
      const result = await client
        .api(`/teams/${groupId}/channels/${channelId}/tabs`)
        .version("v1.0")
        .get();

      return result?.value || [];
    } catch (error) {
      console.error("Error getting tabs:", error);
      return [];
    }
  }
}
export { IChannel, ITab };

