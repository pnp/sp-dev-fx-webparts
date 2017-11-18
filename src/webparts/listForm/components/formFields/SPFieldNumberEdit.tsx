import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';
import NumberFormField from './NumberFormField';

const SPFieldNumberEdit: React.SFC<ISPFormFieldProps> = (props) => {
    return <NumberFormField
        className='ard-numberFormField'
        value={props.value}
        valueChanged={props.valueChanged}
        placeholder='Enter value here'
        underlined
    />;
};

export default SPFieldNumberEdit;
