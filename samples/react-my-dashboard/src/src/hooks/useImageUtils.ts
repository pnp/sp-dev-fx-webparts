/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { isEmpty } from 'lodash';

import {
  DATA_IMAGE,
  MS_TEAMS_IMAGE_WIDTH,
} from '../constants/constants';
import { FileInfo } from '../models/IFileInfo';
import { useCache } from './useLocalStorage';
import { usePnPjs } from './usePnPjs';

export const useImageUtils = () => {
  const { getSPFileInfo } = usePnPjs();
  const  {getCacheValue, setCacheValue} = useCache("local");    
    
  const getImageBase64 =  useCallback(async (pictureUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.addEventListener("load", () => {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = image.width;
        tempCanvas.height = image.height;
        tempCanvas.getContext("2d").drawImage(image, 0, 0);
        let base64Str;
        try {
          base64Str = tempCanvas.toDataURL("image/png");
        } catch (err) {
          if (DEBUG) {
            console.error(`[ImageService.getBase64Image]: Err='${err.message}'`);
          }
          return "";
        }
        resolve(base64Str);
      });
      image.src = pictureUrl;
    });
  }, []);

  const isBase64Image = useCallback((data: string) => {
    return !isEmpty(data) && data.indexOf(DATA_IMAGE) >= 0;
  }, []);

  const getBase64ImageFromDOMImg = useCallback((imgElementId: string): string => {
    try {
      const imgElement = document.getElementById(imgElementId) as any;
      const canvas = document.createElement("canvas");
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(imgElement, 0, 0);
      const dataURL = canvas.toDataURL("image/png");

      return dataURL;
    } catch (err) {
      if (DEBUG) {
        console.error(`[getBase64ImageFromDOMImg]: Err='${err.message}'`);
      }
      return null;
    }
  }, []);

  const isSharePointImage = useCallback((fileUrl: string) => {
    return !isEmpty(fileUrl) && fileUrl.indexOf(window.location.origin) >= 0;
  }, []);

  const isStockImage = useCallback((fileUrl: string) => {
    return !isEmpty(fileUrl) && fileUrl.indexOf("cdn.hubblecontent.osi.office.net") > 0;
  }, []);

  const getPictureThumbnailUrl = useCallback( async (fileUrl: string, toUseIn?: string): Promise<string> => {
    const cacheKey:string = `__${fileUrl}`;
    try {
      if (isEmpty(fileUrl)) {
        return null;
      }
      // try get file image from cache
      const cacheValue = getCacheValue(cacheKey);
      if (cacheValue) { return cacheValue; }
      // Is already thumbnail
      if (fileUrl.indexOf("driveItem/thumbnails") > 0) {
        return fileUrl;
      }
      if (isSharePointImage(fileUrl)) {
        if (isStockImage(fileUrl)) {
          return getStockImageThumbnailUrl(fileUrl);
        }
        if (isSharePointFilePathPreviewImage(fileUrl)) {
          return await getSharePointThumbnailImageUrl(getSharePointFileUrlFromPreview(fileUrl), toUseIn);
        }
        if (isSharePointFileIdsPreviewImage(fileUrl)) {
          return await getCDNBaseSPThumbnailUrl(getFileInfoFromQueryString(fileUrl));
        }
      }
      if (fileUrl.indexOf("data:image/") === 0) {
        return fileUrl;
      }
      // Try to download image and convert it to base64data
      const img = await getImageBase64(fileUrl);
      setCacheValue(cacheKey, img);
      return img;
    } catch (err) {
      if (DEBUG) {
        console.error(`[getPictureThumbnailUrl]: Err='${err.message}'`);
      }
      return null;
    }
  }, []);

  const isSharePointFilePathPreviewImage = useCallback((fileUrl: string): boolean => {
    return fileUrl.indexOf("/_layouts/15/getpreview.ashx") >= 0 && fileUrl.indexOf("guidSite") < 0;
  }, []);

  const getFileInfoFromQueryString = useCallback((serverRelativeFileUrl: string): FileInfo => {
    // serverRelativeFileUrl in the form /_layouts/15/getpreview.ashx?guidSite=<site-guid>&guidWeb=<web-guid>>&guidFile=<fileGuid>

    const fileUrl = new URL(`${window.location.origin}${serverRelativeFileUrl}`);

    const urlParams = new URLSearchParams(fileUrl.search);

    const siteId: string = urlParams.get("guidSite");
    const fileId: string = urlParams.get("guidFile");

    return {
      SiteId: siteId,
      Id: fileId,
    } as FileInfo;
  }, []);

  const isSharePointFileIdsPreviewImage = useCallback((fileUrl: string): boolean => {
    // After the news is created the BannerImageUrl is in different form:
    // /_layouts/15/getpreview.ashx?guidSite=<site-guid>&guidWeb=<web-guid>>&guidFile=<fileGuid>
    return (
      fileUrl.indexOf("/_layouts/15/getpreview.ashx") >= 0 &&
      fileUrl.indexOf("guidSite") > 0 &&
      fileUrl.indexOf("guidFile") > 0
    );
  }, []);

  const getStockImageThumbnailUrl = useCallback((fileUrl: string): string => {
    // Check if the fileUrll is already in a correct format
    if (fileUrl.indexOf("?file=") > 0 && fileUrl.indexOf("thumbnails/large.jpg") > 0) {
      return fileUrl;
    }

    const imagePictureTokens = fileUrl.split("/");
    const fileId = imagePictureTokens[imagePictureTokens.length - 1];
    const thumbnailUrl = fileUrl.replace(fileId, "thumbnails/large.jpg") + `?file=${fileId}`;

    return thumbnailUrl;
  }, []);

  const getSharePointFileUrlFromPreview = useCallback((previewUrl: string): string => {
    const decodedUrl = decodeURIComponent(previewUrl);
    const serverRelativeUrl = decodedUrl.replace("/_layouts/15/getpreview.ashx?path=", "");
    const absoluteFileUrl = `${window.location.origin}${serverRelativeUrl}`;

    return absoluteFileUrl;
  }, []);

  const getSharePointThumbnailImageUrl =  useCallback(async (fileUrl: string, toUseIn: string) => {
    try {
      const fileInfo = await getSPFileInfo(fileUrl);
      if (toUseIn !== "AdaptiveCards") {
        return await getCDNBaseSPThumbnailUrl(fileInfo);
      }

      return await getCDNBaseSPThumbnailUrlToAdaptiveCards(fileInfo);
    } catch (err) {
      if (DEBUG) {
        console.error(`[getSharePointThumbnailImageUrl]: Err='${err.message}'`);
      }
    }
  }, []);

  const getCDNBaseSPThumbnailUrl = useCallback(async (spFileInfo: FileInfo): Promise<string> => {
    try {
      const tenantOrigin = window.location.host;
      const rawThumbnailUrl = `https://${tenantOrigin}/_api/v2.1/sites/${tenantOrigin},${spFileInfo.SiteId}/items/${spFileInfo.Id}/driveItem/thumbnails/0/large/content?preferNoRedirect=true`;
      const thumbnailUrl = rawThumbnailUrl.replace("width=800&height=800", `width=${MS_TEAMS_IMAGE_WIDTH}`);
      return thumbnailUrl;
    } catch (err) {
      if (DEBUG) {
        console.error(`[getCDNBaseSPThumbnailUrl]: Err='${err.message}'`);
      }
      return null;
    }
  }, []);

  const getCDNBaseSPThumbnailUrlToAdaptiveCards = useCallback(async (spFileInfo: FileInfo): Promise<string> => {
    try {
      const tenantOrigin = window.location.host;
      const predefinedResolution = "large";
      const rawThumbnailUrl = `https://${tenantOrigin}/_api/v2.1/sites/${tenantOrigin},${spFileInfo.SiteId}/items/${spFileInfo.Id}/driveItem/thumbnails/0/${predefinedResolution}/content?preferNoRedirect=true`;
      return rawThumbnailUrl;
    } catch (err) {
      if (DEBUG) {
        console.error(`[getCDNBaseSPThumbnailUrlToAdaptiveCards]: Err='${err.message}'`);
      }
      return null;
    }
  }, []);

  return {
    getBase64ImageFromDOMImg,
    isBase64Image,
    getImageBase64,
    getPictureThumbnailUrl,
    isSharePointFilePathPreviewImage,
    getFileInfoFromQueryString,
    isSharePointFileIdsPreviewImage,
    getStockImageThumbnailUrl,
    getSharePointFileUrlFromPreview,
    getSharePointThumbnailImageUrl,
    getCDNBaseSPThumbnailUrl,
    getCDNBaseSPThumbnailUrlToAdaptiveCards,
  };
};
