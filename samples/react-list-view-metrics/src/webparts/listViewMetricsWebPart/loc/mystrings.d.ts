declare interface IListViewMetricsWebPartStrings {
  // General / groups / common
  PP_Source_GroupName: string;
  PP_Metrics_GroupName: string;
  PP_Design_GroupName: string;
  PP_Button_Reset: string;
  PP_Toggle_Yes: string;
  PP_Toggle_No: string;

  // Source page
  PP_SelectSite_Label_Required: string;
  PP_SelectList_Label_Required: string;
  PP_SelectViewOrQuery_Message: string;
  PP_ViewType_Label_Required: string;
  PP_ViewType_ListView_Text: string;
  PP_ViewType_Custom_Text: string;
  PP_SelectViewLabel: string;
  PP_Custom_SelectQuery_Label: string;
  PP_Custom_ExpandQuery_Label: string;
  PP_Custom_FilterQuery_Label: string;
  PP_CommaSeparated_Description: string;
  PP_Custom_FilterQuery_Description: string;

  // Metrics page
  PP_Metrics_Label: string;
  PP_Metrics_PanelHeader: string;
  PP_Metrics_ManageBtnLabel: string;
  PP_Metrics_Field_Title: string;
  PP_Metrics_Field_FieldName: string;
  PP_Metrics_Field_FieldExpand: string;
  PP_Metrics_Field_Icon: string;
  PP_Metrics_Field_MetricKind: string;
  PP_Metrics_Field_Suffix: string;
  PP_Metrics_Field_Tooltip: string;
  PP_Metrics_Field_CardBackgroundColor: string;
  PP_Metrics_Field_CardFontColor: string;
  PP_Metrics_Field_TargetValue: string;
  PP_Metrics_Field_TargetShowAs: string;
  PP_TargetShowAs_Value: string;
  PP_TargetShowAs_Percentage: string;
  PP_Metric_TotalCount: string;
  PP_Metric_TotalUniqueCount: string;
  PP_Metric_Average: string;
  PP_Metric_MaxValue: string;
  PP_Metric_MinValue: string;
  PP_Metric_MostPopularValue: string;
  PP_Metric_Sum: string;

  // Design page
  PP_Design_ViewDesign_Label: string;
  PP_Design_ViewDesign_Vertical: string;
  PP_Design_ViewDesign_Horizontal: string;
  PP_Design_ContainerWidth_Label: string;
  PP_Design_ShowCardShadow_Label: string;
  PP_Design_CardFlexValue_Label: string;
  PP_Flex_Start: string;
  PP_Flex_Center: string;
  PP_Flex_End: string;
  PP_Flex_SpaceAround: string;
  PP_Flex_SpaceBetween: string;
  PP_Flex_SpaceEvenly: string;
  PP_Design_CardRadius_Label: string;
  PP_Design_CardDefaultBg_Label: string;
  PP_Design_IconFontSize_Label: string;
  PP_Design_IconFontColor_Label: string;
  PP_Design_HeaderFontSize_Label: string;
  PP_Design_HeaderFontWeight_Label: string;
  PP_Design_HeaderFontColor_Label: string;
  PP_Design_BodyFontSize_Label: string;
  PP_Design_BodyFontWeight_Label: string;
  PP_Design_BodyFontColor_Label: string;
  PP_Design_TargetFontSize_Label: string;
  PP_Design_TargetFontWeight_Label: string;
  PP_Design_TargetEffectiveFontColor_Label: string;
  PP_Design_TargetIneffectiveFontColor_Label: string;
  PP_Design_ShowNumberAnimation_Label: string;
  PP_Design_AnimationTime_Label: string;
  PP_Design_CardMarginTop_Label: string;
  PP_Design_CardMarginBottom_Label: string;

  // Loading & error
  LoadingListFields: string;
  LoadingData: string;
  Error_LoadDataPrefix: string;

  // Validation
  UnknownMetricType: string;
  MetricNotCompatible: string;

  // Field types
  Field_Number: string;
  Field_Currency: string;
  Field_Counter: string;
  Field_Integer: string;
  Field_Double: string;
  Field_Boolean: string;
  Field_Text: string;
  Field_Note: string;
  Field_Choice: string;
  Field_MultiChoice: string;
  Field_Lookup: string;
  Field_LookupMulti: string;
  Field_User: string;
  Field_UserMulti: string;
  Field_URL: string;
  Field_DateTime: string;
  Field_Taxonomy: string;
  Field_TaxonomyMulti: string;
  Field_Calculated: string;

  // ListViewMetrics component
  Aria_Section_Label: string;
  Tooltip_Title: string;
  Tooltip_AriaLabel: string;
  Tooltip_Headline: string;
  Msg_ViewQueryIssue: string;
  Msg_NoMetricsDefined: string;
  NoPopularValue: string;
  NoValue: string;
  Aria_AnimatedValue: string;

  // ErrorBoundary
  ErrBoundary_Header: string;
  ErrBoundary_ErrorPrefix: string;
  ErrBoundary_Action: string;

  // LoadingSpinner
  Loading_Default: string;
  Error_LoadingDataPrefix: string;
}

declare module "ListViewMetricsWebPartStrings" {
  const strings: IListViewMetricsWebPartStrings;
  export = strings;
}
