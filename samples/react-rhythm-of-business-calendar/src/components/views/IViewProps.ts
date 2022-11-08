import { EventOccurrence, Refiner, RefinerValue } from "model";
import { Moment } from "moment-timezone";
import { IEventCommands } from "../events/IEventCommands";
import { IViewCommands } from "./IViewCommands";

export interface IViewProps {
    anchorDate: Moment;
    cccurrences: readonly EventOccurrence[];
    refiners: readonly Refiner[];
    selectedRefinerValues: Set<RefinerValue>;
    eventCommands: IEventCommands;
    viewCommands: IViewCommands;
}