import * as React from 'react';
import { ICalendarProps } from './Calendar.Props';
import { CalendarDay } from './CalendarDay';
import { BaseComponent } from '../../Utilities';
import './Calendar.scss';
export interface ICalendarState {
    /** The currently focused date in the calendar, but not necessarily selected */
    navigatedDate?: Date;
    /** The currently selected date in the calendar */
    selectedDate?: Date;
}
export declare class Calendar extends BaseComponent<ICalendarProps, ICalendarState> {
    static defaultProps: ICalendarProps;
    refs: {
        [key: string]: React.ReactInstance;
        root: HTMLElement;
        dayPicker: CalendarDay;
    };
    private _focusOnUpdate;
    constructor(props: ICalendarProps);
    componentWillReceiveProps(nextProps: ICalendarProps): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
    private _navigateDay(date);
    private _onNavigateDate(date, focusOnNavigatedDay);
    private _onSelectDate(date);
    private _onGotoToday();
    private _onGotoTodayKeyDown(ev);
    private _onDatePickerPopupKeyDown(ev);
    private _handleEscKey(ev);
}
