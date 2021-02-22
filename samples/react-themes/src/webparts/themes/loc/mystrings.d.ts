declare interface IThemesStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'ThemesStrings' {
  const strings: IThemesStrings;
  export = strings;
}
