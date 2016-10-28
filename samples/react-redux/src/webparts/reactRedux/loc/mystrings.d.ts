declare interface IReactReduxStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  NameFieldLabel: string;
}

declare module 'reactReduxStrings' {
  const strings: IReactReduxStrings;
  export = strings;
}
