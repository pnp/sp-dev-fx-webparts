declare interface IStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  QueryFieldLabel: string;
  FieldsTitleLabel: string;
  FieldsFieldLabel: string;
  FieldsTemplateLabel: string;
  FieldsMaxResults: string;
  FieldsSorting: string;
  QueryInfoDescription: string;
  FieldsExternalLabel: string;
  FieldsExternalTempLabel: string;
  TemplateGroupName: string;
  LoggingGroupName: string;
  LoggingFieldLabel: string;
  LoggingFieldDescription: string;
}

declare module 'mystrings' {
  const strings: IStrings;
  export = strings;
}
