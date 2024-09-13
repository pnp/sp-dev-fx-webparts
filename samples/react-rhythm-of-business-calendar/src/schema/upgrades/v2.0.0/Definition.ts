import { IROBCalendarUpgrade } from "../IROBCalendarUpgrade";
import { AddFYStartYearColumnToConfigutationList } from "./AddFYStartYearColumnToConfigutationList";
import { UpdateAllConfigurationListView } from "./UpdateAllConfigurationListView";
export const Definition: IROBCalendarUpgrade = {
    fromVersion: 1.0,
    toVersion: 2.0,
    actions: [new AddFYStartYearColumnToConfigutationList(),
        new UpdateAllConfigurationListView(),],
};
