import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
import { ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';

/**
 * Configuration properties for the PropertyFieldRepeatingData control
 */
export interface IPropertyFieldRepeatingDataProps {
  chartType: ChartType;
  data: {}[];
  key: string;
  onDataChanged: (any) => void;
}

/**
 * State for the PropertyFieldRepeatingData cotnrol
 */
export interface IPropertyFieldRepeatingDataState {
  data: {}[];
}

/**
 * Properties for the PropertyFieldRepeatingDataHost
 */
export interface IPropertyFieldRepeatingDataHostProps {
  chartType: ChartType;
  data: {}[];
  onDataChanged: (any) => void;
}

/**
 * Contains points for number charts
 */
export interface INumberChartData {
  id: string;
  name: string;
  value: number;
}

/**
 * Contains points for bubble chart
 */
export interface IBubbleChartData {
  id: string;
  name: string;
  x: number;
  y: number;
  r: number;
}

/**
 * Contains points for scatter charts
 */
export interface IScatterChartData {
  id: string;
  name: string;
  x: number;
  y: number;
}
