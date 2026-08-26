import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClientV3 } from "@microsoft/sp-http";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";

export class GraphService {
  private _context: WebPartContext;
  private _graphClient: MSGraphClientV3;

  constructor(context: WebPartContext) {
    this._context = context;
  }

  /**
   * Get Microsoft Graph Client
   */
  private async getGraphClient(): Promise<MSGraphClientV3> {
    if (!this._graphClient) {
      this._graphClient = await this._context.msGraphClientFactory.getClient('3');
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
        .select('displayName,mail,userPrincipalName,jobTitle')
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