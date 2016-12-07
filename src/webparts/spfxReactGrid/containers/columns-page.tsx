import * as React from "react";
import { SharePointLookupCellFormatter } from "../components/SharePointFormatters";
const connect = require("react-redux").connect;
import WebEditor from "../components/WebEditor";
import ListEditor from "../components/ListEditor";
import {DropDownEditor,IDropDownEditorProps,ISelectChoices} from "../components/DropDownEditor";
import { addColumn, removeColumn, saveColumn } from "../actions/columnActions";
import ListItem from "../model/ListItem";
import ColumnRef from "../model/Column";
import { Button } from "office-ui-fabric-react/lib/Button";
import ListRef from "../model/ListRef";
import Container from "../components/container";
import ListItemView from "../components/listitemview";
import * as ReactDataGrid from "react-data-grid";
import * as ReactDataGridPlugins from "react-data-grid/addons";
import { Guid, Log } from "@microsoft/sp-client-base";
const fieldTypes :Array<ISelectChoices>= [
  { name: "text", value: "SP.FieldTypeText" },
  { name: "Date", value: "SP.FieldTypeDateTime"},
  { name: "Choice", value: "Choice" },
  { name: "Lookup", value: "Lookup"}
];
const booleans  :Array<ISelectChoices>= [
  { name: "Yes", value: true},
  { name: "No", value: false}
];


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
      let id = Guid.newGuid();
      let col: ColumnRef = new ColumnRef(id.toString(), "", true);
      dispatch(addColumn(col));
    },
    saveColumn: (updatedRowData): void => {
      dispatch(saveColumn(updatedRowData));
    },
    removeColumn: (column): void => {

      dispatch(removeColumn(column));
    },

  };
}
interface ICellContentsEditableProps extends React.Props<any> {
  entity: ColumnRef; // the row  in the list of columns
  gridColumn: GridColumn;// the column in the list taht changed
  valueChanged: any;
};
class CellContentsEditable extends React.Component<ICellContentsEditableProps, any>{
  public handleFocus(event) {
    event.target.select();
  }
  public getFieldTypesEditorChoices():Array<ISelectChoices>{
    return fieldTypes;
  }

  public render() {

    let {entity, gridColumn, valueChanged} = this.props;

    switch (gridColumn.editor) {
      case "FieldTypesEditor":
        return(
          <DropDownEditor columnid={gridColumn.id} entityid={entity.guid} getChoices={this.getFieldTypesEditorChoices} value={entity[gridColumn.name]} onChange={valueChanged} />
        );
      default:
        return (
          <input autoFocus style={{ width: "100%" }} type="text"
            value={entity[gridColumn.name]}
            data-entityid={entity.guid}
            data-columnid={gridColumn.id}
            onChange={valueChanged}
            onBlur={valueChanged}
            onFocus={this.handleFocus} />);
    }
  }
}
export interface GridColumn {
  id: string;
  name: string;
  editable: boolean;
  width: number;
  formatter?: string;
  editor?: string;
}
class CplumnsPage extends React.Component<IColumnsPageProps, any> {
  public constructor() {
    super();

    this.CellContents = this.CellContents.bind(this);
    this.TableDetail = this.TableDetail.bind(this);
    this.TableRow = this.TableRow.bind(this);
    this.TableRows = this.TableRows.bind(this);

    this.toggleEditing = this.toggleEditing.bind(this);

    this.handleRowUpdated = this.handleRowUpdated.bind(this);



  }

