import * as React from 'react';
import { Body1, Caption1, makeStyles, Subtitle2, tokens } from '@fluentui/react-components';
import type { ISiteDirectoryItem } from '../models/ISiteDirectoryItem';
import { isSafeSiteUrl } from '../services/SiteDirectoryService';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    minWidth: 0,
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1
  },
  logo: {
    width: '48px',
    height: '48px',
    flex: '0 0 48px',
    borderRadius: tokens.borderRadiusMedium,
    objectFit: 'cover',
    backgroundColor: tokens.colorNeutralBackground3
  },
  content: {
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS
  },
  title: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    overflowWrap: 'anywhere',
    ':focus-visible': {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: tokens.strokeWidthThin
    }
  },
  metadata: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalS,
    color: tokens.colorNeutralForeground2
  },
  openLink: {
    alignSelf: 'flex-start',
    marginTop: tokens.spacingVerticalXS,
    ':focus-visible': {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: tokens.strokeWidthThin
    }
  },
  invalidUrl: {
    color: tokens.colorNeutralForeground3
  }
});

export interface ISiteCardProps {
  readonly item: ISiteDirectoryItem;
  readonly currentOrigin: string;
}

const SiteCard: React.FC<ISiteCardProps> = ({ item, currentOrigin }) => {
  const styles = useStyles();
  const safeUrl = isSafeSiteUrl(item.url, currentOrigin);
  const safeLogoUrl = isSafeSiteUrl(item.logoUrl, currentOrigin);

  return (
    <article className={styles.card} role="listitem">
      {safeLogoUrl ? <img className={styles.logo} src={item.logoUrl} alt="" /> : null}
      <div className={styles.content}>
        {safeUrl ? (
          <a
            className={styles.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.title}
          </a>
        ) : <Subtitle2 as="h3">{item.title}</Subtitle2>}
        {item.description ? <Body1>{item.description}</Body1> : null}
        <div className={styles.metadata}>
          {item.category ? <Caption1>{item.category}</Caption1> : null}
          {item.owner ? <Caption1>{item.owner}</Caption1> : null}
        </div>
        {safeUrl ? (
          <a
            className={styles.openLink}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open site
          </a>
        ) : <Caption1 className={styles.invalidUrl}>No safe URL configured</Caption1>}
      </div>
    </article>
  );
};

export default SiteCard;
