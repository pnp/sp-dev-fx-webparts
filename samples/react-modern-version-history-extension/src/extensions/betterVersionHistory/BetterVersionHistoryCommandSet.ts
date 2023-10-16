import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetExecuteEventParameters,
  ListViewStateChangedEventArgs
} from '@microsoft/sp-listview-extensibility';
import { BetterVersionHistory, IBetterVersionHistoryProps } from './components/BetterVersionHistory';
import DialogWrapper from './components/DialogWrapper';
import * as React from 'react';
import { getThemeColor } from './themeHelper';
import { DataProvider } from './providers/DataProvider';
import { SPFxContext } from './contexts/SPFxContext';

export interface IBetterVersionHistoryCommandSetProperties { }

const LOG_SOURCE: string = 'BetterVersionHistoryCommandSet';

export default class BetterVersionHistoryCommandSet extends BaseListViewCommandSet<IBetterVersionHistoryCommandSetProperties> {

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized BetterVersionHistoryCommandSet');

    // initial state of the command's visibility
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    compareOneCommand.visible = false;

    const fillColor = getThemeColor("themeDarkAlt").replace('#', '%23');
    const exportSvg = `data:image/svg+xml,%3Csvg xmlns%3D'http%3A//www.w3.org/2000/svg' viewBox='0 0 2048 2048'%3E%3Cpath d='M896 512h128v512H896V512zM512 768H0V256h128v274q67-123 163-221t212-166T752 37t272-37q141 0 272 36t245 103 207 160 160 208 103 245 37 272h-128q0-123-32-237t-90-214-141-182-181-140-214-91-238-32q-129 0-251 36T546 267 355 428 215 640h297v128zm512 384h1024v128H1024v-128zm0 384h1024v128H1024v-128zm0 384h1024v128H1024v-128zm-863-657q36 129 105 239t166 194 214 140 250 74v130q-154-21-292-83t-250-158-193-224-123-278l123-34z' fill='${fillColor}'%3E%3C/path%3E%3C/svg%3E`;
    compareOneCommand.iconImageUrl = exportSvg;

    this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);

    return Promise.resolve();
  }

  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_1': {
        const element = React.createElement(BetterVersionHistory, { provider: new DataProvider(this.context) } as IBetterVersionHistoryProps);
        const context = React.createElement(SPFxContext.Provider, { value: { context: this.context } }, element);
        const wrapper = new DialogWrapper(context);
        wrapper.show().catch(er => alert(er));
        break;
      }
      default:
        throw new Error('Unknown command');
    }
  }

  private _onListViewStateChanged = (args: ListViewStateChangedEventArgs): void => {
    Log.info(LOG_SOURCE, 'List view state changed');

    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = this.context.listView.selectedRows?.length === 1;
    }

    this.raiseOnChange();
  }
}
