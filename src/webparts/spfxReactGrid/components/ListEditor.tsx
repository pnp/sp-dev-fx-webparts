import * as React from "react";
const connect = require("react-redux").connect;
import { addColumn, removeColumn, saveColumn } from "../actions/columnActions";
import { Web } from "../model/Web";
import ListRef from "../model/ListRef";
import ColumnRef from "../model/Column";
import Container from "../components/container";
import ListItemView from "../components/listitemview";
import * as ReactDataGrid from "react-data-grid";
import * as ReactDataGridPlugins from "react-data-grid/addons";

export interface KeyValue {
  value: any,
  displayName: string
}
function mapStateToProps(state) {
  return {
    webs: state.webs

  };
}
function mapDispatchToProps(dispatch) {
  return {
  };
}

export interface IListEditorProps extends React.Props<any> {
  value: string;
  onChange(event): void;
  listRefs: Array<ListRef>;
  listRefId: string, //this is not a list but a refference to a listt
  columnid: string
}

class ListEditor extends React.Component<IListEditorProps, void> {
  constructor() {
    super();
    debugger;
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    debugger;
    this.props.onChange(event);
  }
  getListsForWeb(): Array<any> { // when we got the web we got the lisyts as well. The lists are a property on the slected web
    // get the id of the list were on then get ist web and the webs lists
    let lists = new Array<any>();
   // let listRef = this.props.
    return lists;

  }
  public render() {
    debugger;
    const { value, listRefId, columnid} = this.props;


    return (
      <select value={value} onChange={this.handleChange} data-listid={this.props.listRefId}
        data-columnid={this.props.columnid}>
        {this.getListsForWeb().map(function (web) {
          return (
            <option key={web.id} value={web.id + "#;" + web.title}  >{web.title}</option>
          );
        }, this)
        }
      </select >
    );
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListEditor);