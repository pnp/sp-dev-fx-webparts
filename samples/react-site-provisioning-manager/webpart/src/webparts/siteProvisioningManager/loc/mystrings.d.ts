
declare interface ISiteProvisioningManagerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ClientIdFieldLabel: string;
  ErrorMessageUserNotAdmin:string;
  LoadingLabel:string;
  SuccessMessage:string;
  GetTemplateLabel:string;
  ApplyTemplateLable:string;
  GetProvisioningUrlFieldLabel:string;
  ApplyProvisioningUrlFieldLabel:string;
}

declare module 'SiteProvisioningManagerWebPartStrings' {
  const strings: ISiteProvisioningManagerWebPartStrings;
  export = strings;
}
