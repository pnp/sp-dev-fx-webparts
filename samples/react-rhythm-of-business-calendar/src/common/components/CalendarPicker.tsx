import { noop } from "lodash";
import moment, { Moment, months, monthsShort, weekdays, weekdaysMin } from "moment-timezone";
import React, { FC, useCallback, useRef } from "react";
import { ActionButton, Calendar, DayOfWeek, DateRangeType, Callout, DirectionalHint, FocusTrapZone, IIconProps } from '@fluentui/react';
import { useBoolean } from "@fluentui/react-hooks";
import { now } from "../Utils";

interface IProps {
    buttonLabel: string;
    dateRangeType?: DateRangeType;
    disabled?: boolean;
    iconProps?: IIconProps;
    date?: Moment;
    onSelectDate?: (date: Moment) => void;
}

export const CalendarDefaultStrings = {
    months: months(),
    shortMonths: monthsShort(),
    days: weekdays(),
    shortDays: weekdaysMin(),
    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year'
};

export const CalendarPicker: FC<IProps> = ({
    buttonLabel,
    dateRangeType = DateRangeType.Day,
    disabled,
    iconProps,
    date = now(),
    onSelectDate = noop
}) => {
    const buttonRef = useRef<HTMLSpanElement>();
    const [showCalendar, { setFalse: closeCalendar, toggle: toggleCalendar }] = useBoolean(false);

    const calendarDate = date.clone().tz(moment.tz.guess(), true).toDate();

    const onCalendarSelectDate = useCallback((d: Date) => {
        onSelectDate(moment(d).tz(moment.tz.guess()));
        closeCalendar()
    }, [onSelectDate, closeCalendar]);

    return (
        <span ref={buttonRef}>
            <ActionButton iconProps={iconProps} disabled={disabled} onClick={toggleCalendar}>
                {buttonLabel}
            </ActionButton>
            {showCalendar &&
                <Callout
                    setInitialFocus
                    isBeakVisible={false}
                    directionalHint={DirectionalHint.bottomCenter}
                    target={buttonRef.current}
                    onDismiss={closeCalendar}
                >
                    <FocusTrapZone isClickableOutsideFocusTrap>
                        <Calendar
                            dateRangeType={dateRangeType}
                            onSelectDate={onCalendarSelectDate}
                            value={calendarDate}
                            firstDayOfWeek={DayOfWeek.Sunday}
                            strings={CalendarDefaultStrings}
                        />
                    </FocusTrapZone>
                </Callout>
            }
        </span>
    );
};