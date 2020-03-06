import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';
import { AttachmentRender } from './AttachmentRender';

const SPAttachmentFormFieldEdit: React.SFC<ISPFormFieldProps> = (props, state) => {
    if (props.fieldSchema.FieldType !== 'Attachment') {
        return <AttachmentRender
            controlMode={props.controlMode}
            valueChanged={props.valueChanged}
            value={props.value}
        > </AttachmentRender>;
    }
};

export default SPAttachmentFormFieldEdit;