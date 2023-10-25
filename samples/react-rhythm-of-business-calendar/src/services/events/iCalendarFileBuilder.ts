import { Event, RecurDay, RecurPattern, RecurPatternOption, Recurrence, RecurUntilType, RecurWeekOfMonth } from "model";
import { Cadence } from "model/Cadence";

export class iCalendarFileBuilder {
    public build(event: Event) {
        const { start, startTime, end, duration, isAllDay, isSeriesMaster, recurrence, location, title, description } = event;

        let adjustedStart = start;
        let adjustedEnd = end;

        // iCalendar format requires the DTSTART/DTEND date to be a valid meeting occurence date or it will not load in Outlook
        if (isSeriesMaster) {
            const cadence = new Cadence(start, recurrence);
            const dates = cadence.generate({ start, end: start.clone().add(3, 'years') });
            const firstDate = dates.next().value;
            if (firstDate) {
                adjustedStart = firstDate.clone().startOf('day').add(startTime);
                adjustedEnd = firstDate.clone().startOf('day').add(duration);
            }
        }

        const dtstart = adjustedStart.format(isAllDay ? "YYYYMMDD" : "YYYYMMDD[T]HHmmss");
        const dtend = adjustedEnd.format(isAllDay ? "YYYYMMDD" : "YYYYMMDD[T]HHmmss");

        const ics = `BEGIN:VCALENDAR
PRODID:-//Microsoft Corporation//SharePoint MIMEDIR//EN
VERSION:2.0
METHOD:PUBLISH
BEGIN:VEVENT
UID;TYPE=SharePoint:321
DTSTART:${dtstart}
DTEND:${dtend}
${isSeriesMaster ? this._buildRRule(recurrence) : ''}
LOCATION;ENCODING=8BIT;CHARSET=utf-8:${location}
TRANSP:OPAQUE
SEQUENCE:1
DTSTAMP:20220225T045349Z
SUMMARY;ENCODING=8BIT;CHARSET=utf-8:${title}
X-ALT-DESC;FMTTYPE=text/html:${description}
CLASS:PUBLIC
END:VEVENT
END:VCALENDAR`;

        return ics;
    }

    private _buildRRule(recurrence: Recurrence): string {
        const rrule = 'RRULE:' + [
            this._freq(recurrence),
            this._interval(recurrence),
            this._bySetPos(recurrence),
            this._byDay(recurrence),
            this._byMonth(recurrence),
            this._byMonthDay(recurrence),
            this._untilCount(recurrence),
            this._untilDate(recurrence)
        ].filter(Boolean).join(';');

        return rrule;
    }

    private _freq({ pattern }: Recurrence): string {
        switch (pattern) {
            case RecurPattern.daily: return "FREQ=DAILY";
            case RecurPattern.weekly: return "FREQ=WEEKLY";
            case RecurPattern.monthly: return "FREQ=MONTHLY";
            case RecurPattern.yearly: return "FREQ=YEARLY";
        }
    }

    private _interval({ pattern, daily, weekly, monthly, yearly }: Recurrence): string {
        switch (pattern) {
            case RecurPattern.daily: return "INTERVAL=" + daily.every;
            case RecurPattern.weekly: return "INTERVAL=" + weekly.every;
            case RecurPattern.monthly: return "INTERVAL=" + monthly.every;
            case RecurPattern.yearly: return "INTERVAL=" + yearly.every;
        }
    }

    private _bySetPos({ pattern, monthly, yearly }: Recurrence): string {
        if (pattern === RecurPattern.monthly && monthly.option === RecurPatternOption.byDay)
            return "BYSETPOS=" + this._weekOfToBySetPos(monthly.byDay.weekOf);
        else if (pattern === RecurPattern.yearly && yearly.option === RecurPatternOption.byDay)
            return "BYSETPOS=" + this._weekOfToBySetPos(yearly.byDay.weekOf);
        else
            return '';
    }

    private _weekOfToBySetPos(weekOf: RecurWeekOfMonth): number {
        switch (weekOf) {
            case RecurWeekOfMonth.first: return 1;
            case RecurWeekOfMonth.second: return 2;
            case RecurWeekOfMonth.third: return 3;
            case RecurWeekOfMonth.fourth: return 4;
            case RecurWeekOfMonth.last: return -1;
        }
    }

    private _byDay({ pattern, daily, weekly, monthly, yearly }: Recurrence): string {
        switch (pattern) {
            case RecurPattern.daily: {
                return daily.weekdaysOnly ? "BYDAY=MO,TU,WE,TH,FR" : '';
            }
            case RecurPattern.weekly: {
                const dayNames = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
                return "BYDAY=" + weekly.days.map((include, idx) => include ? dayNames[idx] : '').filter(Boolean).join(',');
            }
            case RecurPattern.monthly: {
                if (monthly.option === RecurPatternOption.byDay)
                    return "BYDAY=" + this._recurDayToByDay(monthly.byDay.day);
                else
                    return '';
            }
            case RecurPattern.yearly: {
                if (yearly.option === RecurPatternOption.byDay)
                    return "BYDAY=" + this._recurDayToByDay(yearly.byDay.day);
                else
                    return '';
            }
        }
    }

    private _recurDayToByDay(recurDay: RecurDay): string {
        switch (recurDay) {
            case RecurDay.day: return "SU,MO,TU,WE,TH,FR,SA";
            case RecurDay.weekday: return "MO,TU,WE,TH,FR";
            case RecurDay.weekend: return "SU,SA";
            case RecurDay.sunday: return "SU";
            case RecurDay.monday: return "MO";
            case RecurDay.tuesday: return "TU";
            case RecurDay.wednesday: return "WE";
            case RecurDay.thursday: return "TH";
            case RecurDay.friday: return "FR";
            case RecurDay.saturday: return "SU";
        }
    }

    private _byMonth({ pattern, yearly }: Recurrence): string {
        if (pattern === RecurPattern.yearly)
            return "BYMONTH=" + (yearly.month + 1);
        else
            return '';
    }

    private _byMonthDay({ pattern, monthly, yearly }: Recurrence): string {
        if (pattern === RecurPattern.monthly && monthly.option === RecurPatternOption.byDate)
            return "BYMONTHDAY=" + monthly.byDate.date;
        if (pattern === RecurPattern.yearly && yearly.option === RecurPatternOption.byDate)
            return "BYMONTHDAY=" + yearly.byDate.date;
        else
            return '';
    }

    private _untilCount({ until: { type, count } }: Recurrence): string {
        return type === RecurUntilType.count ? "COUNT=" + count : '';
    }

    private _untilDate({ until: { type, date } }: Recurrence): string {
        return type === RecurUntilType.date ? "UNTIL=" + date.clone().add(1, 'day').format('YYYYMMDD[T]HHmmss') : '';
    }
}