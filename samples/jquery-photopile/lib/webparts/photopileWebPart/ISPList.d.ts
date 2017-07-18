/**
 * @file
 * SharePoint List & ListItems interface definitions
 *
 * Author: Olivier Carpentier
 */
/**
 * @interface
 * Defines a collection of SharePoint lists
 */
export interface ISPLists {
    value: ISPList[];
}
/**
 * @interface
 * Defines a SharePoint list
 */
export interface ISPList {
    Title: string;
    Id: string;
    BaseTemplate: string;
}
/**
 * @interface
 * Defines a SharePoint list's file
 */
export interface ISPFile {
    Name: string;
    ServerRelativeUrl: string;
    ThumbnailServerUrl?: string;
}
/**
 * @interface
 * Defines a collection of SharePoint list items
 */
export interface ISPListItems {
    value: ISPListItem[];
}
/**
 * @interface
 * Defines a SharePoint list item
 */
export interface ISPListItem {
    ID: string;
    Title?: string;
    Description?: string;
    File: ISPFile;
}
