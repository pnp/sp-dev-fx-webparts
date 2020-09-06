import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as strings from 'FormFieldStrings';

const SPFieldTextEdit: React.SFC<ISPFormFieldProps> = (props) => {
    // We need to set value to empty string when null or undefined to force TextField still be used like a controlled component
    const value = props.value ? props.value : '';
    return <TextField
        className='ard-TextFormField'
        name={props.fieldSchema.InternalName}
        value={value}
        onChanged={props.valueChanged}
        placeholder={strings.TextFormFieldPlaceholder}
        multiline={props.fieldSchema.FieldType === 'Note'}
        underlined
        noValidate
    />;
};

export default SPFieldTextEdit;
