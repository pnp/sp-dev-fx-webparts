import { MSGraphClient } from '@microsoft/sp-http';
import { IFolder } from '../models/IFolder';

export class GraphHelper {
  private graphClient: MSGraphClient;

  constructor(_graphClient: MSGraphClient) {
    this.graphClient = _graphClient;
  }

  public getOneDriveFolders(): Promise<IFolder[]> {
    return this.graphClient
      .api('me/drive/root/children')
      .version('v1.0')
      .filter('folder ne null')
      .select('id, name, parentReference, webUrl')
      .get()
      .then((response): any => {
        let folders: IFolder[] = [];
        response.value.map((item) => {
          folders.push({
            id: item.id,
            name: item.name,
            driveID: item.parentReference.driveId,
            parentFolder: null,
            webUrl: item.webUrl
          });
        });
        console.log('One Drive Folders: ', folders);
        return folders;
      });
  }

  public getSubFolder(folder: IFolder): Promise<IFolder[]> {
    return this.graphClient
      .api(`me/drive/items/${folder.id}/children`)
      .version('v1.0')
      .filter('folder ne null')
      .select('id, name, parentReference, webUrl')
      .get()
      .then((response): any => {
        let folders: Array<IFolder> = new Array<IFolder>();
        response.value.forEach((item) => {
          folders.push({
            id: item.id,
            name: item.name,
            driveID: item.parentReference.driveId,
            parentFolder: folder,
            webUrl: item.webUrl
          });
        });
        console.log(`One Drive Sub-Folders for ${folder.name}: `, folders);
        return folders;
      });
  }

  public async getAttachmentContent(messageId: string, attachmentId: string) {
    const attachmentContent: any = await this.graphClient
      .api(`me/messages/${messageId}/attachments/${attachmentId}/$value`)
      .version('v1.0')
      .responseType('blob')
      .get();
    console.log(`Attachment Content for ${attachmentId}: `, attachmentContent);
    return attachmentContent;
  }

  public async saveAttachment(mimeStream: string, fileName: string, folderId: string): Promise<string> {
    const odApi = folderId === '' ? `/me/drive/root:/${fileName}:/content` : `/me/drive/items/${folderId}:/${fileName}:/content`;
    const saveResult = await this.graphClient
      .api(odApi)
      .put(mimeStream);
    console.log(`Save Attachment result for ${fileName}: `, saveResult);
    return saveResult;
  }

  public async saveLargeAttachment(mimeStream: any, fileName: string, folderId: string) {
    const sessionOptions = {
      "item": {
        "@microsoft.graph.conflictBehavior": "rename"
      }
    };
    const apiUrl = folderId !== '' ? `/me/drive/items/${folderId}:/${fileName}:/createUploadSession` : `/me/drive/root:/${fileName}:/createUploadSession`;
    return this.graphClient
      .api(apiUrl)
      .post(JSON.stringify(sessionOptions))
      .then(async (response): Promise<any> => {
        try {
          console.log(`Upload URL created for ${fileName}: ${response.uploadUrl}`);
          const resp = await this.saveToUploadSession(mimeStream, response.uploadUrl);
          console.log(`Save Large Attachment result for ${fileName}: `, resp);
          return resp;
        }
        catch (err) {
          return null;
        }
      });
  }

  private async saveToUploadSession(mimeStream: any, uploadUrl: string) {
    let minSize = 0;
    let maxSize = 5 * 327680; //https://docs.microsoft.com/en-us/graph/api/driveitem-createuploadsession?view=graph-rest-1.0#upload-bytes-to-the-upload-session
    while (mimeStream.size > minSize) {
      const fileSlice = mimeStream.slice(minSize, maxSize);
      const resp = await this.uploadIndividualSlice(uploadUrl, minSize, maxSize, mimeStream.size, fileSlice);
      minSize = maxSize;
      maxSize += 5 * 327680;
      if (maxSize > mimeStream.size) {
        maxSize = mimeStream.size;
      }
      if (resp.id !== undefined) {
        return resp;
      }
    }
  }

  private async uploadIndividualSlice(uploadUrl: string, minSize: number, maxSize: number, totalSize: number, fileSlice: string) {
    const header = {
      "Content-Length": `${maxSize - minSize}`,
      "Content-Range": `bytes ${minSize}-${maxSize - 1}/${totalSize}`,
    };
    const saveResult = await this.graphClient
      .api(uploadUrl)
      .headers(header)
      .put(fileSlice);
    return saveResult;
  }
}
