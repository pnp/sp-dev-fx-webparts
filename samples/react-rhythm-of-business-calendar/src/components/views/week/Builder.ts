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

export class Builder {
    public static dateRange(anchorDate: Moment): MomentRange {
        const start = anchorDate.clone().startOf('week');
        const end = anchorDate.clone().endOf('week');
        return { start, end };
    }

    public static build(cccurrences: readonly EventOccurrence[], anchorDate: Moment): ContentRowInfo[] {
        const contentRows: ContentRowInfo[] = [];

        const { start, end } = Builder.dateRange(anchorDate);

        const sortedEventOccurrences = [...cccurrences].sort(EventOccurrence.StartAscComparer);

        for (const cccurrence of sortedEventOccurrences) {
            let availableRow = contentRows.find(row => row.canInclude(cccurrence));

            if (!availableRow) {
                availableRow = new ContentRowInfo(start, end);
                contentRows.push(availableRow);
            }

            availableRow.include(cccurrence);
        }

        return contentRows;
    }
}