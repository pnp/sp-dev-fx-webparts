import { ElementProvisioner } from './ElementProvisioner';
import { IListDefinition, IViewDefinition } from "./IElementDefinitions";
import { IUpgradeAction } from "./IUpgradeAction";

export abstract class AddOrUpdateViewUpgradeAction implements IUpgradeAction {
    constructor(
        private readonly _listDefinition: IListDefinition,
        private readonly _viewDefinition: IViewDefinition
    ) { }

    public get description(): string {
        const viewTitle = this._viewDefinition.title;
        const listTitle = this._listDefinition.title;

        return `Updating view '${viewTitle}' on list '${listTitle}'`;
    }

    public async execute(): Promise<void> {
        const provisioner: ElementProvisioner = new ElementProvisioner();
        await provisioner.addOrUpdateView(this._viewDefinition, this._listDefinition);
    }
}