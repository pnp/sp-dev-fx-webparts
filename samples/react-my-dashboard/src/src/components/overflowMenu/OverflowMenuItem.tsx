import * as React from 'react';

import {
  MenuItem,
  useIsOverflowItemVisible,
} from '@fluentui/react-components';

import { OverflowMenuItemProps } from './IOverFlowMenuItemProps';

export const OverflowMenuItem: React.FunctionComponent<OverflowMenuItemProps> = (props: React.PropsWithChildren<OverflowMenuItemProps>) => {
    const { tab, onClick } = props;
    const isVisible = useIsOverflowItemVisible(tab.id);

    if (isVisible) {
      return null;
    }

    return (
      <MenuItem key={tab.id} icon={tab.icon} onClick={onClick}>
        <div>{tab.name}</div>
      </MenuItem>
    );
};