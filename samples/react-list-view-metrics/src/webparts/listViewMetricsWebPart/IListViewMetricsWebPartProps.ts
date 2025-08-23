import { IPropertyFieldSite } from "@pnp/spfx-property-controls/lib/PropertyFieldSitePicker";

export interface IListViewMetricsWebPartProps {
  // General settings
  title: string;
  spSites: IPropertyFieldSite[];
  spListId: string | undefined;
  spViewId: string | undefined;
  spViewType: string | undefined;

  // Query parameters
  customFilterSelectParams: string | undefined;
  customFilterExpandParams: string | undefined;
  customFilterQueryFilterParams: string | undefined;

  // Metrics configuration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metricsCollection: any[];

  // Design settings
  viewDesign: string | undefined;
  cardBoxShadow: boolean | undefined;
  cardFlexBoxValue: string | undefined;
  cardBoxRadius: number | undefined;
  cardDefaultBackgroundColor: string | undefined;
  containerWidth: number | undefined;

  // Icon styling
  iconFontSize: number | undefined;
  iconFontColor: string | undefined;

  // Header styling
  headerFontSize: number | undefined;
  headerFontWeight: number | undefined;
  headerFontColor: string | undefined;

  // Body styling
  bodyFontSize: number | undefined;
  bodyFontWeight: number | undefined;
  bodyFontColor: string | undefined;

  // Target styling
  targetFontSize: number | undefined;
  targetFontWeight: number | undefined;
  targetEffectiveFontColor: string | undefined;
  targetInEffectiveFontColor: string | undefined;

  // Animation settings
  showNumberAnimation: boolean | undefined;
  animationTimeLength: number | undefined;

  // Card spacing
  cardMarginTop: number | undefined;
  cardMarginBottom: number | undefined;
}
