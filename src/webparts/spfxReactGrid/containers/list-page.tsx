import * as React from "react";
import * as utils from "../utils/utils";
const connect = require("react-redux").connect;
import { SharePointLookupCellFormatter } from "../utils/SharePointFormatters";
import { addList, removeList, saveList } from "../actions/listActions";
import { getWebsAction } from "../actions/webActions";
import List from "../model/List";
import { Web } from "../model/Web";
import Container from "../components/container";
import ListView from "../components/Listview";
import { Guid,Log } from '@microsoft/sp-client-base';

interface IListViewPageProps extends React.Props<any> {
  lists: Array<List>;
  webs: Array<Web>;
  addList: (list: List) => void;
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
    addList: (list: List): void => {
      dispatch(addList(list));
    },
    removeList: (list: List): void => {
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
      name: "Web",
      editable: true,
      width: 80,
      formatter: SharePointLookupCellFormatter // displays the descruption
    },
    {
      id: "20",
      key: "ListID",
      name: "ListId",
      editable: true,
      width: 80,
    },
    {
      id: "301",
      key: "listName",
      name: "title",
      editable: true
    },
    {
      id: "401",
      key: "Url",
      name: "list  Url",
      editable: true,

    },
        {
      id: "501",
      key: "editable",
      name: "editable",
      editable: true,

    }];
  public columns = [];
  public constructor() {
    super();
    this.columns = this.defaultColumns; // add others dynamically
    this.ListRows = this.ListRows.bind(this);
    this.ListRow = this.ListRow.bind(this);
    this.ListCell = this.ListCell.bind(this);
    this.ListContents = this.ListContents.bind(this);
    this.ListContentsEditable = this.ListContentsEditable.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.rowChanged = this.rowChanged.bind(this);


  }
  public componentWillMount(): void {
    let list = new List("0#;new list", null, "new list", null);
    this.props.addList(list);

  }
  public rowChanged(event, y, z) {
    Log.verbose("list-Page","Row changed-fired when row changed or leaving cell ");
    let target = event.target;
    let value = target.value;
    let attributes: NamedNodeMap = target.attributes;
    let listid = attributes.getNamedItem("data-listid").value;
    let columnid = attributes.getNamedItem("data-columnid").value;
    let list: List = this.props.lists.find(temp => utils.ParseSPField(temp.guid).id === listid);
    let column = this.columns.find(temp => temp.id === columnid);
    list[column.name] = value;

    this.props.saveList(list);
    debugger;
  }
  public toggleEditing(item) {
    Log.verbose("list-Page","focus event fired editing  when entering cell");
    this.setState({ "editing": item });
  }

  public ListContents(props): JSX.Element {
    let {list, column, rowChanged} = props;
    switch (column.formatter) {
      case "SharePointLookupCellFormatter":
        return (<SharePointLookupCellFormatter value={column.value} />);
      default:
        return (<a href="#" onFocus={this.toggleEditing.bind(null, { "listid": list.guid, "columnid": column.key })}>
          {list[column.name]}
        </a>
        );
    }
  }
  public ListContentsEditable(props): JSX.Element {
    let {list, column, rowChanged} = props;
    switch (column.formatter) {
      case "SharePointLookupCellFormatter":
        return (<SharePointLookupCellFormatter value={column.value} />);
      default:
        return (<input type="text" value={list[column.name]} data-listid={list.guid} data-columnid={column.id} onChange={rowChanged} onBlur={rowChanged} />);
    }
  }
  public ListCell(props): JSX.Element {
    let {list, column, rowChanged} = props;
    if (this.state && this.state.editing && this.state.editing.listid === list.guid && this.state.editing.columnid === column.key) {
      return (<td style={{border: "1px solid black", padding: "0px"}}>
        <this.ListContentsEditable list={list} column={column} rowChanged={rowChanged} />

      </td>
      );
    } else {
      return (<td style={{border: "1px solid black", padding: "0px"}}>
        <this.ListContents list={list} column={column} rowChanged={rowChanged} />
      </td>
      );

    }

  }
  public ListRow(props): JSX.Element {
    let {list, columns, rowChanged} = props;

    return (
      <tr>
        {
          columns.map(function (column) {
            return (
              <this.ListCell key={column.guid} list={list} column={column} rowChanged={rowChanged} />
            );
          }, this)
        }
      </tr>);
  };



  public ListRows(props): JSX.Element {
    let {lists, columns, rowChanged} = props;

    return (
      <tbody>
        {
          lists.map(function (list) {
            return (
              <this.ListRow key={list.guid} list={list} columns={columns} rowChanged={rowChanged} />
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
        <table border="1">
          <thead>
            <tr>
              {this.columns.map(function (column) {
                return <th key={column.name}>{column.name}</th>;
              })}
            </tr>
          </thead>

          {
            <this.ListRows lists={this.props.lists} columns={this.columns} rowChanged={this.rowChanged} />

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
