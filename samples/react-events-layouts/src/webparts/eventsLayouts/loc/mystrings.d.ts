declare interface IEventsLayoutsWebPartStrings {
  // Property pane
  PropertyPaneDescription: string;
  LayoutGroupName: string;
  TitleFieldLabel: string;
  LayoutFieldLabel: string;
  LayoutAgenda: string;
  LayoutGrid: string;
  LayoutList: string;
  LayoutFilmstrip: string;
  LayoutCarousel: string;
  LayoutTimeline: string;
  HeightFieldLabel: string;
  AutoplayFieldLabel: string;
  DisplayGroupName: string;
  MaxEventsFieldLabel: string;
  TitleLinesFieldLabel: string;
  DescriptionLinesFieldLabel: string;
  ShowDescriptionFieldLabel: string;
  ShowLocationFieldLabel: string;
  ShowOrganizerFieldLabel: string;
  ShowCategoryFieldLabel: string;
  ShowImageFieldLabel: string;
  ShowDateFilterFieldLabel: string;
  SeeAllUrlFieldLabel: string;
  DataGroupName: string;
  SourcesFieldLabel: string;
  SourcesFieldDescription: string;
  SourcesSearchPlaceholder: string;
  SourcesNoResults: string;
  SourcesSearching: string;
  SourceKindList: string;
  SourceKindGroup: string;
  DefaultRangeFieldLabel: string;
  LanguageGroupName: string;
  DirectionFieldLabel: string;
  DirectionAuto: string;
  DirectionLtr: string;
  DirectionRtl: string;
  LocaleFieldLabel: string;
  LocaleFieldDescription: string;
  CalendarFieldLabel: string;
  CalendarAuto: string;
  CalendarGregorian: string;
  CalendarHijri: string;
  LatinDigitsFieldLabel: string;

  // Date ranges
  RangeUpcoming: string;
  RangeToday: string;
  RangeWeek: string;
  RangeMonth: string;
  RangeSummaryUpcoming: string;
  RangeSummaryToday: string;
  RangeSummaryWeek: string;
  RangeSummaryMonth: string;
  DateFilterLabel: string;

  // Web part
  SeeAll: string;
  AllDay: string;
  Recurring: string;
  NoEvents: string;
  NoSourceTitle: string;
  NoSourceDescription: string;
  Configure: string;
  LoadError: string;
  PartialError: string;
  Previous: string;
  Next: string;
  GoToSlide: string;
  Pause: string;
  Play: string;
}

declare module 'EventsLayoutsWebPartStrings' {
  const strings: IEventsLayoutsWebPartStrings;
  export = strings;
}
