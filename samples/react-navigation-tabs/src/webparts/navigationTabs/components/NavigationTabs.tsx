/**
 * NavigationTabs Component
 *
 * The main React component for the Navigation Tabs web part. Responsible for:
 * 1. Fetching links from the selected SharePoint list via NavigationLinksService
 * 2. Grouping links by their Category field into an ordered Map
 * 3. Reporting discovered categories back to the web part (for the tab order control)
 * 4. Handling link click events (with click tracking)
 * 5. Rendering the appropriate UI state: unconfigured, loading, error, empty, or tabs
 *
 * This component re-fetches data whenever the `listId` prop changes
 * (i.e., when the user selects a different list in the property pane).
 */

import * as React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import * as strings from 'NavigationTabsWebPartStrings';
import { INavigationLink } from '../models/INavigationLink';
import { LayoutType } from '../models/LayoutType';
import { NavigationLinksService } from '../services/NavigationLinksService';
import { NoConfiguration } from './NoConfiguration';
import { TabContainer } from './TabContainer';
import styles from './NavigationTabs.module.scss';

/** Props passed from the web part's render() method. */
export interface INavigationTabsProps {
  /** GUID of the SharePoint list to read links from. Empty = unconfigured. */
  listId: string;
  /** Active layout style for rendering links. */
  layoutType: LayoutType;
  /** Number of items per row in grid layouts. */
  cardsPerRow: number;
  /** Whether to show descriptions in Card layout. */
  showDescriptions: boolean;
  /** Default new-tab behavior for links. */
  openInNewTabDefault: boolean;
  /** User's preferred tab ordering from the property pane. */
  categoryOrder: string[];
  /** Callback to report discovered category names to the web part for the tab order control. */
  onCategoriesDiscovered: (categories: string[]) => void;
}

interface INavigationTabsState {
  /** Fetched navigation links from the SharePoint list. */
  links: INavigationLink[];
  /** True while a fetch is in progress. */
  loading: boolean;
  /** Error message if the fetch failed; undefined otherwise. */
  error: string | undefined;
}

export class NavigationTabs extends React.Component<INavigationTabsProps, INavigationTabsState> {

  constructor(props: INavigationTabsProps) {
    super(props);
    this.state = {
      links: [],
      loading: false,
      error: undefined,
    };
  }

  /** Fetch links on initial mount if a list is already selected. */
  public componentDidMount(): void {
    if (this.props.listId) {
      this._fetchLinks();
    }
  }

  /** Re-fetch links whenever the selected list changes. */
  public componentDidUpdate(prevProps: INavigationTabsProps): void {
    if (prevProps.listId !== this.props.listId) {
      this._fetchLinks();
    }
  }

  /**
   * Fetches active links from the SharePoint list and updates component state.
   * Handles loading state and error capture.
   */
  private async _fetchLinks(): Promise<void> {
    if (!this.props.listId) {
      this.setState({ links: [], loading: false, error: undefined });
      return;
    }

    this.setState({ loading: true, error: undefined });
    try {
      const links = await NavigationLinksService.getLinks(this.props.listId);
      this.setState({ links, loading: false });
    } catch (err) {
      console.error('NavigationTabs: Error loading links', err);
      this.setState({ links: [], loading: false, error: strings.ErrorMessage });
    }
  }

  /**
   * Handles click events on navigation links.
   *
   * For new-tab links: tracking is fire-and-forget since the page stays open.
   * For same-tab links: navigation is deferred until the tracking API call
   * completes (or fails), preventing the request from being cancelled by
   * the page unload.
   */
  private _handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, itemId: number): void => {
    const anchor = e.currentTarget;
    const isNewTab = anchor.target === '_blank';

    if (!isNewTab) {
      // Same-tab: prevent immediate navigation so the tracking request completes
      e.preventDefault();
      const href = anchor.href;
      NavigationLinksService.trackClick(this.props.listId, itemId)
        .then(() => { window.location.href = href; })
        .catch(() => { window.location.href = href; });
    } else {
      // New tab: page stays open, fire-and-forget is fine
      NavigationLinksService.trackClick(this.props.listId, itemId);
    }
  }

  /**
   * Groups links by their category field into an ordered Map.
   *
   * The ordering respects the user's saved `categoryOrder` preference:
   * categories in the saved order come first, followed by any new
   * categories that weren't previously known (e.g., newly added to the list).
   *
   * @param links         - All fetched navigation links.
   * @param categoryOrder - User's preferred category ordering from the property pane.
   * @returns Ordered Map of category name → array of links in that category.
   */
  private _groupByCategory(links: INavigationLink[], categoryOrder: string[]): Map<string, INavigationLink[]> {
    // First pass: group all links by category (unordered)
    const temp = new Map<string, INavigationLink[]>();
    for (const link of links) {
      const category = link.category || 'General';
      if (!temp.has(category)) {
        temp.set(category, []);
      }
      temp.get(category)!.push(link);
    }

    // Second pass: build an ordered Map following the user's preferred order
    const ordered = new Map<string, INavigationLink[]>();

    // Add categories in the user's saved order first
    for (const cat of categoryOrder) {
      if (temp.has(cat)) {
        ordered.set(cat, temp.get(cat)!);
        temp.delete(cat);
      }
    }

    // Append any remaining categories not in the saved order (new categories)
    temp.forEach((val, key) => {
      ordered.set(key, val);
    });

    return ordered;
  }

  public render(): React.ReactElement<INavigationTabsProps> {
    const { listId, layoutType, cardsPerRow, showDescriptions, openInNewTabDefault } = this.props;
    const { links, loading, error } = this.state;

    // No list selected — show the configuration prompt
    if (!listId) {
      return <NoConfiguration />;
    }

    // Data is being fetched — show a loading spinner
    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <Spinner size={SpinnerSize.large} label={strings.LoadingMessage} />
        </div>
      );
    }

    // Fetch failed — show the error message
    if (error) {
      return <div className={styles.errorContainer}>{error}</div>;
    }

    // No active links in the list
    if (links.length === 0) {
      return <div className={styles.emptyContainer}>{strings.EmptyMessage}</div>;
    }

    // Group links into categories using the user's preferred tab order
    const categories = this._groupByCategory(links, this.props.categoryOrder || []);

    // Report discovered categories to the web part so the property pane
    // tab order control stays in sync with actual list data
    const categoryNames = Array.from(categories.keys());
    this.props.onCategoriesDiscovered(categoryNames);

    return (
      <div className={styles.navigationTabs}>
        <TabContainer
          categories={categories}
          layoutType={layoutType}
          cardsPerRow={cardsPerRow}
          showDescriptions={showDescriptions}
          openInNewTabDefault={openInNewTabDefault}
          onLinkClick={this._handleLinkClick}
        />
      </div>
    );
  }
}
