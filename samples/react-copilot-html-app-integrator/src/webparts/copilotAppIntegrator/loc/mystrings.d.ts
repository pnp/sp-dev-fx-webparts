declare interface ICopilotAppIntegratorWebPartStrings {
  PropertyPaneDescription: string;
  HtmlSourceGroupName: string;
  HtmlFileWebUrlFieldLabel: string;
  HtmlFileServerRelativeUrlFieldLabel: string;
  FilePickerFieldLabel: string;
  FilePickerButtonLabel: string;
  AdvancedGroupName: string;
  AdvancedGroupDescription: string;
  NoFileSelectedMessage: string;
  CurrentFileLabelPrefix: string;
  ResolvingSiteUrlMessage: string;
  WebUrlResolutionFailedMessage: string;
  MinimumHeightFieldLabel: string;
  MaximumHeightFieldLabel: string;
  LoadingMessage: string;
  ErrorPrefix: string;
  SelectFileMessage: string;
  SetupTitle: string;
  SetupIntro: string;
  SetupStep1: string;
  SetupStep2: string;
  SetupStep3: string;
  SetupStep4: string;
  SetupNote: string;
  OnlyHtmlFilesMessage: string;
  WrongTenantMessage: string;
  CompatibilityWarningsTitle: string;
  CompatibilityWarningsNote: string;
  HideCompatibilityWarningsFieldLabel: string;
  HideCompatibilityWarningsDescription: string;
  HideCompatibilityWarningsOnText: string;
  HideCompatibilityWarningsOffText: string;
}

declare module 'CopilotAppIntegratorWebPartStrings' {
  const strings: ICopilotAppIntegratorWebPartStrings;
  export = strings;
}
