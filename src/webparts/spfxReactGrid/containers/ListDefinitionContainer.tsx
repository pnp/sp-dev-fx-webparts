import * as React from "react";
import * as utils from "../utils/utils";
const connect = require("react-redux").connect;
import { SharePointLookupCellFormatter } from "../components/SharePointFormatters";
import WebEditor from "../components/WebEditor";
import ListEditor from "../components/ListEditor";
import FieldEditor from "../components/FieldEditor";
import { addList, removeList, saveList } from "../actions/listActions";
import { getWebsAction } from "../actions/webActions";
import { Button } from "office-ui-fabric-react/lib/Button";
import ListDefinition from "../model/ListDefinition";
import { ColumnReference } from "../model/ListDefinition";
import { Web } from "../model/Web";
import ColumnDefinition from "../model/ColumnDefinition";
import Container from "../components/container";

import { Guid, Log } from "@microsoft/sp-client-base";
export class GridColumn {
  constructor(
    public id: string,
    public name: string,
    public editable: boolean,
    public width: number,
    public formatter: string = "",
    public editor?: string) { }
}
interface IListViewPageProps extends React.Props<any> {
  lists: Array<ListDefinition>;
  columnRefs: Array<ColumnDefinition>;
  webs: Array<Web>;
  addList: () => void;
  removeList: (List) => void;
  saveList: (List) => void;
  getWebs: () => Promise<any>;
}
function mapStateToProps(state) {
  return {
    lists: state.lists,
    webs: state.webs,
    columnRefs: state.columns
  };
}
function mapDispatchToProps(dispatch) {

  return {
    addList: (): void => {
      const id = Guid.newGuid();
      const list: ListDefinition = new ListDefinition(id.toString(), null, null, null);
      dispatch(addList(list));
    },
    removeList: (list: ListDefinition): void => {
      dispatch(removeList(list));
    },
    getWebs: (): Promise<any> => {
      return dispatch(getWebsAction(dispatch));
    },
    saveList: (list): void => {
      const action = saveList(list);
      dispatch(action);
    },
  };
}

