declare interface IReactTinyMceWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ContentFieldLabel: string;
}

declare module 'ReactTinyMceWebPartStrings' {
  const strings: IReactTinyMceWebPartStrings;
  export = strings;
}
