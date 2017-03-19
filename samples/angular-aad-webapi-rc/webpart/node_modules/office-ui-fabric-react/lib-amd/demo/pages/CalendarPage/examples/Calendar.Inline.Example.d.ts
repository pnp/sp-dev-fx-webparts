import * as React from 'react';
export interface ICalendarInlineExampleState {
    selectedDate: Date;
}
export interface ICalendarInlineExampleProps {
    isMonthPickerVisible: boolean;
}
export declare class CalendarInlineExample extends React.Component<ICalendarInlineExampleProps, ICalendarInlineExampleState> {
    constructor();
    render(): JSX.Element;
    private _onDismiss();
    private _onSelectDate(date);
}
