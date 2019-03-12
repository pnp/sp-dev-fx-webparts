declare interface ITenantPropertiesWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
  ListViewColumnKeyLabel:string;
  ListViewColumnValueLabel:string;
  ListViewColumnDescriptionLabel:string;
  ListViewColumnCommentLabel:string;
  ErrorMessageUserNotAdmin:string;
  LoadingLabel:string;
  CommandbarNewLabel:string;
  CommandbarEditLabel:string;
  CommandbarDeleteLabel:string;
  CommandbarRefreshLabel:string;
  SearchPlaceholder:string;
  PrimaryButtonLabelSave:string;
  PrimaryButtonLabelDelete:string;
  DefaultButtonLabel:string;
  PanelHeaderTextEdit:string,
  PanelHeaderTextDelete:string,
  messageTenantExist:string
}

declare module 'TenantPropertiesWebPartStrings' {
  const strings: ITenantPropertiesWebPartStrings;
  export = strings;
}
