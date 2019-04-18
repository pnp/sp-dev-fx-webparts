declare interface IMyTeamsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  OpenInClientAppFieldLabel: string;
}

declare module 'MyTeamsWebPartStrings' {
  const strings: IMyTeamsWebPartStrings;
  export = strings;
}
