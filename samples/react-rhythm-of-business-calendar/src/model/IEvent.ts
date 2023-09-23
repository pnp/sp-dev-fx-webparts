import { Moment } from "moment-timezone";
import { Color, IManyToManyRelationship } from "common";
import { Event, Recurrence, RefinerValue } from "model";

export interface IEvent {
    readonly displayName: string;
    readonly title: string;
    readonly start: Moment;
    readonly end: Moment;
    readonly isAllDay: boolean;
    readonly location: string;
    readonly color: Color;
    readonly tag: string;
    readonly recurrence: Recurrence;
    readonly isPendingApproval: boolean;
    readonly isApproved: boolean;
    readonly isRejected: boolean;
    readonly isRecurring: boolean;
    readonly isSeriesMaster: boolean;
    readonly isSeriesException: boolean;
    readonly isConfidential: boolean;
    readonly refinerValues: IManyToManyRelationship<RefinerValue>;
    getWrappedEvent(): Event;
    getSeriesMaster(): Event;
    getExceptionOrEvent(): Event;
}