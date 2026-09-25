declare interface ISiteDirectoryWebPartStrings {
  PropertyPaneDescription: string;
  ListGroupName: string;
  ListTitleFieldLabel: string;
  ListTitleFieldDescription: string;
  WebPartTitleFieldLabel: string;
  PageSizeFieldLabel: string;
  FieldsGroupName: string;
  TitleFieldLabel: string;
  CategoryFieldLabel: string;
  UrlFieldLabel: string;
  DescriptionFieldLabel: string;
  OwnerFieldLabel: string;
  LogoUrlFieldLabel: string;
  DefaultTitle: string;
  SetupTitle: string;
  SetupDescription: string;
  SearchLabel: string;
  SearchPlaceholder: string;
  CategoryLabel: string;
  AllCategories: string;
  SortLabel: string;
  SortAscending: string;
  SortDescending: string;
  LoadingMessage: string;
  LoadingMoreMessage: string;
  ResultsMessage: string;
  EmptyMessage: string;
  NoResultsTitle: string;
  NoResultsDescription: string;
  ResultsLabel: string;
  ErrorTitle: string;
  UnknownError: string;
  TryAgain: string;
  PageMessage: string;
  PreviousLabel: string;
  NextLabel: string;
}

declare module 'SiteDirectoryWebPartStrings' {
  const strings: ISiteDirectoryWebPartStrings;
  export = strings;
}
