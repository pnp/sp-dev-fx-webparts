import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

const SPFieldBooleanEdit: React.SFC<ISPFormFieldProps> = (props) => {
    return <Toggle
                className='ard-booleanFormField'
                checked={props.value === '1' || props.value === 'true' || props.value === 'Yes'}
                onAriaLabel='This toggle is checked. Press to uncheck.'
                offAriaLabel='This toggle is unchecked. Press to check.'
                onText='Yes'
                offText='No'
                onChanged={ (checked: boolean) => props.valueChanged(checked.toString())}
            />;
};

export default SPFieldBooleanEdit;
