/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import {
  Overflow,
  OverflowItem,
  Tab,
  TabList,
  TabValue,
} from '@fluentui/react-components';

import { OverflowMenu } from '../overflowMenu/OverflowMenu';
import { ITabMenuProps } from './ITabMenuProps';

export const TabMenu: React.FunctionComponent<ITabMenuProps> = (props: React.PropsWithChildren<ITabMenuProps>) => {
  const { onSelectedTab, tabs, selectedTabId } = props;
  const [selectedValue, setSelectedValue] = React.useState<TabValue>(selectedTabId);
  const onTabSelect = React.useCallback(
    (tabId: string) => {
      setSelectedValue(tabId);
      if (onSelectedTab) {
        onSelectedTab(tabId);
      }
    },
    [onSelectedTab]
  );

  return (
    <>
      <Overflow minimumVisible={1}>
        <TabList
          defaultSelectedValue="tab1"
          onTabSelect={(_, d) => onTabSelect(d.value as string)}
          style={{ paddingBottom: 20 }}
        >
          {tabs.map((tab) => {
            return (
              <OverflowItem key={tab.id} id={tab.id} priority={tab.id === selectedValue ? 2 : 1}>
                <Tab value={tab.id} icon={<span>{tab.icon}</span>}>
                  {tab.name}
                </Tab>
              </OverflowItem>
            );
          })}
          <OverflowMenu onTabSelect={onTabSelect} tabdata={tabs} />
        </TabList>
      </Overflow>
    </>
  );
};
