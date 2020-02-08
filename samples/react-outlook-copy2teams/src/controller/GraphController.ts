import { MSGraphClient, MSGraphClientFactory } from '@microsoft/sp-http';
import Utilities from './Utilities';
import { IFolder } from '../model/IFolder';
import { IMail } from '../model/IMail';

export default class GraphController {
  private client: MSGraphClient;

  constructor (graphFactory: MSGraphClientFactory, callback: () => void) {    
    graphFactory
      .getClient()
      .then((client: MSGraphClient) => {
        this.client = client;
        callback();
      });   
      
    this.retrieveMimeMail = this.retrieveMimeMail.bind(this);
  }

  public getClient() {
    return this.client;
  }

  /**
   * This function retrieves all 1st-level folders from user's OneDrive
   */
  public getOneDriveFolder(): Promise<IFolder[]> {
    return this.client
            .api('me/drive/root/children')
            .version('v1.0')
            .filter('folder ne null')         
            .get()
            .then((response): any => {
              let folders: Array<IFolder> = new Array<IFolder>();
              response.value.forEach((item) => {
                folders.push({ id: item.id, name: item.name, driveID: item.parentReference.driveId, parentFolder: null});
              });      
              return folders;
            });
  }

  public getGroupRootFolders(group: IFolder): Promise<IFolder[]> {
    return this.client
            .api(`drives/${group.driveID}/root/children`)
            .version('v1.0')
            .filter('folder ne null')         
            .get()
            .then((response): any => {
              let folders: Array<IFolder> = new Array<IFolder>();
              response.value.forEach((item) => {
                folders.push({ id: item.id, name: item.name, driveID: group.driveID, parentFolder: group});
              });      
              return folders;
            });
  }

  public getSubFolder(folder: IFolder): Promise<IFolder[]> {
    return this.client
            .api(`drives/${folder.driveID}/items/${folder.id}/children`)
            .version('v1.0')
            .filter('folder ne null')         
            .get()
            .then((response): any => {
              let folders: Array<IFolder> = new Array<IFolder>();
              response.value.forEach((item) => {
                folders.push({ id: item.id, name: item.name, driveID: folder.driveID, parentFolder: folder});
              });      
              return folders;
            });
  }

  /**
   * This function retrievs the user's membership groups from Graph
   */
  public getJoinedGroups(): Promise<IFolder[]> {
    return this.client
            .api('me/memberOf')
            .version('v1.0')          
            .get()
            .then((response): any => {
              let folders: Array<IFolder> = new Array<IFolder>();
              response.value.forEach((item) => {
                // Show unified Groups but NO Teams
                if (item['@odata.type'] === '#microsoft.graph.group') {
                  if(!item.resourceProvisioningOptions || item.resourceProvisioningOptions.indexOf('Team') === -1) {
                    folders.push({ id: item.id, name: item.displayName, driveID: item.id, parentFolder: null});
                  }                  
                }
              });      
              return folders;
            });
  }

  /**
   * This function retrievs the user's membership groups from Graph
   */
  public getJoinedTeams(): Promise<IFolder[]> {
    return this.client
            .api('me/joinedTeams')
            .version('v1.0')          
            .get()
            .then((response): any => {
              let folders: Array<IFolder> = new Array<IFolder>();
              response.value.forEach((item) => {                
                folders.push({ id: item.id, name: item.displayName, driveID: item.id, parentFolder: null});                
              });      
              return folders;
            });
  }

  /**
   * This function retrieves all Drives for a given Group
   */
  public getGroupDrives(group: IFolder): Promise<IFolder[]> {
    return this.client
            .api(`groups/${group.id}/drives`)
            .version('v1.0')       
            .get()
            .then((response): any => {
              let folders: Array<IFolder> = new Array<IFolder>();
              response.value.forEach((item) => {
                folders.push({ id: item.id, name: item.name, driveID: item.id, parentFolder: group});
              });      
              return folders;
            });
  }

  public retrieveMimeMail(driveID: string, folderID: string, mail: IMail, clientCallback: (msg: string)=>void): Promise<string> {
    return this.client
            .api(`me/messages/${mail.id}/$value`)
            .version('v1.0')
            .responseType('TEXT')          
            .get((err: any, response, rawResponse): any => {  
              if (response.length < (4 * 1024 * 1024))      // If Mail size bigger 4MB use resumable upload
              {
                this.saveNormalMail(driveID, folderID, response, Utilities.createMailFileName(mail.subject), clientCallback);
              }             
              else {
                this.saveBigMail(driveID, folderID, response, Utilities.createMailFileName(mail.subject), clientCallback);
              }              
            });
  }

  private saveNormalMail(driveID: string, folderID: string, mimeStream: string, fileName: string, clientCallback: (msg: string)=>void) {
    const apiUrl = driveID !== folderID ? `drives/${driveID}/items/${folderID}:/${fileName}.eml:/content` : `drives/${driveID}/root:/${fileName}.eml:/content`;
    this.client
            .api(apiUrl)
            .put(mimeStream)
            .then((response) => {
              clientCallback('Success');
            })
            .catch((error) => { 
              clientCallback('Error');
            });            
  }

  public async saveBigMail(driveID: string, folderID: string, mimeStream: string, fileName: string, clientCallback: (msg: string)=>void) {
    const sessionOptions = {
      "item": {
        "@microsoft.graph.conflictBehavior": "rename"
      }
    };
    const apiUrl = driveID !== folderID ? `drives/${driveID}/items/${folderID}:/${fileName}.eml:/createUploadSession` : `drives/${driveID}/root:/${fileName}.eml:/createUploadSession`;
    this.client
            .api(apiUrl)
            .post(JSON.stringify(sessionOptions))
            .then(async (response):Promise<any> => {
              console.log(response.uploadUrl);
              console.log(response.expirationDateTime);
              try {
                const resp = await this.uploadMailSlices(mimeStream, response.uploadUrl);
                console.log(resp);
                clientCallback('Success');
              }
              catch(err) {
                console.log(err);
                clientCallback('Error');
              }
            });          
  }

  private async uploadMailSlices(mimeStream: string, uploadUrl: string) {
    let minSize=0;
    let maxSize=327680; // 320kb slices
    while(mimeStream.length > minSize) {
      const fileSlice = mimeStream.slice(minSize, maxSize);
      const resp = await this.uploadMailSlice(uploadUrl, minSize, maxSize, mimeStream.length, fileSlice);
      minSize = maxSize;
      maxSize += 327680;
      if (maxSize > mimeStream.length) {
        maxSize = mimeStream.length;
      }
      if (resp.id !== undefined) {
        return resp;
      } 
      else {
        
      }
    }
  }

  private async uploadMailSlice(uploadUrl: string, minSize: number, maxSize: number, totalSize: number, fileSlice: string) {
    const header = {
      "Content-Length": `${maxSize - minSize}`,
      "Content-Range": `bytes ${minSize}-${maxSize-1}/${totalSize}`,
    };
    return await this.client
                  .api(uploadUrl)
                  .headers(header)
                  .put(fileSlice);
  }

  private saveMailCallback(error: any, response: any, rawResponse?: any): void {
    if (error !== null) {
      console.log(error);
    }
    else {
      console.log(response);
    }
  }
}
