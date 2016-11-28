import * as React from "react";
import * as ReactDataGrid from "react-data-grid";
import * as ReactDataGridPlugins from "react-data-grid/addons";
export interface IContextMenu extends React.Props<any> {
  onRowDelete: AdazzleReactDataGrid.ColumnEventCallback;
  rowIdx: number;
  idx: number;
}
class ListPageContextMenu extends React.Component<IContextMenu, void> {
  onRowDelete(e, data) {
    if (typeof (this.props.onRowDelete) === "function") {
      this.props.onRowDelete(e, data);
    }
  };
  render() {
    let ContextMenu = ReactDataGridPlugins.Menu.ContextMenu;
    let MenuItem = ReactDataGridPlugins.Menu.MenuItem;
    let SubMenu = ReactDataGridPlugins.Menu.SubMenu;
    return (
      <ContextMenu>
        <MenuItem data={{ rowIdx: this.props.rowIdx, idx: this.props.idx }} onClick={this.onRowDelete}>Delete Row</MenuItem>
      </ContextMenu>
    );
  }
}