import { Moment, unitOfTime } from "moment-timezone";
import { useTimeZoneService } from "./services";
import moment from "moment";

export class MomentRange {
    public start: Moment;
    public end: Moment;


    public static overlaps = (range1: MomentRange, range2: MomentRange, units: unitOfTime.StartOf = 'minutes'): boolean => {
        const _range1 = moment(range1.start);
        const _range2 = moment(range2.start);

        const timeZone_range1 = _range1.tz();
        const timeZone_range2 = _range2.tz();

        if (timeZone_range1 !== timeZone_range2) {
            return !range1.start.isAfter(range2.end, units) && !range1.end.isBefore(range2.start, units);
        }
        else{
            return !range1.start.isAfter(range2.end, units) && !range1.end.isBefore(range2.start, units);
        }
           
        
    }
}






