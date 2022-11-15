import * as React from 'react';

import * as strings from 'FlightTrackerWebPartStrings';
import { useAtom } from 'jotai';
import {
  DatePicker,
  IDatePicker,
  Label,
  Stack,
} from 'office-ui-fabric-react';

import { DayPickerStrings } from '../../constants';
import { globalState } from '../../jotai/atoms';
import { SelectTime } from '../SelectTime/SelectTime';
import { useSelctedDateStyles } from './useSelectDateStyles';

export interface ISelectDateProps {}

export const SelectDate: React.FunctionComponent<ISelectDateProps> = (
  props: React.PropsWithChildren<ISelectDateProps>
) => {

  const { selectedDateStyle, textFieldStyles, labelDateStyles, labelTimeStyles } = useSelctedDateStyles();
  const [appState, setAppState] = useAtom(globalState);
  const { selectedDate,  selectedTime  } = appState;


  const onSelectDate = React.useCallback(
    (date: Date | null | undefined) => {


      setAppState({
        ...appState,
        selectedDate: date,
      });
    },
    [appState, setAppState, selectedTime]
  );




  const datePickerRef = React.useRef<IDatePicker>(null);
  return (
    <>
      <Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Label styles={labelDateStyles}>{strings.DateLabel}</Label>
          <Label styles={labelTimeStyles}>{strings.TimeLabel}</Label>
        </Stack>

        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <DatePicker
            componentRef={datePickerRef}
            allowTextInput
            ariaLabel={strings.SelectDate}
            value={selectedDate}
            onSelectDate={onSelectDate}
            strings={DayPickerStrings}
            styles={selectedDateStyle}
            textField={{ styles: textFieldStyles }}
          />
          <SelectTime />
        </Stack>
      </Stack>
    </>
  );
};
