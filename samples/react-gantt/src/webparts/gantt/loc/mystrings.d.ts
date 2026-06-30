declare interface IGanttWebPartStrings {
  // Property pane – scaffold
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  // Property pane – groups & labels
  GanttDataSourceGroupName: string;
  ConfigureGanttListLabel: string;
  GanttDisplayGroupName: string;
  TimeScaleLabel: string;
  WebPartHeightLabel: string;

  // Scale options
  ScaleHour: string;
  ScaleDay: string;
  ScaleWeek: string;
  ScaleMonth: string;
  ScaleQuarter: string;
  ScaleYear: string;

  // Gantt chart – main
  LoadingTasks: string;
  ErrorPrefix: string;

  // Placeholder
  PlaceholderTitle: string;
  PlaceholderDescription: string;
  PlaceholderConfigureButton: string;

  // Column headers (Gantt grid)
  ColumnTaskName: string;
  ColumnStartDate: string;
  ColumnDuration: string;
  ColumnEndDate: string;
  ColumnProgress: string;

  // ColumnSelector
  VisibleColumnsTitle: string;

  // FieldMapper
  MapFieldsTitle: string;
  NoCompatibleFields: string;
  SelectFieldPlaceholder: string;
  NoneOption: string;
  MapFieldAriaLabel: string;

  // Field definition labels
  FieldTaskName: string;
  FieldStartDate: string;
  FieldDuration: string;
  FieldProgress: string;
  FieldTaskType: string;
  FieldParentTask: string;
  FieldEndDate: string;

  // ValidationResult
  ValidatingFields: string;
  AllRequiredFieldsFound: string;
  AutomaticFieldMapping: string;
  OptionalNotMapped: string;
  MissingRequiredFields: string;

  // ListPicker
  SelectListTitle: string;
  LoadingLists: string;
  SelectAList: string;
  LoadingMore: string;
  ItemsSuffix: string;

  // SitePicker
  SelectSiteTitle: string;
  CurrentSiteLabel: string;
  SearchSitePlaceholder: string;
  SearchingSites: string;

  // Environment strings
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
}

declare module 'GanttWebPartStrings' {
  const strings: IGanttWebPartStrings;
  export = strings;
}
