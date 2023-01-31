import * as React from 'react';

import { useBirthdaysStyles } from './useBirthdaysStyles';

interface IBirthdayCardImageProps {
  isSameDayAndMonth: boolean;
}

export const BirthdayCardImage: React.FunctionComponent<IBirthdayCardImageProps> = (props: IBirthdayCardImageProps) => {
  const { isSameDayAndMonth } = props;
  const { controlStyles } = useBirthdaysStyles();
  return (
    <>
      <div
        className={
          isSameDayAndMonth ? controlStyles.todayBirthdaysImageStyles : controlStyles.upcomingBirthdaysImageStyles
        }
      />
    </>
  );
};
