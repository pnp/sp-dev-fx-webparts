import { Moment } from "moment-timezone";
import { IEvent } from "model";

export interface IViewCommands {
    setAnchorDate: (date: Moment) => void;
    newEvent: (date: Moment) => void;
    activateEvent: (event: IEvent) => void;
}