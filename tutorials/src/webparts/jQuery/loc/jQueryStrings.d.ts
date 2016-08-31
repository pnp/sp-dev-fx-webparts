declare interface IJQueryStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'jQueryStrings' {
  const jQueryStrings: IJQueryStrings;
  export = jQueryStrings;
}
