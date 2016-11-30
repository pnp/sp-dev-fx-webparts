import * as React from "react";
const connect = require("react-redux").connect;
import { SharePointLookupCellFormatter } from "../utils/SharePointFormatters";
import { addList, removeList, saveList } from "../actions/listActions";
import { getWebsAction } from "../actions/webActions";
import List from "../model/List";
import { Web } from "../model/Web";
import Container from "../components/container";
import ListView from "../components/Listview";
interface IListViewPageProps extends React.Props<any> {
  lists: Array<List>;
  webs: Array<Web>;
  addList: (list:List) => void;
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
    addList: (list:List): void => {
      dispatch(addList(list));
    },
    removeList: (list: List): void => {
      dispatch(removeList(list));
    },
    getWebs: (): Promise<any> => {

      let promis = dispatch(getWebsAction(dispatch));

      return promis;
    },
    saveList: (list): void => dispatch(saveList(list)),

  };
}

function ListContents(props): JSX.Element {
  let {list, column, rowChanged} = props;
  switch (column.formatter) {
    case "SharePointLookupCellFormatter":
      return (<SharePointLookupCellFormatter value={column.value} />);
    default:
      return (<input type="text" value={list[column.name]} onBlur={rowChanged} />);
  }
}
function ListCell(props): JSX.Element {
  let {list, column, rowChanged} = props;
  return (
    <td key={column.name}>
      <input type="text" value={list[column.name]} onBlur={rowChanged} />
    </td>
  );

}
function ListRow(props): JSX.Element {
  let {list, columns, rowChanged} = props;

  return (
    <tr>
      {
        columns.map(function (column) {
          return (
            <ListCell list={list} column={column} rowChanged={rowChanged} />
          );
        })
      }
    </tr>);
};



function ListRows(props): JSX.Element {
  let {lists, columns, rowChanged} = props;

  return (
    <tbody>
      {
        lists.map(function (list) {
          return (
            <ListRow list={list} columns={columns} rowChanged={rowChanged} />
          );
        })
      }
    </tbody>
  );

}
class ListPage extends React.Component<IListViewPageProps, void> {
  public defaultColumns = [
    {
      key: "Web",
      name: "Web",
      editable: true,
      width: 80,
      formatter: SharePointLookupCellFormatter // displays the descruption
    },
    {
      key: "ListID",
      name: "ListId",
      editable: true,
      width: 80,
    },
    {
      key: "listName",
      name: "title",
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
  public columns = [];
  public rowChanged(x, y, z) {
    debugger;
  }
  public constructor() {
    super();
    this.columns = this.defaultColumns; // add others dynamically

  }
  public componentWillMount():void{
    let list =new List("0#;new list", null, "new list", null);
    this.props.addList(list);

  }
  public render() {


    let columns = this.columns;
    return (
      <Container testid="columns" size={2} center>
        <table>
          <thead>
            <tr>
              {this.columns.map(function (column) {
                return <th key={column.name}>{column.name}</th>;
              })}
            </tr>
          </thead>

          {
            <ListRows lists={this.props.lists} columns={this.columns} rowChanged={this.rowChanged} />

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
