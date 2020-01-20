export type SourceType = 'profile' | 'likes' | 'list' | 'collection' | 'url';
export type Theme = 'dark' | 'light';

/**
 * Twitter timeline settings
 * See: https://developer.twitter.com/en/docs/twitter-for-websites/timelines/overview
 */
export interface ITwittweTimelineSettings {
  /**
   * Timeline source type
   */
  sourceType: SourceType;
  /**
   * Twitter public profile name to be used with 'profile' or 'likes' timeline
   */
  screenName?: string;
  /**
   * Twitter public profile user id to be used with 'profile' or 'likes' timeline
   */
  userId?: string;
  /**
   * List's owner name for 'list' timeline
   */
  ownerScreenName?: string;
  /**
   * List's name. For 'list' timeline
   */
  slug?: string;
  /**
   * Unique list id for 'list' timeline OR
   * Unique collection id for 'collection' timeline
   */
  id?: string;
  /**
   * Url source to show
   */
  url?: string;
  /**
   * Calculate widget's heigh based on parent
   */
  autoHeight?: boolean;
  /**
   * Widget's theme
   */
  theme?: Theme;
  /**
   * Border color (hex)
   */
  borderColor?: string;
  /**
   * Do not display header
   */
  noHeader?: boolean;
  /**
   * Do not display footer
   */
  noFooter?: boolean;
  /**
   * Do not display border
   */
  noBorders?: boolean;
  /**
   * Do not display scrollbar
   */
  noScrollbar?: boolean;
  /**
   * Custom language code to use.
   * See https://developer.twitter.com/en/docs/twitter-for-websites/twitter-for-websites-supported-languages/overview.html
   */
  lang?: string;
  /**
   * Custom width
   */
  width?: number;
  /**
   * Custom height (for autoHeight set to false)
   */
  height?: number;
  /**
   * Number of tweets to display. 1..20
   */
  tweetLimit?: number;
}
