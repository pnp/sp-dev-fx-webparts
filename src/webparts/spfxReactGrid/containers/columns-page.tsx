import * as React from "react";
import { SharePointLookupCellFormatter } from "../components/SharePointFormatters";
const connect = require("react-redux").connect;
import { DropDownEditor, ISelectChoices } from "../components/DropDownEditor";
import { addColumn, removeColumn, saveColumn } from "../actions/columnActions";
import ColumnRef from "../model/Column";
import { Button } from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import Container from "../components/container";
import { Guid, Log } from "@microsoft/sp-client-base";
import ListRef from "../model/ListRef";
import * as utils from "../utils/utils";
const fieldTypes: Array<ISelectChoices> = [
  { name: "text", value: "SP.FieldTypeText" },
  { name: "Date", value: "SP.FieldTypeDateTime" },
  { name: "Choice", value: "Choice" },
  { name: "Lookup", value: "Lookup" }
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
      const id = Guid.newGuid();
      const col: ColumnRef = new ColumnRef(id.toString(), "", 80, true);
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
}
class CellContentsEditable extends React.Component<ICellContentsEditableProps, any>{
  public handleFocus(event) {
    event.target.select();
  }
  public getFieldTypesEditorChoices(): Array<ISelectChoices> {
    return fieldTypes;
  }

  public render() {

    const {entity, gridColumn, valueChanged} = this.props;

    switch (gridColumn.editor) {
      case "FieldTypesEditor":
        return (
          <DropDownEditor getChoices={this.getFieldTypesEditorChoices} value={entity[gridColumn.name]} onChange={valueChanged} />
        );
      default:
        return (
          <input autoFocus style={{ width: "100%" }} type="text"
            value={entity[gridColumn.name]}
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
interface IGridProps {
  editing: {
    entityid: string;
    columnid: string;
  };
}
class CplumnsPage extends React.Component<IColumnsPageProps, IGridProps> {
  public constructor() {
    super();

    this.CellContents = this.CellContents.bind(this);
    this.TableDetail = this.TableDetail.bind(this);
    this.TableRow = this.TableRow.bind(this);
    this.TableRows = this.TableRows.bind(this);

    this.toggleEditing = this.toggleEditing.bind(this);

    this.handleRowUpdated = this.handleRowUpdated.bind(this);
 this.handleRowdeleted = this.handleRowdeleted.bind(this);


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
    const {entity, gridColumn, rowChanged} = props;
    if (!gridColumn.editable) {
      return (<span >
        {entity[gridColumn.name]}
      </span>);

    }
    switch (gridColumn.formatter) {
      case "SharePointLookupCellFormatter":
        return (<SharePointLookupCellFormatter value={entity[gridColumn.name]} onFocus={this.toggleEditing} />);

      default:
        return (<a href="#" onFocus={this.toggleEditing}>
          {entity[gridColumn.name]}
        </a>
        );
    }
  }

  public TableDetail(props): JSX.Element {

    const {entity, column, rowChanged} = props;

    if (this.state && this.state.editing && this.state.editing.entityid === entity.guid && this.state.editing.columnid === column.id && column.editable) {
      return (<td data-entityid={entity.guid} data-columnid={column.id} style={{ width: column.width, border: "4px solid black", padding: "0px" }}>
        <CellContentsEditable entity={entity} gridColumn={column} valueChanged={rowChanged} />

      </td>
      );
    } else {
      return (<td onClick={this.toggleEditing} data-entityid={entity.guid} data-columnid={column.id} >
        <this.CellContents key={entity.id + column.id} entity={entity} gridColumn={column} rowChanged={rowChanged} />
      </td>
      );

    }

  }
  public TableRow(props): JSX.Element {
    const {entity, columns, rowChanged} = props;

    return (
      <tr>
        {
          columns.map(function (column) {
            return (
              <this.TableDetail key={column.guid} entity={entity} column={column} rowChanged={rowChanged} />
            );
          }, this)
        }
          <td  data-entityid={entity.guid} >
          <a href="#" onClick={this.handleRowdeleted}>
            Delete
        </a>
        </td>
      </tr>);
  };



  public TableRows(props): JSX.Element {
    const {entities, columns, rowChanged} = props;

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
    const target = event.target;
    const value = target.value;
    const parentTD = this.getParent(event.target, "TD"); // walk up the Dom to the TD, thats where the IDs are stored
    const attributes: NamedNodeMap = parentTD.attributes;
    const entityitem = attributes.getNamedItem("data-entityid");
    const entityid = entityitem.value;
    const columnid = attributes.getNamedItem("data-columnid").value;
    const entity: ColumnRef = this.props.columns.find((temp) => temp.guid === entityid);
    const column = this.gridColulumns.find(temp => temp.id === columnid);
    entity[column.name] = value;
    // if i update the list, get the url to the list and stir it as wekk


    this.props.saveColumn(entity);
  }
  private handleRowdeleted(event) {
    Log.verbose("list-Page", "Row changed-fired when row changed or leaving cell ");
    const target = this.getParent(event.target, "TD");
    const attributes: NamedNodeMap = target.attributes;
    const entity = attributes.getNamedItem("data-entityid").value;
    const column: ColumnRef = this.props.columns.find(temp => utils.ParseSPField(temp.guid).id === entity);
    this.props.removeColumn(column);
    return;
  }
  public getParent(node: Node, type: string): Node {
    while (node.nodeName !== "TD") {
      node = node.parentNode;
    }
    return node;
  }
  public toggleEditing(event) {
    Log.verbose("list-Page", "focus event fired editing  when entering cell");

    const target = this.getParent(event.target, "TD"); // walk up the Dom to the TD, thats where the IDs are stored
    const attributes: NamedNodeMap = target.attributes;
    const entityid = attributes.getNamedItem("data-entityid").value;
    const columnid = attributes.getNamedItem("data-columnid").value;



    this.setState({ "editing": { entityid: entityid, columnid: columnid } });
  }

  public render() {

    const {  addColumn, removeColumn } = this.props;

    return (
      <Container testid="columns" size={2} center>
      <div><h1>Columns</h1>
        <Button onClick={addColumn}>add column</Button></div>
        <table style={{    borderColor: "#600",    borderWidth: "0 0 0 0",    borderStyle: "solid" }}>
          <thead>
            <tr>
              {this.gridColulumns.map((column) => {
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
