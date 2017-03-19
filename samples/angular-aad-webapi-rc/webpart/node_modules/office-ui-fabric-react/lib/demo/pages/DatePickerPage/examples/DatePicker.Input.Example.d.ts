import * as React from 'react';
import { DayOfWeek } from '../../../../index';
export interface IDatePickerInputExampleState {
    firstDayOfWeek?: DayOfWeek;
    value?: Date;
}
export declare class DatePickerInputExample extends React.Component<any, IDatePickerInputExampleState> {
    constructor();
    render(): JSX.Element;
}
