import { AddOrUpdateViewUpgradeAction } from "common/sharepoint";
import { IROBCalendarUpgradeAction } from "../IROBCalendarUpgradeAction";
import {EventsList, View_AllEvents } from "./schemaSnapshot/index";

export class UpdateAllEventsListView extends AddOrUpdateViewUpgradeAction implements IROBCalendarUpgradeAction {
    public readonly shared: boolean = false;

    constructor() {
        super(EventsList, View_AllEvents);
    }

}