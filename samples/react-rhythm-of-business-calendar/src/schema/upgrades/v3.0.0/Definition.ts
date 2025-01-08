import { IROBCalendarUpgrade } from "../IROBCalendarUpgrade";
//import { UpdateAllChannelsConfigurationsListView } from "./UpdateAllChannelsConfigurationsListView";
import { UpdateAllEventsListView } from "./UpdateAllEventsListView";
//import { CreateChannelsConfigurationsListAction } from "./CreateChannelsConfigurationsListAction";
import { AddTeamsGroupChatIdToEventsList } from "./AddTeamsGroupChatIdToEventsList";
import { AddEnableOutlookColumnToConfigutationList } from "./AddEnableOutlookColumnToConfigutationList";
import { UpdateAllConfigurationListView } from "./UpdateAllConfigurationListView";

export const Definition: IROBCalendarUpgrade = {
    fromVersion: 2.0,
    toVersion: 3.0,
    actions: [
       // new CreateChannelsConfigurationsListAction(),
       // new UpdateAllChannelsConfigurationsListView(),
        new AddTeamsGroupChatIdToEventsList(),
        new UpdateAllEventsListView(),
        new AddEnableOutlookColumnToConfigutationList(),
        new UpdateAllConfigurationListView()],
};