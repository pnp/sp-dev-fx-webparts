declare interface IStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'mystrings' {
  const strings: IStrings;
  export = strings;
}
