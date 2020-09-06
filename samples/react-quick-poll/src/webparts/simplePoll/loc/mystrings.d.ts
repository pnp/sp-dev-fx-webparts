declare interface ISimplePollWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListCreationText: string;
  PlaceholderIconText: string;
  PlaceholderDescription: string;
  PlaceholderButtonLabel: string;
  QuestionLoadingText: string;
  SubmissionLoadingText: string;
  PlsWait: string;
  PollDateLabel: string;
  PollDateCalloutText: string;
  PollQuestionsLabel: string;
  PollQuestionsPanelHeader: string;
  PollQuestionsManageButton: string;
  MsgAfterSubmissionLabel: string;
  MsgAfterSubmissionDescription: string;
  MsgAfterSubmissionPlaceholder: string;
  ResponseMsgToUserLabel: string;
  ResponseMsgToUserDescription: string;
  ResponseMsgToUserPlaceholder: string;
  DefaultResponseMsgToUser: string;
  SuccessfullVoteSubmission: string;
  FailedVoteSubmission: string;
  BtnSumbitVote: string;
  BtnSumbitVoteLabel: string;
  BtnSumbitVoteDescription: string;
  BtnSumbitVotePlaceholder: string;
  SubmitValidationMessage: string;
  ChartFieldLabel: string;
  ChartFieldCalloutText:string;
  NoPollMsgLabel: string;
  NoPollMsgDescription: string;
  NoPollMsgPlaceholder: string;
  NoPollMsgDefault: string;

  Q_Title_Title: string;
  Q_Title_Placeholder: string;
  Q_Options_Title: string;
  Q_Options_Placeholder: string;
  MultiChoice_Title: string;
  Q_StartDate_Title: string;
  Q_EndDate_Title: string;
}

declare module 'SimplePollWebPartStrings' {
  const strings: ISimplePollWebPartStrings;
  export = strings;
}
