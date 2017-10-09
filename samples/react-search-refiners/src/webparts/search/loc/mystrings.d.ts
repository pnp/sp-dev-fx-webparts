declare interface ISearchWebPartStrings {
  SearchSettingsGroupName: string;
  SearchQueryFieldLabel: string;
  SelectedPropertiesFieldLabel: string;
  LoadingMessage: string;
  ResultsCount: string;
  NoResultMessage: string;
  RefinersFieldLabel: string;
  FilterResultsButtonLabel: string;
  SelectedFiltersLabel: string;
  ApplyAllFiltersLabel: string;
  RemoveAllFiltersLabel: string;
  ShowPagingLabel: string;
  NoFilterConfiguredLabel: string;
  SearchQueryPlaceHolderText: string;
  EmptyFieldErrorMessage: string;
}

declare module 'SearchWebPartStrings' {
  const strings: ISearchWebPartStrings;
  export = strings;
}
