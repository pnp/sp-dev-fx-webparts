import { IImage } from "../../../Interfaces";

export interface IImageGalleryState {
    showPanel: boolean;
    selectedImage?: IImage;
    showLoader: boolean;
    itemsNotFoundMessage?: string,
    sQuery?: string,
    dQuery?: string
    itemsNotFound?: boolean,
    itemCount?: number;
    pageSize?: number;
    currentPage?: number;
    items?: any[];
    status?: string;
    nextLink: string;
  }
  