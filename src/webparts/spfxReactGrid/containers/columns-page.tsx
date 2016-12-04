import * as React from "react";
const connect = require("react-redux").connect;
import { addColumn, removeColumn, saveColumn } from "../actions/columnActions";
import ListItem from "../model/ListItem";
import ColumnRef from "../model/Column";
import Container from "../components/container";
import ListItemView from "../components/listitemview";
import * as ReactDataGrid from "react-data-grid";
import * as ReactDataGridPlugins from "react-data-grid/addons";
const fieldTypes = [
  { id: 'text', value: 'text', text: 'text', title: 'text' },
  { id: 'improvement', value: 'date', text: 'Improvement', title: 'Improvement' },
  { id: 'number', value: 'number', text: 'number', title: 'number' },
  { id: 'story', value: 'story', text: 'Story', title: 'Story' }
];
const booleans = [
  { id: 'yes', value: true, text: 'yes', title: 'yes' },
  { id: 'false', value: false, text: 'no', title: 'no' }
];
var DropDownEditor = ReactDataGridPlugins.Editors.DropDownEditor;
var FieldTypesEditor = <DropDownEditor options={fieldTypes}/>;
var BooleanEditor = <DropDownEditor options={booleans}/>;
const kolumns= [{
  key: "key",
  name: "key",
  editable: true,
  width: 80
},
{
  key: "name",
  name: "name",
  editable: true
},
{
  key: "type",
  name: "type",
  editable: true,
  editor:FieldTypesEditor
},
{
  key: "editable",
  name: "editable",
  editable: true,
  editor:BooleanEditor
}];
interface IColumnsPageProps extends React.Props<any> {
  columns: Array<ColumnRef>;
  addColumn: () => void;
  removeColumn: (column) => void;
  saveColumn: (Column) => void;
}
interface IContextMenu extends React.Props<any> {
  onRowDelete: AdazzleReactDataGrid.ColumnEventCallback;
}
function mapStateToProps(state) {
  return {
    columns: state.columns,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addColumn: (): void => {
      dispatch(addColumn(new ColumnRef("new", "bew", true)));
    },
    saveColumn: (updatedRowData): void => {
      dispatch(saveColumn(updatedRowData));
    },
    removeColumn: (column): void => {
     //data.rowidx is the row data.idx is the colukns
      dispatch(removeColumn(column));
    },

  };
}

class CplumnsPage extends React.Component<IColumnsPageProps, void> {
  private rowGetter(rowIdx) {
    return this.props.columns[rowIdx];
  }
  private handleRowUpdated(data) {
    let row = this.props.columns[data.rowIdx];
    let newrow = _.assign(row, data.updated);
    this.props.saveColumn(newrow);
  }
  private handleRowdeleted(event, data) {
   this.props.removeColumn(this.props.columns[data.rowIdx]);
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
    const { columns, addColumn, removeColumn } = this.props;
    let toolbar = React.createElement(ReactDataGridPlugins.Toolbar, { onAddRow: this.props.addColumn });
    return (
      <Container testid="columns" size={2} center>
        <ReactDataGrid
          contextMenu={<MyContextMenu onRowDelete={this.handleRowdeleted.bind(this)} />}
          toolbar={toolbar}
          enableCellSelect={true}
          columns={kolumns}
          rowGetter={this.rowGetter.bind(this)}
          rowsCount={this.props.columns.length}
          minHeight={500}
          onRowUpdated={this.handleRowUpdated.bind(this)} />
        );
      </Container>
    );
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CplumnsPage);
