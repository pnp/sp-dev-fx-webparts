import { LayoutType } from './models/LayoutType';

/**
 * Properties persisted by the web part's property pane.
 * These values are stored in the page's web part data and
 * serialized/deserialized automatically by the SPFx runtime.
 */
export interface INavigationTabsWebPartProps {
  /** GUID of the selected SharePoint list that contains navigation links. */
  listId: string;

  /** Active layout style: card, compact, or tile. */
  layoutType: LayoutType;

  /** Number of items displayed per row in Card and Tile layouts (2–6). */
  cardsPerRow: number;

  /** Whether to show link descriptions in Card layout. */
  showDescriptions: boolean;

  /** Default new-tab behavior for links that don't specify their own. */
  openInNewTabDefault: boolean;

  /** Temporary field: name entered by the user when creating a new list via the List Generator. */
  newListName: string;

  /** User-defined ordering of category tab names. Persisted across page edits. */
  categoryOrder: string[];
}
