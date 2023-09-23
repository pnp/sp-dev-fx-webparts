import * as React from 'react';

import { useAtom } from 'jotai';
import {
  Stack,
  Text,
} from 'office-ui-fabric-react';

import { globalState } from '../../jotai/atoms/birthdaysTimeline';
import { IGlobalState } from '../../models/birthdaysTimeline';
import { useBirthdaysTimelineStyles } from './useBirthdaysTimelineStyles';

export interface IRenderTitleProps {
  title: string;
  isDateToday?: boolean;
}
const TODAY = "TODAY";
export const RenderTitle: React.FunctionComponent<IRenderTitleProps> = (
  props: React.PropsWithChildren<IRenderTitleProps>
) => {
  const { title, isDateToday } = props;
  const [appGlobalState] = useAtom(globalState);
  const { todayBirthdaysMessage } = appGlobalState || ({} as IGlobalState);
  const { messageCongratulationStyles, todayStyles } = useBirthdaysTimelineStyles();

  if (!title) {
    return null;
  }

  if (!isDateToday) {
    return (
      <>
        <Text variant="medium" styles={todayStyles} nowrap>
          {title}
        </Text>
      </>
    );
  }

  return (
    <>
      <Stack tokens={{ childrenGap: 10 }} horizontalAlign="start">
        <Text variant="xLargePlus" styles={messageCongratulationStyles}>
          {todayBirthdaysMessage ?? "Congratulations !"}
        </Text>
        <Text variant="medium" styles={todayStyles}>
          {TODAY}
        </Text>
      </Stack>
    </>
  );
};
