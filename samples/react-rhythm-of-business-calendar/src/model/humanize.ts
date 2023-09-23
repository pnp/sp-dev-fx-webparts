import { Moment, localeData, months, weekdays, weekdaysShort } from "moment-timezone";
import { format } from "@fluentui/react";
import { humanizeFixedList } from "common";
import { DailyRecurrence, MonthlyRecurrence, RecurPattern, RecurPatternOption, Recurrence, RecurUntil, RecurUntilType, WeeklyRecurrence, YearlyRecurrence } from "./Recurrence";

import { Humanize as strings } from "ComponentStrings";

const monthStrings = months();
const dayNames = weekdaysShort();
const dayStrings = [...weekdays(), strings.Day, strings.Weekday, strings.Weekend];
const weekOfStrings = [strings.First, strings.Second, strings.Third, strings.Fourth, strings.Last];

export const humanizeDateRange = (start: Moment, end: Moment, isAllDay: boolean): string => {
    if (start.isSame(end, 'year')) {
        if (start.isSame(end, 'month')) {
            if (start.isSame(end, 'day')) {
                return isAllDay
                    ? `${start.format('dddd, MMMM D, YYYY')}, ${strings.AllDay}`
                    : `${start.format('dddd, MMMM D, YYYY, LT')} - ${end.format('LT')}`;
            } else {
                return isAllDay
                    ? `${start.format('MMMM D')}-${end.format('D, YYYY')}, ${strings.AllDay}`
                    : `${start.format('MMMM D')}-${end.format('D')}, ${start.format('YYYY, LT')} - ${end.format('LT')}`;
            }
        } else {
            return isAllDay
                ? `${start.format('MMMM DD')} - ${end.format('MMMM DD, YYYY')}, ${strings.AllDay}`
                : `${start.format('MMM D')} - ${end.format('MMM D')}, ${start.format('YYYY, LT')} - ${end.format('LT')}`;
        }
    } else {
        return isAllDay
            ? `${start.format('MMMM D, YYYY')} - ${end.format('MMMM D, YYYY')}, ${strings.AllDay}`
            : `${start.format('MMMM DD, YYYY, LT')} - ${end.format('MMMM DD, YYYY, LT')}`;
    }
}

const humanizeDailyPattern = ({ weekdaysOnly, every }: DailyRecurrence) => {
    if (weekdaysOnly)
        return strings.Pattern_Daily_EachWeekday; // "Each weekday"
    else
        return format( // "Every {0} days"
            every > 1 ? strings.Pattern_Daily_EveryNDays.Plural : strings.Pattern_Daily_EveryNDays.Singular,
            every
        );
}

const humanizeWeeklyPattern = ({ days, every }: WeeklyRecurrence) => {
    const includedDays = days.map((included, idx) => included && dayNames[idx]).filter(Boolean);
    const daysString = humanizeFixedList(includedDays, dayNames, name => name, false, strings.Pattern_Weekly.AllDays);
    return format(// "On {0} every {1} weeks"
        every > 1 ? strings.Pattern_Weekly.Plural : strings.Pattern_Weekly.Singular,
        daysString, every
    );
}

const humanizeMonthlyPattern = ({ option, byDay: { day, weekOf }, byDate: { date }, every }: MonthlyRecurrence) => {
    if (option === RecurPatternOption.byDate) {
        return format( // "On the {0} of every {1} months"
            every > 1 ? strings.Pattern_Monthly_ByDate.Plural : strings.Pattern_Monthly_ByDate.Singular,
            localeData().ordinal(date), every
        );
    } else {
        return format( // "On the {0} {1} of every {2} months"
            every > 1 ? strings.Pattern_Monthly_ByDay.Plural : strings.Pattern_Monthly_ByDay.Singular,
            weekOfStrings[weekOf], dayStrings[day], every
        );
    }
}

const humanizeYearlyPattern = ({ option, byDay: { day, weekOf }, byDate: { date }, month, every }: YearlyRecurrence) => {
    if (option === RecurPatternOption.byDate) {
        return format( // "On {0} {1} of every {2} years"
            every > 1 ? strings.Pattern_Yearly_ByDate.Plural : strings.Pattern_Yearly_ByDate.Singular,
            monthStrings[month], localeData().ordinal(date), every
        );
    } else {
        return format( // "On the {0} {1} of every {2} years"
            every > 1 ? strings.Pattern_Yearly_ByDay.Plural : strings.Pattern_Yearly_ByDay.Singular,
            weekOfStrings[weekOf], dayStrings[day], monthStrings[month], every
        );
    }
}

const humanizeUntilPattern = ({ type, count, date }: RecurUntil) => {
    if (type === RecurUntilType.count && count > 0) {
        return format( // "for {0} occurrences"
            strings.Pattern_Until.Count,
            count
        );
    } else if (type === RecurUntilType.date && date) {
        return format( // "through {0}"
            strings.Pattern_Until.Date,
            date.format('l')
        );
    } else { // if (type === RecurUntilType.forever)
        return "";
    }
}

export const humanizeRecurrencePattern = (startDate: Moment, recurrence: Recurrence) => {
    if (!recurrence) return "";

    const { pattern, daily, weekly, monthly, yearly, until } = recurrence;

    const untilPatternString = humanizeUntilPattern(until);
    const startDateString = startDate.format('l');
    let recurrencePatternString = "";

    switch (pattern) {
        case RecurPattern.daily: recurrencePatternString = humanizeDailyPattern(daily); break;
        case RecurPattern.weekly: recurrencePatternString = humanizeWeeklyPattern(weekly); break;
        case RecurPattern.monthly: recurrencePatternString = humanizeMonthlyPattern(monthly); break;
        case RecurPattern.yearly: recurrencePatternString = humanizeYearlyPattern(yearly); break;
    }

    // "{0}, starting {1} {2}"
    return format(strings.HumanizePattern, recurrencePatternString, startDateString, untilPatternString);
};