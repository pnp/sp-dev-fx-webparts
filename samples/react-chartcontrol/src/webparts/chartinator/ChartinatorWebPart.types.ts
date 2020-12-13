import { INumberChartData, IBubbleChartData, IScatterChartData } from './controls/PropertyFieldRepeatingData';
import { ChartType, ChartPalette } from '@pnp/spfx-controls-react/lib/ChartControl';
import { DashType } from './controls/PropertyPaneDashSelector/components/DashSelector.types';
import { DataSourceType, EasingType, CapType, JoinType } from './components/Chartinator.types';
import { InteractionMode, PositionType, PointStyle } from 'chart.js';

/**
 * There are a LOT of options to store with this web part.
 * I don't normally recommend doing this, but the goal of this
 * sample is to demonstrate each chart setting individually.
 */
export interface IChartinatorWebPartProps {
  animateRotate: boolean;
  animateScale: boolean;
  animationDuration: number;
  animationEasing: EasingType;
  borderCapStyle: CapType;
  borderColor: string;
  borderDash: DashType;
  borderJoinStyle: JoinType;
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
  legendPosition: PositionType | 'none';
  legendReversed: boolean;
  lineCurved: boolean;
  lineFill: string;
  lineShowLine: boolean;
  lineStepped: boolean;
  offsetGridLines: boolean;
  pointRadius: number;
  pointRotation: number;
  pointStyle: PointStyle;
  rightPadding: number;
  title: string;
  tooltipEnabled: boolean;
  tooltipIntersect: boolean;
  tooltipMode: InteractionMode;
  tooltipPosition: string;
  topPadding: number;
  xAxisLabelEnabled: boolean;
  xAxisLabelText: string;
  xAxisShowGridlines: boolean;
  yAxisBeginAtZero: boolean;
  yAxisLabelEnabled: boolean;
  yAxisLabelText: string;
  yAxisMax: number;
  yAxisMaxTicksLimit: number;
  yAxisMin: number;
  yAxisStepSize: number;
  yAxisShowGridlines: boolean;
}
