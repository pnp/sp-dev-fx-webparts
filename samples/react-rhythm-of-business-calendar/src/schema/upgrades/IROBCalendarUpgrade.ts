import { IUpgrade } from "common/sharepoint";
import {IROBCalendarUpgradeAction} from "./IROBCalendarUpgradeAction";

export interface IROBCalendarUpgrade extends IUpgrade{
    actions:IROBCalendarUpgradeAction[];
}