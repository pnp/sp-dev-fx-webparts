import * as React from "react";
const connect = require("react-redux").connect;
import { Web } from "../model/Web";
import ListRef from "../model/ListRef";
import * as utils from "../utils/utils";

export interface KeyValue {
  value: any;
  displayName: string;
}
function mapStateToProps(state) {
  return {
    webs: state.webs,
    listRefs: state.lists

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
  listRefId: string; //this is not a list but a refference to a listt
  columnid: string;
  webs: Array<Web>;
}

class ListEditor extends React.Component<IListEditorProps, void> {

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }
 private getLists() {
    // grt thr listref we are working on. Its web has all the lists in the web
    const listref: ListRef = this.props.listRefs.find((lr) => lr.guid === this.props.listRefId);
    const webid = utils.ParseSPField(listref.webLookup).id;
    const web = this.props.webs.find(w => w.id === webid);
    return web.lists;
  }
private  handleChange(event) {

    this.props.onChange(event);
  }
private  getListsForWeb(): Array<any> { // when we got the web we got the lisyts as well. The lists are a property on the slected web
    // get the id of the list were on then get ist web and the webs lists
    const lists = new Array<any>();
    // let listRef = this.props.
    return lists;

  }
  public render() {

    const { value} = this.props;


    return (
      <select value={value} onChange={this.handleChange} >
        {this.getLists().map(function (list) {
          return (
            <option key={list.id} value={list.id + "#;" + list.title}  >{list.title}</option>
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