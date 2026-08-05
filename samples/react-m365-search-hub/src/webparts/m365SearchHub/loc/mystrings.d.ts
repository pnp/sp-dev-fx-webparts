declare interface IM365SearchHubWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DiagnosticsGroupName: string;
  TitleFieldLabel: string;
  PageSizeFieldLabel: string;
  SearchGroupName: string;
  AppearanceGroupName: string;
  ScopeFieldLabel: string;
  ScopeTenant: string;
  ScopeSite: string;
  DefaultSortFieldLabel: string;
  LayoutFieldLabel: string;
  LayoutComfortable: string;
  LayoutCompact: string;
  OpenResultsFieldLabel: string;
  OpenSameTab: string;
  OpenNewTab: string;
  ShowPerformancePanelLabel: string;

  SearchBoxLabel: string;
  SearchBoxPlaceholder: string;
  ClearSearchLabel: string;
  LoadMoreLabel: string;
  SearchToolsLabel: string;
  SortLabel: string;
  SortRelevance: string;
  SortDate: string;
  FiltersLabel: string;
  FiltersActiveLabel: string;

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
  StatusMatchingCount: string;
  StatusMatchingCountOne: string;

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
  ResultModifiedBy: string;
  ResultModifiedByOn: string;
  ResultsListLabel: string;
}

declare module 'M365SearchHubWebPartStrings' {
  const strings: IM365SearchHubWebPartStrings;
  export = strings;
}
