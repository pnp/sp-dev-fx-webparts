import * as React from 'react';
const connect = require('react-redux').connect;
import * as ReactDataGrid from "react-data-grid";
import * as ReactDataGridPlugins from "react-data-grid/addons";
import { addList, removeList, saveList } from '../actions/listActions';
import { getWebsAction } from '../actions/webActions';
import List from '../model/List';
import { Web, WebList, WebListField } from "../model/Web";
import Container from '../components/container';
import ListView from '../components/Listview';
class ListPageContextMenuProps implements React.Props<any> {
  onRowDelete: AdazzleReactDataGrid.ColumnEventCallback;
  rowIdx: number;
  idx: number;

}
class ListPageContextMenu extends React.Component<ListPageContextMenuProps, any> {


  public render() {
    var ContextMenu = ReactDataGridPlugins.Menu.ContextMenu;
    var MenuItem = ReactDataGridPlugins.Menu.MenuItem;

    return (
      <ContextMenu>
        <MenuItem data={{ rowIdx: this.props.rowIdx, idx: this.props.idx }} onClick={this.props.onRowDelete}>Delete Row</MenuItem>
      </ContextMenu>
    );
  }
}
interface IListViewPageProps extends React.Props<any> {
  lists: Array<List>;
  webs: Array<Web>;
  addList: () => void;
  removeList: (List) => void;
  saveList: (List) => void;
  getWebs: () => Promise<any>;
};
function mapStateToProps(state) {
  return {
    lists: state.lists,
    webs: state.webs
  };
}
function mapDispatchToProps(dispatch) {

  return {
    addList: (): void => {
      let skeletonRow= new List(null,null,'new List',null);
      dispatch(addList(skeletonRow));
    },
    removeList: (list: List): void => {
      dispatch(removeList(list));
    },
    getWebs: (): Promise<any> => {
      debugger;
      let promis = dispatch(getWebsAction(dispatch));
      debugger;
      return promis;
    },
    saveList: (list): void => dispatch(saveList(list)),

  };
}

class ListPage extends React.Component<IListViewPageProps, void> {
  private kolumns = [];
  private DropDownEditor = ReactDataGridPlugins.Editors.DropDownEditor;
    private DropDownFormatter = ReactDataGridPlugins.Formatters.DropDownFormatter;
    ;
  private WebsEditor = <this.DropDownEditor options={this.props.webs.map(this.convertWebsToDropdown)} />;
  private WebsFormatter = <this.DropDownEditor options={this.props.webs.map(this.convertWebsToDropdown)} />;
  private ListsEditor = <this.DropDownEditor options={this.props.webs.map(this.convertWebsToDropdown)} />;

  private convertWebsToDropdown(web) {

    return {  value: web.id, text: web.title};
  }
  private convertListsToDropdown(list) {

    return { id: list.id, value: list.title, text: list.title, list: list.title };
  }
  public componentWillMount() {
    debugger;

    if (this.props.webs.length == 0) {
      this.props.getWebs().then((x) => {
        this.WebsEditor = <this.DropDownEditor options={this.props.webs.map(this.convertWebsToDropdown)} />;
      });
    }
  }
  private rowGetter(rowIdx) {
    return this.props.lists[rowIdx];
  }
  private handleRowUpdated(data) {
    debugger;
    let row = this.props.lists[data.rowIdx];
    let newrow = _.assign(row, data.updated);
    this.props.saveList(newrow);
  }
  private handleCellSelected(data) {
    debugger;

    let row = this.props.lists[data.rowIdx];
    let column = this.kolumns[data.idx];
    if (column.name === "List") {
      let webID = row["Web"];
      let web = this.props.webs.find(web => web.id === webID);
      this.ListsEditor = <this.DropDownEditor options={web.lists.map(this.convertListsToDropdown)} />;
    }

  }
  private handleRowdeleted(event, data) {

    this.props.removeList(this.props.lists[data.rowIdx]);
  }
  private geListsOptions() {
    debugger;
  }
  public render() {
    debugger;
    const { lists, addList, removeList } = this.props;
    this.WebsEditor = <this.DropDownEditor options={this.props.webs.map(this.convertWebsToDropdown)} />;
    this.ListsEditor = <this.DropDownEditor options={this.geListsOptions()} />;
    debugger;
    let onRows = function (X, y, z) {
      debugger;
    }
    this.kolumns = [
      {
        key: "Web",
        name: "Web",
        editable: true,
        width: 80,
        editor: this.WebsEditor
      },
      {
        key: "List",
        name: "List",
        editable: true,
        width: 80,
        editor: this.ListsEditor
      },

      {
        key: "ListID",
        name: "ListId",
        editable: true,
        width: 80
      },
      {
        key: "title",
        name: "title",
        editable: true
      },
      {
        key: "Url",
        name: "list  Url",
        editable: true,

      },
      {
        key: "editable",
        name: "editable",
        editable: true,

      }];
    let toolbar = React.createElement(ReactDataGridPlugins.Toolbar, { onAddRow: this.props.addList });
    let p = new ListPageContextMenuProps();
    p.onRowDelete = this.handleRowdeleted.bind(this);
    let contextMenu = React.createElement(ListPageContextMenu, p);
    return (
      <Container testid="columns" size={2} center>
        <ReactDataGrid
          contextMenu={contextMenu}

          toolbar={toolbar}
          enableCellSelect={true}
          columns={this.kolumns}
          rowGetter={this.rowGetter.bind(this)}
          rowsCount={this.props.lists.length}
          minHeight={500}
          onCellSelected={this.handleCellSelected.bind(this)}

          onRowUpdated={this.handleRowUpdated.bind(this)} />
        );
      </Container>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPage);
