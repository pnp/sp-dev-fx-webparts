import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Button
} from '@fluentui/react-components';
import { OpenRegular, SettingsRegular, InfoRegular, MoreVerticalRegular } from '@fluentui/react-icons';
import { ISiteContentRowMenuProps } from './ISiteContentRowMenuProps';

/** Per-row actions menu for a list/library inside the site content drawer. */
function SiteContentRowMenu({
  item,
  siteUrl,
  onDetails,
  menuMountNode
}: Readonly<ISiteContentRowMenuProps>): JSX.Element {
  const hasTarget = !!item.target;
  const hasSettings = item.baseTemplate > 0;
  const hasDriveDetails = hasSettings && item.type !== 'List';

  return (
    <Menu mountNode={menuMountNode}>
      <MenuTrigger disableButtonEnhancement>
        <Button appearance="subtle" icon={<MoreVerticalRegular />} aria-label="More actions" />
      </MenuTrigger>
      <MenuPopover style={{ zIndex: 10000 }}>
        <MenuList>
          {hasTarget && (
            <MenuItem
              icon={<OpenRegular />}
              onClick={() => window.open(item.target, '_blank', 'noopener,noreferrer')}
            >
              Open in new tab
            </MenuItem>
          )}
          {hasSettings && (
            <MenuItem
              icon={<SettingsRegular />}
              onClick={() =>
                window.open(
                  `${siteUrl}/_layouts/15/listedit.aspx?List=${item.appId}`,
                  '_blank',
                  'noopener,noreferrer'
                )
              }
            >
              Settings
            </MenuItem>
          )}
          {hasDriveDetails && (
            <MenuItem icon={<InfoRegular />} onClick={onDetails}>
              Details
            </MenuItem>
          )}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}

export default SiteContentRowMenu;
