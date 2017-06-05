declare interface IPnpJsCrudWithBatchStrings {
  PropertyPaneDescription: string;
  DataGroupName: string;
  ListNameFieldLabel: string;
}

declare module 'pnpJsCrudWithBatchStrings' {
  const strings: IPnpJsCrudWithBatchStrings;
  export = strings;
}
