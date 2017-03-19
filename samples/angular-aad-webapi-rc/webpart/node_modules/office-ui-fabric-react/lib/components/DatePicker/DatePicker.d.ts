import * as React from 'react';
import { IDatePickerProps } from './DatePicker.Props';
import { TextField } from '../../TextField';
import { BaseComponent } from '../../Utilities';
import './DatePicker.scss';
export interface IDatePickerState {
    /** The currently focused date in the drop down, but not necessarily selected */
    navigatedDate?: Date;
    selectedDate?: Date;
    formattedDate?: string;
    isDatePickerShown?: boolean;
    errorMessage?: string;
}
export declare class DatePicker extends BaseComponent<IDatePickerProps, IDatePickerState> {
    static defaultProps: IDatePickerProps;
    refs: {
        [key: string]: React.ReactInstance;
        root: HTMLElement;
        textField: TextField;
    };
    private _datepicker;
    private _preventFocusOpeningPicker;
    private _focusOnSelectedDateOnUpdate;
    constructor(props: IDatePickerProps);
    componentWillReceiveProps(nextProps: IDatePickerProps): void;
    render(): JSX.Element;
    private _onSelectDate(date);
    private _onTextFieldFocus(ev);
    private _onTextFieldBlur(ev);
    private _onTextFieldChanged(newValue);
    private _onTextFieldKeyDown(ev);
    private _onTextFieldClick(ev);
    private _showDatePickerPopup();
    private _dismissDatePickerPopup();
    /**
     * Callback for closing the calendar callout
     */
    private _calendarDismissed();
    private _handleEscKey(ev);
    private _validateTextInput();
}
