import { IROBCalendarUpgrade } from "../IROBCalendarUpgrade";
import { AddListViewColumnToConfigutationList } from "./AddListViewColumnToConfigutationList";
import { UpdateAllConfigurationListView } from "./UpdateAllConfigurationListView";

export const Definition: IROBCalendarUpgrade = {
    fromVersion: 3.0,
    toVersion: 4.0,
    actions: [
        new AddListViewColumnToConfigutationList(),
        new UpdateAllConfigurationListView()],
};