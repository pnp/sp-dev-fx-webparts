export interface LikesEntry {
  count: number;
  discussionNumber?: number;
  discussionUrl?: string;
}

export interface DiscussionEntry { totalReactions?: number; allReactors?: string[]; }

export interface LikesJson {
  generatedAt?: string; // ISO timestamp
  source?: {
    owner?: string;
    repo?: string;
    category?: string;
  };
  likes?: Record<string, LikesEntry>;
  discussions?: Record<string, DiscussionEntry>;
}
