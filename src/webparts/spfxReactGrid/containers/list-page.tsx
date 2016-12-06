import * as React from "react";
import * as ReactDom from "react-dom";
import * as utils from "../utils/utils";
const connect = require("react-redux").connect;
import { SharePointLookupCellFormatter } from "../components/SharePointFormatters";
import WebEditor from "../components/WebEditor";
import ListEditor from "../components/ListEditor";
import { addList, removeList, saveList } from "../actions/listActions";
import { getWebsAction } from "../actions/webActions";
import { Button } from "office-ui-fabric-react/lib/Button";
import ListRef from "../model/ListRef";
import { Web } from "../model/Web";
import Container from "../components/container";
import ListView from "../components/Listview";
import { Guid, Log } from "@microsoft/sp-client-base";
export interface Column {
  id: string;
  key: string;
  name: string;
  editable: true;
  width: number;
  formatter: string;
  editor: string;
}
interface IListViewPageProps extends React.Props<any> {
  lists: Array<ListRef>;
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
  list: ListRef;
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

    let {list, column, valueChanged} = this.props;

    switch (column.editor) {
      case "WebEditor":
        return (<WebEditor selectedValue={column.value} onChange={valueChanged} listid={list.guid} columnid={column.id} />);
      case "ListEditor":
        return (<ListEditor selectedValue={column.value} onChange={valueChanged} listRefId={list.guid} columnid={column.id} />);
      default:
        return (
          <input autoFocus ref="cellBeingEdited" type="text"
            value={list[column.name]}
            data-listid={list.guid}
            data-columnid={column.id}
            onChange={valueChanged} onBlur={valueChanged} />);
    }
  }
}
class ListPage extends React.Component<IListViewPageProps, any> {
  public defaultColumns = [
    {
      id: "7401",
      key: "guid",
      name: "guid",
      editable: true,

    },
    {
      id: "10",
      key: "Web",
      name: "webLookup", // the name of the field in the model
      editable: true,
      width: 80,
      //    formatter: SharePointLookupCellFormatter, // displays the descruption
      editor: "WebEditor",
      formatter: "SharePointLookupCellFormatter"
    },

    {
      id: "301",
      key: "listName",
      name: "listLookup",
      editable: true,
      editor: "ListEditor",
      formatter: "SharePointLookupCellFormatter"
    }];
  public columns = [];
  public constructor() {
    super();
    this.columns = this.defaultColumns; // add others dynamically
    this.CellContents = this.CellContents.bind(this);
    this.TableDetail = this.TableDetail.bind(this);
    this.TableRow = this.TableRow.bind(this);
    this.TableRows = this.TableRows.bind(this);
    //this.ListContentsEditable = this.ListContentsEditable.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.rowChanged = this.rowChanged.bind(this);
    this.deleteList = this.deleteList.bind(this);


  }
  public componentWillMount(): void {
    if (this.props.webs.length === 0) {
      this.props.getWebs();
    }
  }
  public rowChanged(event, y, z) {
    Log.verbose("list-Page", "Row changed-fired when row changed or leaving cell ");

    let target = event.target;
    let value = target.value;
    let attributes: NamedNodeMap = target.attributes;
    let listid = attributes.getNamedItem("data-listid").value;
    let columnid = attributes.getNamedItem("data-columnid").value;
    let list: ListRef = this.props.lists.find(temp => utils.ParseSPField(temp.guid).id === listid);
    let column = this.columns.find(temp => temp.id === columnid);
    list[column.name] = value;
    // if i update the list, get the url to the list and stir it as wekk
    if (column.name === "title") {

    }
    this.props.saveList(list);

  }
  public deleteList(event) {
    debugger;
    Log.verbose("list-Page", "Row changed-fired when row changed or leaving cell ");

    let target = event.target;
     let attributes: NamedNodeMap = target.attributes;
    let listid = attributes.getNamedItem("data-listid").value;
    let list: ListRef = this.props.lists.find(temp => utils.ParseSPField(temp.guid).id === listid);
    this.props.removeList(list);
    return;
  }
  public toggleEditing(item) {
    Log.verbose("list-Page", "focus event fired editing  when entering cell");
    this.setState({ "editing": item });
  }

  public CellContents (props): JSX.Element {
    let {list, column, rowChanged} = props;
    switch (column.formatter) {
      case "SharePointLookupCellFormatter":
        return (<SharePointLookupCellFormatter value={list[column.name]} entityid={list.id}  columnid={column.id} onFocus={this.toggleEditing.bind(null, { "listid": list.guid, "columnid": column.key })} />);
      default:
        return (<a href="#" onFocus={this.toggleEditing.bind(null, { "listid": list.guid, "columnid": column.key })}>
          {list[column.name]}
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
  public TableDetail(props): JSX.Element {
    let {list, column, rowChanged} = props;
    if (this.state && this.state.editing && this.state.editing.listid === list.guid && this.state.editing.columnid === column.key) {
      return (<td style={{ border: "1px solid black", padding: "0px" }}>
        <CellContentsEditable list={list} column={column} valueChanged={rowChanged} />

      </td>
      );
    } else {
      return (<td style={{ border: "1px solid black", padding: "0px" }}>
        <this.CellContents  list={list} column={column} rowChanged={rowChanged} />
      </td>
      );

    }

  }
  public TableRow(props): JSX.Element {
    let {list, columns, rowChanged} = props;

    return (
      <tr>
        {
          columns.map(function (column) {
            return (
              <this.TableDetail key={column.guid} list={list} column={column} rowChanged={rowChanged} />
            );
          }, this)
        }
        <td>
          <a href="#" data-listid={list.guid} onClick={this.deleteList}>
            Delete
        </a>
        </td>
      </tr>);
  };



  public TableRows (props): JSX.Element {
    let {lists, columns, rowChanged} = props;

    return (
      <tbody>
        {
          lists.map(function (list) {
            return (
              <this.TableRow key={list.guid} list={list} columns={columns} rowChanged={rowChanged} />
            );
          }, this)
        }
      </tbody>
    );

  }

  public render() {


    let columns = this.columns;
    return (
      <Container testid="columns" size={2} center>
        <Button onClick={this.props.addList}>Add List</Button>

        <table border="1">
          <thead>
            <tr>
              {this.columns.map(function (column) {
                return <th key={column.name}>{column.name}</th>;
              })}
            </tr>
          </thead>

          {
            <this.TableRows  lists={this.props.lists} columns={this.columns} rowChanged={this.rowChanged} />

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
