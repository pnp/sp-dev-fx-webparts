declare interface IDemoStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'demoStrings' {
  const strings: IDemoStrings;
  export = strings;
}
