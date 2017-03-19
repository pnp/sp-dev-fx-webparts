import * as React from 'react';
export interface ILabelProps extends React.HTMLProps<HTMLLabelElement> {
    /**
     * Whether the associated form field is required or not
     * @defaultvalue false
     */
    required?: boolean;
}
