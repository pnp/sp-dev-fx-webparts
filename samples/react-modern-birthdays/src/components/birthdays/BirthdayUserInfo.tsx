/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { format } from 'date-fns';
import { useAtom } from 'jotai';

import {
  Stack,
  Text,
  ThemeProvider,
} from '@fluentui/react';
import { LivePersona } from '@pnp/spfx-controls-react/lib/LivePersona';

import { useUtils } from '../../hooks';
import { globalState } from '../../jotai/atoms/birthdays';
import { IUser } from '../../models/birthdays';
import { useBirthdaysStyles } from './useBirthdaysStyles';

export interface IBirthdayUserInfoProps {
  user: IUser;
}

export const BirthdayUserInfo: React.FunctionComponent<IBirthdayUserInfoProps> = (
  props: React.PropsWithChildren<IBirthdayUserInfoProps>
) => {
  const { isDateSameDayAndMonth } = useUtils();
  const {
    containerUserImageStyles,
    nameStyles,
    jobTitleStyles,
    birthdayStyles,
    controlStyles,
  } = useBirthdaysStyles();
  const { user } = props;

  const { name, jobTitle, birthday, image, email } = user || ({} as IUser);
  const [appGlobalState] = useAtom(globalState);
  const { theme } = appGlobalState;
  const { context } = appGlobalState;
  const isSameDayAndMonth = React.useMemo(() => {
    const result = isDateSameDayAndMonth(birthday, new Date());

    return result;
  }, [birthday, isDateSameDayAndMonth]);

  const displayBirthday = React.useMemo(() => {
    if (isSameDayAndMonth) {
      return "TODAY";
    } else {
      return birthday ? format(birthday, "do MMMM ") : "";
    }
  }, [birthday, isSameDayAndMonth]);

  if (!user) return null;
  return (
    <>
      <ThemeProvider theme={theme}>
        <Stack horizontalAlign="center" tokens={{ childrenGap: 10 }} styles={containerUserImageStyles}>
          <Stack horizontalAlign="center" tokens={{ childrenGap: 0 }}>
            <LivePersona
              upn={email}
              template={
                <>
                  <img src={image} className={controlStyles.imageProfile} />
                </>
              }
              serviceScope={context.serviceScope as any}
            />
            <Text variant="large" styles={nameStyles}>
              {name}
            </Text>
            <Text variant="smallPlus" styles={jobTitleStyles}>
              {jobTitle}
            </Text>
          </Stack>
          <Text variant="mediumPlus" styles={birthdayStyles(isSameDayAndMonth)}>
            {displayBirthday}
          </Text>
        </Stack>
      </ThemeProvider>
    </>
  );
};
