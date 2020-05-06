import { IGroup } from "./interface/IGroup";

export interface IMySubscriptionState {
   groups:IGroup[];
   showMessageBar:boolean;
   message:string;
   messageBarType:string;
   isdataLoaded:boolean;
   isdataLoadedMessage:string;
}