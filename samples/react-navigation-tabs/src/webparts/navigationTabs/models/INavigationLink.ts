/**
 * Represents a single navigation link retrieved from the SharePoint list.
 * Each link belongs to a category (tab) and can be displayed in any layout.
 */
export interface INavigationLink {
  /** SharePoint list item ID, used for click tracking updates. */
  id: number;

  /** Display text for the link (from the Title column). */
  title: string;

  /** Destination URL the link navigates to (from the LinkURL column). */
  linkUrl: string;

  /** Category name used to group links into tabs. Defaults to 'General'. */
  category: string;

  /** Optional description shown beneath the title in Card layout. */
  linkDescription: string;

  /** URL of the custom icon image. Empty string if no icon is set. */
  iconUrl: string;

  /** Numeric sort order within a category. Lower values appear first. */
  sortOrder: number;

  /** Whether this link should open in a new browser tab. */
  openInNewTab: boolean;
}
