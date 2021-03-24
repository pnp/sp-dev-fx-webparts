import { DiscussionType } from "utilities";

export interface IItemInfo {
  id?: number;
  title?: string;
  parentQuestionId?: number | null;
  parentReplyId?: number | null;
  discussionType: DiscussionType;
}
