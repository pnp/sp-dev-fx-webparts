/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';

import { useAtom } from 'jotai';

import { Subtitle1 } from '@fluentui/react-components';

import { appStateAtom } from '../../atoms/appStateAtom';
import { useUtils } from '../../hooks/useUtils';
import { IDashBoardProps } from '../../webparts/dashBoard/IDashBoardProps';
import { Center } from '../center/Center';
import { Left } from '../left/Left';
import { MyDay } from '../myDay/MyDay';
import { MyFeed } from '../myFeed/MyFeed';
import { MyFiles } from '../myFiles/MyFiles';
import { People } from '../people/People';
import { Right } from '../right/Right';
import { useDashboardStyles } from './useDashboardStyles';

export const DashboardControl: React.FunctionComponent<IDashBoardProps> = (
  props: React.PropsWithChildren<IDashBoardProps>
) => {
  const [appGlobalState, setAppState] = useAtom(appStateAtom);
  const { title } = props;
  const { isInTeams } = useUtils();
  const dashboardStyles = useDashboardStyles();
  React.useEffect(() => {
    setAppState({
      ...appGlobalState,
      ...props,
    });
  }, []);

  const showTitle = React.useMemo(() => {
    if (!isInTeams) {
      return (
        <div className={dashboardStyles.titleStyles}>
          <Subtitle1>{title}</Subtitle1>
        </div>
      );
    }
    return null;
  }, [isInTeams, title]);

 
  return (
    <>
      <div className={dashboardStyles.root}>
        {showTitle}
        <div className={dashboardStyles.grid}>
          <Left>
            <MyDay />
          </Left>
          <Center>
            <MyFiles />
            <MyFeed />
          </Center>
          <Right>
            <People />
          </Right>
        </div>
      </div>
    </>
  );
};
