declare interface IListFormWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
  DescriptionFieldLabel: string;
  ListFieldLabel: string;
  FormTypeFieldLabel: string;
  ItemIdFieldLabel: string;
  ItemIdFieldDescription: string;
  ShowUnsupportedFieldsLabel: string;
  RedirectUrlFieldLabel: string;
  RedirectUrlFieldDescription: string;
  LocalWorkbenchUnsupported: string;
  MissingListConfiguration: string;
  ConfigureWebpartButtonText: string;
  ErrorOnLoadingLists: string;
}

declare module 'ListFormWebPartStrings' {
  const strings: IListFormWebPartStrings;
  export = strings;
}
