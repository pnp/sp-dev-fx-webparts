declare interface IListFormWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
  DescriptionFieldLabel: string;
  ListFieldLabel: string;
  FormTypeFieldLabel: string;
  ItemIdFieldLabel: string;
  ItemIdFieldDescription: string;
  RedirectUrlFieldLabel: string;
  RedirectUrlFieldDescription: string;
}

declare module 'ListFormWebPartStrings' {
  const strings: IListFormWebPartStrings;
  export = strings;
}
