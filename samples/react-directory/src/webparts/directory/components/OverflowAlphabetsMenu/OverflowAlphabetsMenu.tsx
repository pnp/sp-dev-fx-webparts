import {
  useOverflowMenu,
  MenuTrigger,
  Button,
  MenuPopover,
  useIsOverflowItemVisible,
  Menu,
  MenuItem,
  MenuList,
  tokens,
  makeStyles,
} from '@fluentui/react-components';
import {
  bundleIcon,
  MoreHorizontalFilled,
  MoreHorizontalRegular,
} from '@fluentui/react-icons';
import React from 'react';

type OverflowMenuProps = {
  onTabSelect?: (tabId: string) => void;
  tabs: string[];
};

const MoreHorizontal = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

const useOverflowMenuStyles = makeStyles({
  menu: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  menuButton: {
    alignSelf: 'center',
  },
});

type OverflowMenuItemProps = {
  tab: string;
  onClick: () => void;
};

const OverflowMenuItem = (props: OverflowMenuItemProps): JSX.Element  => {
  const { tab, onClick } = props;
  const isVisible = useIsOverflowItemVisible(tab);

  if (isVisible) {
    return <div />;
  }

  return (
    <MenuItem key={tab} onClick={onClick}>
      <div>{tab}</div>
    </MenuItem>
  );
};

export const OverflowAlphabetsMenu = (props: OverflowMenuProps): JSX.Element  => {
  const { onTabSelect } = props;
  console.log('OverflowMenu', props);
  const { ref, isOverflowing, overflowCount } =
    useOverflowMenu<HTMLButtonElement>();

  const onItemClick = (tabId: string): void => {
    onTabSelect?.(tabId);
  };

  if (!isOverflowing) {
    return <div />;
  }

  const styles = useOverflowMenuStyles();

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
          {props.tabs.map((tab: string) => (
            <OverflowMenuItem
              key={tab}
              tab={tab}
              onClick={() => onItemClick(tab)}
            />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
