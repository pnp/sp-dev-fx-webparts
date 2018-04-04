declare interface ISearchWebPartStrings {
  SearchSettingsGroupName: string;
  SearchQueryKeywordsFieldLabel: string;
  SearchQueryKeywordsFieldDescription: string;
  QueryTemplateFieldLabel: string;
  SelectedPropertiesFieldLabel: string;
  SelectedPropertiesFieldDescription: string;
  LoadingMessage: string;
  MaxResultsCount: string;
  NoResultMessage: string;
  RefinersFieldLabel: string;
  RefinersFieldDescription: string;
  FilterPanelTitle: string;
  FilterResultsButtonLabel: string;
  SelectedFiltersLabel: string;
  ApplyAllFiltersLabel: string;
  RemoveAllFiltersLabel: string;
  ShowPagingLabel: string;
  ShowFileIconLabel: string;
  ShowCreatedDateLabel: string;
  ShowResultsCountLabel: string;
  NoFilterConfiguredLabel: string;
  SearchQueryPlaceHolderText: string;
  EmptyFieldErrorMessage: string;
  PlaceHolderEditLabel: string;
  PlaceHolderConfigureBtnLabel: string;
  PlaceHolderIconText: string;
  PlaceHolderDescription: string;
  ResultSourceIdLabel: string;
  InvalidResultSourceIdMessage: string;
  UseSearchBoxQueryLabel: string;
  EnableQueryRulesLabel: string;
  StylingSettingsGroupName: string;
  CountMessage: string;
}

declare module 'SearchWebPartStrings' {
  const strings: ISearchWebPartStrings;
  export = strings;
}
