declare interface IQuestionsWebPartStrings {
  PropertyPage_ButtonText_ManageNotificationGroup: string;

  PropertyPane_GroupName_About: string;
  PropertyPane_GroupName_LayoutSettings: string;
  PropertyPane_GroupName_Permissions: string;
  PropertyPane_GroupName_Setup: string;
  PropertyPane_Label_ApplicationPage: string;
  PropertyPane_Label_CanVisitorsParticipate: string;
  PropertyPane_Label_CanVisitorsParticipateDetails: string;
  PropertyPane_Label_CanVisitorsParticipateDisabled: string;
  PropertyPane_Label_Category: string;
  PropertyPane_Label_HideShowQuestionsDropDown: string;
  PropertyPane_Label_HideViewAllButton: string;
  PropertyPage_Label_ManageNotificationGroupDetails: string;
  PropertyPane_Label_UseApplicationPage: string;
  PropertyPane_Label_UseApplicationPageDetails: string;
  PropertyPane_Label_LoadInitialPage: string;
  PropertyPane_Label_PageSize: string;
  PropertyPane_Label_ShowCategory: string;
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

  ButtonText_AddAttachment: string;
  ButtonText_AskQuestion: string;
  ButtonText_StartConversation: string;
  ButtonText_Cancel: string;
  ButtonText_Close: string;
  ButtonText_Continue: string;
  ButtonText_Following: string;
  ButtonText_Helpful: string;
  ButtonText_Like: string;
  ButtonText_Next: string;
  ButtonText_No: string;
  ButtonText_NotFollowing: string;
  ButtonText_OK: string;
  ButtonText_Prev: string;
  ButtonText_Post: string;
  ButtonText_Remove: string;
  ButtonText_Reply: string;
  ButtonText_ResumeEdit: string;
  ButtonText_ViewAll: string;
  ButtonText_Yes: string;
  ButtonText_CopyLink: string;
  ButtonTitle_Following: string;

  Dialog_AddAttachmentTitle: string;
  Dialog_UnsavedChangesTitle: string;
  Dialog_UnsavedChangedSubText: string;
  Dialog_DeleteConfirmTitle: string;
  Dialog_DeleteConfirmSubText: string;
  Dialog_RemoveAttachmentTitle:  string;
  Dialog_RemoveAttachmentSubText: string;

  EmailMessage_Body_HasMarkedAnswerTo: string;
  EmailMessage_Body_HasUnmarkedAnswerTo: string;
  EmailMessage_Body_HasNewRepliedToConversation: string;
  EmailMessage_Body_HasNewRepliedToQuestion: string;
  EmailMessage_Body_HasNewConversation: string;
  EmailMessage_Body_HasNewQuestion: string;
  EmailMessage_Body_HasUpdatedRepliedToConversation: string;
  EmailMessage_Body_HasUpdatedRepliedToQuestion: string;
  EmailMessage_Body_CategoryDetails: string;
  EmailMessage_Body_ConversationDetails: string;
  EmailMessage_Body_PageDetails_Conversation: string;
  EmailMessage_Body_PageDetails_Question: string;
  EmailMessage_Body_ProblemViewing: string;
  EmailMessage_Body_QuestionDetails: string;
  EmailMessage_Body_ReplyDetails: string;
  EmailMessage_Body_ViewQuestion: string;
  EmailMessage_Body_MentionNotification: string;
  EmailMessage_Subject_NewConversation: string;
  EmailMessage_Subject_NewReply: string;
  EmailMessage_Subject_NewQuestion: string;
  EmailMessage_Subject_ReplyMarkedAnswer: string;
  EmailMessage_Subject_ReplyUnMarkedAnswer: string
  EmailMessage_Subject_UpdatedReply: string;
  EmailMessage_Subject_MentionNotification: string;

  ErrorMessage_AttachmentsAdd: string;
  ErrorMessage_AttachmentsRemove: string;
  ErrorMessage_ConversationAdd: string;
  ErrorMessage_ConversationUpdate: string;
  ErrorMessage_ConversationRequired: string;
  ErrorMessage_DetailsRequired: string;
  ErrorMessage_DuplicateQuestion: string;
  ErrorMessage_FileUpload: string;
  ErrorMessage_FileUploadSize: string;
  ErrorMessage_FileUploadName: string;
  ErrorMessage_FileUploadNameSpecialChars: string;
  ErrorMessage_QuestionAdd: string;
  ErrorMessage_QuestionUpdate: string;
  ErrorMessage_QuestionRequired: string;
  ErrorMessage_HTTP_AccessDenied: string;
  ErrorMessage_HTTP_BadRequest: string;
  ErrorMessage_HTTP_Generic: string;
  ErrorMessage_HTTP_ItemNotFound: string;
  ErrorMessage_HTTP_NotFound: string;

  HeaderText_Attachments: string;

  MenuText_ChangeToConversation: string;
  MenuText_ChangeToQuestion: string;
  MenuText_Edit: string;
  MenuText_Delete: string;
  MenuText_MarkAnswer: string;
  MenuText_UnmarkAnswer: string;

  Message_PostedOn: string;
  Message_PostedAt: string;
  Message_IsAnswer: string;
  Message_IsAnswered: string;
  Message_NoConversationsFound: string;
  Message_NoQuestionsFound: string;
  Message_RemoveAttachment: string;
  Message_RepliedOn: string;
  Message_SavedConversation: string;
  Message_SavingAttachments: string;
  Message_SavingConversation: string;
  Message_SavedQuestion: string;
  Message_SavingQuestion: string;
  Message_SavedReply: string;
  Message_SavingReply: string;
  Message_Uploading: string;

  MessageBar_QuestionSaveErrors: string;

  Placeholder_QuestionDetails: string;
  Placeholder_QuestionReplyDetails: string;
  Placeholder_ConversationDetails: string;
  Placeholder_ConversationReplyDetails: string;
  Placeholder_QuestionTitle: string;
  Placeholder_ConversationTitle: string;
  Placeholder_Search_Questions: string;
  Placeholder_Search_Conversations: string;

  Prefix_Reply: string;
}

declare module 'QuestionsWebPartStrings' {
  const strings: IQuestionsWebPartStrings;
  export = strings;
}
