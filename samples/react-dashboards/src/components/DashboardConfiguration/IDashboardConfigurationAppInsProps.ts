import { ThemedPalette } from "../../common/ColorsHelper";
import { ConfigType, IAppInsightsQuery, IAppInsightsWebPartProps } from "../../common/CommonProps";
import { ChartStyles, LayoutStyles, ListStyles } from "../../common/DashboardHelper";

export interface IDashboardConfigurationAppInsProps extends IAppInsightsWebPartProps {
    configType: ConfigType,     //    ApplicationInsights,CostManagement

    //CostManagement props
    scope?: never,
    subscriptionId?: never,
    resourceGroupName?: never,
    managementGroupId?: never
    endpointType?: never;
    onConfigureCostManagementScope? : never;

    width:number;
    cultureName: string;
    onPivotItemChange: (key: string) => void;
    onConfigureAppInsights: (appId: string, appKey: string) => void;
    onConfigureQuery: (preset: number, config: IAppInsightsQuery) => void;
    onConfigureListSettings: (showList: boolean, listStyle: ListStyles, listPalette: ThemedPalette) => void;
    onConfigureChartSettings: (showChart: boolean, chartStyle: ChartStyles, chartPalette: ThemedPalette) => void,
    onConfigureLayoutSettings: (lookLayout: LayoutStyles) => void;
}