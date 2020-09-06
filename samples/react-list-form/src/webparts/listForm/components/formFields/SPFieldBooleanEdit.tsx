import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import * as strings from 'FormFieldStrings';

const SPFieldBooleanEdit: React.SFC<ISPFormFieldProps> = (props) => {
    return <Toggle
        className='ard-booleanFormField'
        checked={props.value === '1' || props.value === 'true' || props.value === 'Yes'}
        onAriaLabel={strings.ToggleOnAriaLabel}
        offAriaLabel={strings.ToggleOffAriaLabel}
        onText={strings.ToggleOnText}
        offText={strings.ToggleOffText}
        onChanged={(checked: boolean) => props.valueChanged(checked.toString())}
    />;
};

export default SPFieldBooleanEdit;
