import { TimeUnit } from "chart.js";
import { ThemedPalette } from "../../common/ColorsHelper";
import { ChartStyles } from "../../common/DashboardHelper";

export interface IInsightsChartProps {
    chartType?: ChartStyles;
    chartPalette: ThemedPalette;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any[];
    dataTypes: Map<string, string>;
}

export interface DataTypesInfo extends ColumnsInfo {
    isStacked: boolean;
    hasTimeAxis: boolean;
    isSupported: boolean;
    timeGranularity: TimeUnit;
    errorMsg?:string;
}

export interface ColumnsInfo {
    colNumber: string[];
    colDateTime: string[];
    colString: string[];
}