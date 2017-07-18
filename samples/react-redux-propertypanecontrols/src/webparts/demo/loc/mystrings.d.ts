declare interface IDemoStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  EnabledFieldLabel: string;
  ListNameFieldLabel: string;
  ItemNameFieldLabel: string;
}

declare module 'demoStrings' {
  const strings: IDemoStrings;
  export = strings;
}
