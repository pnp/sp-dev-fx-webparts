import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { MSGraphClientFactory, MSGraphClient } from '@microsoft/sp-http';

export interface ICustomGraphService {
    getMyDetails(): Promise<JSON>;
    getSharePointSiteUsagePages(period: number): Promise<JSON>;
    getSharePointSiteUsageSiteCounts(period: number): Promise<JSON>;
    getSharePointActivityFileCounts(period: number): Promise<JSON>;
    getOneDriveUsageFileCounts(period: number): Promise<JSON>;
    getEmailActivityUserDetail(period: number): Promise<JSON>;
}

export class CustomGraphService implements ICustomGraphService {

    public static readonly serviceKey: ServiceKey<ICustomGraphService> =
        ServiceKey.create<ICustomGraphService>('my-custom-app:ICustomGraphService', CustomGraphService);

    private _msGraphClientFactory: MSGraphClientFactory;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
        });
    }

    public getMyDetails(): Promise<JSON> {
        return new Promise<JSON>((resolve, reject) => {
            this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient) => {
                _msGraphClient.api('/me').get((error, user: JSON, rawResponse?: any) => {
                    resolve(user);
                });
            });
        });
    }



    //#region SharePoint

    public getSharePointSiteUsagePages(period: number): Promise<JSON> {
        return new Promise<JSON>((resolve, reject) => {
            this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient) => {
                _msGraphClient.api("https://graph.microsoft.com/beta/reports/getSharePointSiteUsagePages(period='D" + period + "')?$format=application/json").get((error, report: any, rawResponse?: any) => {
                    resolve(report);
                });
            });
        });
    }
    public getSharePointSiteUsageSiteCounts(period: number): Promise<JSON> {
        return new Promise<JSON>((resolve, reject) => {
            this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient) => {
                _msGraphClient.api("https://graph.microsoft.com/beta/reports/getSharePointSiteUsageSiteCounts(period='D" + period + "')?$format=application/json").get((error, report: any, rawResponse?: any) => {
                    resolve(report);
                });
            });
        });
    }
    public getSharePointActivityFileCounts(period: number): Promise<JSON> {
        return new Promise<JSON>((resolve, reject) => {
            this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient) => {
                _msGraphClient.api("https://graph.microsoft.com/beta/reports/getSharePointActivityFileCounts(period='D" + period + "')?$format=application/json").get((error, report: any, rawResponse?: any) => {
                    resolve(report);
                });
            });
        });
    }

    //#endregion SharePoint


    //#region OneDrive
    public getOneDriveUsageFileCounts(period: number): Promise<JSON> {
        return new Promise<JSON>((resolve, reject) => {
            this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient) => {
                _msGraphClient.api("https://graph.microsoft.com/beta/reports/getOneDriveUsageFileCounts(period='D" + period + "')?$format=application/json").get((error, report: any, rawResponse?: any) => {
                    resolve(report);
                });
            });
        });
    }
    //#endregion OneDrive

    //#region OutLook
    public getEmailActivityUserDetail(period: number): Promise<JSON> {
        return new Promise<JSON>((resolve, reject) => {
            this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient) => {
                _msGraphClient.api("https://graph.microsoft.com/beta/reports/getEmailActivityUserDetail(period='D" + period + "')?$format=application/json").get((error, report: any, rawResponse?: any) => {
                    resolve(report);
                });
            });
        });
    }



    //#endregion Outlook


}