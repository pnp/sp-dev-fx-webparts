declare interface IJQueryStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'jQueryStrings' {
  const strings: IJQueryStrings;
  export = strings;
}
