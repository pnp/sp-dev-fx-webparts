import * as React from 'react';
import { Icon, TooltipHost } from '@fluentui/react';
import { IQuickLink } from '../models/IQuickLink';
import styles from './QuickLinksPro.module.scss';

export interface IQuickLinkItemProps {
  link: IQuickLink;
  displayStyle: 'cards' | 'buttons' | 'list';
}

export const QuickLinkItem: React.FC<IQuickLinkItemProps> = ({ link, displayStyle }) => {
  const handleClick = (): void => {
    if (link.openInNewWindow !== false) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = link.url;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') handleClick();
  };

  if (displayStyle === 'cards') {
    return (
      <TooltipHost content={link.description || link.url}>
        <div
          className={styles.linkCard}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        >
          <div className={styles.linkCardIcon}>
            <Icon iconName={link.iconName || 'Link'} />
          </div>
          <div className={styles.linkCardContent}>
            <div className={styles.linkCardTitle}>{link.title}</div>
            {link.description && <div className={styles.linkCardDescription}>{link.description}</div>}
          </div>
        </div>
      </TooltipHost>
    );
  }

  if (displayStyle === 'list') {
    return (
      <div
        className={styles.linkListItem}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <Icon iconName={link.iconName || 'Link'} className={styles.linkListIcon} />
        <span className={styles.linkListText}>{link.title}</span>
      </div>
    );
  }

  // BUTTON STYLE
  return (
    <TooltipHost content={link.description || link.url}>
      <div
        className={styles.linkButton}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <Icon iconName={link.iconName || 'Link'} className={styles.linkButtonIcon} />
        <span className={styles.linkButtonText}>{link.title}</span>
      </div>
    </TooltipHost>
  );
};
