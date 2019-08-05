declare interface IDirectoryWebPartStrings {
  SearchPlaceHolder: string;
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
  DirectoryMessage: string;
}

declare module 'DirectoryWebPartStrings' {
  const strings: IDirectoryWebPartStrings;
  export = strings;
}
