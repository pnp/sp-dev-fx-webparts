declare interface IMyApprovalsWebPartStrings {
  PropertyPaneDescription: string;
  EnvironmentLabel: string;
  EnvironmentEmptyError: string;
  ApprovalItemsLabel: string;
  ApprovalRequestTitleLabel: string;
  ApprovalRequestDateLabel: string;
  ApprovalRequestUserLabel: string;
}

declare module 'MyApprovalsWebPartStrings' {
  const strings: IMyApprovalsWebPartStrings;
  export = strings;
}
