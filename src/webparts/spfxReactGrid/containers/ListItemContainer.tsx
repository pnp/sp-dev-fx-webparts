import * as React from "react";
const connect = require("react-redux").connect;
import { addListItem, removeListItem, getListItemsAction } from "../actions/listItemActions";
import ListItem from "../model/ListItem";
import ColumnDefinition from "../model/ColumnDefinition";
import ListDefinition from "../model/ListDefinition";
import Container from "../components/container";
import { Guid, Log } from "@microsoft/sp-client-base";
import { SharePointLookupCellFormatter } from "../components/SharePointFormatters";
interface IListViewPageProps extends React.Props<any> {
  listItems: Array<ListItem>;
  columns: Array<ColumnDefinition>;
  listDefinitions: Array<ListDefinition>;
  addListItem: (ListItem) => void;
  removeListItem: (ListItem) => void;
  getListItems: (listDefinitions: Array<ListDefinition>) => void;
  updateListItem: (ListItem) => void;
}
function mapStateToProps(state) {

  return {
    listItems: state.items,
    columns: state.columns,
    listDefinitions: state.lists
  };
}
export class GridColumn {
  constructor(
    public id: string,
    public name: string,
    public editable: boolean,
    public width: number,
    public formatter: string = "",
    public editor?: string) { }
}
function mapDispatchToProps(dispatch) {
  return {
    addListItem: (): void => {
      dispatch(addListItem(new ListItem("1", "test Item", "123-123123123-123123-123123")));
    },
    getListItems: (listDefinitions: Array<ListDefinition>): void => {
        let promise: Promise<any> = getListItemsAction(dispatch, listDefinitions);
      dispatch(promise); // need to ewname this one to be digfferent from the omported ome
    },
    removeListItem: (): void => {
      dispatch(removeListItem(new ListItem("1", "test Item", "123-123123123-123123-123123")));
    },
  };
}
interface IGridState {
  editing: {
    entityid: string;
    columnid: string;
  };
}
class ListItemContainer extends React.Component<IListViewPageProps, IGridState> {
  public constructor() {
    super();
    this.CellContentsEditable = this.CellContentsEditable.bind(this);
    this.CellContents = this.CellContents.bind(this);
    this.TableDetail = this.TableDetail.bind(this);
    this.TableRow = this.TableRow.bind(this);
    this.TableRows = this.TableRows.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleRowUpdated = this.handleRowUpdated.bind(this);
  }
  public componentWillMount() {
    this.props.getListItems(this.props.listDefinitions);
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
  private handleRowUpdated(e) {
  }
  public CellContentsEditable(props: { entity: ListItem, column: ColumnDefinition, valueChanged: (event) => void; }): JSX.Element {
    const {entity, column, valueChanged} = props;
    let columnValue;
    columnValue = entity[column.name];
    // switch (column.editor) {

    //default:
    return (
      <input autoFocus type="text"
        value={entity[column.name]}
        onChange={valueChanged} onBlur={valueChanged} />);
    // }
  }
  public CellContents(props: { entity: ListItem, column: ColumnDefinition, rowChanged: (event) => void; }): JSX.Element {
    const {entity, column} = props;
    //switch (column.formatter) {
    //  case "SharePointLookupCellFormatter":
    //    return (<SharePointLookupCellFormatter value={entity[column.name]} onFocus={this.toggleEditing} />);
    //  default:
    return (<a href="#" onFocus={this.toggleEditing}>
      {entity[column.name]}
    </a>
    );
    //}
  }

  public TableDetail(props: { entity: ListItem, column: ColumnDefinition, rowChanged: (event) => void; }): JSX.Element {
    const {entity, column, rowChanged} = props;
    if (this.state && this.state.editing && this.state.editing.entityid === entity.guid && this.state.editing.columnid === column.guid) {
      return (<td data-entityid={entity.guid} data-columnid={column.guid} style={{ border: "2px solid black", padding: "0px" }}>
        <this.CellContentsEditable entity={entity} column={column} valueChanged={rowChanged} />
      </td>
      );
    } else {
      return (<td data-entityid={entity.guid} data-columnid={column.guid} style={{ border: "1px solid black", padding: "0px" }} onClick={this.toggleEditing} >
        <this.CellContents entity={entity} column={column} rowChanged={rowChanged} />
      </td>
      );
    }
  }
  public TableRow(props: { entity: ListItem, columns: Array<ColumnDefinition>, rowChanged: (event) => void; }): JSX.Element {
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
          <a href="#" >
            Delete
        </a>
        </td>
      </tr>);
  };
  public TableRows(props: { entities: Array<ListItem>, columns: Array<ColumnDefinition>, rowChanged: (event) => void; }): JSX.Element {
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
    const { listItems, addListItem, removeListItem, getListItems } = this.props;
    return (
      <Container testid="columns" size={2} center>
        <h1>List Items</h1>

        <table border="1">
          <thead>
            <tr>
              {this.props.columns.map((column) => {
                return <th key={column.name}>{column.name}</th>;
              })}
            </tr>
          </thead>
          {
            <this.TableRows entities={this.props.listItems} columns={this.props.columns} rowChanged={this.handleRowUpdated} />

          })}
        </table>
      </Container>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemContainer);
