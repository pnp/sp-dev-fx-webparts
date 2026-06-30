declare interface IDynamicFormularGeneratorWebPartStrings {
  PropertyPaneDescription: string;
  GroupListViewData: string;
  GroupEMailSettings: string;
  DataListSourceLabel: string;
  DataListSourceCurrentLabel: string;
  DataListSourceExternLabel: string;
  ChooseList: string;
  ChooseView: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  SuccessMessageLabel: string;
  NoOfFileUploads: string;
  FieldRulesLabel: string;
  URLOfExternalSitePlaceholderLabel: string;
  ErrorMissingSiteText: string;
  AllowedUploadFileTypesLabel: string;
  EmailSubjectLable: string;
  EmailHeaderLabel: string;
  SendEMailWithFormDataLabel: string;
  SendEMailWithFormDataYesLabel: string;
  SendEMailWithFormDataNoLabel: string;
  AddDataLinkToEMailLabel: string;
  AttachmentLabel: string;
  AttachmentIndexLabel: string;
  EnablePrintLabel: string;
  EmailNotifyBCCLabel: string;

  GroupMiscSettings: string;
  DateTimeFieldLabel: string;
  FormValidFromFieldLabel: string;
  FormValidToFieldLabel: string;

  LabelYES: string,
  LabelNO: string,

  VALMsgRequiredField: string;
  VALMsgInvalidFieldData: string;
  VALMsgOnlyNumbersAllowed: string;
  VALMsgDecimalInvalid: string;
  VALMsgvalueRangeOverflow: string;

  CFGHeader: string;
  CFGChooseList: string;
  CFGChooseView: string;
  CFGBTNConfigure: string;

  ChooseContentType: string;

  MAILLinkTodata: string;
  MSGWaiting: string;
  BTNSendFormData: string;
  BTNPrintFormData: string;
  BTNResetFormData: string;
  HEADPrintForm: string;

  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;

  MSGDataSendAlready: string;

  RESTFieldLabelField: string;
  RESTFieldLabelUrl: string;
  RESTFieldLabelCollectionProperty: string;
  RESTFieldLabelIDProperty: string;
  RESTFieldLabelDisplayProperty: string;
  RESTFieldLabelValueProperty: string;

  BTNConfigureRESTLookup: string;
  HEADConfigureRESTLookup: string;
  LBLRestLookupDescription: string;

  LBLFormMinValue: string;
  LBLFormMaxValue: string;
  LBLFormMaxMinValue: string;
  MSGConfirmationSubmitData: string;
  ErrorInvalidFileType: string;

  LblPchEnterUrl: string;
  LblPchEnterAlternateText: string;
}

declare module 'DynamicFormularGeneratorWebPartStrings' {
  const strings: IDynamicFormularGeneratorWebPartStrings;
  export = strings;
}
