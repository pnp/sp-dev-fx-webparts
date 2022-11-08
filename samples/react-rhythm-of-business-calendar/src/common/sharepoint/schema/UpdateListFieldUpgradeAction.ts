import { ElementProvisioner } from './ElementProvisioner';
import { IListDefinition, IFieldDefinition } from "./IElementDefinitions";
import { IUpgradeAction } from "./IUpgradeAction";

export abstract class UpdateListFieldUpgradeAction implements IUpgradeAction {
    constructor(
        private readonly _listDefinition: IListDefinition,
        private readonly _fieldDefinition: IFieldDefinition
    ) { }

    public get description(): string {
        const fieldName = this._fieldDefinition.displayName || this._fieldDefinition.name;
        const listTitle = this._listDefinition.title;

        return `Updating field '${fieldName}' on list '${listTitle}'`;
    }

    public async execute(): Promise<void> {
        const provisioner: ElementProvisioner = new ElementProvisioner();
        await provisioner.updateField(this._fieldDefinition, this._listDefinition);
    }
}