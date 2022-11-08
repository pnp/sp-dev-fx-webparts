import { IElementDefinitions, IListDefinition, buildLiveSchema } from "common/sharepoint";
import { ConfigurationList, IEventsListDefinition, EventsList, RefinersList, RefinerValuesList, ApproversList, IRefinersListDefinition, IRefinerValuesListDefinition, IApproversListDefinition } from "./lists";

export const CurrentSchemaVersion: number = 1.0;

export interface IRhythmOfBusinessCalendarSchema extends IElementDefinitions {
    configurationList: IListDefinition;
    eventsList: IEventsListDefinition;
    refinersList: IRefinersListDefinition;
    refinerValuesList: IRefinerValuesListDefinition;
    approversList: IApproversListDefinition;
}

export const RhythmOfBusinessCalendarSchema = buildLiveSchema<IRhythmOfBusinessCalendarSchema>({
    version: CurrentSchemaVersion,
    lists: [
        ConfigurationList,
        EventsList,
        RefinersList,
        RefinerValuesList,
        ApproversList
    ],
    upgrades: [
    ],
    configurationList: ConfigurationList,
    eventsList: EventsList,
    refinersList: RefinersList,
    refinerValuesList: RefinerValuesList,
    approversList: ApproversList
});