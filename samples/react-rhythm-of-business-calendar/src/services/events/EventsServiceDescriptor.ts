import { IAsyncData } from "common";
import { IService, IServiceDescriptor, DeveloperService, SharePointService, TimeZoneService, DirectoryService, LiveUpdateService, useServices } from "common/services";
import { Approvers, Event, ReadonlyEventMap, Refiner, RefinerValue } from "model";
import { ConfigurationService } from "../configuration";
import { OnlineEventsService } from "./OnlineEventsService";

export const EventsService: unique symbol = Symbol("Events Service");

export interface IEventsService extends IService {
    readonly eventsAsync: IAsyncData<readonly Event[]>;
    eventsById(): Promise<ReadonlyEventMap>;

    readonly refinersAsync: IAsyncData<readonly Refiner[]>;
    readonly refinerValuesAsync: IAsyncData<readonly RefinerValue[]>;

    readonly approversAsync: IAsyncData<readonly Approvers[]>;
    //readonly channelsConfigurationsAsync: IAsyncData<readonly ChannelsConfigurations[]>;

    track(event: Event): void;
    track(refiner: Refiner): void;
    track(refinerValue: RefinerValue): void;
    track(approver: Approvers): void;
   // track(channelsConfiguration: ChannelsConfigurations): void;

    persist(): Promise<void>;

    addToOutlook(event: Event, isDifferenceInTimezoneVal?: boolean): void;

    createEventDeepLink(event: Event): string;
   // sendDetailinPost(event: Event, itemUrl: string, channelId: string, groupId: string): Promise<void>;
    sendNotification_EventApproved(chatId: { chat_Id: string, rxUser: any }[], event: any, itemUrl: string): any;
    sendNotification_EventRejected(chatId: { chat_Id: string, rxUser: any }[], event: any, itemUrl: string): any;
    getTeamsNameById(teamsId: string): Promise<string>;
    getActualChannelNameById(teamsId: string, channelId: string): Promise<string>;
}

export type EventsServiceProp = {
    [EventsService]: IEventsService;
};

export const useEventsService = () => useServices<EventsServiceProp>()[EventsService];

export const EventsServiceDescriptor: IServiceDescriptor<typeof EventsService, IEventsService, EventsServiceProp> = {
    symbol: EventsService,
    dependencies: [DeveloperService, TimeZoneService, LiveUpdateService, DirectoryService, SharePointService, ConfigurationService],
    online: OnlineEventsService
};