import { ElementProvisioner } from './ElementProvisioner';
import { IListDefinition } from "./IElementDefinitions";
import { IUpgradeAction } from "./IUpgradeAction";

export abstract class CreateListUpgradeAction implements IUpgradeAction {
    constructor(
        private readonly _listDefinition: IListDefinition
    ) { }

    public get description(): string {
        return `Creating list '${this._listDefinition.title}'`;
    }

    public async execute(): Promise<void> {
        const provisioner: ElementProvisioner = new ElementProvisioner();
        await provisioner.ensureList(this._listDefinition);
    }
}