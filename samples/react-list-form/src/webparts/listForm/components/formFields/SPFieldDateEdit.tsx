import * as React from 'react';
import * as moment from 'moment';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { DatePicker, DayOfWeek, IDatePickerProps, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';

import { Locales } from '../../../../common/Locales';
import { ISPFormFieldProps } from './SPFormField';
import DateFormField from './DateFormField';

import * as strings from 'FormFieldStrings';
import styles from './SPFormField.module.scss';

const SPFieldDateEdit: React.SFC<ISPFormFieldProps> = (props) => {
  const locale = Locales[props.fieldSchema.LocaleId];
  return (
    <React.Fragment>
      <DatePicker
        {...props.value && moment(props.value).isValid() ? { value: moment(props.value).toDate() } : {}}
        allowTextInput={true}
        ariaLabel={props.fieldSchema.Title}
        className={css(styles.dateFormField, 'ard-dateFormField')}
        firstDayOfWeek={props.fieldSchema.FirstDayOfWeek}
        formatDate={(date: Date) => (typeof date.toLocaleDateString === 'function') ? date.toLocaleDateString(Locales[locale]) : ''}
        isRequired={props.fieldSchema.Required}
        onSelectDate={(date) => props.valueChanged(date.toLocaleDateString(Locales[locale]))}
        parseDateFromString={(dateStr: string) => new Date(Date.parse(dateStr))}
        placeholder={strings.DateFormFieldPlaceholder}
        strings={strings}
      />
    </React.Fragment>)
};

export default SPFieldDateEdit;
