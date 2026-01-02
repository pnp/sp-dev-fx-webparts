export interface ICalFeed {
    lastRetrieved: Date;
    events:        ICalEvent[];
}

export interface ICalEvent {
    uid:             string;
    summary:         string;
    joinUrl:         null | string;
    location:        string;
    startTime:       Date;
    endTime:         Date;
    rrule:           null | string;
    exdate:          Date[];
    recurrenceId:    null | string;
    nextOccurrences: NextOccurrence[];
}

export interface NextOccurrence {
    date:     Date;
    status:   string;
    summary?: string;
    recurrenceId?: string;
}

export enum Status {
    Cancelled = "cancelled",
    Moved = "moved",
    Scheduled = "scheduled",
}
