import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
//import { RowAccessor} from '@microsoft/sp-listview-extensibility';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';
import { setup as pnpSetup } from "@pnp/common";
import { sp } from "@pnp/sp";

import * as strings from 'ItemHistoryCommandSetStrings';
import ItemHistoryDialog from "./ItemHistory";
import { find } from "lodash";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IItemHistoryCommandSetProperties {
  // This is an example; replace with your own properties

}

const LOG_SOURCE: string = 'ItemHistoryCommandSet';

export default class ItemHistoryCommandSet extends BaseListViewCommandSet<IItemHistoryCommandSetProperties> {
  public fields: Array<string>;
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized ItemHistoryCommandSet');
    pnpSetup({
      spfxContext: this.context
    });
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = event.selectedRows.length === 1;
    }
  }
  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_ViewHistory':
        const dialog: ItemHistoryDialog = new ItemHistoryDialog();
        dialog.itemId = event.selectedRows[0].getValueByName("ID");
        dialog.listId = this.context.pageContext.list.id.toString();
        dialog.viewId = this.context.pageContext.legacyPageContext.viewId;
        dialog.show()
          .then(() => {
            debugger;
          })
          .catch((e) => {
            debugger;
          });
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
