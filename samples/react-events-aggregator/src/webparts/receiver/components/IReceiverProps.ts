import { IEventAggregator } from "@microsoft/sp-webpart-base/lib";

export interface IReceiverProps {
    eventAggregator: IEventAggregator;
    subscriberId: string;
}
