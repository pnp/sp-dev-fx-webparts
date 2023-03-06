import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class SharePointRest {
  private static async makeRequest(url: string, spHttpClient: SPHttpClient, requestType: string, itemData?: any): Promise<any> {
    try {
      const response: SPHttpClientResponse = await spHttpClient.fetch(url, SPHttpClient.configurations.v1, {
        method: requestType,
        headers: {
          'Accept': 'application/json;odata.metadata=none',
          'Content-type': 'application/json;odata=verbose',
          'odata-version': '',
          ...(requestType === 'DELETE' ? {'X-HTTP-Method': 'DELETE', 'IF-MATCH': '*'} : {})
        },
        body: requestType === 'POST' || requestType === 'MERGE' ? JSON.stringify(itemData) : undefined
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        console.error(`Error in ${requestType} SharePoint data`, responseJson.error);
        return undefined;
      }
      return requestType === 'GET' ? responseJson.value[0] : responseJson.value;
    } catch (error) {
      console.error(`Error in ${requestType} SharePoint data`, error);
      return undefined;
    }
  }

  public static async getItem(spHttpClient: SPHttpClient, siteUrl: string, listName: string, itemId: number, selectColumns?: string[]): Promise<any> {
    const selectString = selectColumns ? selectColumns.join(',') : '';
    const url = `${siteUrl}/_api/web/lists/getByTitle('${listName}')/items?$filter=Id eq ${itemId}&$select=${selectString}`;
    return await this.makeRequest(url, spHttpClient, 'GET');
  }

  public static async postItem(spHttpClient: SPHttpClient, siteUrl: string, listName: string, itemData: any): Promise<any> {
    const url = `${siteUrl}/_api/web/lists/getByTitle('${listName}')/items`;
    return await this.makeRequest(url, spHttpClient, 'POST', itemData);
  }

  public static async updateItem(spHttpClient: SPHttpClient, siteUrl: string, listName: string, itemId: number, itemData: any): Promise<any> {
    const url = `${siteUrl}/_api/web/lists/getByTitle('${listName}')/items(${itemId})`;
    return await this.makeRequest(url, spHttpClient, 'MERGE', itemData);
  }

  public static async deleteItem(spHttpClient: SPHttpClient, siteUrl: string, listName: string, itemId: number): Promise<any> {
    const url = `${siteUrl}/_api/web/lists/getByTitle('${listName}')/items(${itemId})`;
    return await this.makeRequest(url, spHttpClient, 'DELETE');
  }
}
