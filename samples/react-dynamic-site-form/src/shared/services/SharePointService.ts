import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { SPHttpClient } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";
import * as strings from "NewSiteFormFormCustomizerStrings";
import { IValidGroupNameResponse, IGroupNameAvailability } from "../interfaces";

export interface ISharePointService {
    getValidUrl: (alias: string, managedPath: string) => Promise<string>;
    isGroupNameAvailable: (displayName: string, alias: string) => Promise<IGroupNameAvailability>;
}

export class SharePointService implements ISharePointService {

    public static readonly serviceKey: ServiceKey<ISharePointService> =
        ServiceKey.create<ISharePointService>('SPFx:SharePointService', SharePointService);

    private _httpClient: SPHttpClient;
    private _siteUrl: string;

    public constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._httpClient = serviceScope.consume(SPHttpClient.serviceKey);

            const pageContext = serviceScope.consume(PageContext.serviceKey);
            this._siteUrl = pageContext.web.absoluteUrl;
        });
    }

    public async getValidUrl(alias: string, managedPath: string): Promise<string> {
        const response = await this._httpClient.get(`${this._siteUrl}/_api/GroupSiteManager/GetValidSiteUrlFromAlias?alias='${alias}'&managedPath='${managedPath}'`, SPHttpClient.configurations.v1);

        if (!response.ok) {
            throw new Error('An error occurred, determining the site URL');
        }

        const content: { value: string } = await response.json();

        return content.value.toLowerCase();
    }

    public async isGroupNameAvailable(displayName: string, alias: string): Promise<IGroupNameAvailability> {
        const response = await this._httpClient.get(`${this._siteUrl}/_api/SP.Directory.DirectorySession/ValidateGroupName(displayName='${displayName}',%20alias='${alias}')`, SPHttpClient.configurations.v1);

        if (!response.ok) {
            throw new Error('An error occurred, validating the group name');
        }

        const content: IValidGroupNameResponse = await response.json();

        if (!content.IsValidName) {

            const returnValue: IGroupNameAvailability = {
                aliasAvailable: !content.AliasErrorDetails,
                siteNameAvailable: !content.DisplayNameErrorDetails,
            }

            if (content.AliasErrorDetails)
                returnValue.aliasErrorMessage = content.AliasErrorDetails.ValidationErrorCode === "PropertyConflict" && content.AliasErrorDetails.ValidationPropertyName === "alias"
                    ? strings.GroupAliasUnavailable
                    : content.AliasErrorDetails.ValidationErrorMessage;

            if (content.DisplayNameErrorDetails)
                returnValue.siteNameErrorMessage = content.DisplayNameErrorDetails.ValidationErrorMessage;

            return returnValue;
        }

        return {
            aliasAvailable: true,
            siteNameAvailable: true
        };
    }
}