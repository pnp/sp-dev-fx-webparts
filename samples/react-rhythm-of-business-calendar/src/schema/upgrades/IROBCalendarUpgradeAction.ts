import { IUpgradeAction } from "common/sharepoint";
export interface IROBCalendarUpgradeAction extends IUpgradeAction{
   readonly shared?: boolean;
   execute() : Promise<void>;

}