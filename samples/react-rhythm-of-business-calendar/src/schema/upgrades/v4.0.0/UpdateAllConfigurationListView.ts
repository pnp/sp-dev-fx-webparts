import { AddOrUpdateViewUpgradeAction } from "common/sharepoint";
import { IROBCalendarUpgradeAction } from "../IROBCalendarUpgradeAction";
import {ConfigurationList, View_AllItems} from "./schemaSnapshot/index";

export class UpdateAllConfigurationListView extends AddOrUpdateViewUpgradeAction implements IROBCalendarUpgradeAction {
    public readonly shared: boolean = false;

    constructor() {
        super(ConfigurationList, View_AllItems);
    }

}



