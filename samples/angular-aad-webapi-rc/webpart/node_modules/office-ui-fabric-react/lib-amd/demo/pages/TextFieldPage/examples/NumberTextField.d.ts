import * as React from 'react';
import './NumberTextField.scss';
export interface INumberTextFieldProps {
    label: string;
    initialValue: string;
}
export interface INumberTextFieldState {
    value: string;
}
export declare class NumberTextField extends React.Component<INumberTextFieldProps, INumberTextFieldState> {
    constructor(props: any);
    render(): JSX.Element;
    private _validateNumber(value);
    private _onChanged(value);
    private _restore();
}
