/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';

import { format } from 'date-fns';
import set from 'date-fns/set';
import * as strings from 'FlightTrackerWebPartStrings';
import { useSetAtom } from 'jotai';
import {
  Dropdown,
  IDropdownOption,
} from 'office-ui-fabric-react/lib/Dropdown';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';

import { globalState } from '../../jotai/atoms';
import { useSelectTimeStyles } from './useSelectTimeStyles';

interface IDropdownOptionExtended extends IDropdownOption {
  date: Date;
}

export interface ISelectInformationTypeProps {}

export const SelectTime: React.FunctionComponent<ISelectInformationTypeProps> = (
  props: React.PropsWithChildren<ISelectInformationTypeProps>
) => {
  const   setAppState = useSetAtom(globalState);
  const { dropdownStyles } = useSelectTimeStyles();
  const now = new Date();
  const [selectedOption, setSelectedOption] = React.useState<IDropdownOptionExtended | undefined>(undefined);

  const checkTime = React.useCallback((time: Date): Date => {
    const minutesOfTime = format(time, "mm");
    if (+minutesOfTime > 0 && +minutesOfTime < 16) {
      return set(time, { minutes: 0 });
    } else if (+minutesOfTime > 15 && +minutesOfTime < 31) {
      return set(time, { minutes: 15 });
    } else  if (+minutesOfTime > 30 && +minutesOfTime < 46) {
      return set(time, { minutes: 30 });
    } else {
      return set(time, { minutes: 45 });
    }
  }, []);

  const options: IDropdownOptionExtended[] = React.useMemo(() => {
    const options: IDropdownOptionExtended[] = [];
    for (let i = 0; i < 24; i++) {
      const dateHour = set(new Date(now), { hours: i, minutes: 0, seconds: 0, milliseconds: 0 });
      const dateQuarter = set(new Date(now), { hours: i, minutes: 15, seconds: 0, milliseconds: 0 });
      const dateHalf = set(new Date(now), { hours: i, minutes: 30, seconds: 0, milliseconds: 0 });
      const date45= set(new Date(now), { hours: i, minutes: 45, seconds: 0, milliseconds: 0 });
      options.push({
        key: format(dateHour, "H:mm"),
        text: format(dateHour, "H:mm"),
        date: dateHour,
      });
      options.push({
        key: format(dateQuarter, "H:mm"),
        text: format(dateQuarter, "H:mm"),
        date: dateQuarter,
      });
      options.push({
        key: format(dateHalf, "H:mm"),
        text: format(dateHalf, "H:mm"),
        date: dateHalf,
      });
      options.push({
        key: format(date45, "H:mm"),
        text: format(date45, "H:mm"),
        date: date45,
      });
    }
    return options;
  }, []);

  const onRenderTitle = React.useCallback((options: IDropdownOptionExtended[]): JSX.Element => {
    const option = options[0];
    return (
      <Stack horizontal horizontalAlign="start" verticalAlign="center" tokens={{ childrenGap: 10 }}>
        <Text>{format(option.date, "H:mm")}</Text>
      </Stack>
    );
  }, []);
  return (
    <>
      <Dropdown
        placeholder={strings.SelectInformationType}
        styles={dropdownStyles}
        options={options}
        onRenderTitle={onRenderTitle}
        onChange={(event, option) => {
          const optionExtended = option as IDropdownOptionExtended;
          setSelectedOption(optionExtended);
          setAppState((prevState) => ({
            ...prevState,
            selectedTime: optionExtended?.date,

          }));
        }}
        selectedKey={selectedOption ? selectedOption.key : format(checkTime(now), "H:mm")}
      />
    </>
  );
};
