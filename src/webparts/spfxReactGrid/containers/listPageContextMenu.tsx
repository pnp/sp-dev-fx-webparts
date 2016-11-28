import * as React from "react";
import * as ReactDataGrid from "react-data-grid";
import * as ReactDataGridPlugins from "react-data-grid/addons";
export class ListPageContextMenuProps implements React.Props<any> {
  onRowDelete: AdazzleReactDataGrid.ColumnEventCallback;
}
export interface IContextMenu extends React.Props<any> {
  onRowDelete: AdazzleReactDataGrid.ColumnEventCallback;

}
export class ListPageContextMenu extends React.Component<IContextMenu, void> {
  public onRowDelete(e, data) {
    debugger;
    if (typeof (this.props.onRowDelete) === 'function') {
      this.props.onRowDelete(e, data);
    }
  }
  render() {
    return (
      <ReactDataGridPlugins.Menu.ContextMenu>
        <ReactDataGridPlugins.Menu.MenuItem onClick={this.onRowDelete}>Delete Row</ReactDataGridPlugins.Menu.MenuItem>
      </ReactDataGridPlugins.Menu.ContextMenu>
    );
  }
}
