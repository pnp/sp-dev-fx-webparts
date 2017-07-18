declare interface IThemesStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'themesStrings' {
  const strings: IThemesStrings;
  export = strings;
}
