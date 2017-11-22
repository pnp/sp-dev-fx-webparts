import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker, DayOfWeek, IDatePickerProps, IDatePickerStrings  } from 'office-ui-fabric-react/lib/DatePicker';

import * as strings from 'FormFieldStrings';


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
        strings={strings}
      />
    );
  }
}
