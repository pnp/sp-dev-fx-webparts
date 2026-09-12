import * as React from 'react';
import { Body1, Caption1, Divider } from '@fluentui/react-components';
import { ExternalLink } from '../../../../../components/ExternalLink';
import styles from '../dashboard.module.scss';
import { ITopSitesProps } from './ITopSitesProps';

const TopSites: React.FC<ITopSitesProps> = ({ analytics }) => {
  if (analytics.topSites.length === 0) {
    return <Body1>No recent activity to show.</Body1>;
  }

  return (
    <div className={styles.topSites}>
      {analytics.topSites.map((site, index) => (
        <React.Fragment key={site.id}>
          {index > 0 && <Divider />}
          <div className={styles.topSiteRow}>
            <div className={styles.topSiteText}>
              <ExternalLink href={site.url} ariaLabel={`Open ${site.title} in new tab`}>
                {site.title}
              </ExternalLink>
              <Caption1>{site.typeLabel}</Caption1>
            </div>
            <Caption1>
              {site.lastModified ? site.lastModified.toLocaleDateString() : ''}
            </Caption1>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TopSites;
