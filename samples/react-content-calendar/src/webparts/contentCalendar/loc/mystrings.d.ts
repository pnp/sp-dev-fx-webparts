declare interface IContentCalendarWebPartStrings {
  // Component UI
  LabelToday: string;
  EmptyStateTitle: string;
  LoadingLabel: string;
  PublishedDateTimeLabel: string;
  ScheduledDateTimeLabel: string;
  ConfigureCalendarTitle: string;
  ConfigureCalendarDescription: string;
  ConfigureCalendarButtonLabel: string;
  ContentListsLoadError: string;

  // Quick-add + placeholder
  QuickAddAria: string;
  MenuCreateContent: string;
  MenuCreatePlaceholder: string;
  PlaceholderDialogTitle: string;
  PlaceholderDialogFor: string;
  PlaceholderTitleLabel: string;
  PlaceholderNotesLabel: string;
  LegendPlaceholder: string;
  CreatePageDialogTitle: string;
  PageTitleLabel: string;
  CreatePageBusy: string;
  DisableCommentsLabel: string;
  DialogCreate: string;
  DialogCancel: string;

  // Property pane
  DataSourcePageDescription: string;
  DataSourceGroupName: string;
  FieldListLabel: string;
  ShowStatusLegendLabel: string;
}

declare module 'ContentCalendarWebPartStrings' {
  const strings: IContentCalendarWebPartStrings;
  export = strings;
}
