import type * as React from 'react';
import type { SelectTabData, SelectTabEvent, TabValue } from '@fluentui/react-components';

export interface ITabListItem {
  value: TabValue;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface ITabListProps {
  selectedValue?: TabValue;
  onTabSelect?: (event: SelectTabEvent, data: SelectTabData) => void;
  items?: ITabListItem[];
}
