import * as React from 'react';
import * as moment from 'moment';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { Locales } from '../../../../common/Locales';
import { ISPFormFieldProps } from './SPFormField';
import DateFormField from './DateFormField';

import * as strings from 'FormFieldStrings';
import styles from './SPFormField.module.scss';


const SPFieldDateEdit: React.SFC<ISPFormFieldProps> = (props) => {
    const locale = Locales[props.fieldSchema.LocaleId];
    return <DateFormField
              {...props.value && moment(props.value).isValid() ? {value: moment(props.value).toDate()} : {}}
              className={css(styles.dateFormField, 'ard-dateFormField')}
              placeholder={strings.DateFormFieldPlaceholder}
              isRequired={props.fieldSchema.Required}
              ariaLabel={props.fieldSchema.Title}
              locale={Locales[locale]}
              firstDayOfWeek={props.fieldSchema.FirstDayOfWeek}
              allowTextInput
              onSelectDate={(date) => props.valueChanged(date.toLocaleDateString(locale))}
            />;
};

export default SPFieldDateEdit;
