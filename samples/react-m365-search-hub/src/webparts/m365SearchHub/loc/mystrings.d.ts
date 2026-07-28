declare interface IM365SearchHubWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DiagnosticsGroupName: string;
  TitleFieldLabel: string;
  PageSizeFieldLabel: string;
  ShowPerformancePanelLabel: string;

  SearchBoxLabel: string;
  SearchBoxPlaceholder: string;
  ClearSearchLabel: string;
  LoadMoreLabel: string;
  SortLabel: string;
  SortRelevance: string;
  SortDate: string;
  FiltersLabel: string;

  KindDocument: string;
  KindPage: string;
  KindSite: string;
  KindListItem: string;

  StatusIdle: string;
  StatusLoading: string;
  StatusQueryTooShort: string;
  StatusEmptyTitle: string;
  StatusEmptyDetail: string;
  StatusResultCount: string;
  StatusResultCountOne: string;
  StatusShowingCount: string;

  PermissionDeniedTitle: string;
  PermissionDeniedDetail: string;
  ViewSetupInstructions: string;

  NotAuthenticatedTitle: string;
  NotAuthenticatedDetail: string;

  ThrottledTitle: string;
  ThrottledDetail: string;

  ErrorTitle: string;
  ErrorDetail: string;
  RetryLabel: string;

  PerformanceHeading: string;
  PerformanceDuration: string;
  PerformanceResultCount: string;
  PerformanceCache: string;
  PerformanceCacheHit: string;
  PerformanceCacheMiss: string;
  PerformanceCancelled: string;
  PerformancePagesLoaded: string;
  PerformanceMilliseconds: string;
  PerformanceLocalOnly: string;

  ResultLastModified: string;
  ResultsListLabel: string;
}

declare module 'M365SearchHubWebPartStrings' {
  const strings: IM365SearchHubWebPartStrings;
  export = strings;
}
