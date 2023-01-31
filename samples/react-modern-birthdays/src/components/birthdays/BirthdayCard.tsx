/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import { DocumentCard } from '@fluentui/react';

import { useUtils } from '../../hooks';
import { IUser } from '../../models/birthdays';
import { BirthdayCardImage } from './BirthdayCardImage';
import { BirthdayMessage } from './BirthdayMessage';
import { BirthdayUserInfo } from './BirthdayUserInfo';
/* import { BirthdayUserInfo } from "./BirthdayUserInfo"; */
import { useBirthdaysStyles } from './useBirthdaysStyles';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBirthdayCardProps {
  user: IUser;
}

export const BirthdayCard: React.FunctionComponent<IBirthdayCardProps> = (
  _props: React.PropsWithChildren<IBirthdayCardProps>
) => {
  const { documentCardStyles } = useBirthdaysStyles();
  const { user } = _props;
  const { birthday } = user || ({} as IUser);
  const { isDateSameDayAndMonth } = useUtils();

  const isSameDayAndMonth = React.useMemo(() => {
    const result = isDateSameDayAndMonth(birthday, new Date());
    return result;
  }, [birthday, isDateSameDayAndMonth]);

  if (!user) return null;

  return (
    <>
      <DocumentCard styles={documentCardStyles} data-testid="birthday-card">
        <BirthdayCardImage isSameDayAndMonth={isSameDayAndMonth} data-testid="birthday-card-image" />
        <BirthdayMessage isSameDayAndMonth={isSameDayAndMonth} data-testid="birthday-card-message" />
        <BirthdayUserInfo user={user} data-testid="birthday-card-user_info" />
      </DocumentCard>
    </>
  );
};
