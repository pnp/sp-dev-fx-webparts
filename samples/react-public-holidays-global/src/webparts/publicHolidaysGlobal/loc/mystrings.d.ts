declare interface IPublicHolidaysGlobalWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;

  TitleLabel: string;
  CountryFieldLabel: string;
  YearFieldLabel: string;
  FiltersGroupLabel: string;
  HolidayListLabel: string;
  LoadingLabel: string;
  SummaryLabel: string;
  SummaryLabelSingular: string;
  ScopeNationwide: string;
  ScopeRegional: string;
  ScopeRegionalWithCounties: string;
  EmptyStateMessage: string;
  ErrorUnknownCountry: string;
  ErrorUnreachable: string;
  ErrorService: string;
  RetryButtonLabel: string;
  PlaceholderIconText: string;
  PlaceholderDescription: string;
  PlaceholderButtonLabel: string;
  AttributionPrefix: string;
  AttributionSuffix: string;
  AttributionLinkLabel: string;
  DefaultCountryFieldLabel: string;
  DefaultYearFieldLabel: string;
  ItemsPerPageFieldLabel: string;
  PaginationLabel: string;
  PreviousPageLabel: string;
  NextPageLabel: string;
  GoToPageLabel: string;
  PageStatusLabel: string;
}

declare module 'PublicHolidaysGlobalWebPartStrings' {
  const strings: IPublicHolidaysGlobalWebPartStrings;
  export = strings;
}
