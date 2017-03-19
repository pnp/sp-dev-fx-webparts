import * as React from 'react';
export interface ICalendarButtonExampleState {
    showCalendar: boolean;
    selectedDate: Date;
}
export declare class CalendarButtonExample extends React.Component<any, ICalendarButtonExampleState> {
    private _calendarButtonElement;
    constructor();
    render(): JSX.Element;
    private _onClick(event);
    private _onDismiss();
    private _onSelectDate(date);
}
