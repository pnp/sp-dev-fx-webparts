import * as React from 'react';
const connect = require('react-redux').connect;
import * as ReactDataGrid from "react-data-grid";
import * as ReactDataGridPlugins from "react-data-grid/addons";
import { addList, removeList } from '../actions/listActions';
import List from '../model/List';
import Container from '../components/container';
import ListView from '../components/Listview';
interface IContextMenu extends React.Props<any> {
  onRowDelete: AdazzleReactDataGrid.ColumnEventCallback;

}
interface IListViewPageProps extends React.Props<any> {
  lists: Array<List>;
  addList: () => void;
  removeList: (List) => void;
    saveList: (List) => void;
};
const kolumns= [{
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
function mapStateToProps(state) {

  return {
    lists: state.lists,
  };
}

function mapDispatchToProps(dispatch) {

  return {
    addList: (): void => dispatch(addList(new List('xxxx09-2324-234234-23423441', 'test list2', 'http://adadsasd2'))),
    removeList: (): void  => dispatch(removeList(new List('xxxx09-2324-234234-23423441', 'test list2', 'http://adadsasd2'))),
  };
}

class ListPage extends React.Component<IListViewPageProps, void> {
    private rowGetter(rowIdx) {
    return this.props.lists[rowIdx];
  }
  private handleRowUpdated(data) {
    debugger;
    let row = this.props.lists[data.rowIdx];
    let newrow = _.assign(row, data.updated);
    this.props.saveList(newrow);

  }
  private handleRowdeleted(event, data) {
    debugger;
    this.props.removeList(this.props.lists[data.rowIdx]);
  }
public render() {
  var MyContextMenu = React.createClass<IContextMenu, any>({
      onRowDelete: function (e, data) {
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
    debugger;
    const { lists, addList, removeList } = this.props;

    let toolbar = React.createElement(ReactDataGridPlugins.Toolbar, { onAddRow: this.props.addList });
    return (
      <Container testid="columns" size={2} center>
        <ReactDataGrid
          contextMenu={<MyContextMenu onRowDelete={this.handleRowdeleted.bind(this)} />}

          toolbar={toolbar}
          enableCellSelect={true}
          columns={kolumns}
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
