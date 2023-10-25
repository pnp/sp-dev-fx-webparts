import * as React from 'react';

import { useAtom } from 'jotai';

import {
  Stack,
  Text,
} from '@fluentui/react';

import { globalState } from '../../jotai/atoms/birthdays';
import { IGlobalState } from '../../models';
import { useBirthdaysStyles } from './useBirthdaysStyles';

export interface IBirthdayMessage {
  isSameDayAndMonth?: boolean;
}

export const BirthdayMessage: React.FunctionComponent<IBirthdayMessage> = (props: IBirthdayMessage) => {
  const { messageContainerStyles,todayMessageTextStyles, upComingMessageTextStyles } = useBirthdaysStyles();
  const [appGlobalState, ] = useAtom(globalState);
  const { todayBirthdaysMessage, upcomingBirthdaysMessage,  } = appGlobalState || ({} as IGlobalState);
  const { isSameDayAndMonth } = props || ({} as IBirthdayMessage);

const messageTextStyles = React.useMemo(() => {
    if (isSameDayAndMonth) {
      return todayMessageTextStyles;
    } else {
      return upComingMessageTextStyles;
    }
}, [isSameDayAndMonth, todayMessageTextStyles, upComingMessageTextStyles]);

  const message = React.useMemo(() => {
    if (isSameDayAndMonth) {
      return todayBirthdaysMessage;
    } else {
      return upcomingBirthdaysMessage;
    }
  }, [isSameDayAndMonth, todayBirthdaysMessage, upcomingBirthdaysMessage]);
  return (
    <>
      <Stack horizontalAlign="center" horizontal styles={messageContainerStyles}>
        <Text variant="xLargePlus" styles={messageTextStyles}>
          {message ?? ""}
        </Text>
      </Stack>
    </>
  );
};
