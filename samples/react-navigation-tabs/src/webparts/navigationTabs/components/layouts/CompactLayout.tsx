/**
 * CompactLayout Component
 *
 * Renders navigation links as a dense vertical list. Each row shows a small
 * icon (16px) followed by the link title. Descriptions are not displayed
 * in this layout — it's designed for maximum information density.
 */

import * as React from 'react';
import { INavigationLink } from '../../models/INavigationLink';
import { LinkIcon } from '../LinkIcon';
import styles from './CompactLayout.module.scss';

export interface ICompactLayoutProps {
  /** Links to display in the compact list. */
  links: INavigationLink[];
  /** Default new-tab behavior; individual links can override this. */
  openInNewTabDefault: boolean;
  /** Click handler for tracking — receives the mouse event and item ID. */
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, itemId: number) => void;
}

export const CompactLayout: React.FC<ICompactLayoutProps> = ({ links, openInNewTabDefault, onLinkClick }) => {
  return (
    <div className={styles.compactList}>
      {links.map((link) => {
        // Per-link override: use the link's own setting if defined, otherwise fall back to the web part default
        const opensNew = link.openInNewTab !== undefined ? link.openInNewTab : openInNewTabDefault;
        return (
          <a
            key={link.id}
            href={link.linkUrl}
            target={opensNew ? '_blank' : '_self'}
            rel={opensNew ? 'noopener noreferrer' : undefined}
            className={styles.compactLink}
            onClick={(e) => onLinkClick(e, link.id)}
          >
            <span className={styles.compactIcon}>
              <LinkIcon
                iconUrl={link.iconUrl}
                size={16}
                title={link.title}
              />
            </span>
            <span className={styles.compactTitle}>{link.title}</span>
          </a>
        );
      })}
    </div>
  );
};
