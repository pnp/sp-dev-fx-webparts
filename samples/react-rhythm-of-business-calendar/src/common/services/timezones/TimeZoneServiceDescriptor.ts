import { IWeb } from "@pnp/sp/webs/types";
import { IService } from "../IService";
import { IServiceDescriptor } from "../IServiceDescriptor";
import { useServices } from "../withServices";
import { OnlineTimeZoneService } from "./OnlineTimeZoneService";

export const TimeZoneService: unique symbol = Symbol("Time Zone Service");

export interface ITimeZone {
    readonly id: number;
    readonly description: string;
    readonly hasMomentMapping: boolean;
    readonly momentId: string;
}

export interface ITimeZoneService extends IService {
    readonly timeZones: ITimeZone[];
    readonly siteTimeZone: ITimeZone;
    readonly localTimeZone: ITimeZone;
    timeZoneFromId(id: number): ITimeZone;
    timeZoneForWeb(web?: IWeb): Promise<ITimeZone>;
}

export type TimeZoneServiceProp = {
    [TimeZoneService]: ITimeZoneService;
};

export const useTimeZoneService = () => useServices<TimeZoneServiceProp>()[TimeZoneService];

export const TimeZoneServiceDescriptor: IServiceDescriptor<typeof TimeZoneService, ITimeZoneService, TimeZoneServiceProp> = {
    symbol: TimeZoneService,
    dependencies: [],
    online: OnlineTimeZoneService
};