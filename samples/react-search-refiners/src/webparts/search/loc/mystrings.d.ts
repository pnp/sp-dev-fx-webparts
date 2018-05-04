declare interface ISearchWebPartStrings {
  SearchSettingsGroupName: string;
  SearchQueryFieldLabel: string;
  SelectedPropertiesFieldLabel: string;
  LoadingMessage: string;
  MaxResultsCount: string;
  NoResultMessage: string;
  RefinersFieldLabel: string;
  FilterPanelTitle: string;
  FilterResultsButtonLabel: string;
  SelectedFiltersLabel: string;
  ApplyAllFiltersLabel: string;
  RemoveAllFiltersLabel: string;
  ShowPagingLabel: string;
  NoFilterConfiguredLabel: string;
  SearchQueryPlaceHolderText: string;
  EmptyFieldErrorMessage: string;
  PlaceHolderEditLabel: string;
  PlaceHolderConfigureBtnLabel: string;
  PlaceHolderIconText: string;
  PlaceHolderDescription: string;
}

declare module 'SearchWebPartStrings' {
  const strings: ISearchWebPartStrings;
  export = strings;
}
