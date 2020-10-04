declare interface IQuestionsWebPartStrings {
  PropertyPage_ButtonText_ManageNotificationGroup: string;
  PropertyPane_Description: string;
  PropertyPane_GroupName_About: string;
  PropertyPane_GroupName_LayoutSettings: string;
  PropertyPane_GroupName_Permissions: string;
  PropertyPane_Label_ApplicationPage: string;
  PropertyPane_Lable_CanVisitorsAskQuestions: string;
  PropertyPane_Label_CanVisitorsAskQuestionsDetails: string;
  PropertyPane_Label_CanVisitorsAskQuestionsDisabled: string;
  PropertyPane_Label_HideShowQuestionsDropDown: string;
  PropertyPane_Label_HideViewAllButton: string;  
  PropertyPage_Label_ManageNotificationGroupDetails: string;
  PropertyPane_Label_UseApplicationPage: string;
  PropertyPane_Label_UseApplicationPageDetails: string;
  PropertyPane_Label_LoadInitialPage: string;
  PropertyPane_Label_PageSize: string;
  PropertyPane_Label_SortOption: string;  
  PropertyPane_Label_VersionInfo: string;  
  PropertyPane_SortOption_Title: string;
  PropertyPane_SortOption_MostRecent: string;
  PropertyPane_SortOption_MostLiked: string;
  PropertyPaneText_No: string;
  PropertyPaneText_Yes: string;

  DropDownItem_AllQuestions: string;
  DropDownItem_OpenQuestions: string;
  DropDownItem_AnsweredQuestions: string;

  ButtonText_AskQuestion: string;
  ButtonText_Cancel: string;  
  ButtonText_CloseQuestion: string;
  ButtonText_Continue: string;
  ButtonText_Following: string;
  ButtonText_Helpful: string;
  ButtonText_Like: string;
  ButtonText_Next: string;
  ButtonText_No: string;
  ButtonText_NotFollowing: string;
  ButtonText_Prev: string;
  ButtonText_Post: string;
  ButtonText_Reply: string;
  ButtonText_ResumeEdit: string;  
  ButtonText_ViewAll: string;
  ButtonText_Yes: string;
  
  ButtonTitle_Following: string;

  Dialog_UnsavedChangesTitle: string;
  Dialog_UnsavedChangedSubText: string;
  Dialog_DeleteConfirmTitle: string;
  Dialog_DeleteConfirmSubText: string;

  EmailMessage_Body_HasMarkedAnswerTo: string;
  EmailMessage_Body_HasUnmarkedAnswerTo: string;
  EmailMessage_Body_HasNewRepliedTo: string;
  EmailMessage_Body_HasNewQuestion: string;
  EmailMessage_Body_HasUpdatedRepliedTo: string;
  EmailMessage_Body_QuestionDetails: string;
  EmailMessage_Body_ReplyDetails: string;
  EmailMessage_Body_ViewQuestion: string;
  EmailMessage_Subject_NewReply: string;
  EmailMessage_Subject_NewQuestion: string;
  EmailMessage_Subject_ReplyMarkedAnswer: string;
  EmailMessage_Subject_ReplyUnMarkedAnswer: string
  EmailMessage_Subject_UpdatedReply: string;

  ErrorMessage_DetailsRequired: string;
  ErrorMessage_DuplicateQuestion: string;
  ErrorMessage_QuestionRequired: string;
  ErrorMessage_HTTP_AccessDenied: string;
  ErrorMessage_HTTP_Generic: string;
  ErrorMessage_HTTP_NotFound: string;
  ErrorMessage_HTTP_QuestionNotFound: string;

  MenuText_Edit: string;
  MenuText_Delete: string;
  MenuText_MarkAnswer: string;
  MenuText_UnmarkAnswer: string;

  Message_AskedOn: string;  
  Message_IsAnswer: string;
  Message_IsAnswered: string;
  Message_RepliedOn: string;
  Message_SavedQuestion: string;
  Message_SavingQuestion: string;  
  Message_SavedReply: string;
  Message_SavingReply: string;

  MessageBar_QuestionSaveErrors: string;
  
  Placeholder_QuestionDetails: string;
  Placeholder_QuestionTitle: string;
  Placeholder_Search: string;

  Prefix_Reply: string;
}

declare module 'QuestionsWebPartStrings' {
  const strings: IQuestionsWebPartStrings;
  export = strings;
}
