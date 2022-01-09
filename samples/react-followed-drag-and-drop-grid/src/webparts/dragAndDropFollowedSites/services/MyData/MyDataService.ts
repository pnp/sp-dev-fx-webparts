import {
    HttpClient,
    HttpClientResponse
} from '@microsoft/sp-http';
import IAppData from '../../../model/IAppData';
import IAppDataFolderExistsOutput from '../../../model/IAppDataFolderExistsOutput';
import IMyDataServiceInput from "./IMyDataServiceInput";

export default class MyDataService {

    private input: IMyDataServiceInput = null;

    constructor(input: IMyDataServiceInput) {
        this.input = input;
    }

    public async getAppDataFolder(): Promise<any> {
        return new Promise<any>((resolve, reject) =>
            this.input.mSGraphClient
                .api(`/me/drive/special/approot/children?$filter=name eq '${this.input.appDataFolderName}'`)
                .version('v1.0')
                .get((error, response: any, rawResponse?: any) => {
                    if (error) {
                        resolve(error);
                    }

                    resolve(response);
                }));
    }

    public async checkIfAppDataFolderExists(): Promise<IAppDataFolderExistsOutput> {
        return new Promise<IAppDataFolderExistsOutput>((resolve, reject) => {
            resolve(this.getAppDataFolder().then(result => {
                const isError = result.errorCode !== undefined;
                return {
                    isError,
                    errorMessage: isError ? result.errorMessage : '',
                    folderExists: !isError ? result.value.some(item => item.name === this.input.appDataFolderName) : false
                } as IAppDataFolderExistsOutput;
            }));
        });
    }

    public async createAppDataFolder(): Promise<string> {
        const driveItem = {
            name: this.input.appDataFolderName,
            folder: {},
            '@microsoft.graph.conflictBehavior': 'fail'
        };

        return new Promise<string>((resolve, reject) =>
            this.input.mSGraphClient
                .api('/me/drive/special/approot/children')
                .version('v1.0')
                .post(driveItem)
                .then(result => {
                    if (result != null) {
                        resolve(result.name.toString());
                    }
                }));
    }

    public createOrUpdateJsonDataFile(appData: IAppData): void {
        this.getAppDataFolder()
            .then(response => {
                const id = response.value.filter(item => item.name === this.input.appDataFolderName)[0].id;
                const stream = JSON.stringify(appData);

                this.input.mSGraphClient
                    .api(`/me/drive/items/${id}:/${this.input.appDataJsonFileName}:/content`)
                    .version('v1.0')
                    .put(stream);
            });
    }

    public async getJsonAppDataFile(): Promise<IAppData> {
        return new Promise<IAppData>((resolve, reject) =>
            this.input.mSGraphClient
                .api(`/me/drive/special/approot:/${this.input.appDataFolderName}:/children?$filter=name eq '${this.input.appDataJsonFileName}'`)
                .version('v1.0')
                .get((error, response: any, rawResponse?: any) => {
                    if (error) {
                        return;
                    }

                    if (response.value.length === 0) {
                        resolve(
                            {
                                userFollowedSites: []
                            } as IAppData);
                    }

                    const downloadUrl = response.value.filter(item => item.name === this.input.appDataJsonFileName)[0]['@microsoft.graph.downloadUrl'];
                    this.input.httpClient
                        .get(downloadUrl, HttpClient.configurations.v1)
                        .then((innerResponse: HttpClientResponse): Promise<string> => {
                            if (innerResponse.ok) {
                                return innerResponse.text();
                            }

                            return Promise.reject(innerResponse.statusText);
                        })
                        .then((settingsString: string) => {
                            const settings: IAppData = JSON.parse(settingsString);
                            resolve(settings);
                        });
                }));
    }
}