declare interface IChartinatorWebPartStrings {
  PropertyPaneDescription: string;

  // Description and title
  ChartDescription: { [key: string]: string };
  ChartTitlePlaceholder: string;

  // Chart types
  ChartTypeGroupName: string;
  ChartTypeLabel: string;
  BarChartType: string;
  BubbleChartType: string;
  DonutChartType: string;
  HorizontalBarChartType: string;
  LineChartType: string;
  PieChartType: string;
  PolarChartType: string;
  RadarChartType: string;
  ScatterChartType: string;

  // Data source
  DataGroupName: string;
  ManualDataSource: string;
  ListDataSource: string;
  DataLabelFieldLabel: string;
  DataLabelFieldPlaceholder: string;
  DataValueFieldLabel: string;
  DataValueFieldPlaceholder: string;
  DataValueXFieldLabel: string;
  DataValueXFieldPlaceholder: string;
  DataValueYFieldLabel: string;
  DataValueYFieldPlaceholder: string;
  DataValueRFieldLabel: string;
  DataValueRFieldPlaceholder: string;
  DataRemoveButtonLabel: string;
  NumberErrorMessage: string;
  AddButtonLabel: string;
  DataSetFieldName: string;
  DataSetDefault: string;

  // Layout
  LayoutGroupName: string;
  LayoutGroupDescription: string;
  LeftPaddingFieldLabel: string;
  RightPaddingFieldLabel: string;
  TopPaddingFieldLabel: string;
  BottomPaddingFieldLabel: string;

  // Legend
  LegendGroupName: string;
  LegendGroupDescription: string;
  LegendDisplayLabel: string;
  Show: string;
  Hide: string;
  LegendPositionFieldLabel: string;
  Left: string;
  Right: string;
  Top: string;
  Bottom: string;
  None: string;
  On: string;
  Off: string;
  LegendReversedFieldLabel: string;

  // Palette settings
  PaletteGroupName: string;
  PaletteGroupDescription: string;
  PaletteName: string[];
  PaletteDescription: string[];
  ColorPaletteFieldLabel: string;

  // Tooltip settings
  TooltipsGroupName: string;
  TooltipGroupDescription: string;
  TooltipsEnabledFieldLabel: string;
  TooltipModeFieldLabel: string;
  TooltipModePoint: string;
  TooltipModeNearest: string;
  TooltipModeIndex: string;
  TooltipModeDataset: string;
  TooltipModeX: string;
  TooltipModeY: string;
  TooltipsIntersectFieldLabel: string;
  TooltipsPositionFieldLabel: string;
  TooltipsPositionAverage: string;
  TooltipsPositionNearest: string;

  GroupNotAvailable: string;
  ChartSettingsPrefix: string;
  ChartSettingsSuffix: string;
  ChartTypeName: string[];

  // Line settings
  LineSettingsGroupName: string;
  FillFieldLabel: string;
  FillNone: string;
  FillStart: string;
  FillEnd: string;
  FillOrigin: string;

  LineCurvedFieldName: string;
  LineCurvedFieldTooltipDisabled: string;
  LineCurvedFieldTooltipDisabledCozStepped: string;
  LineCurvedFieldTooltipEnabled: string;
  LineCurvedOn: string;
  LineCurvedOff: string;
  LineSteppedFieldLabel: string;
  LineSteppedFieldTooltipDisabled: string;
  LineSteppedFieldTooltipEnabled: string;
  LineSteppedOn: string;
  LineSteppedOff: string;
  LineShowLinesFieldLabel: string;
  LineShowLinesOn: string;
  LineShowLinesOff: string;
  LineShowLinesFieldTooltip: string;

  XAxisGroupName: string;
  XAxisGroupDescription: string;
  YAxisGroupName: string;
  YAxisGroupDescription: string;
  YAxisBeginAtZero: string;
  YAxisMinValueFieldLabel: string;
  YAxisMaxValueFieldLabel: string;
  YAxisMaxStepsFieldLabel: string;
  YAxisStepSizeFieldLabel: string;
  AxisShowLabel: string;
  AxisLabelText: string;


  // Point settings
  PointSettingsGroup: string;
  PointStyleFieldLabel: string;

  // Palette
  PointStyleCircle: string;
  PointStyleCross: string;
  PointStyleCrossRot: string;
  PointStyleDash: string;
  PointStyleLine: string;
  PointStyleRect: string;
  PointStyleRectRounded: string;
  PointStyleRectRot: string;
  PointStyleStar: string;
  PointStyleTriangle: string;
  PointRadiusFieldLabel: string;
  PointRotationFieldLabel: string;

  // Easing & animation
  AnimationGroupName: string;
  AnimationGroupDescription: string;
  DurationFieldLabel: string;
  DurationFieldDescription: string;
  EasingFieldLabel: string;
  EasingLinear: string;
  EasingEaseInQuad: string;
  EasingEaseOutQuad: string;
  EasingEaseInOutQuad: string;
  EasingEaseInCubic: string;
  EasingEaseOutCubic: string;
  EasingEaseInOutCubic: string;
  EasingEaseInQuart: string;
  EasingEaseOutQuart: string;
  EasingEaseInOutQuart: string;
  EasingEaseInQuint: string;
  EasingEaseOutQuint: string;
  EasingEaseInOutQuint: string;
  EasingEaseInSine: string;
  EasingEaseOutSine: string;
  EasingEaseInOutSine: string;
  EasingEaseInExpo: string;
  EasingEaseOutExpo: string;
  EasingEaseInOutExpo: string;
  EasingEaseInCirc: string;
  EasingEaseOutCirc: string;
  EasingEaseInOutCirc: string;
  EasingEaseInElastic: string;
  EasingEaseOutElastic: string;
  EasingEaseInOutElastic: string;
  EasingEaseInBack: string;
  EasingEaseOutBack: string;
  EasingEaseInOutBack: string;
  EasingEaseInBounce: string;
  EasingEaseOutBounce: string;
  EasingEaseInOutBounce: string;

  //Donut and Pie settings and polar too
  DonutSettingsGroupName: string;
  PieSettingsGroupName: string;
  PolarSettingsGroupName: string;
  DonutCutoutPercentageFieldLabel: string;
  ChartRotationFieldLabel: string;
  CircumferenceFieldLabel: string;
  AnimateRotateFieldLabel: string;
  AnimateScaleFieldLabel: string;
  ResetDonutPieSettingsButtonLabel: string;

  //Bar settings
  BarSettingsGroupName: string;
  OffsetGridLinesFieldName: string;
  BarSettingsGroupDescription: string;
}

declare module 'ChartinatorWebPartStrings' {
  const strings: IChartinatorWebPartStrings;
  export = strings;
}
