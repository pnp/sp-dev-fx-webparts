import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';
import NumberFormField from './NumberFormField';

import * as strings from 'FormFieldStrings';

const SPFieldNumberEdit: React.SFC<ISPFormFieldProps> = (props) => {
    return <NumberFormField
        className='ard-numberFormField'
        value={props.value}
        valueChanged={props.valueChanged}
        placeholder={strings.NumberFormFieldPlaceholder}
        underlined
    />;
};

export default SPFieldNumberEdit;
