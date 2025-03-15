declare interface IM365PlannerTimelineWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitleGroupName: string;  
  ShowTitleLabel: string;  
  Config_IconText: string;
  Not_Supported: string;
  Config_Desc: string;
  Config_ButtonText: string;
  TaskToggleOn: string;  
  TaskToggleOff: string;
  ActiveTaskLabel: string;
  TimeLinePlanLabel: string;
  BucketSelectLabel: string;
  BucketTitlePrefix: string;
  RefreshTooltipHostText: string;
  UnnamedBucketText: string;
  InAllBucketText: string;
  MomentDateFormat: string;
  // The following strings are used in the property pane
  AllBucketsText: string;
  PropertyLoadingPlans: string;
  PropertyPanePlanToggleLabel: string;
  PanePlanToggleOnText: string;
  PanePlanToggleOffText: string;
  PaneNewPlanTextLabel: string;
  PaneInitialBucketTextLabel: string;
  PaneNewPlanButtonText: string;
  PlanDropdownLabel: string;
  BucketDropdownLabel: string;  
  // The following strings are used Callout Pane
  fetchErrorText: string;
  PaneBucketText: string;
  PaneCratedByText: string;
  PaneProgressText: string;
  PanePercentComplete100: string;
  PanePercentComplete50: string;
  PanePercentComplete0: string;
  PaneStartDateText: string;
  PaneDueDateText: string;
  PaneAssignedToText: string;
  PaneNotesText: string;
  PaneCompletedText: string;
  PaneByText: string;
  PaneOnText: string;
  PaneChecklistText: string;
  NoStartDate: string;
  // the following strings are used in the PriorityIcon
  PriorityUrgent: string;
  PriorityIconUrgent: string;
  PriorityImportant: string;
  PriorityIconImportant: string;
  PriorityLow: string;
  PriorityIconLow: string;
  // The following strings are used in the timeline and timelineDetails
  UnknownBucketText: string;
  InitializeServiceError: string;
  TimelineShowAllTasks: string;
  TimelineShowActiveTasks: string;
  TimelineEnd: string;
  TimelineNoTasks: string;
  TimelineCompletedText: string;
  TimelineStartText: string;
  TimelineStartAnytime: string;
  TimelineDueText: string;
  TimelineNoDueDate: string;
  // The following strings are month
  MonthStrings: string[];
}

declare module 'M365PlannerTimelineWebPartStrings' {
  const strings: IM365PlannerTimelineWebPartStrings;
  export = strings;
}
