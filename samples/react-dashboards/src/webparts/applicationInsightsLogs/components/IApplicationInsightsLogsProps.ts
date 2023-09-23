import { ThemedPalette } from "../../../common/ColorsHelper";
import { IAppInsightsQuery, IAppInsightsWebPartProps, IDashboardContextProps } from "../../../common/CommonProps";
import { ChartStyles, LayoutStyles, ListStyles } from "../../../common/DashboardHelper";


export interface IApplicationInsightsLogsProps extends IAppInsightsWebPartProps, IDashboardContextProps {
  onPivotItemChange: (key: string) => void;
  onConfigureAppInsights: (appId: string, appKey: string) => void;
  onConfigureKustoQuery: (preset: number, config: IAppInsightsQuery) => void;
  onConfigureTimePicker: (showTimePicker: boolean) => void;
  onConfigureListSettings: (showList: boolean, listStyle: ListStyles, listPalette: ThemedPalette) => void;
  onConfigureChartSettings?: (showChart: boolean, chartStyle: ChartStyles, chartPalette: ThemedPalette) => void,
  onConfigureLayoutSettings: (lookLayout: LayoutStyles) => void;
}

