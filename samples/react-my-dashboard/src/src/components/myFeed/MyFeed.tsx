/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import * as strings from 'DashBoardWebPartStrings';

import { Subtitle2 } from '@fluentui/react-components';
import {
  bundleIcon,
  News24Filled,
  News24Regular,
} from '@fluentui/react-icons';

import { ITab } from '../../models/ITab';
import { TabMenu } from '../tabMenu/TabMenu';
import { News } from './News';
import { useItemStyles } from './useItemStyles';

export interface IFeedProps {}

export const MyFeed: React.FunctionComponent<IFeedProps> = (props: React.PropsWithChildren<IFeedProps>) => {
  const [selectedValue, setSelectedValue] = React.useState<string>("tab1");
  const styles = useItemStyles();

  const onTabSelect = React.useCallback((tabId: string) => {
    setSelectedValue(tabId);
  }, []);

  const NewsIcon = bundleIcon(News24Filled, News24Regular);
 

  const tabs: ITab[] = [
    {
      id: "tab1",
      name: strings.CompanyAnnouncements,
      icon: <NewsIcon />,
    }
    
  ];

  const renderSelectedTab = React.useCallback(() => {
    switch (selectedValue) {
      case "tab1":
        return <News />;
      case "tab2":
        return <div>Under Constrution</div>     
      default:
        return null;
    }
  }, [selectedValue]);

  return (
    <>
      <div className={styles.listItemContainer}>
        <Subtitle2 className={styles.feedTitle}>Feed</Subtitle2>
        <TabMenu tabs={tabs} selectedTabId={selectedValue} onSelectedTab={onTabSelect} />
        { renderSelectedTab()}
      </div>
    </>
  );
};
