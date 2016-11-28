import * as React from "react";
const connect = require("react-redux").connect;
import * as ReactDataGrid from "react-data-grid";
import * as ReactDataGridPlugins from "react-data-grid/addons";
import { addList, removeList, saveList } from "../actions/listActions";
import { getWebsAction } from "../actions/webActions";
import List from "../model/List";
import Web from "../model/Web";
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
      dispatch(addList(new List("daweb", "xxxx09-2324-234234-23423441", "test list2", "http://adadsasd2")));
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
  private DropDownEditor = ReactDataGridPlugins.Editors.DropDownEditor;
  private WebsEditor = <this.DropDownEditor options={this.props.webs.map(this.convertWebsToDropdown)} />;
  private DropDownFormatter = ReactDataGridPlugins.Formatters.DropDownFormatter;
  private WebsFormatter = <this.DropDownFormatter options={this.props.webs.map(this.convertWebsToDropdown)} />;

  private contextMenu: React.ReactElement<ListPageContextMenu>;



  private convertWebsToDropdown(web) {

    return { id: web.id, value: web.title, text: web.title, title: web.title }
  }
  public componentWillMount() {

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

let  damenu=React.createElement(ListPageContextMenu);


    const { lists, addList, removeList } = this.props;
    this.WebsEditor = <this.DropDownEditor options={this.props.webs.map(this.convertWebsToDropdown)} />;


    this.kolumns = [
      {
        key: "Web",
        name: "Web",
        editable: true,
        width: 80,
        editor: this.WebsEditor
      },
      {
        key: "ListID",
        name: "ListId",
        editable: true,
        width: 80
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
