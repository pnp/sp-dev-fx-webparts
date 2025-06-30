import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClientV3 } from "@microsoft/sp-http";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";

export class GraphService {
  private context: WebPartContext;
  private _graphClient: MSGraphClientV3;

  constructor(context: WebPartContext) {
    this.context = context;
  }

  /**
   * Get Microsoft Graph Client
   */
  private async getGraphClient(): Promise<MSGraphClientV3> {
    if (!this._graphClient) {
      this._graphClient = await this.context.msGraphClientFactory.getClient('3');
    }
    return this._graphClient;
  }

  /**
   * Get current user information
   */
  public async getCurrentUser(): Promise<MicrosoftGraph.User> {
    try {
      const client = await this.getGraphClient();
      const user: MicrosoftGraph.User = await client
        .api('/me')
        .select('displayName,mail,userPrincipalName,jobTitle,department')
        .get();
      
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  }

  /**
   * Get user profile photo
   */
  public async getUserPhoto(): Promise<string> {
    try {
      const client = await this.getGraphClient();
      const photo = await client
        .api('/me/photo/$value')
        .get();
      
      // Convert blob to base64 string
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(photo);
      });
    } catch (error) {
      console.error('Error getting user photo:', error);
      return null;
    }
  }

  /**
   * Get user's groups
   */
  public async getUserGroups(): Promise<MicrosoftGraph.Group[]> {
    try {
      const client = await this.getGraphClient();
      const response = await client
        .api('/me/memberOf')
        .filter('groupTypes/any(a:a eq \'unified\')')
        .select('id,displayName,description')
        .get();
      
      return response.value;
    } catch (error) {
      console.error('Error getting user groups:', error);
      return [];
    }
  }

  /**
   * Check if user is member of specific group
   */
  public async checkUserInGroup(groupId: string): Promise<boolean> {
    try {
      const client = await this.getGraphClient();
      const response = await client
        .api(`/me/memberOf/microsoft.graph.group?$filter=id eq '${groupId}'`)
        .get();
      
      return response.value && response.value.length > 0;
    } catch (error) {
      console.error(`Error checking if user is member of group ${groupId}:`, error);
      return false;
    }
  }
  
  /**
   * Get recent files for the user
   */
  public async getRecentFiles(count: number = 5): Promise<MicrosoftGraph.DriveItem[]> {
    try {
      const client = await this.getGraphClient();
      const response = await client
        .api('/me/drive/recent')
        .top(count)
        .get();
      
      return response.value;
    } catch (error) {
      console.error('Error getting recent files:', error);
      return [];
    }
  }

  /**
   * Get user's upcoming events
   */
  public async getCalendarEvents(days: number = 7): Promise<MicrosoftGraph.Event[]> {
    try {
      const today = new Date();
      const endDate = new Date();
      endDate.setDate(today.getDate() + days);
      
      const client = await this.getGraphClient();
      const response = await client
        .api('/me/calendar/events')
        .filter(`start/dateTime ge '${today.toISOString()}' and end/dateTime le '${endDate.toISOString()}'`)
        .top(10)
        .orderby('start/dateTime')
        .get();
      
      return response.value;
    } catch (error) {
      console.error('Error getting calendar events:', error);
      return [];
    }
  }
}