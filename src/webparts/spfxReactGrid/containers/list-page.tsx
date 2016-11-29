import * as React from "react";
const connect = require("react-redux").connect;
import { SharePointLookupCellFormatter } from "../utils/SharePointFormatters"
import * as ReactDataGrid from "react-data-grid";
import * as ReactDataGridPlugins from "react-data-grid/addons";
import { addList, removeList, saveList } from "../actions/listActions";
import { getWebsAction } from "../actions/webActions";
import List from "../model/List";
import { Web } from "../model/Web";
import Container from "../components/container";
import ListView from "../components/Listview";
const booleans = [
  { id: "yes", value: true, text: "yes", title: "yes" },
  { id: "false", value: false, text: "no", title: "no" }

];
import { ListPageContextMenu, ListPageContextMenuProps } from "./ListPageContextMenu";
interface IContextMenu extends React.Props<any> {
  onRowDelete: AdazzleReactDataGrid.ColumnEventCallback;

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
      dispatch(addList(new List(null, null, "new list", null)));
    },
    removeList: (list: List): void => {
      dispatch(removeList(list));
    },
    getWebs: (): Promise<any> => {

      let promis = dispatch(getWebsAction(dispatch));

      return promis;
    },
    saveList: (list): void => dispatch(saveList(list)),

  };
}

class ListPage extends React.Component<IListViewPageProps, void> {
  private kolumns = [];
  private WebsEditor = <ReactDataGridPlugins.Editors.DropDownEditor options={this.props.webs.map(this.convertWebsToDropdown)} />;
  private ListsEditor: JSX.Element;

  private WebsFormatter = <ReactDataGridPlugins.Formatters.DropDownFormatter options={this.props.webs.map(this.convertWebsToDropdown)} />;

  private contextMenu: React.ReactElement<ListPageContextMenu>;

  private convertListsToDropdown(list) {


    return { id: list.id, value: list.id, text: list.title, list: list.title };
  }
  private handleCellSelected(data) {
    debugger;

    let row = this.props.lists[data.rowIdx];

    let column = this.kolumns[data.idx];
    if (column.name === "ListId") {
      let webID = row["Web"].split("#;")[0];
      let web = this.props.webs.find(web => web.id === webID);
      this.ListsEditor = <ReactDataGridPlugins.Editors.DropDownEditor options={web.lists.map(this.convertListsToDropdown)} />;
      column.editor=this.ListsEditor;

    }
  }


  private convertWebsToDropdown(web) {
    return {
      id: web.id,
      value: web.id + "#;" + web.title,
      text: web.title,
      title: web.title
    }
  }
  public componentWillMount() {

    if (this.props.webs.length == 0) {
      this.props.getWebs().then((x) => {
        this.WebsEditor = <ReactDataGridPlugins.Editors.DropDownEditor options={this.props.webs.map(this.convertWebsToDropdown)} />;
             });
    }
  }
  private rowGetter(rowIdx) {
    return this.props.lists[rowIdx];
  }
  private handleRowUpdated(data) {

    let row = this.props.lists[data.rowIdx];
    let newrow = _.assign(row, data.updated);
    this.props.saveList(newrow);
  }
  private handleRowdeleted(event, data) {
    debugger;
    let list: List = this.props.lists[data.rowIdx];
    this.props.removeList(list);
  }
  public render() {

    var MyContextMenu = React.createClass<IContextMenu, any>({
      onRowDelete: function (e, data) {
        debugger;
        if (typeof (this.props.onRowDelete) === 'function') {
          this.props.onRowDelete(e, data);
        }
      },

      render: function () {
        var ContextMenu = ReactDataGridPlugins.Menu.ContextMenu;
        var MenuItem = ReactDataGridPlugins.Menu.MenuItem;
        var SubMenu = ReactDataGridPlugins.Menu.SubMenu;
        return (
          <ContextMenu>
            <MenuItem data={{ rowIdx: this.props.rowIdx, idx: this.props.idx }} onClick={this.onRowDelete}>Delete Row</MenuItem>
          </ContextMenu>
        );
      }
    });

    let damenu = React.createElement(ListPageContextMenu);

    this.ListsEditor = <ReactDataGridPlugins.Editors.DropDownEditor options={this.props.webs.map(this.convertWebsToDropdown)} />;
    const { lists, addList, removeList } = this.props;
    this.WebsEditor = <ReactDataGridPlugins.Editors.DropDownEditor options={this.props.webs.map(this.convertWebsToDropdown)} />;

    this.kolumns = [
      {
        key: "Web",
        name: "Web",
        editable: true,
        width: 80,
        editor: this.WebsEditor,// sets the value to id#;descriptions
        formatter: SharePointLookupCellFormatter // displays the descruption
      },
      {
        key: "ListID",
        name: "ListId",
        editable: true,
        width: 80,
        editor: this.ListsEditor
      },
      {
        key: "listName",
        name: "name",
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
    return (
      <Container testid="columns" size={2} center>
        <ReactDataGrid
          contextMenu={<MyContextMenu onRowDelete={this.handleRowdeleted.bind(this)} />}
          toolbar={toolbar}
          enableCellSelect={true}
          onCellSelected={this.handleCellSelected.bind(this)}
          columns={this.kolumns}
          rowGetter={this.rowGetter.bind(this)}
          rowsCount={this.props.lists.length}
          minHeight={500}
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
