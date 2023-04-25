import { ElementProvisioner } from './ElementProvisioner';
import { IListDefinition } from "./IElementDefinitions";
import { IUpgradeAction } from "./IUpgradeAction";

export abstract class UpdateUserRolesUpgradeAction implements IUpgradeAction {
    constructor(
        private readonly _listDefinition: IListDefinition
    ) { }

    public get description(): string {
        const listTitle = this._listDefinition.title;

        return `Updating security for ${listTitle} list`;
    }

    public async execute(): Promise<void> {
        const provisioner: ElementProvisioner = new ElementProvisioner();
        await provisioner.configurePermissions(this._listDefinition, undefined, true);
    }
}