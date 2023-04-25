import { Moment } from "moment-timezone";
import { Entity, mapGetOrAdd, MomentRange, multifilter } from "common";
import { Event, EventOccurrence, IEvent, Refiner, RefinerValue } from "model";
import { Configuration } from "schema";
import { getFiscalQuarter } from "./Utils";

import { Refiner as strings } from "ComponentStrings";

export class EventItemInfo {
    constructor(
        public readonly startsInMonth: boolean,
        public readonly endsInMonth: boolean,
        public readonly event: IEvent
    ) {
    }

    public get title() { return this.event.title; }
    public get isPendingApproval() { return this.event.isPendingApproval; }
    public get isRejected() { return this.event.isRejected; }
    public get tag() { return this.event.tag; }
    public get color() { return this.event.color; }
    public get isRecurring() { return this.event.isRecurring; }
    public get isConfidential() { return this.event.isConfidential; }
}

export class RefinerValueInfo {
    public readonly itemsByEvent = new Map<Event, EventItemInfo[]>();

    constructor(
        public readonly title: string,
        private readonly _startDate: Moment,
        private readonly _endDate: Moment
    ) {
    }

    public get eventCount() {
        return this.itemsByEvent.size;
    }

    public include(event: IEvent) {
        const { start, end } = event;
        const startsInMonth = start.isSameOrAfter(this._startDate);
        const endsInMonth = end.isSameOrBefore(this._endDate);

        const item = new EventItemInfo(startsInMonth, endsInMonth, event);
        const items = mapGetOrAdd(this.itemsByEvent, event.getWrappedEvent(), () => []);
        items.push(item);
    }
}

export class MonthInfo {
    public readonly blankValue: RefinerValueInfo;
    public readonly refinerValues: Map<RefinerValue, RefinerValueInfo>;

    constructor(
        public readonly start: Moment,
        public readonly end: Moment,
        public readonly refiner: Refiner | undefined
    ) {
        this.blankValue = new RefinerValueInfo(strings.Blank, start, end);
        this.refinerValues = new Map<RefinerValue, RefinerValueInfo>();

        if (refiner) {
            refiner.values.filter(Entity.NotDeletedFilter).forEach(value => this.refinerValues.set(value, new RefinerValueInfo(value.displayName, start, end)));
        }
    }

    public include(event: IEvent) {
        if (MomentRange.overlaps(event, this)) {
            const refinerValues = multifilter(event.refinerValues.get(), Entity.NotDeletedFilter, rv => rv.refiner.get() === this.refiner);
            if (refinerValues.length === 0) {
                this.blankValue.include(event);
            } else {
                for (const value of refinerValues) {
                    const info = this.refinerValues.get(value);
                    info.include(event);
                }
            }
        }
    }
}

export class Builder {
    public static dateRange(anchorDate: Moment, { fiscalYearSartMonth }: Configuration): MomentRange {
        const qtr = getFiscalQuarter(anchorDate, fiscalYearSartMonth);
        const testPreviousMonths = [0, 1, 2].map(n => anchorDate.clone().subtract(n, 'months')).map(d => getFiscalQuarter(d, fiscalYearSartMonth));
        const testUpcomingMonths = [0, 1, 2].map(n => anchorDate.clone().add(n, 'months')).map(d => getFiscalQuarter(d, fiscalYearSartMonth));
        const startMonthOffset = testPreviousMonths.lastIndexOf(qtr);
        const endMonthOffset = testUpcomingMonths.lastIndexOf(qtr);

        return {
            start: anchorDate.clone().subtract(startMonthOffset, 'months').startOf('month'),
            end: anchorDate.clone().add(endMonthOffset, 'months').endOf('month')
        };
    }

    public static build(cccurrences: readonly EventOccurrence[], anchorDate: Moment, groupByRefiner: Refiner | undefined, config: Configuration): MonthInfo[] {
        const range = Builder.dateRange(anchorDate, config);
        const weeks = this._createMonths(range, groupByRefiner);
        this._fillMonthsWithEvents(weeks, cccurrences);
        return weeks;
    }

    private static _createMonths({ start, end }: MomentRange, groupByRefiner: Refiner | undefined): MonthInfo[] {
        const months: MonthInfo[] = [];
        const date = start;

        do {
            const monthStart = date.clone();
            const monthEnd = date.clone().endOf('month');
            months.push(new MonthInfo(monthStart, monthEnd, groupByRefiner));
            date.add(1, 'month');
        } while (date.isBefore(end));

        return months;
    }

    private static _fillMonthsWithEvents(months: MonthInfo[], cccurrences: readonly EventOccurrence[]) {
        const sortedEventOccurrences = [...cccurrences].sort(EventOccurrence.StartAscComparer);
        for (const month of months) {
            sortedEventOccurrences.forEach(cccurrence => month.include(cccurrence));
        }
    }
}