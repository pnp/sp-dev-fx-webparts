declare interface IDirectoryWebPartStrings {
  DropDownPlaceLabelMessage: string;
  DropDownPlaceHolderMessage: string;
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
