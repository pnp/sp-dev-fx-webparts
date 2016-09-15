declare interface IPowerBiEmbeddedStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'powerBiEmbeddedStrings' {
  const strings: IPowerBiEmbeddedStrings;
  export = strings;
}
