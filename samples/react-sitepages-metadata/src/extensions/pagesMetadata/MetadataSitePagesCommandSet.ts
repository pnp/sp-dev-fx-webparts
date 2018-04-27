import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'MetadataSitePagesCommandSetStrings';
import FillMetadataDialog from './FillMetadataDialog';

const LOG_SOURCE: string = 'MetadataSitePagesCommandSet';

export default class MetadataSitePagesCommandSet extends BaseListViewCommandSet<{}> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized MetadataSitePagesCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const fillMetadataCommand: Command = this.tryGetCommand('FILL_METADATA');
    if (fillMetadataCommand) {
      // This command should be hidden unless exactly one row is selected.
      fillMetadataCommand.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'FILL_METADATA':
        const dialog: FillMetadataDialog = new FillMetadataDialog();
        dialog.webUrl = this.context.pageContext.web.absoluteUrl;
        dialog.itemId = parseInt(event.selectedRows[0].getValueByName("ID"));
        dialog.show().then(() => {
          
          // console.log('after dialog close');
        });
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
