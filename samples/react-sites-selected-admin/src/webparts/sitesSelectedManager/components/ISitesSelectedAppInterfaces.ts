import { ICommandBarItemProps } from "office-ui-fabric-react";
import { ISitesSelectedManagerProps } from "./ISitesSelectedManagerProps";


export interface IDialogProps {
    isHidden: boolean;
    hideDialog: (hide: boolean) => void;
    webPartProperties: ISitesSelectedManagerProps,
    selectedApp: string;
    isDeleteMode: boolean;
}

export interface IAppListItem {
    key: number;
    name: string;
    value: string;
}

export interface IAppListState {
    items?: IAppListItem[];
    selectionDetails?: string;
    menuItems?: ICommandBarItemProps[];
    dialogHidden?: boolean,
    isDeleteMode?: boolean;
}

export interface IMessageBoxProps {
    resetChoice?: () => void;
}

export interface ISitePermissionList {
    value: ISitesSelectedPermissionPayload[];
}

export interface ISitesSelectedPermissionPayload {
    roles?: string[];
    grantedToIdentities?: IAADApplicationWrapper[];
    id?: string;
}

export interface ISelectedSitesListProps {
    value: Array<IAADApplication>;
    webpartProperties: ISitesSelectedManagerProps;
}

export interface ISPSite {
    displayName: string;
    id: string;
}

export interface IAADApplicationList {
    value: Array<IAADApplication>;
}

export interface IAADApplication {
    id: string;
    appId?: string;
    displayName: string;
    requiredResourceAccess?: Array<IRequiredResourceAccess>;
}

export interface IAADApplicationWrapper {
    application: IAADApplication;
}

export interface IRequiredResourceAccess {
    resourceAppId: string;
    resourceAccess: Array<IResourceAccess>;
}

export interface IResourceAccess {
    id: string;
    type: string;
}