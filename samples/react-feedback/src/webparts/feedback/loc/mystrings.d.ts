declare interface IFeedbackWebPartStrings {
  PropertyPane_Description: string;
  PropertyPane_Label_ButtonText: string;
  PropertyPane_GroupName_Settings: string;
  PropertyPane_GroupName_About: string;
  PropertyPane_Label_VersionInfo: string;
  ButtonText_Cancel: string;
  ButtonText_Ok: string;
  ButtonText_Submit: string;
  PanelHeaderText: string;
  FeedbackBox_Label: string;
  FeedbackCategory_Label: string;
  FeedbackCategoryToggle_Label: string;
  Feedback_Instructions: string;
}

declare module 'FeedbackWebPartStrings' {
  const strings: IFeedbackWebPartStrings;
  export = strings;
}
