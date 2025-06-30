import '@pnp/sp/lists';
import '@pnp/sp/sites';
import '@pnp/sp/files';
import '@pnp/sp/files/web';

import { useCallback } from 'react';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SPFI } from '@pnp/sp';
import { IRenderListDataParameters } from '@pnp/sp/lists';
import { Web } from '@pnp/sp/webs';

import { ICommentsAndLikes } from '../models/ICommentsAndLikes';
import { FileInfo } from '../models/IFileInfo';
import { getSP } from '../pnpjs/pnpjsConfig';
import { useUtils } from './useUtils';

/* eslint-disable no-useless-escape */

export const usePnPjs = () => {
  const sp: SPFI = getSP();
  const { trimBeginDoubleSlash } =  useUtils();

  const getCommentsAndLikesForPage = useCallback(
    async (pageUrl: string, listId: string, itemId: string): Promise<ICommentsAndLikes> => {
      try {
     const webUrl = pageUrl.split("/SitePages")[0]; 
      // bug error when title has "'" character disbale PnPJs getWebUrlFromPageUrl
     /*     const webUrl: string = await sp.site.getWebUrlFromPageUrl(encodeURI(pageUrl));   */
        const spWebNews = Web([sp.web, webUrl]);
        const list = spWebNews.lists.getById(listId);

        const renderListDataParams: IRenderListDataParameters = {
          ViewXml: `<View><ViewFields><FieldRef Name=\"_LikeCount\" /><FieldRef Name=\"_CommentCount\" /></ViewFields><Query><Where><Eq><FieldRef Name=\"ID\"/><Value Type=\"Number\">${itemId}</Value></Eq></Where></Query><RowLimit /></View>`,
        };
        const rs = await list.renderListDataAsStream(renderListDataParams);
        return { comments: rs.Row[0]._CommentCount.toString(), likes: rs.Row[0]._LikeCount.toString() };
      } catch (error) {
        throw new Error(`Something went wrong when retriving  Comments and Likes Url='${pageUrl}`);
        return { comments: undefined, likes: undefined };
      }
    },
    [sp]
  );

  const getSPSiteAbsoluteUrl = useCallback((absolutefileUrl: string): string => {
    const hostname = window.location.hostname;
    const rootSiteUrl = `https://${hostname}`;
    if (
      absolutefileUrl.indexOf(`${rootSiteUrl}/sites/`) > -1 ||
      absolutefileUrl.indexOf(`${rootSiteUrl}/teams/`) > -1
    ) {
      const fileServerRelativeUrl = absolutefileUrl.split(hostname)[1];
      // Split server relative URL by '/' to obtain web name
      const webName = fileServerRelativeUrl.split("/")[2];

      let webAbsoluteUrl = `https://${hostname}/sites/${webName}`;
      if (absolutefileUrl.indexOf(`${rootSiteUrl}/teams/`) > -1) {
        webAbsoluteUrl = `https://${hostname}/teams/${webName}`;
      }
      return webAbsoluteUrl;
    }
    return rootSiteUrl;
  }, []);

  const getFileServerRelativeUrl = useCallback((absoluteFileUrl: string): string => {
    let fileServerRelativeUrl = absoluteFileUrl.split(window.location.hostname)[1];
    fileServerRelativeUrl = trimBeginDoubleSlash(fileServerRelativeUrl);
    return fileServerRelativeUrl;
  }, []);

  const getSPFileInfo = useCallback(async (absoluteFileUrl: string): Promise<FileInfo> => {
    // Parse URL to obtain proper web URL
    try {
      const remoteWebAbsoluteUrl = getSPSiteAbsoluteUrl(absoluteFileUrl);
     const fileServerRelativeUrl = getFileServerRelativeUrl(absoluteFileUrl); 
     const spWeb  = Web([sp.web, remoteWebAbsoluteUrl]);
        const fileInfoResult = spWeb.getFileByServerRelativePath(fileServerRelativeUrl).select("UniqueId", "ListId", "WebId", "SiteId");
     /*  const apiUrl = `${remoteWebAbsoluteUrl}/_api/web/getFileByServerRelativeUrl('${fileServerRelativeUrl}')?$select=UniqueId,ListId,WebId,SiteId`;
      const fileInfoResult = await spHttpClient.get(apiUrl, SPHttpClient.configurations.v1); */
      if (!fileInfoResult  ) {
        throw new Error(`Something went wrong when retriving file info. Url='${absoluteFileUrl}`);
      }

      const fileInfoData = await fileInfoResult();
      const result: FileInfo = {
        Id: fileInfoData.UniqueId,
        ListId: fileInfoData.ListId,
        WebId: fileInfoData.WebId,
        ServerRelativeUrl: fileServerRelativeUrl,
        AbsoluteFileUrl: absoluteFileUrl,
        SiteId: fileInfoData.SiteId,
      };
      return result;
    } catch (err) {
      console.error(`[getFileInfo.getFileInfo]: Err='${err.message}'`);
      return null;
    }
  }, []);

  return {getCommentsAndLikesForPage,getSPFileInfo };
};
