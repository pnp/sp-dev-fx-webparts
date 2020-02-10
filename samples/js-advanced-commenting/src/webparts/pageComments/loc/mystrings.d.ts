declare interface IPageCommentsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;

  DateTimeFormatLabel: string;
  DateTimeFormatDescription: string;
  RoundProfilePicLabel: string;
  RoundProfilePicDescription: string;
  NavigationLabel: string;
  NavigationDescription: string;
  AttachmentLabel: string;
  AttachmentDescription: string;
  PingLabel: string;
  PingDescription: string;
  EditingLabel: string;
  EditingDescription: string;
  UpVotingLabel: string;
  UpVotingDescription: string;
  ReplyLabel: string;
  ReplyDescription: string;
  DeleteLabel: string;
  DeleteDescription: string;
  DeleteRepliesLabel: string;
  DeleteRepliesDescription: string;
  HashtagsLabel: string;
  HashtagsDescription: string;
  DocumentPreviewLabel: string;
  DocumentPreviewDescription: string;
  AttachmentFileFormatLabel: string;
  AttachmentFileFormatDescription: string;
  AttachmentFileSizeLabel: string;
  AttachmentFileSizeDescription: string;
  AttachmentRepoLabel: string;
  AttachmentRepoPropValMsg: string;
  NoAttachmentRepoMsg: string;
  LoadingMsg: string;
}

declare module 'PageCommentsWebPartStrings' {
  const strings: IPageCommentsWebPartStrings;
  export = strings;
}
