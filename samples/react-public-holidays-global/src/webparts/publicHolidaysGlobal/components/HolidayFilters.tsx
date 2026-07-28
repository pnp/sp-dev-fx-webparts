import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { ComboBox, IComboBox, IComboBoxOption } from '@fluentui/react/lib/ComboBox';
import { Stack } from '@fluentui/react/lib/Stack';
import * as strings from 'PublicHolidaysGlobalWebPartStrings';
import { COUNTRIES } from '../models/countries';

export interface IHolidayFiltersProps {
  countryCode: string;
  year: number;
  onCountryChange: (countryCode: string) => void;
  onYearChange: (year: number) => void;
}

const YEAR_SPAN = 3;

export const HolidayFilters: React.FunctionComponent<IHolidayFiltersProps> = (props) => {
  const currentYear = new Date().getFullYear();

  const yearOptions: IDropdownOption[] = React.useMemo(() => {
    const options: IDropdownOption[] = [];
    for (let y = currentYear - YEAR_SPAN; y <= currentYear + 1; y++) {
      options.push({ key: y, text: String(y) });
    }
    return options;
  }, [currentYear]);

  // ComboBox rather than Dropdown: the list is long enough that typing to
  // filter is faster than scrolling, and it costs no extra dependency.
  const countryOptions: IComboBoxOption[] = React.useMemo(
    () => COUNTRIES.map((c) => ({ key: c.code, text: c.name })),
    []
  );

  return (
    <Stack
      horizontal
      wrap
      tokens={{ childrenGap: 16 }}
      // The filters are the web part's primary controls, so they stay in the
      // web part rather than the property pane.
      role="group"
      aria-label={strings.FiltersGroupLabel}
    >
      <Stack.Item styles={{ root: { minWidth: 200, flexGrow: 1 } }}>
        <ComboBox
          label={strings.CountryFieldLabel}
          selectedKey={props.countryCode}
          options={countryOptions}
          autoComplete="on"
          useComboBoxAsMenuWidth
          calloutProps={{ calloutMaxHeight: 320 }}
          onChange={(_: React.FormEvent<IComboBox>, option?: IComboBoxOption) =>
            option && props.onCountryChange(String(option.key))
          }
        />
      </Stack.Item>
      <Stack.Item styles={{ root: { minWidth: 120 } }}>
        <Dropdown
          label={strings.YearFieldLabel}
          selectedKey={props.year}
          options={yearOptions}
          onChange={(_, option) => option && props.onYearChange(Number(option.key))}
        />
      </Stack.Item>
    </Stack>
  );
};
