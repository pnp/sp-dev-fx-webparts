declare interface IConfigureTabWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ContentPageUrlFieldLabel: string;
}

declare module 'ConfigureTabWebPartStrings' {
  const strings: IConfigureTabWebPartStrings;
  export = strings;
}
