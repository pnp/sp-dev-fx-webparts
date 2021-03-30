import { IPostItem } from './IPostItem';
import { IBaseLookupItem } from './IBaseLookupItem';

export interface IReplyItem extends IPostItem {
    isAnswer: boolean; 
    helpfulCount: number;
    helpfulIds: string[];  

    parentQuestionId?: number | null;
    parentQuestion?: IBaseLookupItem | null;
    parentReplyId?: number | null;
    parentReply?: IBaseLookupItem | null;

    // build by things that lookup to this
    replies: IReplyItem[];

    // determined based on current user and item intersection
    helpfulByCurrentUser: boolean;
    canMarkAsAnswer: boolean;
}
