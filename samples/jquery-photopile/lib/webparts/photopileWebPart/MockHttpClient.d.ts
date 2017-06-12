/// <reference types="es6-promise" />
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
    private static _lists;
    /**
     * @var
     * Mock SharePoint list item sample
     */
    private static _items;
    /**
     * @function
     * Mock get SharePoint list request
     */
    static getLists(restUrl: string, options?: any): Promise<ISPList[]>;
    /**
     * @function
     * Mock get SharePoint list items request
     */
    static getListsItems(restUrl: string, options?: any): Promise<ISPListItem[]>;
}
