declare interface IDirectoryWebPartStrings {
  DropDownPlaceLabelMessage: string;
  DropDownPlaceHolderMessage: string;
  SearchPlaceHolder: string;
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
  DirectoryMessage: string;
  LoadingText: string;
  SearchPropsLabel: string;
  SearchPropsDesc: string;
  ClearTextSearchPropsLabel: string;
  ClearTextSearchPropsDesc: string;
  PagingLabel: string;
}

declare module 'DirectoryWebPartStrings' {
  const strings: IDirectoryWebPartStrings;
  export = strings;
}
