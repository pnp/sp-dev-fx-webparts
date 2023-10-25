import { Moment, unitOfTime } from "moment-timezone";

export class MomentRange {
    public start: Moment;
    public end: Moment;

    public static overlaps = (range1: MomentRange, range2: MomentRange, units: unitOfTime.StartOf = 'day'): boolean =>
        !range1.start.isAfter(range2.end) && !range1.end.isBefore(range2.start, units)
}