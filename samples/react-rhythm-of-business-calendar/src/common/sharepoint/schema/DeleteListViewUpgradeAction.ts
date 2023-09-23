import { ElementProvisioner } from './ElementProvisioner';
import { IListDefinition } from "./IElementDefinitions";
import { IUpgradeAction } from "./IUpgradeAction";

export abstract class DeleteListViewUpgradeAction implements IUpgradeAction {
    constructor(
        private readonly _listDefinition: IListDefinition,
        private readonly _viewTitle: string
    ) { }

    public get description(): string {
        const viewName = this._viewTitle;
        const listTitle = this._listDefinition.title;

        return `Deleting view '${viewName}' from list '${listTitle}'`;
    }

    public async execute(): Promise<void> {
        const provisioner: ElementProvisioner = new ElementProvisioner();
        await provisioner.deleteView(this._viewTitle, this._listDefinition);
    }
}