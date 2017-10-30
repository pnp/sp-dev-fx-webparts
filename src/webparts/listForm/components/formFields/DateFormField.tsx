import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker, DayOfWeek, IDatePickerProps, IDatePickerStrings  } from 'office-ui-fabric-react/lib/DatePicker';
import * as React from 'react';

const DayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],

  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],

  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],

  shortDays: [
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S'
  ],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',

  isRequiredErrorMessage: 'Start date is required.',

  invalidInputErrorMessage: 'Invalid date format.'
};

export interface IDateFormFieldProps extends IDatePickerProps {
  locale: string;
}

export default class DateFormField extends React.Component<IDateFormFieldProps> {
  public constructor() {
    super();
  }

  public render() {
    return (
      <DatePicker
        {...this.props}
        parseDateFromString={ (dateStr: string) => new Date( Date.parse(dateStr) )}
        formatDate={ (date: Date) => (typeof date.toLocaleDateString === 'function') ? date.toLocaleDateString(this.props.locale) : '' }
        strings={ DayPickerStrings }
      />
    );
  }
}
