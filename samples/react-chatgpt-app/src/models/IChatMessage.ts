/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HostedContents {
  "@microsoft.graph.temporaryId": string;
  contentBytes: string;
  contentType: string;
}
export interface AddConversationMember {
  "@odata.type": string;
  "user@odata.bind": string;
  visibleHistoryStartDateTime?: string;
  roles: string[];
}
export interface AddConversationMemberResults {
  "@odata.context": string;
  id: string;
  topic?: any;
  createdDateTime: string;
  lastUpdatedDateTime: string;
  chatType: string;
}
export interface IChatMessage {
  "@odata.context": string;
  id: string;
  replyToId?: any;
  etag: string;
  messageType: string;
  createdDateTime: string;
  lastModifiedDateTime: string;
  lastEditedDateTime?: any;
  deletedDateTime?: any;
  subject: string;
  summary?: any;
  importance: string;
  locale: string;
  policyViolation?: any;
  from: From;
  body: Body;
  attachments: Attachment[];
  mentions: Mention[];
  reactions: IReaction[];
}
export interface IReaction {
  reactionType: string;
  user: User;
  createdDateTime: string;
}
export interface Mention {
  id: number;
  mentionText: string;
  mentioned: From;
}
export interface Attachment {
  id: string;
  contentType: string;
  contentUrl: string;
  content?: any;
  name: string;
  thumbnailUrl?: any;
}
export interface Body {
  contentType: string;
  content: string;
}
export interface From {
  application?: any;
  device?: any;
  conversation?: any;
  user: User;
}
export interface User {
  id: string;
  displayName: string;
  userIdentityType: string;
}
export interface HostedContents {
  "@microsoft.graph.temporaryId": string;
  contentBytes: string;
  contentType: string;
}
export interface AddConversationMember {
  "@odata.type": string;
  "user@odata.bind": string;
  visibleHistoryStartDateTime?: string;
  roles: string[];
}
export interface AddConversationMemberResults {
  "@odata.context": string;
  id: string;
  topic?: any;
  createdDateTime: string;
  lastUpdatedDateTime: string;
  chatType: string;
}
