import { ITimelineActivity } from "../../../models";

export interface ITimelineState {
    timelineActivities: ITimelineActivity[];
    isloading: boolean;
}