import { ThemedPalette } from "../../common/ColorsHelper";
import { ConfigType, ICostManagementConfig, ICostManagementQuery, ICostManagementWebPartProps } from "../../common/CommonProps";
import { ChartStyles, LayoutStyles, ListStyles } from "../../common/DashboardHelper";

export interface IDashboardConfigurationCostProps extends ICostManagementWebPartProps {
    configType: ConfigType,

    isDevMode?: never;
    appId?: never;
    appKey?: never;
    // dateSelection?: never;
    onConfigureAppInsights?: never;

    width:number;
    cultureName: string;

    onConfigureCostManagementScope: (config: ICostManagementConfig) => void;
    onConfigureQuery: (preset: number, config: ICostManagementQuery) => void;
    onPivotItemChange: (key: string) => void;
    onConfigureListSettings: (showList: boolean, listStyle: ListStyles, listPalette: ThemedPalette) => void;
    onConfigureChartSettings: (showChart: boolean, chartStyle: ChartStyles, chartPalette: ThemedPalette) => void,
    onConfigureLayoutSettings: (lookLayout: LayoutStyles) => void;
}