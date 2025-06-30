import { ThemedPalette } from "../../../common/ColorsHelper";
import { ICostManagementConfig, ICostManagementQuery, ICostManagementWebPartProps, IDashboardContextProps } from "../../../common/CommonProps";
import { ChartStyles, LayoutStyles, ListStyles } from "../../../common/DashboardHelper";

export interface ICostInsightsDashboardProps extends ICostManagementWebPartProps, IDashboardContextProps {
  onPivotItemChange: (key: string) => void;
  onConfigureCostManagementScope: (config: ICostManagementConfig) => void;
  onConfigureCostQuery: (preset: number, config: ICostManagementQuery) => void;
  onConfigureTimePicker: (showTimePicker: boolean) => void;
  onConfigureListSettings: (showList: boolean, listStyle: ListStyles, listPalette: ThemedPalette) => void;
  onConfigureChartSettings?: (showChart: boolean, chartStyle: ChartStyles, chartPalette: ThemedPalette) => void,
  onConfigureLayoutSettings: (lookLayout: LayoutStyles) => void;
}

