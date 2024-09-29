import { ElementProvisioner } from "common/sharepoint";
import { IROBCalendarUpgradeAction } from "../IROBCalendarUpgradeAction";
import {EventsList, Field_TeamsGroupChatId} from "./schemaSnapshot/index";

export class AddTeamsGroupChatIdToEventsList
    implements IROBCalendarUpgradeAction
{
    public get description(): string {
        return `Adding fields to list '${EventsList.title}'`;
    }

    public async execute(): Promise<void> {
        const provisioner: ElementProvisioner = new ElementProvisioner();
        await provisioner.ensureField(Field_TeamsGroupChatId, EventsList);        
    }
}