import { type Discussion } from './Discussion';

export type GiscusReactionPayload = {
    discussion?: Discussion;
    viewer?: { avatarUrl?: string; login?: string; url?: string };
};
