export interface DiscussionEntry {
  url: string;
  totalReactions: number;
  reactionCounts: Record<string, number>;
  allReactors: string[];
}

export interface DiscussionReactionsJson {
  generatedAt: string;
  discussions: Record<string, DiscussionEntry>;
}

export type DiscussionFeedItem = { sampleId: string; allReactors: string[] };

// No default export — types only
