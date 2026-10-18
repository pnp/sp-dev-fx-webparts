import * as React from 'react';
import { Avatar, Badge, Button, Link, Tooltip } from '@fluentui/react-components';
import {
  OpenRegular,
  PeopleTeamRegular,
  MegaphoneRegular,
  GlobeRegular,
  ShareAndroidRegular,
  BranchRegular,
  DocumentRegular
} from '@fluentui/react-icons';
import { ISiteInfo, SiteType } from '../../../../common/types';
import styles from './siteCells.module.scss';

const TYPE_ICONS: Record<SiteType, React.ReactElement> = {
  [SiteType.TeamSite]: <PeopleTeamRegular />,
  [SiteType.GroupTeamSite]: <PeopleTeamRegular />,
  [SiteType.CommunicationSite]: <MegaphoneRegular />,
  [SiteType.HubSite]: <ShareAndroidRegular />,
  [SiteType.Subsite]: <BranchRegular />,
  [SiteType.Other]: <DocumentRegular />
};

export interface ISiteTitleCellProps {
  site: ISiteInfo;
}

/**
 * Title cell: site logo (or type glyph), the title as a link to the site, hub /
 * Teams markers, and an explicit "open in new tab" affordance.
 */
const SiteTitleCell: React.FC<ISiteTitleCellProps> = ({ site }) => {
  const icon = TYPE_ICONS[site.type] ?? <GlobeRegular />;

  return (
    <div className={styles.titleCell}>
      <Avatar
        shape="square"
        size={24}
        color="colorful"
        name={site.title}
        image={site.logoUrl ? { src: site.logoUrl } : undefined}
        icon={icon}
        aria-hidden
      />
      <Tooltip content={site.url} relationship="description" withArrow>
        <Link
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.titleText}
        >
          {site.title}
        </Link>
      </Tooltip>

      {(site.isHubSite || site.hasTeam) && (
        <span className={styles.badges}>
          {site.isHubSite && (
            <Badge appearance="tint" color="brand" size="small" icon={<ShareAndroidRegular />}>
              Hub
            </Badge>
          )}
          {site.hasTeam && (
            <Badge appearance="tint" color="informative" size="small" icon={<PeopleTeamRegular />}>
              Teams
            </Badge>
          )}
        </span>
      )}

      <Tooltip content="Open site in a new tab" relationship="label" withArrow>
        <Button
          as="a"
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          appearance="subtle"
          icon={<OpenRegular />}
          className={styles.openButton}
          aria-label={`Open ${site.title} in a new tab`}
        />
      </Tooltip>
    </div>
  );
};

export default SiteTitleCell;
