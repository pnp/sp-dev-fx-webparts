/**
 * CardLayout Component
 *
 * Renders navigation links as a responsive grid of cards. Each card contains
 * an icon, a title, and an optional description. The number of cards per row
 * is controlled by the `cardsPerRow` prop, applied via a CSS custom property
 * (`--cards-per-row`) that the SCSS grid template references.
 */

import * as React from 'react';
import { INavigationLink } from '../../models/INavigationLink';
import { LinkIcon } from '../LinkIcon';
import styles from './CardLayout.module.scss';

export interface ICardLayoutProps {
  /** Links to display in the card grid. */
  links: INavigationLink[];
  /** Number of cards per row (2–6). Sets the CSS grid column count. */
  cardsPerRow: number;
  /** Whether to render the description text below each card title. */
  showDescriptions: boolean;
  /** Default new-tab behavior; individual links can override this. */
  openInNewTabDefault: boolean;
  /** Click handler for tracking — receives the mouse event and item ID. */
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, itemId: number) => void;
}

export const CardLayout: React.FC<ICardLayoutProps> = ({
  links,
  cardsPerRow,
  showDescriptions,
  openInNewTabDefault,
  onLinkClick,
}) => {
  return (
    <div
      className={styles.cardGrid}
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
            className={styles.card}
            onClick={(e) => onLinkClick(e, link.id)}
          >
            <div className={styles.cardIcon}>
              <LinkIcon
                iconUrl={link.iconUrl}
                size={20}
                title={link.title}
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>{link.title}</div>
              {showDescriptions && link.linkDescription && (
                <div className={styles.cardDescription}>{link.linkDescription}</div>
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
};
