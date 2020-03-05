import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';
import { AttachmentRender } from './AttachmentRender';

const SPAttachmentFormFieldEdit: React.SFC<ISPFormFieldProps> = (props, state) => {
    if (props.fieldSchema.FieldType !== 'Attachment') {
        return <AttachmentRender
            fieldProps={props}
        > </AttachmentRender>;
    }
};

export default SPAttachmentFormFieldEdit;