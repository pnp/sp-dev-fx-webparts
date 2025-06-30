import { ElementProvisioner } from "common/sharepoint";
import { IROBCalendarUpgradeAction } from "../IROBCalendarUpgradeAction";
import {ConfigurationList,Field_FiscalYearStartYear,Field_UseApprovalsEmailNotification, Field_UseApprovalsTeamsNotification} from "./schemaSnapshot/index";

export class AddFYStartYearColumnToConfigutationList
    implements IROBCalendarUpgradeAction
{
    public get description(): string {
        return `Adding fields to list '${ConfigurationList.title}'`;
    }

    public async execute(): Promise<void> {
        const provisioner: ElementProvisioner = new ElementProvisioner();
        await provisioner.ensureField(Field_FiscalYearStartYear, ConfigurationList);
        await provisioner.ensureField(Field_UseApprovalsEmailNotification, ConfigurationList);
        await provisioner.ensureField(Field_UseApprovalsTeamsNotification, ConfigurationList);
    }
}
