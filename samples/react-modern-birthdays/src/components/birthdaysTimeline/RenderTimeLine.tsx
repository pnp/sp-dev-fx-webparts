/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import format from 'date-fns/format';
import { useAtom } from 'jotai';
import {
  MessageBarType,
  SpinnerSize,
  Stack,
} from 'office-ui-fabric-react';
import {
  DocumentCard,
  DocumentCardDetails,
} from 'office-ui-fabric-react/lib/DocumentCard';

import {
  Timeline,
  TimelineItem,
} from '@mantine/core';
import { groupBy } from '@microsoft/sp-lodash-subset';

import { ballonsImage } from '../../constants/ballons';
import { congratulationsImage } from '../../constants/congratulationsImage';
import { useUtils } from '../../hooks/useUtils';
import { globalState } from '../../jotai/atoms/birthdaysTimeline/globalState';
import { IUser } from '../../models/IUser';
import { ShowMessage } from '../ShowMessage';
import { ShowSpinner } from '../ShowSpinner';
import { RenderItem } from './RenderItem';
import { RenderTitle } from './RenderTitle';
import { useBirthdaysTimelineStyles } from './useBirthdaysTimelineStyles';

export interface IRenderTimelineProps {}

export const RenderTimeline: React.FunctionComponent<IRenderTimelineProps> = (
  props: React.PropsWithChildren<IRenderTimelineProps>
) => {
  const [appGlobalState, setAppGlobalState] = useAtom(globalState);
  const { users, noBirthdaysMessage, isLoading, hasError, error } = appGlobalState;
  const usersGroupedByDate = React.useMemo(() => groupBy(users, "birthday"), [users]);
  const { documentCardStyles, documentCardDetailsStyles, controlStyles } = useBirthdaysTimelineStyles();
  const { isDateSameDayAndMonth } = useUtils();

  const isSameDayAndMonth = React.useCallback(
    (date: Date) => {
      const result = isDateSameDayAndMonth(date, new Date());
      return result;
    },
    [isDateSameDayAndMonth]
  );

  const onSelect = React.useCallback((user) => setAppGlobalState({ ...appGlobalState, selectedUser: user }), [
    appGlobalState,
  ]);

  const onRenderUsers = React.useCallback(
    (users: IUser[], isBrithdayDay: boolean) => {
      return users.map((user, index) => {
        return  <>

        <RenderItem key={index} user={user} onSelect={onSelect} isBirthdayToday={isBrithdayDay} />


        </>;
      });
    },
    [users]
  );

  const renderGroups = React.useCallback(() => {
    return Object.keys(usersGroupedByDate).map((key, index) => {
      const IsBrithdayDay = isSameDayAndMonth(new Date(key));
      const users = usersGroupedByDate[key];
      const date = new Date(key);
      const formattedDate = format(date, "dd MMMM");

      return (
        <TimelineItem
          key={index}

          title={<RenderTitle isDateToday={IsBrithdayDay} title={formattedDate} />}
          bullet={
            IsBrithdayDay ? (
              <img src={congratulationsImage} className={controlStyles.imageProfile} title={"congratulations"} />
            ) : null
          }
          bulletSize={IsBrithdayDay ? 36 : 24}
        >
           <div className={controlStyles.usersContainer}>
           {onRenderUsers(users, IsBrithdayDay)}
           </div>

        </TimelineItem>
      );
    });
  }, [usersGroupedByDate]);

  const renderNoBirthdays = React.useCallback(() => {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" tokens={{ childrenGap: 50 }}>
        <RenderTitle isDateToday={false} title={noBirthdaysMessage} />
        <img src={ballonsImage} className={controlStyles.ballons} title={noBirthdaysMessage} />
      </Stack>
    );
  }, [noBirthdaysMessage]);

  return (
    <>
      <DocumentCard styles={documentCardStyles}>
        <ShowSpinner size={SpinnerSize.large} isShow={isLoading} />
        <ShowMessage messageBarType={MessageBarType.error} isShow={hasError}>
          {error?.message}
        </ShowMessage>
        {!isLoading && !hasError && (
          <DocumentCardDetails styles={documentCardDetailsStyles}>
            <div className={controlStyles.scrollableContainerStyles}>
              <Stack  horizontalAlign="center" tokens={{ padding: 15 }}>
                <Timeline active={1} bulletSize={24} lineWidth={2} radius={"xl"} >



                  {users?.length ? renderGroups() : renderNoBirthdays()}

                </Timeline>
              </Stack>
            </div>
          </DocumentCardDetails>
        )}
      </DocumentCard>
    </>
  );
};
