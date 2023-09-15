import { IDocumentCardActivityPerson } from "@fluentui/react";

export interface IAppModel{
    Id: string;
    displayName: string;
    appId: string,
    createdDateTime: string;
    users: IDocumentCardActivityPerson[],
}

export interface IAppModels{
    value: IAppModel[],
}

export interface IUserDetails{
    displayName: string;
    upn: string;
}