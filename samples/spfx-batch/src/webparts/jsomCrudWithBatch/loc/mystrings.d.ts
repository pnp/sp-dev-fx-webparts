declare interface IJsomCrudWithBatchStrings {
  PropertyPaneDescription: string;
  DataGroupName: string;
  ListNameFieldLabel: string;
}

declare module 'jsomCrudWithBatchStrings' {
  const strings: IJsomCrudWithBatchStrings;
  export = strings;
}
