import { IReplyItem } from './IReplyItem';
import { IPostItem } from './IPostItem';
import { DiscussionType } from 'utilities';

export interface IQuestionItem extends IPostItem {
    isAnswered: boolean;
    followEmails: string[];

    // built by things that lookup to this
    totalReplyCount: number;
    replies: IReplyItem[];

    // determined based on current user and item intersection
    followedByCurrentUser: boolean;

    // set when isAnswered is true
    answerReply?: IReplyItem;

    // the category that a question or conversation starter may be tied to (optional)
    category: string;

    // the type of discussion
    discussionType: DiscussionType;

    // the page the question was asked on
    page: string;
}
