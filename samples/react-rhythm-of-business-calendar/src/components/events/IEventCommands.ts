import { IEvent } from "model";

export type EventCommand = (event: IEvent, timeZoneDiff?: any) => void;

//export type ChannelsEventCommand = (event: IEvent,  channelId?: string, groupId?: string, timeZoneDiff?: any) => Promise<string>; 

export interface IEventCommands {
    view: EventCommand;
    approve: EventCommand;
    reject: EventCommand;
    addToOutlook: EventCommand;
    addSeriesToOutlook: EventCommand;
   // sharedEventLink: ChannelsEventCommand;
    getLink: EventCommand;
    configEnableOutlook : boolean;
}