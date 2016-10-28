declare interface IReactReduxStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'reactReduxStrings' {
  const strings: IReactReduxStrings;
  export = strings;
}
