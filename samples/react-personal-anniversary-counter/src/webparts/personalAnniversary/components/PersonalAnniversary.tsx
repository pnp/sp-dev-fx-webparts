import * as React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { DatePicker, PrimaryButton, Stack, Text } from '@fluentui/react';
import styles from './PersonalAnniversary.module.scss';

export interface IPersonalAnniversaryProps { }

export const PersonalAnniversary: React.FunctionComponent<IPersonalAnniversaryProps> = (props: React.PropsWithChildren<IPersonalAnniversaryProps>) => {
  const [date, setDate] = useLocalStorage<{ AnniversaryDate: Date }>('personalAnniversary', null)
  const [tempDate, setTempDate] = React.useState<Date>(null)


  if (date === null)
    return <>
      <div className={styles.wrapper}>
        <DatePicker
          label="When did you join the company?"
          onSelectDate={(date) => setTempDate(date)}
          value={tempDate}
          formatDate={(date) => {
            if (date === null)
              return ''
            return date.toLocaleDateString()
          }}
          isRequired={true}
        />
        <PrimaryButton
          text="Save"
          onClick={() => setDate({ AnniversaryDate: tempDate })}
          disabled={tempDate === null}
        />
      </div>
    </>


  const DateDiff: number = new Date().getTime() - date.AnniversaryDate.getTime()
  return (
    <>
      <div className={styles.wrapper} >
        <Text variant="xLarge">You&apos;  ve been working here for:</Text>
        <Stack tokens={{ childrenGap: 5 }} styles={{ root: { marginTop: "2em", alignItems: "center", } }}>
          <Text variant='large'><b>{Math.floor(DateDiff / (1000 * 3600 * 24 * 365))}</b> Years</Text>
          <Text variant='large'><b>{Math.floor(DateDiff / ((1000 * 3600 * 24 * 365) / 12))}</b> Months</Text>
          <Text variant='large'><b>{Math.floor(DateDiff / (1000 * 3600 * 24))}</b>   Days</Text>
        </Stack>
      </div>
    </>
  );
};