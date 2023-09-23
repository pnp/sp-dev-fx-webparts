import { useCallback } from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export const useSharePointRest = (spHttpClient: SPHttpClient, siteUrl: string) => {

  const getItem = useCallback(async (listName: string, itemId: number, selectColumns?: string[]) => {
    const selectString = selectColumns ? selectColumns.join(',') : '';
    const url = `${siteUrl}/_api/web/lists/getByTitle('${listName}')/items?$filter=Id eq ${itemId}&$select=${selectString}`;
    try {
      const response: SPHttpClientResponse = await spHttpClient.get(url, SPHttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata.metadata=none'
        }
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        console.error('Error in get SharePoint data', responseJson.error);
        return undefined;
      }
      return responseJson.value[0];
    } catch (error) {
      console.error('Error in get SharePoint data', error);
      return undefined;
    }
  }, [spHttpClient, siteUrl]);

  const postItem = useCallback(async (listName: string, itemData: any) => {
    const url = `${siteUrl}/_api/web/lists/getByTitle('${listName}')/items`;
    try {
      const response: SPHttpClientResponse = await spHttpClient.post(url, SPHttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata.metadata=none',
          'Content-type': 'application/json;odata=verbose',
          'odata-version': ''
        },
        body: JSON.stringify(itemData)
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        console.error('Error in post SharePoint data', responseJson.error);
        return undefined;
      }
      return responseJson.value;
    } catch (error) {
      console.error('Error in post SharePoint data', error);
      return undefined;
    }
  }, [spHttpClient, siteUrl]);

  const updateItem = useCallback(async (listName: string, itemId: number, itemData: any) => {
    const url = `${siteUrl}/_api/web/lists/getByTitle('${listName}')/items(${itemId})`;
    try {
      const response: SPHttpClientResponse = await spHttpClient.post(url, SPHttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata.metadata=none',
          'Content-type': 'application/json;odata=verbose',
          'odata-version': '',
          'X-HTTP-Method': 'MERGE',
          'IF-MATCH': '*'
        },
        body: JSON.stringify(itemData)
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        console.error('Error in update SharePoint item', responseJson.error);
        return undefined;
      }
      return responseJson.value;
    } catch (error) {
      console.error('Error in update SharePoint item', error);
      return undefined;
    }
  }, [spHttpClient, siteUrl]);


  const deleteItem = useCallback(async (listName: string, itemId: number) => {
    const url = `${siteUrl}/_api/web/lists/getByTitle('${listName}')/items(${itemId})`;
    try {
      const response: SPHttpClientResponse = await spHttpClient.post(url, SPHttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata.metadata=none',
          'X-HTTP-Method': 'DELETE',
          'IF-MATCH': '*'
        }
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        console.error('Error in delete SharePoint item', responseJson.error);
        return undefined;
      }
      return responseJson;
    } catch (error) {
      console.error('Error in delete SharePoint item', error);
      return undefined;
    }
  }, [spHttpClient, siteUrl]);

  return { getItem, postItem, updateItem, deleteItem };
};
