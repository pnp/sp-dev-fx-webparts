import { INumberChartData, IScatterChartData, IBubbleChartData } from "../controls/PropertyFieldRepeatingData";
import { DisplayMode } from '@microsoft/sp-core-library';
import { ChartType, ChartPalette } from '@pnp/spfx-controls-react/lib/ChartControl';
import { DashType } from "../controls/PropertyPaneDashSelector/components/DashSelector.types";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PositionType, PointStyle, InteractionMode } from 'chart.js';
export interface IChartinatorProps {
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
  context: WebPartContext;
  cutoutPercentage: number;
  data: Array<INumberChartData | IScatterChartData | IBubbleChartData>;
  dataLabelField: string;
  dataRValueField: string;
  dataSetName: string;
  dataSourceListId: string;
  dataSourceType: DataSourceType;
  dataValueField: string;
  dataYValueField: string;
  displayMode: DisplayMode;
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
  radialChart: boolean;
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
  updateTitle: (value: string) => void;
}

export enum DataSourceType {
  Static,
  List
}

export type EasingType = 'linear' |
  'easeInQuad' |
  'easeOutQuad' |
  'easeInOutQuad' |
  'easeInCubic' |
  'easeOutCubic' |
  'easeInOutCubic' |
  'easeInQuart' |
  'easeOutQuart' |
  'easeInOutQuart' |
  'easeInQuint' |
  'easeOutQuint' |
  'easeInOutQuint' |
  'easeInSine' |
  'easeOutSine' |
  'easeInOutSine' |
  'easeInExpo' |
  'easeOutExpo' |
  'easeInOutExpo' |
  'easeInCirc' |
  'easeOutCirc' |
  'easeInOutCirc' |
  'easeInElastic' |
  'easeOutElastic' |
  'easeInOutElastic' |
  'easeInBack' |
  'easeOutBack' |
  'easeInOutBack' |
  'easeInBounce' |
  'easeOutBounce' |
  'easeInOutBounce';

  export type CapType = 'butt' | 'round' | 'square';

  export type JoinType = 'bevel' | 'round' | 'miter';
