import { INumberChartData, IBubbleChartData, IScatterChartData } from './controls/PropertyFieldRepeatingData';
import { ChartType, ChartPalette } from '@pnp/spfx-controls-react/lib/ChartControl';
import { DashType } from './controls/PropertyPaneDashSelector/components/DashSelector.types';

/**
 * There are a LOT of options to store with this web part.
 * I don't normally recommend doing this, but the goal of this
 * sample is to demonstrate each chart setting individually.
 */
export interface IChartinatorWebPartProps {
  animateRotate: boolean;
  animateScale: boolean;
  animationDuration: number;
  animationEasing: string;
  borderCapStyle: 'butt' | 'round' | 'square';
  borderColor: string;
  borderDash: DashType;
  borderJoinStyle: 'bevel' | 'round' | 'miter';
  borderWidth: number;
  bottomPadding: number;
  chartPalette: ChartPalette;
  chartRotation: number;
  chartType: ChartType;
  circumference: number;
  cutoutPercentage: number;
  data: Array<INumberChartData | IBubbleChartData | IScatterChartData>;
  dataLabelField: string;
  dataRValueField: string;
  dataSetName: string;
  dataSourceListId: string;
  dataSourceType: DataSourceType;
  dataValueField: string;
  dataYValueField: string;
  leftPadding: number;
  legendPosition: string;
  legendReversed: boolean;
  lineCurved: boolean;
  lineFill: string;
  lineShowLine: boolean;
  lineStepped: boolean;
  offsetGridLines: boolean;
  pointRadius: number;
  pointRotation: number;
  pointStyle: Chart.PointStyle;
  rightPadding: number;
  title: string;
  tooltipEnabled: boolean;
  tooltipIntersect: boolean;
  tooltipMode: string;
  tooltipPosition: string;
  topPadding: number;
  xAxisLabelEnabled: boolean;
  xAxisLabelText: string;
  yAxisBeginAtZero: boolean;
  yAxisLabelEnabled: boolean;
  yAxisLabelText: string;
  yAxisMax: number;
  yAxisMaxTicksLimit: number;
  yAxisMin: number;
  yAxisStepSize: number;
}

export enum DataSourceType {
  Static,
  List
}
