/**
 * @file
 * Photopile Web Part properties definition
 *
 * Author: Olivier Carpentier
 */
import { IWebPartContext } from '@microsoft/sp-webpart-base';
export interface IPhotopileWebPartWebPartProps {
    listName: string;
    orderBy: string;
    orderByAsc: string;
    count: number;
    numLayers: number;
    thumbOverlap: number;
    thumbRotation: number;
    thumbBorderWidth: number;
    thumbBorderColor: string;
    thumbBorderHover: string;
    draggable: boolean;
    fadeDuration: number;
    pickupDuration: number;
    photoZIndex: number;
    photoBorder: number;
    photoBorderColor: string;
    showInfo: boolean;
    autoplayGallery: boolean;
    autoplaySpeed: number;
    context: IWebPartContext;
}
