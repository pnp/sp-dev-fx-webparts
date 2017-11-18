import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const SPFieldTextEdit: React.SFC<ISPFormFieldProps> = (props) => {
    return <TextField
                className='ard-TextFormField'
                name={props.fieldSchema.InternalName}
                value={props.value}
                onChanged={props.valueChanged}
                placeholder='Enter text here'
                multiline={props.fieldSchema.FieldType === 'Note'}
                underlined
                noValidate
            />;
};

export default SPFieldTextEdit;
