declare interface IReactTinyMceWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'ReactTinyMceWebPartStrings' {
  const strings: IReactTinyMceWebPartStrings;
  export = strings;
}
