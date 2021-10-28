import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Theme } from 'spfx-uifabric-themes';
import { DisplayMode } from '@microsoft/sp-core-library';
export interface IStaffDirectoryProps {
    title: string;
    context: WebPartContext;
    themeVariant: Theme;
    displayMode: DisplayMode;
    maxHeight:number;
    showBox: boolean;
    updateProperty: (value: string) => void;
    refreshInterval: number;
    updatePresenceStatus:boolean;
    userAttributes: string[];
    pageSize:number;
}