  public gridColulumns: Array<GridColumn> = [{
    id: "guid",
    name: "guid",
    editable: true,
    width: 250
  },
  {
    id: "name",
    name: "name",
    editable: true,
    width: 100
  },
  {
    id: "type",
    name: "type",
    editable: true,
    editor: "FieldTypesEditor",
    formatter: "SharePointLookupCellFormatter",
    width: 20
  },
  {
    id: "editable",
    name: "editable",
    editable: true,
    editor: "BooleanEditor",
    width: 300
  }];
  public CellContents(props: { entity: ColumnRef, gridColumn: GridColumn, rowChanged: any }): JSX.Element {
    let {entity, gridColumn, rowChanged} = props;
    if (!gridColumn.editable){
        return (<span  data-entityid={entity.guid} data-columnid={gridColumn.id} >
          {entity[gridColumn.name]}
        </span>);

    }
    switch (gridColumn.formatter) {
  case "SharePointLookupCellFormatter":
        return (<SharePointLookupCellFormatter key={entity.guid+gridColumn.id}  entityid={entity.guid}  columnid={gridColumn.id} value={entity[gridColumn.name]} onFocus={this.toggleEditing} />);

      default:
        return (<a href="#" data-entityid={entity.guid} data-columnid={gridColumn.id} onFocus={this.toggleEditing}>
          {entity[gridColumn.name]}
        </a>
        );
    }
  }

  public TableDetail(props): JSX.Element {

    let {entity, column, rowChanged} = props;

    if (this.state && this.state.editing && this.state.editing.entityid === entity.guid && this.state.editing.columnid === column.id && column.editable) {
      return (<td style={{ width: column.width, border: "1px solid black", padding: "0px" }}>
        <CellContentsEditable entity={entity} gridColumn={column} valueChanged={rowChanged} />

      </td>
      );
    } else {
      return (<td style={{ width: column.width, border: "20px solid black", padding: "0px" }} onClick={this.toggleEditing} data-entityid={entity.guid} data-columnid={column.id} >
        <this.CellContents key={entity.id+column.id} entity={entity} gridColumn={column} rowChanged={rowChanged} />
      </td>
      );

    }

  }
  public TableRow(props): JSX.Element {
    let {entity, columns, rowChanged} = props;

    return (
      <tr>
        {
          columns.map(function (column) {
            return (
              <this.TableDetail key={column.guid} entity={entity} column={column} rowChanged={rowChanged} />
            );
          }, this)
        }
      </tr>);
  };



  public TableRows(props): JSX.Element {
    let {entities, columns, rowChanged} = props;

    return (
      <tbody>
        {
          entities.map(function (entity) {
            return (
              <this.TableRow key={entity.guid} entity={entity} columns={columns} rowChanged={rowChanged} />
            );
          }, this)
        }
      </tbody>
    );

  }

  private handleRowUpdated(event) {

    Log.verbose("list-Page", "Row changed-fired when row changed or leaving cell ");

    let target = event.target;
    let value = target.value;
    let attributes: NamedNodeMap = target.attributes;
    let entityid = attributes.getNamedItem("data-entityid").value;
    let columnid = attributes.getNamedItem("data-columnid").value;
    let entity = this.props.columns.find((temp) => temp.guid === entityid);
    let column = this.gridColulumns.find(temp => temp.id === columnid);
    entity[column.name] = value;
    // if i update the list, get the url to the list and stir it as wekk


    this.props.saveColumn(entity);
  }
  private handleRowdeleted(event, data) {
    this.props.removeColumn(this.props.columns[data.rowIdx]);
  }
  public toggleEditing(event) {
    Log.verbose("list-Page", "focus event fired editing  when entering cell");
    debugger;
    let target = event.target;
    let attributes: NamedNodeMap = target.attributes;

    let entityid = attributes.getNamedItem("data-entityid").value;
    let columnid = attributes.getNamedItem("data-columnid").value;



    this.setState({ "editing": { entityid: entityid, columnid: columnid } });
  }

  public render() {

    const { columns, addColumn, removeColumn } = this.props;

    return (
      <Container testid="columns" size={2} center>
        <Button onClick={addColumn}>add column</Button>
        <table border="1">
          <thead>
            <tr>
              {this.gridColulumns.map(function (column) {
                return <th key={column.name}>{column.name}</th>;
              })}
            </tr>
          </thead>

          {
            <this.TableRows entities={this.props.columns} columns={this.gridColulumns} rowChanged={this.handleRowUpdated} />

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
