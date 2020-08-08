declare interface IPeopleSearchWebPartStrings {
  DebugLayoutOption: string;
  FilterParameter: string;
  InvalidNumberIntervalMessage: string;
  NoResultMessage: string;
  OrderByParameter: string;
  PageSizeParameter: string;
  PeopleLayoutOption: string;
  PlaceHolderEditLabel: string;
  PlaceHolderConfigureBtnLabel: string;
  PlaceHolderIconText: string;
  PlaceHolderDescription: string;
  QuerySettingsGroupName: string;
  ResultsCount: string;
  ResultsLayoutLabel: string;
  SearchParameter: string;
  SearchQuerySettingsGroupName: string;
  SelectParameter: string;
  ShowPaginationControl: string;
  ShowResultsCountLabel: string;
  ShowBlankLabel: string;
  ShowBlankEditInfoMessage: string;
  StylingSettingsGroupName: string;
  TemplateParameters: {
    TemplateParametersGroupName: string;
    ManagePeopleFieldsLabel: string;
    ManagePeopleFieldsPanelDescriptionLabel: string;
    PlaceholderNameFieldLabel: string;
    PlaceholderValueFieldLabel: string;
    PersonaSizeOptionsLabel: string,
    PersonaSizeExtraSmall: string;
    PersonaSizeSmall: string;
    PersonaSizeRegular: string;
    PersonaSizeLarge: string;
    PersonaSizeExtraLarge: string;
  }
}

declare module 'PeopleSearchWebPartStrings' {
  const strings: IPeopleSearchWebPartStrings;
  export = strings;
}
