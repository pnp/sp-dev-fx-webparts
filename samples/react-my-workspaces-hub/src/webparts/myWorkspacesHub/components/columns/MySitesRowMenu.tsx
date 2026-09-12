import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  Button
} from '@fluentui/react-components';
import {
  MoreVerticalRegular,
  FolderRegular,
  OpenRegular,
  InfoRegular,
  PeopleRegular,
  ShieldRegular
} from '@fluentui/react-icons';
import { IMySitesRowMenuProps } from './IMySitesRowMenuProps';

/** Per-row actions menu for a site in the My Sites list. */
const MySitesRowMenu: React.FC<IMySitesRowMenuProps> = ({ site, actions }) => {
  const { features } = actions;
  const isOpen = actions.openMenuId === site.id;
  const hideTrigger = actions.openMenuId !== undefined;
  return (
    <Menu
      mountNode={actions.menuMountNode}
      open={isOpen}
      onOpenChange={(_, data) => actions.onMenuOpenChange(site.id, data.open)}
    >
      <MenuTrigger disableButtonEnhancement>
        <Button
          appearance="subtle"
          icon={<MoreVerticalRegular />}
          aria-label="Site actions"
          style={{ visibility: hideTrigger ? 'hidden' : 'visible' }}
        />
      </MenuTrigger>
      <MenuPopover style={{ zIndex: 10000 }}>
        <MenuList>
          {features.siteContent && (
            <MenuItem icon={<FolderRegular />} onClick={() => actions.onOpenContent(site)}>
              Lists &amp; libraries
            </MenuItem>
          )}
          <MenuItem icon={<InfoRegular />} onClick={() => actions.onDetails(site)}>
            Details
          </MenuItem>
          {features.membership && site.groupId && (
            <MenuItem icon={<PeopleRegular />} onClick={() => actions.onMembership(site)}>
              People
            </MenuItem>
          )}
          <MenuDivider />
          <MenuItem
            icon={<OpenRegular />}
            onClick={() => window.open(site.url, '_blank', 'noopener,noreferrer')}
          >
            Open site
          </MenuItem>
          <MenuItem
            icon={<ShieldRegular />}
            onClick={() =>
              window.open(`${site.url}/_layouts/15/user.aspx`, '_blank', 'noopener,noreferrer')
            }
          >
            Manage permissions
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default MySitesRowMenu;
