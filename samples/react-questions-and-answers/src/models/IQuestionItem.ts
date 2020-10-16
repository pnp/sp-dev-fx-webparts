import { IReplyItem } from './IReplyItem';
import { IPostItem } from './IPostItem';

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
}
