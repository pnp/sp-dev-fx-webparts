import * as React from 'react';
import { Tab, TabList as FluentTabList } from '@fluentui/react-components';
import type { ITabListProps } from './TabList.types';

export const TabList: React.FC<ITabListProps> = ({ selectedValue, onTabSelect, items = [] }) => (
  <FluentTabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
    {items.map((item) => (
      <Tab
        key={String(item.value)}
        value={item.value}
        icon={item.icon ? { children: item.icon } : undefined}
      >
        {item.content}
      </Tab>
    ))}
  </FluentTabList>
);

TabList.displayName = 'TabList';
