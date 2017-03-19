import * as React from 'react';
import { ITextFieldProps } from './TextField.Props';
import './TextField.scss';
export interface ITextFieldState {
    value?: string;
    /** Is true when the control has focus. */
    isFocused?: boolean;
    /**
     * The validation error message.
     *
     * - If there is no validation error or we have not validated the input value, errorMessage is an empty string.
     * - If we have done the validation and there is validation error, errorMessage is the validation error message.
     */
    errorMessage?: string;
}
export declare class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
    static defaultProps: ITextFieldProps;
    private _id;
    private _descriptionId;
    private _async;
    private _delayedValidate;
    private _isMounted;
    private _lastValidation;
    private _latestValidateValue;
    private _willMountTriggerValidation;
    private _field;
    constructor(props: ITextFieldProps);
    /**
     * Gets the current value of the text field.
     */
    readonly value: string;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(newProps: ITextFieldProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    /**
     * Sets focus on the text field
     */
    focus(): void;
    /**
     * Selects the text field
     */
    select(): void;
    /**
     * Sets the selection start of the text field to a specified value
     */
    setSelectionStart(value: number): void;
    /**
     * Sets the selection end of the text field to a specified value
     */
    setSelectionEnd(value: number): void;
    private _onFocus(ev);
    private _onBlur(ev);
    private readonly _fieldClassName;
    private readonly _errorMessage;
    private _renderTextArea();
    private _renderInput();
    private _onInputChange(event);
    private _validate(value);
    private _notifyAfterValidate(value, errorMessage);
}
