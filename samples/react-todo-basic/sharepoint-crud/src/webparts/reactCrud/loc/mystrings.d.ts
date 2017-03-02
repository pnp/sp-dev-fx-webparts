declare interface IReactCrudStrings {
  PropertyPaneDescription: string;
  DataGroupName: string;
  ListNameFieldLabel: string;
}

declare module 'reactCrudStrings' {
  const strings: IReactCrudStrings;
  export = strings;
}
