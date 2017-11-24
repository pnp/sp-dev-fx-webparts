import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';

const SPFieldTextDisplay: React.SFC<ISPFormFieldProps> = (props) => {
    const value = (props.value) ? ((typeof props.value === 'string') ? props.value : JSON.stringify(props.value)) : '';
    return <span className='ard-textfield-display'>{value}</span>;
};

export default SPFieldTextDisplay;
