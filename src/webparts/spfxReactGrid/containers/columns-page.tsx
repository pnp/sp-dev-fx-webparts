import * as React from "react";
import { SharePointLookupCellFormatter } from "../components/SharePointFormatters";
const connect = require("react-redux").connect;
import WebEditor from "../components/WebEditor";
import ListEditor from "../components/ListEditor";
import { addColumn, removeColumn, saveColumn } from "../actions/columnActions";
import ListItem from "../model/ListItem";
import ColumnRef from "../model/Column";

import ListRef from "../model/ListRef";
import Container from "../components/container";
import ListItemView from "../components/listitemview";
import * as ReactDataGrid from "react-data-grid";
import * as ReactDataGridPlugins from "react-data-grid/addons";
import { Guid, Log } from '@microsoft/sp-client-base';
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
var FieldTypesEditor = <DropDownEditor options={fieldTypes} />;
var BooleanEditor = <DropDownEditor options={booleans} />;

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
      let id =Guid.newGuid();
     let  col:ColumnRef = new ColumnRef(id.toString(),'',true);
      dispatch(addColumn(col));
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
interface IListContentsEditableProps extends React.Props<any> {
  columnRef: ColumnRef; // the row  in the list of columns
  gridColumn: GridColumn;// the column in the list taht changed
  valueChanged: any;
};
class ListContentsEditable extends React.Component<IListContentsEditableProps, any>{
  //   refs: {
  //     [key: string]: (Element);
  //     cellBeingEdited: (HTMLInputElement);
  // }
  //   public componentDidMount() {
  //     debugger;
  //   let node:any =  ReactDom.findDOMNode(this.refs.cellBeingEdited);
  //  node.focus();
  //   }
  public render() {

    let {columnRef, gridColumn, valueChanged} = this.props;

    switch (gridColumn.editor) {
           default:
        return (
          <input autoFocus type="text"
            value={columnRef[gridColumn.name]}
            data-listid={columnRef.key}
            data-columnName={gridColumn.name}
            onChange={valueChanged} onBlur={valueChanged} />);
    }
  }
}
export interface GridColumn {
  id: string,
  name: string,
  editable: true,
  width: number,
  formatter?: string,
  editor?: string
}
class CplumnsPage extends React.Component<IColumnsPageProps, any> {
  public constructor() {
    super();
    this.ListRows = this.ListRows.bind(this);
    this.ListRow = this.ListRow.bind(this);
    this.ListCell = this.ListCell.bind(this);
    this.ListContents = this.ListContents.bind(this);
    //this.ListContentsEditable = this.ListContentsEditable.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);


  }

  public gridColulumns :Array<GridColumn>= [{
    id: "key",
    name: "key",
    editable: true,
    width: 80
  },
    {
      id: "name",
      name: "name",
      editable: true,
      width:80
    },
    {
      id: "type",
      name: "type",
      editable: true,
      editor: "FieldTypesEditor",
      width:80
    },
    {
      id: "editable",
      name: "editable",
      editable: true,
      editor: "BooleanEditor",
      width:80
    }];
  public ListContents(props:{columnRef:ColumnRef, gridColumn:GridColumn, rowChanged:any}): JSX.Element {
    let {columnRef, gridColumn, rowChanged} = props;
    switch (gridColumn.formatter) {

      default:
        return (<a href="#" onFocus={this.toggleEditing.bind(null, { "listid": columnRef.key, "columnid": gridColumn.id })}>
          {columnRef[gridColumn.name]}
        </a>
        );
    }
  }
  // public ListContentsEditable(props): JSX.Element {
  // let {list, column, valueChanged} = props;
  //   switch (column.formatter) {
  //     case "SharePointLookupCellFormatter":
  //       return (<SharePointLookupCellFormatter value={column.value} />);
  //     default:
  //       return (<input  autoFocus type="text" value={list[column.name]} data-listid={list.guid} data-columnid={column.id} onChange={valueChanged} onBlur={valueChanged} />);
  //   }
  // }
  public ListCell(props): JSX.Element {

    let {columnRef, column, rowChanged} = props;
    if (this.state && this.state.editing && this.state.editing.listid === columnRef.guid && this.state.editing.columnid === column.key) {
      return (<td style={{ border: "1px solid black", padding: "0px" }}>
        <ListContentsEditable columnRef={columnRef} gridColumn={column} valueChanged={rowChanged} />

      </td>
      );
    } else {
      return (<td style={{ border: "1px solid black", padding: "0px" }}>
        <this.ListContents columnRef={columnRef} gridColumn={column} rowChanged={rowChanged} />
      </td>
      );

    }

  }
  public ListRow(props): JSX.Element {
    let {columnRef, columns, rowChanged} = props;

    return (
      <tr>
        {
          columns.map(function (column) {
            return (
              <this.ListCell key={column.guid} columnRef={columnRef} column={column} rowChanged={rowChanged} />
            );
          }, this)
        }
      </tr>);
  };



  public ListRows(props): JSX.Element {
    let {columnRefs, columns, rowChanged} = props;

    return (
      <tbody>
        {
          columnRefs.map(function (columnRef) {
            return (
              <this.ListRow key={columnRef.guid} columnRef={columnRef} columns={columns} rowChanged={rowChanged} />
            );
          }, this)
        }
      </tbody>
    );

  }

  private handleRowUpdated(event) {

    let row = this.props.columns[event.rowIdx];
    let newrow = _.assign(row, event.updated);
    this.props.saveColumn(newrow);
  }
  private handleRowdeleted(event, data) {
    this.props.removeColumn(this.props.columns[data.rowIdx]);
  }
  public toggleEditing(item) {
    Log.verbose("list-Page", "focus event fired editing  when entering cell");
    this.setState({ "editing": item });
  }

  public render() {

    const { columns, addColumn, removeColumn } = this.props;
    let toolbar = React.createElement(ReactDataGridPlugins.Toolbar, { onAddRow: this.props.addColumn });
    return (
      <Container testid="columns" size={2} center>
      <button onClick={addColumn}>add column</button>
        <table border="1">
          <thead>
            <tr>
              {this.gridColulumns.map(function (column) {
                return <th key={column.name}>{column.name}</th>;
              })}
            </tr>
          </thead>

          {
            <this.ListRows columnRefs={this.props.columns} columns={this.gridColulumns} rowChanged={this.handleRowUpdated} />

          })}


        </table>
      </Container>
    );
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CplumnsPage);
