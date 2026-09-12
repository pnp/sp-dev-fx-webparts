/** Tab keys for the web part's default-view setting. */
export type MySitesTab = 'dashboard' | 'all';

/**
 * Author-configurable feature toggles, surfaced through the property pane and
 * passed to the component to enable/disable optional surfaces.
 */
export interface IMySitesSettings {
  /** Tab shown first on load. */
  defaultTab: MySitesTab;
  /** Show the Analytics Dashboard tab. */
  showDashboard: boolean;
  /** Show the "Lists & libraries" row action. */
  enableSiteContent: boolean;
  /** Show the "Recent files" header button. */
  enableRecentFiles: boolean;
  /** Show the Follow / Unfollow row action. */
  enableFollow: boolean;
  /** Show the "People" (owners/members) row action. */
  enableMembership: boolean;
  /** Enable the column filter affordances on the list. */
  enableTypeFilter: boolean;
  /** Colour of the star icon on followed sites. */
  followedStarColor: string;
}

/** Default settings applied when properties are unset. */
export const DEFAULT_SETTINGS: IMySitesSettings = {
  defaultTab: 'dashboard',
  showDashboard: true,
  enableSiteContent: true,
  enableRecentFiles: true,
  enableFollow: true,
  enableMembership: true,
  enableTypeFilter: true,
  followedStarColor: '#eaa300'
};
