export interface IPermission {
    id?: string;
    grantedToIdentities: IPermissionIdentity[];
    roles: string[];
}

export interface IPermissionIdentity {
    application: IAzureApp
}

export interface ISharePointSite {
    displayName: string;
    id: string;
}

export interface IAzureApp {
    id?: string; //objectId
    appId?: string; //clientId
    displayName: string;
    requiredResourceAccess?: IRequiredResourceAccess[];
}

export interface IRequiredResourceAccess {
    resourceAppId: string;
    resourceAccess: IResourceAccess[];
}

export interface IResourceAccess {
    id: string;
    type: string;
}

export interface IAppListItem {
    key: number;
    name: string;
    value: string;
}