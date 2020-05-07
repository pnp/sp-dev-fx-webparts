import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClient } from "@microsoft/sp-http";
import { IGroup } from "../components/interface/IGroup";
import { IGroupMember } from "../components/interface/IGroupMember";
import { ConstantsMySubscription, IMySubscriptionsListConfig } from "../Constants";
import { Web } from "@pnp/sp/webs";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
export class MSGraphService {
  /**
   * 
   * @param context : A Webpart context needed to get current context
   * Gets a list of audiences from sharepoint list 
   */
  public static async getAllAudiences(siteurl:string,listname:string): Promise<any[]> {
    let groups: any[] = [];
    let body: any;
    try {
      const w = Web(siteurl.trim());
      groups = await w.lists
        .getByTitle(listname.trim())
        .select("Title", "description", "groupid", "mail")
        .items.filter("groupid ne null").get();
       } 
    catch (error) 
    {
      console.log("MSGraphService.getAllAudiences Error: ", error);
    }
    return groups;
  }
  /**
   * 
   * @param context : A Webpart context needed to get current context
   * Gets a list of all groups user is a member of using graph api.
   */
  public static async getAllGroups(context:WebPartContext):Promise<any[]>{
    let groups: string[] = [];
    try {
      let client: MSGraphClient = await context.msGraphClientFactory
        .getClient()
        .then();
      let response = await client
        .api(`groups`)
        .version("v1.0")
        .get();
      response.value.map((item: any) => {
        debugger;
        groups.push(item);
      });
      } 
      catch (error) {
        console.log("MSGraphService.getGroupsIAmMemberOf Error: ", error);
      }
      return groups;
  }
  public static async getGroupsIAmMemberOf(context: WebPartContext): Promise<any[]> {
    let groups: string[] = [];
    try {
      let client: MSGraphClient = await context.msGraphClientFactory
        .getClient()
        .then();
      let response = await client
        .api(`/me/memberOf?$select=id`)
        .version("v1.0")
        .get();
      response.value.map((item: any) => {
        groups.push(item);
      });
      } 
      catch (error) {
        console.log("MSGraphService.getGroupsIAmMemberOf Error: ", error);
      }
      return groups;
    }
   
  
  /**
   * 
   * @param orgItems : A list of all audiences we have in sharepoint list
   * @param subsribedItems : A list of all items I have subscribed to in office 365
   * Code maps and finds out list of groups user has subscribed to from orgItems i.e list of audiences.
   */
  public static async mySubscriptions(orgItems: IGroup[],subsribedItems: IGroupMember[]): Promise<any[]> {
    try{
      var groups:any = [];
    let mysubscribedAudiencesID: any = subsribedItems.map((d: IGroupMember) => {
      return d.id;
    });
    orgItems.forEach((element) => {
        let obj;
      if (mysubscribedAudiencesID.includes(element.groupid) == true) {
         obj = {
          groupid: element.groupid,
          Title: element.Title,
          mail: element.mail,
          visibility: element.visibility,
          description: element.description,
          subscribe: true,
        };
        groups.push(obj);
      } else {
         obj = {
          groupid: element.groupid,
          Title: element.Title,
          mail: element.mail,
          visibility: element.visibility,
          description: element.description,
          subscribe: false,
        };
        groups.push(obj);
      }
    });
    groups.sort((a, b) => b.subscribe - a.subscribe);
  }
    catch(error)
    {
      console.log("MSGraphService.mySubscriptions Error: ", error);

    }
    return groups;
    
  }
  /**
   * 
   * @param orgItems : Gets all audiences we have in sharepoint list
   * @param groupID : Gets the updated subscription groupID
   * @param subscribe : Sets the value if subscribed yes/no
   * Mutates i.e updates the array when subscription is turned on or off based on group id for current user.
   */
  public static async mutateList(orgItems: IGroup[],groupID: string,subscribe: boolean): Promise<any[]> {
    let group = [];
    try{
      orgItems.map((item: IGroup) => {
        if (groupID === item.groupid) {
          item.subscribe = subscribe;
        }
      });
      orgItems.forEach((element) => {
        group.push(element);
      });
    }
    catch(error){
      console.log("MSGraphService.mutateList Error: ", error);
    }
   
    return group;
  }
  /**
   * 
   * @param context : A Webpart context needed to get current context
   * Gets the current user ID.
   */
  public static async getUserID(context: WebPartContext): Promise<any[]> {
    let userID: any;
    try {
      let client: MSGraphClient = await context.msGraphClientFactory
        .getClient()
        .then();
      let response = await client
        .api(`me?$Select=Id`)
        .version("v1.0")
        .get();
      userID = response;
        } 
      catch (error) {
        console.log("MSGraphService.getUserID Error: ", error);
    }
    return userID;
  }
  /**
   * 
   * @param groupId : Group if of the group which current user subscribes
   * @param userId : Current user id
   * @param context :  A Webpart context needed to get current context
   * Add the current user to Office 365 group 
   */
  public static async addMember(groupId: string,userId: string,context: WebPartContext): Promise<any[]> {
    let response;
    try {
      
      const graphClient: MSGraphClient = await context.msGraphClientFactory.getClient();
      var body: string = `{"@odata.id": "https://graph.microsoft.com/v1.0/directoryObjects/${userId}"}`;
      response = await graphClient
        .api(`https://graph.microsoft.com/v1.0/groups/${groupId}/members/$ref`)
        .post(body);
    } 
    catch (error) {
      response = error;
      console.log("MSGraphService.addMember Error: ", error);
    }
    return response;
  }

  /**
   * 
   * @param groupId :  Group if of the group which current user subscribes
   * @param userId :  Current user id
   * @param context :  A Webpart context needed to get current context
   */
  public static async removeMember(groupId: string,userId: string,context: WebPartContext): Promise<any[]> {
    let response;
    try {
      debugger;
      const graphClient: MSGraphClient = await context.msGraphClientFactory.getClient();
      var body: string = `{"@odata.id": "https://graph.microsoft.com/v1.0/directoryObjects/${userId}"}`;
      response = await graphClient
        .api(
          `https://graph.microsoft.com/v1.0/groups/${groupId}/members/${userId}/$ref`
        )
        .delete();
    } 
    catch (error) {
      response = error;
      console.log("MSGraphService.removeMember Error: ", error);
    }
    return response;
  }
}
