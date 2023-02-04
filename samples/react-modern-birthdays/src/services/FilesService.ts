/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServiceScope } from '@microsoft/sp-core-library';
import { SPHttpClient } from '@microsoft/sp-http';

import { FileInfo } from '../models/FileInfo';
import { UrlUtilities } from '../utils/UrlUtilities';

export class FilesService {
  private spHttpClient: SPHttpClient;
  public constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this.spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
    });
  }
  public async getSPFileInfo(absoluteFileUrl: string): Promise<FileInfo> {
    try {
      // Parse URL to obtain proper web URL
      const remoteWebAbsoluteUrl = this.getSPSiteAbsoluteUrl(absoluteFileUrl);
      const fileServerRelativeUrl = this.getFileServerRelativeUrl(absoluteFileUrl);

      const apiUrl = `${remoteWebAbsoluteUrl}/_api/web/getFileByServerRelativeUrl('${fileServerRelativeUrl}')?$select=UniqueId,ListId,WebId,SiteId`;
      const fileInfoResult = await this.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (!fileInfoResult || !fileInfoResult.ok) {
        throw new Error(`Something went wrong when retriving file info. Status='${fileInfoResult.status}'`);
      }

      const fileInfoData = await fileInfoResult.json();
      const result: FileInfo = {
        Id: fileInfoData.UniqueId,
        ListId: fileInfoData.ListId,
        WebId: fileInfoData.WebId,
        ServerRelativeUrl: fileServerRelativeUrl,
        AbsoluteFileUrl: absoluteFileUrl,
        SiteId: fileInfoData.SiteId
      };
      return result;
    } catch (error) {
      console.error(`[FilesService.getFileInfo.getFileInfo]: error='${error.message}'`);
      return null;
    }
  }
  public async checkIfListExists(siteUrl: string, listUrl: string): Promise<boolean> {
    let exists = false;

    try {

      const url: URL = new URL(siteUrl);
      const apiUrl = `${siteUrl}/_api/web/GetList(@listUrl)?$select=Title&@listUrl='${UrlUtilities().trimEndCharacter(
        url.pathname,
        "/"
      )}/${listUrl}'`;
      const data = await this.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);

      if (data.ok) {
        exists = true;
      }
    } catch (error) {
      console.error(
        `ListService:checkIfListExists: Something failed checking if the list exists. error='${error.message}'`
      );
    }
    return exists;
  }
  public async ensureSiteAssetsFile(webUrl: string, file: File, folderAbsoluteUrl: string, fileName?: string): Promise<FileInfo> {
    try {
      const dstWebUrl = new URL(webUrl);
      // Parse URL to obtain proper web URL
      const foldersNames = folderAbsoluteUrl.replace(`${webUrl}/`, "").split("/");
      const libraryName = foldersNames.shift();
      const spFileName = fileName ? fileName : file.name;
      const ensureFolderApiUrl = `${webUrl}/_api/web/folders`;

      // Ensure SiteAssets library exists

      const siteAssetsExists = await  this.checkIfListExists(webUrl, libraryName);
      if (!siteAssetsExists) {
        throw new Error('No Site Assets library could be found on the target site. Please create it first');
      }

      let currentFolderPath = `${dstWebUrl.pathname}/${libraryName}`;
      for (let i = 0; i < foldersNames.length; i++) {
        const folderName = foldersNames[i];
        const escapedFolderName = folderName.replace(/[/\\?%*:|"'<>@#./]/g, "_");
        const normalizedFolderName = escapedFolderName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        currentFolderPath += `/${normalizedFolderName}`;
        currentFolderPath = UrlUtilities().trimBeginDoubleSlash(currentFolderPath);
        // Ensure folder
        await this.spHttpClient.post(ensureFolderApiUrl, SPHttpClient.configurations.v1, {
          headers: {
            "accept": "application/json;odata=nometadata",
            "content-type": "application/json;odata=nometadata",
            "odata-version": ""
          },
          body: JSON.stringify({
            'ServerRelativeUrl': currentFolderPath
          })
        });
      }

      // Folders are created -> upload file
      const uploadFileUrl = `${webUrl}/_api/web/GetFolderByServerRelativePath(decodedUrl='${currentFolderPath}')/Files/add(url='${spFileName}',overwrite=true)`;
      const fileContent = await this.readFileContent(file);
      const uploadFileResult = await this.spHttpClient.post(uploadFileUrl, SPHttpClient.configurations.v1, {
        headers: {
          "accept": "application/json;odata=nometadata",
          "content-type": "application/json;odata=nometadata",
          "odata-version": ""
        },
        body: fileContent
      });


      if (!uploadFileResult || !uploadFileResult.ok) {
        throw new Error('Something went wrong when uploading file.');
      }
      return this.getSPFileInfo(`https://${window.location.hostname}${currentFolderPath}/${spFileName}`);
    } catch (error) {
      console.error(`[FilesService.ensureSiteAssetsFile]: error='${error.message}'`);
      return null;
    }
  }

  private readFileContent(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onloadend = (e) => {
        resolve(fr.result);
      };
      fr.readAsArrayBuffer(file);
    });
  }

  private getSPSiteAbsoluteUrl(absolutefileUrl: string): string {
    const hostname = window.location.hostname;
    const rootSiteUrl = `https://${hostname}`;
    if (absolutefileUrl.indexOf(`${rootSiteUrl}/sites/`) > -1 || absolutefileUrl.indexOf(`${rootSiteUrl}/teams/`) > -1) {
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
  }

  private getFileServerRelativeUrl(absoluteFileUrl: string): string {
    let fileServerRelativeUrl = absoluteFileUrl.split(window.location.hostname)[1];
    fileServerRelativeUrl = UrlUtilities().trimBeginDoubleSlash(fileServerRelativeUrl);
    return fileServerRelativeUrl;
  }
}
