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
    siteTimeZone?: string;
    selectedKeys?: string[];
    selectedTemplateKeys?: string[];
    onStateChange?: (stateVariable: any) => void;

  //  channels: readonly ChannelsConfigurations[];
}