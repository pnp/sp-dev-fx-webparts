import {
  MSGraphClient,
  HttpClient,
  HttpClientResponse
} from '@microsoft/sp-http';
import IAppData from './model/IAppData';

export class ManageDataLibrary {

  private static appDataFolderName: string = 'appData';
  private static appDataFileName: string = 'savedData.json';
  private mSGraphClient: MSGraphClient = null;
  private httpClient: HttpClient = null;

  constructor(
    mSGraphClient: MSGraphClient,
    httpClient: HttpClient) {
    this.mSGraphClient = mSGraphClient;
    this.httpClient = httpClient;
  }

  public async getData(): Promise<IAppData> {
    return new Promise<IAppData>((resolve) =>
      this.checkIfAppDataFolderExists()
        .then(async folderExists => {
          if (!folderExists) {
            await this.createAppDataFolder();
          }
          this.mSGraphClient
            .api(`/me/drive/special/approot:/${ManageDataLibrary.appDataFolderName}:/children?$filter=name eq '${ManageDataLibrary.appDataFileName}'`)
            .version('v1.0')
            .get((error, response: any, rawResponse?: any) => {
              if (error) {
                return;
              }

              if (response.value.length === 0) {
                resolve(
                  {
                    data: null
                  } as IAppData);
              }

              const downloadUrl = response.value.filter(item => item.name === ManageDataLibrary.appDataFileName)[0]['@microsoft.graph.downloadUrl'];
              this.httpClient
                .get(downloadUrl, HttpClient.configurations.v1)
                .then((innerResponse: HttpClientResponse): Promise<string> => {
                  if (innerResponse.ok) {
                    return innerResponse.text();
                  }

                  return Promise.reject(innerResponse.statusText);
                })
                .then((savedData: string) => {
                  const settings: IAppData = JSON.parse(savedData);
                  resolve(settings);
                });
            });
        })
    );
  }

  public saveData(appData: IAppData): Promise<any> {
    return this.getAppDataFolder()
            .then(response => {
                const id = response.value.filter(item => item.name === ManageDataLibrary.appDataFolderName)[0].id;
                const stream = JSON.stringify(appData);

                this.mSGraphClient
                    .api(`/me/drive/items/${id}:/${ManageDataLibrary.appDataFileName}:/content`)
                    .version('v1.0')
                    .put(stream);
            });
  }


  private async createAppDataFolder(): Promise<string> {
    const driveItem = {
      name: ManageDataLibrary.appDataFolderName,
      folder: {},
      '@microsoft.graph.conflictBehavior': 'fail'
    };

    return new Promise<string>((resolve, reject) =>
      this.mSGraphClient
        .api('/me/drive/special/approot/children')
        .version('v1.0')
        .post(driveItem)
        .then(result => {
          if (result != null) {
            resolve(result.name.toString());
          }
        }));
  }

  private async checkIfAppDataFolderExists(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(this.getAppDataFolder().then(result => {
        const isError = result.errorCode !== undefined;
        return !isError ? result.value.some(item => item.name === ManageDataLibrary.appDataFolderName) : false;
      }));
    });
  }

  private async getAppDataFolder(): Promise<any> {
    return new Promise<any>((resolve, reject) =>
      this.mSGraphClient
        .api(`/me/drive/special/approot/children?$filter=name eq '${ManageDataLibrary.appDataFolderName}'`)
        .version('v1.0')
        .get((error, response: any, rawResponse?: any) => {
          if (error) {
            resolve(error);
          }

          resolve(response);
        }));
  }
}
