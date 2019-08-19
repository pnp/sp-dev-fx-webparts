declare interface IDropdownWithRemoteDataStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListFieldLabel: string;
  ItemFieldLabel: string;
}

declare module 'dropdownWithRemoteDataStrings' {
  const strings: IDropdownWithRemoteDataStrings;
  export = strings;
}
