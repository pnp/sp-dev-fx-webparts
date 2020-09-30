interface IBingSearchResult {
  webSearchUrl: string;
  webSearchUrlPingSuffix: string;
  name: string;
  thumbnailUrl: string;
  datePublished: string;
  isFamilyFriendly: boolean;
  creativeCommons: string;
  contentUrl: string;
  contentUrlPingSuffix: string;
  hostPageUrl: string;
  hostPageUrlPingSuffix: string;
  contentSize: string;
  encodingFormat: string;
  hostPageDisplayUrl: string;
  width: number;
  height: number;
  thumbnail: Thumbnail;
  imageInsightsToken: string;
  insightsMetadata: InsightsMetadata;
  imageId: string;
  accentColor: string;
}

interface InsightsMetadata {
  pagesIncludingCount: number;
  availableSizesCount: number;
  recipeSourcesCount?: number;
  bestRepresentativeQuery?: BestRepresentativeQuery;
}

interface BestRepresentativeQuery {
  text: string;
  displayText: string;
  webSearchUrl: string;
  webSearchUrlPingSuffix: string;
}

interface Thumbnail {
  width: number;
  height: number;
}
