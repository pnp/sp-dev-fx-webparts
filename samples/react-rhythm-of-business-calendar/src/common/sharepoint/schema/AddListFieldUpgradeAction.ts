import { ElementProvisioner } from './ElementProvisioner';
import { IListDefinition, IFieldDefinition } from "./IElementDefinitions";
import { IUpgradeAction } from "./IUpgradeAction";

export abstract class AddListFieldUpgradeAction implements IUpgradeAction {
    constructor(
        private readonly _listDefinition: IListDefinition,
        private readonly _fieldDefinition: IFieldDefinition
    ) { }

    public get description(): string {
        const fieldName = this._fieldDefinition.displayName || this._fieldDefinition.name;
        const listTitle = this._listDefinition.title;

        return `Adding field '${fieldName}' to list '${listTitle}'`;
    }

    public async execute(): Promise<void> {
        const provisioner: ElementProvisioner = new ElementProvisioner();
        await provisioner.ensureField(this._fieldDefinition, this._listDefinition);
    }
}