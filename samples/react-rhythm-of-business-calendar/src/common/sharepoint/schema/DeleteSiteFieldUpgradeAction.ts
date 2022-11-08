import { ElementProvisioner } from './ElementProvisioner';
import { IFieldDefinition } from "./IElementDefinitions";
import { IUpgradeAction } from "./IUpgradeAction";

export abstract class DeleteSiteFieldUpgradeAction implements IUpgradeAction {
    constructor(
        private readonly _fieldDefinition: IFieldDefinition
    ) { }

    public get description(): string {
        const fieldName = this._fieldDefinition.displayName || this._fieldDefinition.name;

        return `Deleting field '${fieldName}' from site`;
    }

    public async execute(): Promise<void> {
        const provisioner: ElementProvisioner = new ElementProvisioner();
        await provisioner.deleteSiteField(this._fieldDefinition);
    }
}