import { Log } from '@microsoft/sp-core-library';
import { BaseListViewCommandSet, IListViewCommandSetExecuteEventParameters } from '@microsoft/sp-listview-extensibility';
import { IDefaults } from '../../shared/interfaces';
import CopyViewsDialog from './CopyViewsDialog';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICopyViewsCommandSetProperties {
  resultSourceId?: string;
}

const LOG_SOURCE: string = 'CopyViewsCommandSet';

export default class CopyViewsCommandSet extends BaseListViewCommandSet<ICopyViewsCommandSetProperties> {

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized CopyViewsCommandSet');

    return Promise.resolve();
  }

  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    const defaultValues = {
      viewId: this.context.listView.view.id.toString(),
      listId: this.context.listView.list.guid.toString(),
      siteUrl: this.context.pageContext.site.absoluteUrl
    } as IDefaults;

    const dialog = new CopyViewsDialog(this.context.serviceScope, defaultValues, this.properties.resultSourceId);
    
    switch (event.itemId) {
      case 'COPYVIEWS':
        dialog.show().then(() => {

          // 

        }, (error: Error) => {
          if (console && console.error && error) {
            console.error(error);
          }
        }); 
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}