import { Comparer, momentAscComparer } from "common";
import { Moment } from "moment-timezone";
import { IEvent } from "./IEvent";
import { Event } from "./Event";

export class EventOccurrence implements IEvent {
    public static readonly StartAscComparer: Comparer<EventOccurrence> = (a, b) => momentAscComparer(a.start, b.start);

    constructor(
        public readonly event: Event,
        public readonly start: Moment = event.start.clone(),
        public readonly end: Moment = event.end.clone()
    ) {
    }

    public get displayName() { return this.event.displayName; }
    public get title() { return this.event.title; }
    public get isAllDay() { return this.event.isAllDay; }
    public get location() { return this.event.location; }
    public get color() { return this.event.color; }
    public get tag() { return this.event.tag; }
    public get recurrence() { return this.event.recurrence; }
    public get isPendingApproval() { return this.event.isPendingApproval; }
    public get isApproved() { return this.event.isApproved; }
    public get isRejected() { return this.event.isRejected; }
    public get isRecurring() { return this.event.isRecurring; }
    public get isSeriesMaster() { return false; } // an event occurrence is never the series master
    public get isSeriesException() { return this.event.isRecurring; } // an event occurrence is always an exception if the event is recurring
    public get isConfidential() { return this.event.isConfidential; }
    public get refinerValues() { return this.event.refinerValues; }

    public getWrappedEvent(): Event {
        return this.event;
    }

    public getSeriesMaster(): Event {
        return this.event.getSeriesMaster();
    }

    public getExceptionOrEvent(): Event {
        if (this.event.isSeriesMaster) {
            return this.event.createSeriesException(this.start, this.end);
        } else {
            return this.event;
        }
    }
}