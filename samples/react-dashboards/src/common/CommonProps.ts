import { DisplayMode } from "@microsoft/sp-core-library";
import { AadHttpClientFactory, HttpClient } from "@microsoft/sp-http";
import { ThemedPalette } from "./ColorsHelper";
import { CostManagementScope } from "./CostMngmtQueryHelper";
import { ChartStyles, LayoutStyles, ListStyles } from "./DashboardHelper";

export enum ConfigType {
    ApplicationInsightsLogs=1,
    CostManagement=2,
    ApplicationInsightsMetrics = 3,
}
export enum AppInsightsEndpointType {
    query="query",
    metrics="metrics"
}

export enum CacheExpiration {
    "FifteenMinutes" = "Fifteen Minutes",
    "OneHour" = "One Hour",
    "OneDay" = "One Day",
    "Disabled"="No caching"
}

export interface IDashboardContextProps {
    httpClient: HttpClient;
    aadHttpClientFactory: AadHttpClientFactory
    cultureName: string;
    DisplayMode: DisplayMode;
    width: number;
}

export interface ICacheConfig{
    cacheDuration: CacheExpiration;
    userLoginName:string;
}

//#region AppInsights Interfaces
export interface IAppInsightsConfig {
    appId: string;
    appKey: string;
    endpoint: AppInsightsEndpointType;
}
export interface AppInsights_AuthSSO {
    appId: string;
    aadHttpClientFactory: AadHttpClientFactory;
    endpoint: AppInsightsEndpointType;
}
export interface IAppInsightsQuery{
    query: string;
    dateSelection: string;
}
//#endregion

//#region CostManagement Interfaces
export interface ICostManagementConfig {
    scope: CostManagementScope,
    subscriptionId?: string,
    resourceGroupName?: string,
    managementGroupId?: string
}
export interface ICostManagementQuery{
    query: string;
    dateSelection: string;
}
//#endregion

export interface ILayoutConfig{
    showList: boolean;
    listStyle: ListStyles;
    listPalette: ThemedPalette;
    showChart: boolean;
    chartStyle: ChartStyles;
    chartPalette: ThemedPalette;
    layoutSettings: LayoutStyles;
}
export interface IDashboardConfig{
    preset: number;
    pivotKey: string;
    showTimePicker: boolean;
    width: number;
}

export interface IAppInsightsWebPartProps extends IAppInsightsConfig, IAppInsightsQuery, ICacheConfig, ILayoutConfig, IDashboardConfig {
    isDevMode: boolean;
    logLevel?: number;
    appInsightsConnString?: string;
}

export interface ICostManagementWebPartProps extends ICostManagementConfig, ICostManagementQuery, ICacheConfig, ILayoutConfig, IDashboardConfig {
    logLevel?: number;
    appInsightsConnString?: string;
}

