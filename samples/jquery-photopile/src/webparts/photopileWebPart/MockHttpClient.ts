/**
 * @file
 * Implement a http client to request mock data to use the
 * web part with the local workbench
 *
 * Author: Olivier Carpentier
 */
import { ISPList, ISPListItem } from './ISPList';

/**
 * @class
 * Defines a http client to request mock data to use the web part with the local workbench
 */
export default class MockHttpClient {

    /**
     * @var
     * Mock SharePoint list sample
     */
    private static _lists: ISPList[] = [{ Title: 'Mock List', Id: '1', BaseTemplate: '109' }];

    /**
     * @var
     * Mock SharePoint list item sample
     */
    private static _items: ISPListItem[] = [
      { "ID": "1", "Title": "Pic 1", "Description": "", "File": { "Name": "1.jpg", "ServerRelativeUrl": "/Images/1.jpg" } }
    ];

    /**
     * @function
     * Mock get SharePoint list request
     */
    public static getLists(restUrl: string, options?: any): Promise<ISPList[]> {
      return new Promise<ISPList[]>((resolve) => {
            resolve(MockHttpClient._lists);
        });
    }

    /**
     * @function
     * Mock get SharePoint list items request
     */
    public static getListsItems(restUrl: string, options?: any): Promise<ISPListItem[]> {
      return new Promise<ISPListItem[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
}