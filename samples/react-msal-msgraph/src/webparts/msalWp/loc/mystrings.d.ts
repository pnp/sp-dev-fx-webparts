declare interface IMsalWpStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'msalWpStrings' {
  const strings: IMsalWpStrings;
  export = strings;
}
