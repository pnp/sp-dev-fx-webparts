import * as React from "react";
import * as ReactDom from "react-dom";
import * as utils from "../utils/utils";
const connect = require("react-redux").connect;
import { SharePointLookupCellFormatter } from "../components/SharePointFormatters";
import WebEditor from "../components/WebEditor";
import ListEditor from "../components/ListEditor";
import FieldEditor from "../components/FieldEditor";
import { addList, removeList, saveList } from "../actions/listActions";
import { getWebsAction } from "../actions/webActions";
import { Button } from "office-ui-fabric-react/lib/Button";
import ListRef from "../model/ListRef";
import { Web } from "../model/Web";
import ColumnRef from "../model/column";
import Container from "../components/container";
import ListView from "../components/Listview";
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
  lists: Array<ListRef>;
  columnRefs: Array<ColumnRef>;
  webs: Array<Web>;
  addList: () => void;
  removeList: (List) => void;
  saveList: (List) => void;
  getWebs: () => Promise<any>;
};
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
      let id = Guid.newGuid();
      let list: ListRef = new ListRef(id.toString(), null, null, null);
      dispatch(addList(list));
    },
    removeList: (list: ListRef): void => {
      dispatch(removeList(list));
    },
    getWebs: (): Promise<any> => {

      let promis = dispatch(getWebsAction(dispatch));

      return promis;
    },
    saveList: (list): void => {
      let action = saveList(list);
      dispatch(action);
    },

  };
}

interface ICellContentsEditableProps extends React.Props<any> {
  entity: ListRef;
  column: any;
  valueChanged: any;
};
class CellContentsEditable extends React.Component<ICellContentsEditableProps, any>{
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
debugger;
    let {entity, column, valueChanged} = this.props;

    switch (column.editor) {
      case "WebEditor":
        return (<WebEditor selectedValue={column.value} onChange={valueChanged} listid={entity.guid} columnid={column.id} />);
      case "ListEditor":
        return (<ListEditor selectedValue={column.value} onChange={valueChanged} listRefId={entity.guid} columnid={column.id} />);
      case "FieldEditor":
      debugger;
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
class ListPage extends React.Component<IListViewPageProps, IGridProps> {
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
    this.extendedColumns = this.defaultColumns;
    for (let columnRef of this.props.columnRefs) {
      let newCol = new GridColumn(columnRef.guid, columnRef.name, columnRef.editable, columnRef.width, null, "FieldEditor");
      this.extendedColumns.push(newCol);
    }
  }
  public handleRowUpdated(event) {
    Log.verbose("Columns-Page", "Row changed-fired when row changed or leaving cell ");
    let target = event.target;
    let value = target.value;
    let parentTD = this.getParent(event.target, "TD");
    let attributes: NamedNodeMap = parentTD.attributes;
    let entityitem = attributes.getNamedItem("data-entityid");
    let entityid = entityitem.value;
    let columnid = attributes.getNamedItem("data-columnid").value;
    let entity: ListRef = this.props.lists.find((temp) => temp.guid === entityid);
    let column = this.extendedColumns.find(temp => temp.id === columnid);
    entity[column.name] = value;
    // if i update the list, get the url to the list and stir it as wekk
    if (column.name === "title") {

    }
    this.props.saveList(entity);

  }
  public deleteList(event) {
    debugger;
    Log.verbose("list-Page", "Row changed-fired when row changed or leaving cell ");

    let target = this.getParent(event.target, "TD");
    let attributes: NamedNodeMap = target.attributes;
    let entity = attributes.getNamedItem("data-entityid").value;
    let list: ListRef = this.props.lists.find(temp => utils.ParseSPField(temp.guid).id === entity);
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
    debugger;
    let target = this.getParent(event.target, "TD"); // walk up the Dom to the TD, thats where the IDs are stored
    let attributes: NamedNodeMap = target.attributes;
    let entityid = attributes.getNamedItem("data-entityid").value;
    let columnid = attributes.getNamedItem("data-columnid").value;
    this.setState({ "editing": { entityid: entityid, columnid: columnid } });
  }

  public CellContents(props): JSX.Element {
    let {entity, column, rowChanged} = props;
    switch (column.formatter) {
      case "SharePointLookupCellFormatter":
        return (<SharePointLookupCellFormatter value={entity[column.name]} onFocus={this.toggleEditing} />);
      default:
        return (<a href="#" onFocus={this.toggleEditing}>
          {entity[column.name]}
        </a>
        );
    }
  }

  public TableDetail(props): JSX.Element {
    let {entity, column, rowChanged} = props;
    if (this.state && this.state.editing && this.state.editing.entityid === entity.guid && this.state.editing.columnid === column.id) {
      debugger;
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
        <td>
          <a href="#" data-entityid={entity.guid} onClick={this.deleteList}>
            Delete
        </a>
        </td>
      </tr>);
  };



  public TableRows(props): JSX.Element {
    let {entities, columns, rowChanged} = props;

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
        <Button onClick={this.props.addList}>Add List</Button>

        <table border="1">
          <thead>
            <tr>
              {this.extendedColumns.map(function (column) {
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPage);
