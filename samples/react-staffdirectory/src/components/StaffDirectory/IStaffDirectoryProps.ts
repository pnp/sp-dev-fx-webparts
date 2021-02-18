import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { DisplayMode } from '@microsoft/sp-core-library';
export interface IStaffDirectoryProps {
    title: string;
    context: WebPartContext;
    themeVariant: IReadonlyTheme;
    displayMode: DisplayMode;
    maxHeight:number;
    showBox: boolean;
    updateProperty: (value: string) => void;
    refreshInterval: number;
    updatePresenceStatus:boolean;
    userAttributes: string[];
    pageSize:number;
}
