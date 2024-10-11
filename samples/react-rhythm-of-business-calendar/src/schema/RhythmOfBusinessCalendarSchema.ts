import { IElementDefinitions, IListDefinition, buildLiveSchema } from "common/sharepoint";
import { ConfigurationList, IEventsListDefinition, EventsList, RefinersList, RefinerValuesList, ApproversList, IRefinersListDefinition, IRefinerValuesListDefinition, IApproversListDefinition } from "./lists";
import { IROBCalendarUpgrade, Upgrade_to_V5_0_0, Upgrade_to_V4_0_0, Upgrade_to_V3_0_0, Upgrade_to_V2_0_0 } from "./upgrades";

export const CurrentSchemaVersion: number = 5.0;

export interface IRhythmOfBusinessCalendarSchema extends IElementDefinitions {
    configurationList: IListDefinition;
    eventsList: IEventsListDefinition;
    refinersList: IRefinersListDefinition;
    refinerValuesList: IRefinerValuesListDefinition;
    approversList: IApproversListDefinition;
   // channelsConfigurationsList:IChannelsConfigurationsListDefinition;
    upgrades?: IROBCalendarUpgrade[];
}

export const RhythmOfBusinessCalendarSchema = buildLiveSchema<IRhythmOfBusinessCalendarSchema>({
    version: CurrentSchemaVersion,
    lists: [
        ConfigurationList,
        EventsList,
        RefinersList,
        RefinerValuesList,
        ApproversList
      //  ChannelsConfigurationsList
    ],
    upgrades: [Upgrade_to_V2_0_0, Upgrade_to_V3_0_0, Upgrade_to_V4_0_0, Upgrade_to_V5_0_0],
    configurationList: ConfigurationList,
    eventsList: EventsList,
    refinersList: RefinersList,
    refinerValuesList: RefinerValuesList,
    approversList: ApproversList
    //channelsConfigurationsList: ChannelsConfigurationsList
});