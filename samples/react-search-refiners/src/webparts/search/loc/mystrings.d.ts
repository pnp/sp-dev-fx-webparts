declare interface ISearchWebPartStrings {
  SearchSettingsGroupName: string;
  SearchQueryKeywordsFieldLabel: string;
  QueryTemplateFieldLabel: string;
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
  ShowFileIconLabel: string;
  ShowCreatedDateLabel: string;
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
