declare interface IContentQueryStrings {
  SourcePageDescription: string;
  QueryPageDescription: string;
  DisplayPageDescription: string;
  SourceGroupName: string;
  QueryGroupName: string;
  DisplayGroupName: string;
  WebUrlFieldLabel: string;
  WebUrlFieldPlaceholder: string;
  WebUrlFieldLoadingLabel: string;
  WebUrlFieldLoadingError: string;
  ListTitleFieldLabel: string;
  ListTitleFieldPlaceholder: string;
  ListTitleFieldLoadingLabel: string;
  ListTitleFieldLoadingError: string;
  OrderByFieldLabel: string;
  OrderByFieldLoadingLabel: string;
  OrderByFieldLoadingError: string;
  LimitEnabledFieldLabel: string;
  ItemLimitPlaceholder: string;
  ErrorItemLimit: string;
  TemplateUrlFieldLabel: string;
  TemplateUrlPlaceholder: string;
  ErrorTemplateExtension: string;
  ErrorTemplateResolve: string;
  ErrorWebAccessDenied: string;
  ErrorWebNotFound: string;
  ShowItemsAscending: string;
  ShowItemsDescending: string;
  queryFilterPanelStrings: any;
  viewFieldsChecklistStrings: any;
  contentQueryStrings: any;
}

declare module 'contentQueryStrings' {
  const strings: IContentQueryStrings;
  export = strings;
}