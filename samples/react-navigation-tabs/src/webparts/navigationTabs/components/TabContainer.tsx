/**
 * TabContainer Component
 *
 * Renders a Fluent UI Pivot (tab bar) with one tab per link category.
 * Each tab displays its links using the active layout via LinkLayoutRenderer.
 *
 * The `categories` prop is an ordered Map — the iteration order determines
 * the tab order. This ordering is controlled by the user via the property
 * pane's drag-and-drop Tab Order control.
 *
 * When there are more tabs than fit horizontally, the Pivot's built-in
 * overflow menu (`overflowBehavior="menu"`) shows the remaining tabs
 * in a dropdown.
 */

import * as React from 'react';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { INavigationLink } from '../models/INavigationLink';
import { LayoutType } from '../models/LayoutType';
import { LinkLayoutRenderer } from './layouts/LinkLayoutRenderer';
import styles from './TabContainer.module.scss';

export interface ITabContainerProps {
  /** Ordered map of category name → links in that category. */
  categories: Map<string, INavigationLink[]>;
  /** Which layout to use for rendering links within each tab. */
  layoutType: LayoutType;
  /** Number of items per row (Card and Tile layouts). */
  cardsPerRow: number;
  /** Whether to show descriptions (Card layout only). */
  showDescriptions: boolean;
  /** Default new-tab behavior passed through to link rendering. */
  openInNewTabDefault: boolean;
  /** Click handler passed through to individual link elements. */
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, itemId: number) => void;
}

export const TabContainer: React.FC<ITabContainerProps> = ({
  categories,
  layoutType,
  cardsPerRow,
  showDescriptions,
  openInNewTabDefault,
  onLinkClick,
}) => {
  const categoryNames = Array.from(categories.keys());

  // Nothing to render if there are no categories
  if (categoryNames.length === 0) {
    return null;
  }

  return (
    <div className={styles.tabContainer}>
      {/* Pivot renders a horizontal tab bar; each PivotItem is one tab */}
      <Pivot overflowBehavior="menu">
        {categoryNames.map((category) => (
          <PivotItem key={category} headerText={category} itemKey={category}>
            <div className={styles.tabContent}>
              <LinkLayoutRenderer
                links={categories.get(category) || []}
                layoutType={layoutType}
                cardsPerRow={cardsPerRow}
                showDescriptions={showDescriptions}
                openInNewTabDefault={openInNewTabDefault}
                onLinkClick={onLinkClick}
              />
            </div>
          </PivotItem>
        ))}
      </Pivot>
    </div>
  );
};
