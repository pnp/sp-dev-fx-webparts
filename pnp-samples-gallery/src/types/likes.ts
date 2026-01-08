export interface LikesEntry {
  count: number;
  discussionNumber?: number;
  discussionUrl?: string;
}

export interface LikesJson {
  generatedAt?: string; // ISO timestamp
  source?: {
    owner?: string;
    repo?: string;
    category?: string;
  };
  likes?: Record<string, LikesEntry>;
}
