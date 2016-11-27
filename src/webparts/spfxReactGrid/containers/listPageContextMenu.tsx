import * as React from "react";

import * as ReactDataGridPlugins from "react-data-grid/addons";
export interface IContextMenu extends React.Props<any> {
  onRowDelete: AdazzleReactDataGrid.ColumnEventCallback;
  rowIdx: number;
  idx: number;
}
class ListPageContextMenu extends React.Component<IContextMenu, any> {

 public onRowDelete(e, data) {
    if (typeof (this.props.onRowDelete) === 'function') {
      this.props.onRowDelete(e, data);
    }
  };
 public render() {
    var ContextMenu = ReactDataGridPlugins.Menu.ContextMenu;
    var MenuItem = ReactDataGridPlugins.Menu.MenuItem;

    return (
      <ContextMenu>
        <MenuItem data={{ rowIdx: this.props.rowIdx, idx: this.props.idx }} onClick={this.onRowDelete}>Delete Row</MenuItem>
      </ContextMenu>
    );
  }
}