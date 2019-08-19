declare interface ISpSecurityStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'spSecurityStrings' {
  const strings: ISpSecurityStrings;
  export = strings;
}
