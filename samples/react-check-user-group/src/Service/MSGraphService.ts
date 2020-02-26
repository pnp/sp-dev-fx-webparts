import { WebPartContext } from '@microsoft/sp-webpart-base';
import { MSGraphClient } from '@microsoft/sp-http';

export class MSGraphService {
  /**
   * Gets all the groups the selected user is part of using MS Graph API
   * @param context Web part context
   * @param email Email ID of the selected user
   */
  public static async GetUserGroups(context: WebPartContext, email: string): Promise<any[]> {
    let groups: string[] = [];
    try {
      let client: MSGraphClient = await context.msGraphClientFactory.getClient().then();
      let response = await client
        .api(`/users/${email}/memberOf`)
        .version('v1.0')
        .select(['groupTypes', 'displayName', 'mailEnabled', 'securityEnabled', 'description'])
        .get();
      response.value.map((item: any) => {
        groups.push(item);
      });
    } catch (error) {
      console.log('MSGraphService.GetUserGroups Error: ', error);
    }
    console.log('MSGraphService.GetUserGroups: ', groups);
    return groups;
  }

  /**
   * Gets all the members in the selected group using MS Graph API
   * @param context Web part context
   * @param groupId Group ID of the selected group
   */
  public static async GetGroupMembers(context: WebPartContext, groupId: string): Promise<any[]> {
    let users: string[] = [];
    try {
      let client: MSGraphClient = await context.msGraphClientFactory.getClient().then();
      let response = await client
        .api(`/groups/${groupId}/members`)
        .version('v1.0')
        .select(['mail', 'displayName'])
        .get();
      response.value.map((item: any) => {
        users.push(item);
      });
    } catch (error) {
      console.log('MSGraphService.GetGroupMembers Error: ', error);
    }
    console.log('MSGraphService.GetGroupMembers: ', users);
    return users;
  }
}