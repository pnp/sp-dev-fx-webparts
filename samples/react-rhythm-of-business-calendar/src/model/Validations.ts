import { ValidationRule } from 'common';
import { Event } from './Event';
import { RecurPattern, RecurPatternOption, RecurUntilType } from './Recurrence';

import { Validation as strings } from 'ComponentStrings';

export class EveryN_Daily_Recurrence_Required_ValidationRule extends ValidationRule<Event> {
    constructor() {
        super(EveryN_Daily_Recurrence_Required_ValidationRule._isValid, strings.Daily.EveryNRequired);
    }

    private static _isValid({ isRecurring, recurrence }: Event): boolean {
        if (!isRecurring) {
            return true;
        } else {
            const { pattern, daily: { every, weekdaysOnly } } = recurrence;
            return (pattern === RecurPattern.daily && !weekdaysOnly) ? isFinite(every) : true;
        }
    }
}

export class EveryN_Weekly_Recurrence_Required_ValidationRule extends ValidationRule<Event> {
    constructor() {
        super(EveryN_Weekly_Recurrence_Required_ValidationRule._isValid, strings.Weekly.EveryNRequired);
    }

    private static _isValid({ isRecurring, recurrence }: Event): boolean {
        if (!isRecurring) {
            return true;
        } else {
            const { pattern, weekly: { every } } = recurrence;
            return pattern === RecurPattern.weekly ? isFinite(every) : true;
        }
    }
}

export class Days_Weekly_Recurrence_Required_ValidationRule extends ValidationRule<Event> {
    constructor() {
        super(Days_Weekly_Recurrence_Required_ValidationRule._isValid, strings.Weekly.DaysRequired);
    }

    private static _isValid({ isRecurring, recurrence }: Event): boolean {
        if (!isRecurring) {
            return true;
        } else {
            const { pattern, weekly: { days } } = recurrence;
            return pattern === RecurPattern.weekly ? days.some(Boolean) : true;
        }
    }
}

export class Date_MonthlyByDate_Recurrence_Required_ValidationRule extends ValidationRule<Event> {
    constructor() {
        super(Date_MonthlyByDate_Recurrence_Required_ValidationRule._isValid, strings.MonthlyByDate.DateRequired);
    }

    private static _isValid({ isRecurring, recurrence }: Event): boolean {
        if (!isRecurring) {
            return true;
        } else {
            const { pattern, monthly: { byDate: { date }, option } } = recurrence;
            return (pattern === RecurPattern.monthly && option === RecurPatternOption.byDate) ? isFinite(date) : true;
        }
    }
}

export class EveryN_MonthlyByDate_Recurrence_Required_ValidationRule extends ValidationRule<Event> {
    constructor() {
        super(EveryN_MonthlyByDate_Recurrence_Required_ValidationRule._isValid, strings.MonthlyByDate.EveryNRequired);
    }

    private static _isValid({ isRecurring, recurrence }: Event): boolean {
        if (!isRecurring) {
            return true;
        } else {
            const { pattern, monthly: { every, option } } = recurrence;
            return (pattern === RecurPattern.monthly && option === RecurPatternOption.byDate) ? isFinite(every) : true;
        }
    }
}

export class EveryN_MonthlyByDay_Recurrence_Required_ValidationRule extends ValidationRule<Event> {
    constructor() {
        super(EveryN_MonthlyByDay_Recurrence_Required_ValidationRule._isValid, strings.MonthlyByDay.EveryNRequired);
    }

    private static _isValid({ isRecurring, recurrence }: Event): boolean {
        if (!isRecurring) {
            return true;
        } else {
            const { pattern, monthly: { every, option } } = recurrence;
            return (pattern === RecurPattern.monthly && option === RecurPatternOption.byDay) ? isFinite(every) : true;
        }
    }
}

export class Date_YearlyByDate_Recurrence_Required_ValidationRule extends ValidationRule<Event> {
    constructor() {
        super(Date_YearlyByDate_Recurrence_Required_ValidationRule._isValid, strings.YearlyByDate.DateRequired);
    }

    private static _isValid({ isRecurring, recurrence }: Event): boolean {
        if (!isRecurring) {
            return true;
        } else {
            const { pattern, yearly: { byDate: { date }, option } } = recurrence;
            return (pattern === RecurPattern.yearly && option === RecurPatternOption.byDate) ? isFinite(date) : true;
        }
    }
}

export class EndDate_Until_Recurrence_Required_ValidationRule extends ValidationRule<Event> {
    constructor() {
        super(EndDate_Until_Recurrence_Required_ValidationRule._isValid, strings.Until.EndDateRequired);
    }

    private static _isValid({ isRecurring, recurrence }: Event): boolean {
        if (!isRecurring) {
            return true;
        } else {
            const { until: { type, date } } = recurrence;
            return type === RecurUntilType.date ? date?.isValid() : true;
        }
    }
}

export class EndDate_Until_Recurrence_AfterStartDate_ValidationRule extends ValidationRule<Event> {
    constructor() {
        super(EndDate_Until_Recurrence_AfterStartDate_ValidationRule._isValid, strings.Until.EndDateAfterStart);
    }

    private static _isValid({ isRecurring, startDate, recurrence }: Event): boolean {
        if (!isRecurring) {
            return true;
        } else {
            const { until: { type, date } } = recurrence;
            return (type === RecurUntilType.date && startDate?.isValid() && date?.isValid()) ? date.isSameOrAfter(startDate, 'day') : true;
        }
    }
}

export class Count_Until_Recurrence_Required_ValidationRule extends ValidationRule<Event> {
    constructor() {
        super(Count_Until_Recurrence_Required_ValidationRule._isValid, strings.Until.CountRequired);
    }

    private static _isValid({ isRecurring, recurrence }: Event): boolean {
        if (!isRecurring) {
            return true;
        } else {
            const { until: { type, count } } = recurrence;
            return type === RecurUntilType.count ? isFinite(count) : true;
        }
    }
}