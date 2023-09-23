import { IDropdownOption } from "@fluentui/react";
import { RecurDay, RecurWeekOfMonth } from "model";
import { months, weekdays } from "moment-timezone";

import { Humanize as strings } from "ComponentStrings";

const monthStrings = months();
const weekdayStrings = weekdays();

export const recurWeekOfDropdownOptions: IDropdownOption[] = [{
    key: RecurWeekOfMonth.first,
    text: strings.First
}, {
    key: RecurWeekOfMonth.second,
    text: strings.Second
}, {
    key: RecurWeekOfMonth.third,
    text: strings.Third
}, {
    key: RecurWeekOfMonth.fourth,
    text: strings.Fourth
}, {
    key: RecurWeekOfMonth.last,
    text: strings.Last
}];

export const recurDayDropdownOptions: IDropdownOption[] = [{
    key: RecurDay.day,
    text: strings.Day
}, {
    key: RecurDay.weekday,
    text: strings.Weekday
}, {
    key: RecurDay.weekend,
    text: strings.Weekend
}, {
    key: RecurDay.sunday,
    text: weekdayStrings[0]
}, {
    key: RecurDay.monday,
    text: weekdayStrings[1]
}, {
    key: RecurDay.tuesday,
    text: weekdayStrings[2]
}, {
    key: RecurDay.wednesday,
    text: weekdayStrings[3]
}, {
    key: RecurDay.thursday,
    text: weekdayStrings[4]
}, {
    key: RecurDay.friday,
    text: weekdayStrings[5]
}, {
    key: RecurDay.saturday,
    text: weekdayStrings[6]
}];

export const monthDropdownOptions: IDropdownOption[] = monthStrings.map((name, idx) => {
    return {
        key: idx,
        text: name
    }
});