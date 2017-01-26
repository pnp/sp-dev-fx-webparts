declare interface IExtendGulpStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'extendGulpStrings' {
  const strings: IExtendGulpStrings;
  export = strings;
}
