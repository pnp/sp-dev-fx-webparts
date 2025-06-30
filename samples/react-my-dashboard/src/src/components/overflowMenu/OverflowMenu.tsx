import * as React from 'react';

import {
  Button,
  Menu,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useOverflowMenu,
} from '@fluentui/react-components';
import {
  bundleIcon,
  MoreHorizontalFilled,
  MoreHorizontalRegular,
} from '@fluentui/react-icons';

import { IOverFlowMenuProps } from './IOverFLowMenuProps';
import { OverflowMenuItem } from './OverflowMenuItem';
import { useOverflowMenuStyles } from './useOverflowMenuStyles';

export const OverflowMenu: React.FunctionComponent<IOverFlowMenuProps> = (props: React.PropsWithChildren<IOverFlowMenuProps>) => {
    const { onTabSelect, tabdata } = props;
    const { ref, isOverflowing, overflowCount } = useOverflowMenu<HTMLButtonElement>();
    const styles = useOverflowMenuStyles();
    const MoreHorizontal = React.useMemo(() => bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular), []);
    const onItemClick = (tabId: string):void => {
      onTabSelect?.(tabId);
    };

    if (!isOverflowing) {
      return null;
    }

    return (
      <Menu hasIcons>
        <MenuTrigger disableButtonEnhancement>
          <Button
            appearance="transparent"
            className={styles.menuButton}
            ref={ref}
            icon={<MoreHorizontal />}
            aria-label={`${overflowCount} more tabs`}
            role="tab"
          />
        </MenuTrigger>
        <MenuPopover>
          <MenuList className={styles.menu}>
            {tabdata.map((tab) => (
              <OverflowMenuItem key={tab.id} tab={tab} onClick={() => onItemClick(tab.id)} />
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };
