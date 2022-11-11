import { sumBy } from "lodash";
import { Moment } from "moment-timezone";
import { MomentRange } from "common";
import { EventOccurrence } from 'model';

export class ItemInfo {
    constructor(
        public readonly duration: number,
    ) {
    }
}

export class ShimItemInfo extends ItemInfo {
}

export class EventItemInfo extends ItemInfo {
    constructor(
        duration: number,
        public readonly startsInWeek: boolean,
        public readonly endsInWeek: boolean,
        public readonly cccurrence: EventOccurrence
    ) {
        super(duration);
    }

    public get title() { return this.cccurrence.title; }
    public get start() { return this.cccurrence.start; }
    public get isAllDay() { return this.cccurrence.isAllDay; }
    public get isPendingApproval() { return this.cccurrence.isPendingApproval; }
    public get isRejected() { return this.cccurrence.isRejected; }
    public get tag() { return this.cccurrence.tag; }
    public get color() { return this.cccurrence.color; }
    public get isRecurring() { return this.cccurrence.isRecurring; }
    public get isConfidential() { return this.cccurrence.isConfidential; }
}

export class ContentRowInfo {
    public readonly items: ItemInfo[];

    constructor(
        private readonly _startDate: Moment,
        private readonly _endDate: Moment
    ) {

        this.items = [];
    }

    public canInclude(cccurrence: EventOccurrence): boolean {
        const startsInWeek = cccurrence.start.isSameOrAfter(this._startDate);
        const startPosition = startsInWeek ? cccurrence.start.day() : 0;
        return this.lastUsedPosition() <= startPosition;
    }

    public include(cccurrence: EventOccurrence) {
        const { start, end } = cccurrence;
        const startsInWeek = start.isSameOrAfter(this._startDate);
        const endsInWeek = end.isSameOrBefore(this._endDate);
        const startPosition = startsInWeek ? start.day() : 0;
        const endPosition = endsInWeek ? end.day() + 1 : 7;
        const duration = endPosition - startPosition;

        const shimDuration = startPosition - this.lastUsedPosition();
        if (shimDuration > 0) {
            this.items.push(new ShimItemInfo(shimDuration));
        }

        const item = new EventItemInfo(duration, startsInWeek, endsInWeek, cccurrence);
        this.items.push(item);
    }

    private lastUsedPosition(): number {
        return sumBy(this.items, item => item.duration);
    }
}

export class WeekInfo {
    public readonly contentRows: ContentRowInfo[] = [];

    constructor(
        public readonly start: Moment,
        public readonly end: Moment
    ) {
    }

    public include(cccurrence: EventOccurrence) {
        if (MomentRange.overlaps(cccurrence, this)) {
            let availableRow = this.contentRows.find(row => row.canInclude(cccurrence));

            if (!availableRow) {
                availableRow = new ContentRowInfo(this.start, this.end);
                this.contentRows.push(availableRow);
            }

            availableRow.include(cccurrence);
        }
    }
}

export class Builder {
    public static dateRange(anchorDate: Moment): MomentRange {
        const start = anchorDate.clone().startOf('month').startOf('week');
        const end = anchorDate.clone().endOf('month').endOf('week');
        return { start, end };
    }

    public static build(cccurrences: readonly EventOccurrence[], anchorDate: Moment): WeekInfo[] {
        const weeks = this._createWeeks(anchorDate);
        this._fillWeeksWithEvents(weeks, cccurrences);
        return weeks;
    }

    private static _createWeeks(anchorDate: Moment): WeekInfo[] {
        const weeks: WeekInfo[] = [];

        const { start, end } = Builder.dateRange(anchorDate);
        const date = start;

        do {
            const weekStart = date.clone();
            const weekEnd = date.clone().endOf('week');
            weeks.push(new WeekInfo(weekStart, weekEnd));
            date.add(1, 'week');
        } while (date.isBefore(end));

        return weeks;
    }

    private static _fillWeeksWithEvents(weeks: WeekInfo[], cccurrences: readonly EventOccurrence[]) {
        const sortedEventOccurrences = [...cccurrences].sort(EventOccurrence.StartAscComparer);
        for (const week of weeks) {
            sortedEventOccurrences.forEach(occurrence => week.include(occurrence));
        }
    }
}