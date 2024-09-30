import { IROBCalendarUpgrade } from "../IROBCalendarUpgrade";
import { AddTemplateViewColumnToConfigutationList } from "./AddTemplateViewColumnToConfigutationList";
import { UpdateAllConfigurationListView } from "./UpdateAllConfigurationListView";

export const Definition: IROBCalendarUpgrade = {
    fromVersion: 4.0,
    toVersion: 5.0,
    actions: [
        new AddTemplateViewColumnToConfigutationList(),
        new UpdateAllConfigurationListView()],
};