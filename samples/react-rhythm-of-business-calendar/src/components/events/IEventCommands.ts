import { IEvent } from "model";

export type EventCommand = (event: IEvent) => void;

export interface IEventCommands {
    view: EventCommand;
    approve: EventCommand;
    reject: EventCommand;
    addToOutlook: EventCommand;
    addSeriesToOutlook: EventCommand;
    getLink: EventCommand;
}