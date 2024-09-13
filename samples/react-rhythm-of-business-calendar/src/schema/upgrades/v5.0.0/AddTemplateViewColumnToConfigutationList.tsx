import { ElementProvisioner } from "common/sharepoint";
import { IROBCalendarUpgradeAction } from "../IROBCalendarUpgradeAction";
import {ConfigurationList, Field_TemplateView} from "./schemaSnapshot/index";

export class AddTemplateViewColumnToConfigutationList
    implements IROBCalendarUpgradeAction
{
    public get description(): string {
        return `Adding fields to list '${ConfigurationList.title}'`;
    }

    public async execute(): Promise<void> {
        const provisioner: ElementProvisioner = new ElementProvisioner();
        await provisioner.ensureField(Field_TemplateView, ConfigurationList);
    }
}
