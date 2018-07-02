declare interface ISearchBoxWebPartStrings {
  SearchInputPlaceholder: string;
  SearchBoxQuerySuggestionsSettings: string;
  SearchBoxEnableQuerySuggestions: string;
  SearchBoxNewPage: string;
  SearchBoxSearchInNewPageLabel: string;
  SearchBoxSearchInNewPageDescription: string;
  SearchBoxPageUrlLabel: string;
  SearchBoxUrlErrorMessage: string;
  SearchBoxSameTabOpenBehavior: string;
  SearchBoxNewTabOpenBehavior: string;
  SearchBoxPageOpenBehaviorLabel: string;
  SearchBoxDynamicPropertyInputLabel: string;
  UseDynamicDataSourceLabel: string;
  SearchBoxDynamicDataSourceGroupName: string;
}

declare module 'SearchBoxWebPartStrings' {
  const strings: ISearchBoxWebPartStrings;
  export = strings;
}
