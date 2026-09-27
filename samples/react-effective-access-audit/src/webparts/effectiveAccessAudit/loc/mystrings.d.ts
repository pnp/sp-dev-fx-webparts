declare interface IEffectiveAccessAuditWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  RootPathFieldLabel: string;
  ListTitleFieldLabel: string;
  DefaultTitle: string;
  SetupTitle: string;
  SetupDescription: string;
  LoadingMessage: string;
  EmptyMessage: string;
  ErrorTitle: string;
  AccessDeniedMessage: string;
  NotFoundMessage: string;
  ThrottledMessage: string;
  GenericErrorMessage: string;
  Refresh: string;
  LimitationNote: string;
  TableCaption: string;
  PrincipalHeader: string;
  RolesHeader: string;
  ScopeHeader: string;
  NoRoles: string;
}

declare module 'EffectiveAccessAuditWebPartStrings' {
  const strings: IEffectiveAccessAuditWebPartStrings;
  export = strings;
}
