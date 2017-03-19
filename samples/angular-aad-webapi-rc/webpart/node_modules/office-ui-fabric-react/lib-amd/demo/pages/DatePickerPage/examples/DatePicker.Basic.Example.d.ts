import * as React from 'react';
import { DayOfWeek } from '../../../../index';
export interface IDatePickerBasicExampleState {
    firstDayOfWeek?: DayOfWeek;
}
export declare class DatePickerBasicExample extends React.Component<any, IDatePickerBasicExampleState> {
    constructor();
    render(): JSX.Element;
    private _onDropdownChanged(option);
}
