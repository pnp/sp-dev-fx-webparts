declare interface IKpiScorecardWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListTitleFieldLabel: string;
  RootPathFieldLabel: string;
  TitleFieldLabel: string;
  ValueFieldLabel: string;
  TargetFieldLabel: string;
  StatusFieldLabel: string;
  DateFieldLabel: string;
  DateFilterFieldLabel: string;
  DefaultTitle: string;
  SetupTitle: string;
  SetupDescription: string;
  LoadingMessage: string;
  EmptyMessage: string;
  ErrorTitle: string;
  AccessDeniedMessage: string;
  NotFoundMessage: string;
  ThrottledMessage: string;
  GenericErrorMessage: string;
  TryAgain: string;
  NoValue: string;
  NoStatus: string;
  NoTrend: string;
  OnTrack: string;
  Attention: string;
  AtRisk: string;
  Unknown: string;
  Rising: string;
  Falling: string;
  Steady: string;
  Updated: string;
}

declare module 'KpiScorecardWebPartStrings' {
  const strings: IKpiScorecardWebPartStrings;
  export = strings;
}
