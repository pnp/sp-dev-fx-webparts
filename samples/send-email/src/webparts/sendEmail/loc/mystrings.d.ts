declare interface ISendEmailStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'sendEmailStrings' {
  const strings: ISendEmailStrings;
  export = strings;
}
