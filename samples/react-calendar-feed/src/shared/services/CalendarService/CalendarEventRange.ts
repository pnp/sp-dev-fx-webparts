import * as moment from "moment";

export enum DateRange {
    OneWeek,
    TwoWeeks,
    Month,
    Quarter,
    Year,
}

export class CalendarEventRange {
    public Start: Date;
    public End: Date;
    public DateRange: DateRange;

    constructor(range: DateRange) {
        this.Start = moment().toDate();
        this.DateRange = range;
        this.End = this._getRangeEnd();
    }

    private _getRangeEnd(): Date {

        let end: moment.Moment;

        // add the appropriate number of days
        switch (this.DateRange) {
            case DateRange.OneWeek:
                end = moment().add(1, "weeks");
                break;
            case DateRange.TwoWeeks:
                end = moment().add(2, "weeks");
                break;
            case DateRange.Month:
                end = moment().add(1, "months");
                break;
            case DateRange.Quarter:
                end = moment().add(1, "quarters");
                break;
            default:
                // is there a max date option in Moment? i couldn't find it
                // instead, let's get events for the next year
                end = moment().add(1, "years");
                break;
        }

        return end.toDate();
    }

}
