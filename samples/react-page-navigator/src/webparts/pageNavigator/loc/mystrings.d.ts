declare interface IPageNavigatorWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  StickyMode: string;
  StickyParentDistance: string;
  ErrorNumeric: string;
  ErrorNumericLog: string;
  ErrorDistanceTooFar: string;
}

declare module 'PageNavigatorWebPartStrings' {
  const strings: IPageNavigatorWebPartStrings;
  export = strings;
}
