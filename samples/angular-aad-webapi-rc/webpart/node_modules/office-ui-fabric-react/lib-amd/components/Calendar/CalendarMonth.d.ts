import * as React from 'react';
import { ICalendarStrings } from './Calendar.Props';
export interface ICalendarMonthProps {
    navigatedDate: Date;
    strings: ICalendarStrings;
    onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
}
export declare class CalendarMonth extends React.Component<ICalendarMonthProps, {}> {
    private _selectMonthCallbacks;
    constructor(props: ICalendarMonthProps);
    render(): JSX.Element;
    private _onKeyDown(callback, ev);
    private _onSelectNextYear();
    private _onSelectPrevYear();
    private _onSelectMonth(newMonth);
}
