import * as React from 'react';

import * as strings from 'DashBoardWebPartStrings';

import { Subtitle2 } from '@fluentui/react-components';
import {
  bundleIcon,
  People24Filled,
  People24Regular,
} from '@fluentui/react-icons';

import { ITab } from '../../models/ITab';
import { TabMenu } from '../tabMenu/TabMenu';
import { RelevantPeopleList } from './RelevantPeopleList';
import { usePeopleStyles } from './usePeopleStyles';

export interface IPeopleProps {}

export const People: React.FunctionComponent<IPeopleProps> = (props: React.PropsWithChildren<IPeopleProps>) => {
  const [selectedValue, setSelectedValue] = React.useState<string>("tab1");
  
  const styles = usePeopleStyles();
  const RevelantIcon = bundleIcon(People24Filled, People24Regular);
 
 

  const onTabSelect = React.useCallback((tabId: string) => {
    setSelectedValue(tabId);
  }, []);

  const tabs: ITab[] = [
    {
      id: "tab1",
      name: strings.Relevant,
      icon: <RevelantIcon />,
    },
   /*  {
      id: "tab2",
      name: "Recente",
      icon: <RecentPeople />,
    }, */
  ];

  const renderSelectedTab = React.useCallback(() => {
    switch (selectedValue) {
      case "tab1":
        return <div><RelevantPeopleList/></div>;
      /* case "tab2":
        return <div><RecentPeopleList />  </div>; */
      default:
        return null;
    }
  }, [selectedValue]);

  return (
    <>
      <div id="main-container" className={styles.peopleContainer}>
        <Subtitle2 className={styles.peopleTitle}>People</Subtitle2>
        <TabMenu tabs={tabs} selectedTabId={selectedValue} onSelectedTab={onTabSelect} />
        {renderSelectedTab()}
      </div>
    </>
  );
};
