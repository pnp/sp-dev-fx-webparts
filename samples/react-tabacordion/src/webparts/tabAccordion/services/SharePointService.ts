import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface ISharePointListItem {
  Id: string;
  Title: string;
  Content: string;
  [key: string]: any;
}

export class SharePointService {
  private context: WebPartContext;

  constructor(context: WebPartContext) {
    this.context = context;
  }

  /**
   * Get items from a SharePoint list
   */
  public async getListItems(
    listUrl: string, 
    titleColumn: string, 
    contentColumn: string, 
    orderByColumn: string,
    maxItems: number
  ): Promise<ISharePointListItem[]> {
    try {
      // Make sure the list URL is valid
      if (!listUrl) {
        throw new Error('List URL is required');
      }
      
      // If list URL starts with a slash, it's a server-relative URL
      // If not, it's a list name
      let apiUrl: string;
      if (listUrl.startsWith('/')) {
        // Server-relative URL
        apiUrl = `${this.context.pageContext.web.absoluteUrl}/_api/web/getList('${listUrl}')/items`;
      } else {
        // List name
        apiUrl = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('${listUrl}')/items`;
      }
      
      // Add query parameters
      apiUrl += `?$select=Id,${titleColumn},${contentColumn}`;
      
      // Add orderby if specified
      if (orderByColumn) {
        apiUrl += `&$orderby=${orderByColumn}`;
      }
      
      // Add max items if specified
      if (maxItems && maxItems > 0) {
        apiUrl += `&$top=${maxItems}`;
      }
      
      // Make the HTTP request
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        apiUrl,
        SPHttpClient.configurations.v1
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      
      // Get the response as JSON
      const data = await response.json();
      
      // Map the response to our expected format
      return data.value.map((item: any) => ({
        Id: item.Id,
        Title: item[titleColumn] || item.Title,
        Content: item[contentColumn] || '',
        ...item
      }));
    } catch (error) {
      console.error('Error fetching list items:', error);
      throw error;
    }
  }
  
  /**
   * Get available lists in the current site
   */
  public async getAvailableLists(): Promise<{ title: string, url: string }[]> {
    try {
      const apiUrl = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false&$select=Title,RootFolder/ServerRelativeUrl&$expand=RootFolder`;
      
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        apiUrl,
        SPHttpClient.configurations.v1
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return data.value.map(list => ({
        title: list.Title,
        url: list.RootFolder.ServerRelativeUrl
      }));
    } catch (error) {
      console.error('Error fetching available lists:', error);
      return [];
    }
  }
  
  /**
   * Get columns for a specific list
   */
  public async getListColumns(listUrl: string): Promise<{ title: string, internalName: string, type: string }[]> {
    try {
      // If list URL starts with a slash, it's a server-relative URL
      // If not, it's a list name
      let apiUrl: string;
      if (listUrl.startsWith('/')) {
        // Server-relative URL
        apiUrl = `${this.context.pageContext.web.absoluteUrl}/_api/web/getList('${listUrl}')/fields`;
      } else {
        // List name
        apiUrl = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('${listUrl}')/fields`;
      }
      
      // Filter out hidden and system columns
      apiUrl += `?$filter=Hidden eq false and FromBaseType eq false&$select=Title,InternalName,TypeAsString`;
      
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        apiUrl,
        SPHttpClient.configurations.v1
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return data.value.map(field => ({
        title: field.Title,
        internalName: field.InternalName,
        type: field.TypeAsString
      }));
    } catch (error) {
      console.error('Error fetching list columns:', error);
      return [];
    }
  }
}