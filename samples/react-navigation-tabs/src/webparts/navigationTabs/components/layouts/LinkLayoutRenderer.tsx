/**
 * LinkLayoutRenderer Component
 *
 * A layout switcher that delegates rendering to the appropriate layout
 * component based on the `layoutType` prop:
 *
 * - 'card'    → CardLayout (grid with icons, titles, and descriptions)
 * - 'compact' → CompactLayout (dense vertical list)
 * - 'tile'    → TileLayout (grid with large centered icons)
 *
 * This component exists so that TabContainer doesn't need to know about
 * individual layout implementations — it just passes the layout type
 * and this renderer handles the rest.
 */

import * as React from 'react';
import { INavigationLink } from '../../models/INavigationLink';
import { LayoutType } from '../../models/LayoutType';
import { CardLayout } from './CardLayout';
import { CompactLayout } from './CompactLayout';
import { TileLayout } from './TileLayout';

export interface ILinkLayoutRendererProps {
  /** Array of navigation links to display. */
  links: INavigationLink[];
  /** Which layout style to render. */
  layoutType: LayoutType;
  /** Items per row for grid-based layouts (Card, Tile). */
  cardsPerRow: number;
  /** Whether to show descriptions (only used by CardLayout). */
  showDescriptions: boolean;
  /** Default new-tab behavior passed through to link elements. */
  openInNewTabDefault: boolean;
  /** Click handler for individual links, used for click tracking. */
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, itemId: number) => void;
}

export const LinkLayoutRenderer: React.FC<ILinkLayoutRendererProps> = ({
  links,
  layoutType,
  cardsPerRow,
  showDescriptions,
  openInNewTabDefault,
  onLinkClick,
}) => {
  switch (layoutType) {
    case 'compact':
      return <CompactLayout links={links} openInNewTabDefault={openInNewTabDefault} onLinkClick={onLinkClick} />;
    case 'tile':
      return <TileLayout links={links} cardsPerRow={cardsPerRow} openInNewTabDefault={openInNewTabDefault} onLinkClick={onLinkClick} />;
    case 'card':
    default:
      return (
        <CardLayout
          links={links}
          cardsPerRow={cardsPerRow}
          showDescriptions={showDescriptions}
          openInNewTabDefault={openInNewTabDefault}
          onLinkClick={onLinkClick}
        />
      );
  }
};
