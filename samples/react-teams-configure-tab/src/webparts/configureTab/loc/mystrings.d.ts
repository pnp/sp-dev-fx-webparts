declare interface IConfigureTabWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'ConfigureTabWebPartStrings' {
  const strings: IConfigureTabWebPartStrings;
  export = strings;
}
