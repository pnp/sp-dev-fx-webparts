/**
 * TileLayout Component
 *
 * Renders navigation links as a grid of square tiles. Each tile has a large
 * centered icon (48px) with the title below it. Like CardLayout, the number
 * of tiles per row is controlled via the `--cards-per-row` CSS custom property.
 *
 * Descriptions are not shown in this layout — it's focused on visual
 * recognition via large icons.
 */

import * as React from 'react';
import { INavigationLink } from '../../models/INavigationLink';
import { LinkIcon } from '../LinkIcon';
import styles from './TileLayout.module.scss';

export interface ITileLayoutProps {
  /** Links to display in the tile grid. */
  links: INavigationLink[];
  /** Number of tiles per row (2–6). Sets the CSS grid column count. */
  cardsPerRow: number;
  /** Default new-tab behavior; individual links can override this. */
  openInNewTabDefault: boolean;
  /** Click handler for tracking — receives the mouse event and item ID. */
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, itemId: number) => void;
}

export const TileLayout: React.FC<ITileLayoutProps> = ({ links, cardsPerRow, openInNewTabDefault, onLinkClick }) => {
  return (
    <div
      className={styles.tileGrid}
      style={{ '--cards-per-row': cardsPerRow } as React.CSSProperties}
    >
      {links.map((link) => {
        // Per-link override: use the link's own setting if defined, otherwise fall back to the web part default
        const opensNew = link.openInNewTab !== undefined ? link.openInNewTab : openInNewTabDefault;
        return (
          <a
            key={link.id}
            href={link.linkUrl}
            target={opensNew ? '_blank' : '_self'}
            rel={opensNew ? 'noopener noreferrer' : undefined}
            className={styles.tile}
            onClick={(e) => onLinkClick(e, link.id)}
          >
            <div className={styles.tileIcon}>
              <LinkIcon
                iconUrl={link.iconUrl}
                size={48}
                title={link.title}
              />
            </div>
            <div className={styles.tileTitle}>{link.title}</div>
          </a>
        );
      })}
    </div>
  );
};
