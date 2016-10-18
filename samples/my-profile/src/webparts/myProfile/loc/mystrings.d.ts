declare interface IMyProfileStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'myProfileStrings' {
  const strings: IMyProfileStrings;
  export = strings;
}
