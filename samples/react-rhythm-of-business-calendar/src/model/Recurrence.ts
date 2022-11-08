import { clamp } from "lodash";
import { Moment } from "moment-timezone";

export enum RecurDay {
    sunday = 0,
    monday = 1,
    tuesday = 2,
    wednesday = 3,
    thursday = 4,
    friday = 5,
    saturday = 6,
    day = 7,
    weekday = 8,
    weekend = 9
}

export enum RecurWeekOfMonth {
    first = 0,
    second = 1,
    third = 2,
    fourth = 3,
    last = 4
}

export enum RecurPattern {
    daily = 0,
    weekly = 1,
    monthly = 2,
    yearly = 3
}

export enum RecurPatternOption {
    byDate = 0, // specific date of the month (ex Aug 15)
    byDay = 1   // a particular day of the week (ex third Wednesday)
}

export enum RecurUntilType {
    forever = 0,
    date = 1,
    count = 2
}

const between = (val: number, min: number, max: number) =>
    isFinite(val) ? clamp(val, min, max) : val;

export class DailyRecurrence {
    private _every: number = 1;
    public get every(): number { return this._every; }
    public set every(val: number) { this._every = between(val, 1, 99) }

    public weekdaysOnly: boolean;
}

export class WeeklyRecurrence {
    private _every: number = 1;
    public get every(): number { return this._every; }
    public set every(val: number) { this._every = between(val, 1, 52) }

    public readonly days: boolean[] = [false, false, false, false, false, false, false];

    public setDefaultsForDate(date: Moment) {
        this.days[date.day()] = true;
    }
}

export class MonthlyByDateRecurrence {
    private _date: number = 1;
    public get date(): number { return this._date; }
    public set date(val: number) { this._date = between(val, 1, 31) }
}

export class MonthlyByDayRecurrence {
    public weekOf: RecurWeekOfMonth = RecurWeekOfMonth.first;
    public day: RecurDay = RecurDay.monday;

    public setDefaultsForDate(date: Moment) {
        this.day = date.day() as RecurDay;
    }
}

export class MonthlyRecurrence {
    public option: RecurPatternOption = RecurPatternOption.byDate;
    public byDate: MonthlyByDateRecurrence = new MonthlyByDateRecurrence();
    public byDay: MonthlyByDayRecurrence = new MonthlyByDayRecurrence();

    private _every: number = 1;
    public get every(): number { return this._every; }
    public set every(val: number) { this._every = between(val, 1, 24) }

    public setDefaultsForDate(date: Moment) {
        this.byDay.setDefaultsForDate(date);
    }
}

export class YearlyByDateRecurrence {
    private _date: number = 1;
    public get date(): number { return this._date; }
    public set date(val: number) { this._date = between(val, 1, 31) }
}

export class YearlyByDayRecurrence {
    public weekOf: RecurWeekOfMonth = RecurWeekOfMonth.first;
    public day: RecurDay = RecurDay.monday;

    public setDefaultsForDate(date: Moment) {
        this.day = date.day() as RecurDay;
    }
}

export class YearlyRecurrence {
    public option: RecurPatternOption = RecurPatternOption.byDate;
    public byDate: YearlyByDateRecurrence = new YearlyByDateRecurrence();
    public byDay: YearlyByDayRecurrence = new YearlyByDayRecurrence();

    private _month: number = 0;
    public get month(): number { return this._month; }
    public set month(val: number) { this._month = between(val, 0, 11) }

    private _every: number = 1;
    public get every(): number { return this._every; }
    public set every(val: number) { this._every = between(val, 1, 9) }

    public setDefaultsForDate(date: Moment) {
        this.byDay.setDefaultsForDate(date);
        this.month = date.month();
    }
}

export class RecurUntil {
    public type: RecurUntilType = RecurUntilType.forever;
    public count: number | undefined = 10;
    public date: Moment | undefined;
}

export class Recurrence {
    public firstDayOfWeek: string = 'su';

    public pattern: RecurPattern = RecurPattern.daily;
    public readonly until: RecurUntil = new RecurUntil();
    public readonly daily: DailyRecurrence = new DailyRecurrence();
    public readonly weekly: WeeklyRecurrence = new WeeklyRecurrence();
    public readonly monthly: MonthlyRecurrence = new MonthlyRecurrence();
    public readonly yearly: YearlyRecurrence = new YearlyRecurrence();

    public setDefaultsForDate(date: Moment) {
        this.weekly.setDefaultsForDate(date);
        this.yearly.setDefaultsForDate(date);
    }
}