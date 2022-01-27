import { MSGraphClient, HttpClient } from '@microsoft/sp-http';

export default interface IMyDataServiceInput {
    mSGraphClient: MSGraphClient;
    httpClient: HttpClient;
    appDataFolderName: string;
    appDataJsonFileName: string;
}