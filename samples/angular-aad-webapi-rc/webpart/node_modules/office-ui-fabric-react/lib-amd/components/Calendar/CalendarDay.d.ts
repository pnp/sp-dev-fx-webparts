import * as React from 'react';
import { DayOfWeek, ICalendarStrings } from './Calendar.Props';
export interface IDayInfo {
    key: string;
    date: string;
    originalDate: Date;
    isInMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
}
export interface ICalendarDayProps {
    strings: ICalendarStrings;
    selectedDate: Date;
    navigatedDate: Date;
    onSelectDate: (date: Date) => void;
    onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
    firstDayOfWeek: DayOfWeek;
}
export interface ICalendarDayState {
    activeDescendantId?: string;
    weeks?: IDayInfo[][];
}
export declare class CalendarDay extends React.Component<ICalendarDayProps, ICalendarDayState> {
    refs: {
        [key: string]: React.ReactInstance;
        navigatedDay: HTMLElement;
    };
    constructor(props: ICalendarDayProps);
    componentWillReceiveProps(nextProps: ICalendarDayProps): void;
    render(): JSX.Element;
    focus(): void;
    private _navigateMonthEdge(ev, date, weekIndex, dayIndex);
    private _onKeyDown(callback, ev);
    private _onSelectNextMonth();
    private _onSelectPrevMonth();
    private _getWeeks(navigatedDate, selectedDate);
}
