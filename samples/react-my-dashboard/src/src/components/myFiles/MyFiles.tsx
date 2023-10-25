import * as React from 'react';

import * as strings from 'DashBoardWebPartStrings';

import { Subtitle2 } from '@fluentui/react-components';
import {
  bundleIcon,
  DocumentBulletList24Filled,
  DocumentBulletList24Regular,
  DocumentEdit24Filled,
  DocumentEdit24Regular,
  Share24Filled,
  Share24Regular,
} from '@fluentui/react-icons';

import { ITab } from '../../models/ITab';
import { TabMenu } from '../tabMenu/TabMenu';
import { Files } from './Files';
import { Shared } from './Shared';
import { Used } from './Used';
import { useMyFilesStyles } from './useMyFilesStyles';

export interface IMyFilesProps {}

export const MyFiles: React.FunctionComponent<IMyFilesProps> = (props: React.PropsWithChildren<IMyFilesProps>) => {
  const styles = useMyFilesStyles();
  const [selectedValue, setSelectedValue] = React.useState<string>("tab1");
  const FilesIcon = bundleIcon(DocumentBulletList24Filled, DocumentBulletList24Regular);
  const SharedIcon = bundleIcon(Share24Filled, Share24Regular);
  const UsedIcon = bundleIcon(DocumentEdit24Filled, DocumentEdit24Regular);
  const onTabSelect = React.useCallback((tabId: string) => {
    setSelectedValue(tabId);
  }, []);
  const tabs: ITab[] = React.useMemo(
    () => [
      {
        id: "tab1",
        name: strings.Files,
        icon: <FilesIcon />,
      },
      {
        id: "tab2",
        name: strings.Used,
        icon: <UsedIcon />,
      },
      {
        id: "tab3",
        name: strings.Shared,
        icon: <SharedIcon />,
      },
      
    ],
    []
  );

  const renderSelectedTab = React.useCallback(() => {
    switch (selectedValue) {
      case "tab1":
        return <Files />;
      case "tab2":
        return <Used />;
      case "tab3":
        return <Shared />; 
      default:
        return null;
    }
  }, [selectedValue]);

  return (
    <>
      <div className={styles.root}>
        <Subtitle2 className={styles.filesTitle}>{strings.MyFiles}</Subtitle2>
        <TabMenu tabs={tabs} selectedTabId={selectedValue} onSelectedTab={onTabSelect} />
        {renderSelectedTab()}
      </div>
    </>
  );
};
