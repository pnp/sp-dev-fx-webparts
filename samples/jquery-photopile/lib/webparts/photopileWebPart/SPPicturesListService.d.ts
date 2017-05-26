/// <reference types="es6-promise" />
/**
 * @file
 * Service to get list & list items from current SharePoint site
 *
 * Author: Olivier Carpentier
 */
import { ISPLists, ISPListItems } from './ISPList';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IPhotopileWebPartProps } from './IPhotopileWebPartProps';
/**
 * @interface
 * Service interface definition
 */
export interface ISPPicturesListService {
    /**
     * @function
     * Gets the list of picture libs in the current SharePoint site
     */
    getPictureLibs(): Promise<ISPLists>;
    /**
     * @function
     * Gets the pictures from a SharePoint list
     */
    getPictures(libId: string): Promise<ISPListItems>;
}
/**
 * @class
 * Service implementation to get list & list items from current SharePoint site
 */
export declare class SPPicturesListService implements ISPPicturesListService {
    private context;
    private props;
    /**
     * @function
     * Service constructor
     */
    constructor(_props: IPhotopileWebPartProps, pageContext: IWebPartContext);
    /**
     * @function
     * Gets the list of picture libs in the current SharePoint site
     */
    getPictureLibs(): Promise<ISPLists>;
    /**
     * @function
     * Returns 3 fake SharePoint lists for the Mock mode
     */
    private getPictureLibsFromMock();
    /**
     * @function
     * Gets the pictures from a SharePoint list
     */
    getPictures(libId: string): Promise<ISPListItems>;
    /**
     * @function
     * Gets the thumbnail picture url from the Picture name.
     * In SharePoint pictures libs, the thumbnail url is formated as for example '/_t/10_jpg.jpg'
     */
    private getThumbnailUrl(pictureUrl, pictureName);
    /**
     * @function
     * Gets the pictures list from the mock. This function will return a
     * different list of pics for the lib 1 & 2, and an empty list for the third.
     */
    private getPicturesFromMock(libId);
}
