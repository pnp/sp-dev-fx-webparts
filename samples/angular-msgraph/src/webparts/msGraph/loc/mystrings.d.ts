declare interface IMsGraphStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'msGraphStrings' {
  const strings: IMsGraphStrings;
  export = strings;
}
