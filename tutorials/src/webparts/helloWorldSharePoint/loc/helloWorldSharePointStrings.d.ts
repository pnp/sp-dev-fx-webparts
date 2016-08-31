declare interface IHelloWorldSharePointStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'helloWorldSharePointStrings' {
  const helloWorldSharePointStrings: IHelloWorldSharePointStrings;
  export = helloWorldSharePointStrings;
}