interface ICellContentsEditableProps extends React.Props<any> {
  entity: ListDefinition;
  column: any;
  valueChanged: any;
}
class CellContentsEditable extends React.Component<ICellContentsEditableProps, any>{
  //   refs: {
  //     [key: string]: (Element);
  //     cellBeingEdited: (HTMLInputElement);
  // }
  //   public componentDidMount() {
  //   let node:any =  ReactDom.findDOMNode(this.refs.cellBeingEdited);
  //  node.focus();
  //   }
  public render() {

    const {entity, column, valueChanged} = this.props;

    switch (column.editor) {
      case "WebEditor":
        return (<WebEditor selectedValue={column.value} onChange={valueChanged} listid={entity.guid} columnid={column.id} />);
      case "ListEditor":
        return (<ListEditor selectedValue={column.value} onChange={valueChanged} listRefId={entity.guid} columnid={column.id} />);
      case "FieldEditor":

        return (<FieldEditor selectedValue={column.value} onChange={valueChanged} listRefId={entity.guid} columnid={column.id} />);
      default:
        return (
          <input autoFocus ref="cellBeingEdited" type="text"
            value={entity[column.name]}
            onChange={valueChanged} onBlur={valueChanged} />);
    }
  }
}
interface IGridProps {
  editing: {
    entityid: string;
    columnid: string;
  };
}
class ListDefinitionContainer extends React.Component<IListViewPageProps, IGridProps> {
  public defaultColumns: Array<GridColumn> = [
    {
      id: "rowGuid",
      name: "guid",
      editable: false,
      width: 250,
      formatter: ""
    },
    {
      id: "WebLookup",
      name: "webLookup", // the name of the field in the model
      editable: true,
      width: 200,
      editor: "WebEditor",
      formatter: "SharePointLookupCellFormatter"
    },
    {
      id: "listlookup",
      width: 200,
      name: "listLookup",
      editable: true,
      editor: "ListEditor",
      formatter: "SharePointLookupCellFormatter"
    }];
  public extendedColumns: Array<GridColumn> = [];
  public constructor() {
    super();
    debugger;
    this.CellContents = this.CellContents.bind(this);
    this.TableDetail = this.TableDetail.bind(this);
    this.TableRow = this.TableRow.bind(this);
    this.TableRows = this.TableRows.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleRowUpdated = this.handleRowUpdated.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }
  public componentWillMount(): void {
    if (this.props.webs.length === 0) {
      this.props.getWebs();
    }
    this.extendedColumns = _.clone(this.defaultColumns);
    for (const columnRef of this.props.columnRefs) {
      const newCol = new GridColumn(columnRef.guid, columnRef.name, columnRef.editable, columnRef.width, null, "FieldEditor");
      this.extendedColumns.push(newCol);
    }
  }
  private isdeafaultColumn(columnid): boolean {
    for (const col of this.defaultColumns) {
      if (col.id === columnid) return true;
    }
    return false;
  }
  private updateExtendedColumn(entity: ListDefinition, columnid: string, value: any) {
    for (const col of entity.columnReferences) {
      if (col.columnId === columnid) {
        col.fieldName = value;
        return;
      }
    }
    let x = new ColumnReference(columnid, value, "text");
    entity.columnReferences.push(x);
  }
  public handleRowUpdated(event) {
    Log.verbose("Columns-Page", "Row changed-fired when row changed or leaving cell ");
    const target = event.target;
    const value = target.value;
    const parentTD = this.getParent(event.target, "TD");
    const attributes: NamedNodeMap = parentTD.attributes;
    const entityitem = attributes.getNamedItem("data-entityid");
    const entityid = entityitem.value;
    const columnid = attributes.getNamedItem("data-columnid").value;
    const entity: ListDefinition = this.props.lists.find((temp) => temp.guid === entityid);
    const column = this.extendedColumns.find(temp => temp.id === columnid);
    // if iys a default column, just set its value , otheriwse update it in the list of extended columns
    if (this.isdeafaultColumn(columnid)) {
      entity[column.name] = value;
    }
    else {
      this.updateExtendedColumn(entity, columnid, value);
    }
    this.props.saveList(entity);

  }
  public deleteList(event) {
    Log.verbose("list-Page", "Row changed-fired when row changed or leaving cell ");
    const target = this.getParent(event.target, "TD");
    const attributes: NamedNodeMap = target.attributes;
    const entity = attributes.getNamedItem("data-entityid").value;
    const list: ListDefinition = this.props.lists.find(temp => utils.ParseSPField(temp.guid).id === entity);
    this.props.removeList(list);
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

  public CellContents(props: { entity: ListDefinition, column: any, rowChanged: any }): JSX.Element {
    const {entity, column} = props;
    switch (column.formatter) {
      case "SharePointLookupCellFormatter":
        return (<SharePointLookupCellFormatter value={entity[column.name]} onFocus={this.toggleEditing} />);
      default:

        if (this.isdeafaultColumn(column.id)) {
          return (<a href="#" onFocus={this.toggleEditing}>
            {entity[column.name]}
          </a>
          );
        }
        else {

          const colref = entity.columnReferences.find(cr => cr.columnId === column.id);
          let displaytext="";
          if (colref!=null){
        displaytext=    utils.ParseSPField(colref.fieldName).value;
          }

          return (<a href="#" onFocus={this.toggleEditing}>
            {displaytext}
          </a>
          );
        }
    }
  }

  public TableDetail(props): JSX.Element {
    const {entity, column, rowChanged} = props;
    if (this.state && this.state.editing && this.state.editing.entityid === entity.guid && this.state.editing.columnid === column.id) {
      return (<td data-entityid={entity.guid} data-columnid={column.id} style={{ border: "2px solid black", padding: "0px" }}>
        <CellContentsEditable entity={entity} column={column} valueChanged={rowChanged} />

      </td>
      );
    } else {
      return (<td data-entityid={entity.guid} data-columnid={column.id} style={{ border: "1px solid black", padding: "0px" }} onClick={this.toggleEditing} >
        <this.CellContents entity={entity} column={column} rowChanged={rowChanged} />
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
        <td data-entityid={entity.guid} >
          <a href="#" onClick={this.deleteList}>
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
          entities.map(function (list) {
            return (
              <this.TableRow key={list.guid} entity={list} columns={columns} rowChanged={rowChanged} />
            );
          }, this)
        }
      </tbody>
    );

  }

  public render() {




    return (
      <Container testid="columns" size={2} center>
        <h1>Lists</h1>
        <Button onClick={this.props.addList}>Add List</Button>

        <table border="1">
          <thead>
            <tr>
              {this.extendedColumns.map((column) => {
                return <th key={column.name}>{column.name}</th>;
              })}
            </tr>
          </thead>

          {
            <this.TableRows entities={this.props.lists} columns={this.extendedColumns} rowChanged={this.handleRowUpdated} />

          })}


        </table>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDefinitionContainer);
