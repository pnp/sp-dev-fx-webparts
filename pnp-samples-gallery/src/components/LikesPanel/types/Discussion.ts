import { type ReactionInfo } from './ReactionInfo';

export type Discussion = {
    id?: string;
    url?: string;
    locked?: boolean;
    reactions?: {
        THUMBS_UP?: ReactionInfo;
        THUMBS_DOWN?: ReactionInfo;
        LAUGH?: ReactionInfo;
        HOORAY?: ReactionInfo;
        CONFUSED?: ReactionInfo;
        HEART?: ReactionInfo;
        ROCKET?: ReactionInfo;
        EYES?: ReactionInfo;
    };
    repository?: { nameWithOwner?: string };
    reactionCount?: number;
    totalCommentCount?: number;
    totalReplyCount?: number;
};
