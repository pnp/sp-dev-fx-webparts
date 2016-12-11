import * as React from "react";
const connect = require("react-redux").connect;
import {Site, Web ,WebList,WebListField} from "../model/Site";
import ListDefinition from "../model/ListDefinition";
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
  listRefs: Array<ListDefinition>;
  listRefId: string; //this is not a list but a refference to a listt
  columnid: string;
  webs: Array<Web>;
}

class FieldEditor extends React.Component<IListEditorProps, void> {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  private getFields():Array<WebListField> {
    // grt thr listref we are working on. Its web has all the lists in the web
    const listref: ListDefinition = this.props.listRefs.find((lr) => lr.guid === this.props.listRefId);// this is the row in the grid
    const listid = utils.ParseSPField(listref.listLookup).id; // this is stored as splistid#; list name
    const webid = utils.ParseSPField(listref.webLookup).id; // this is stored as spwebid#; web name
    const web = this.props.webs.find(w => w.id === webid); // get the web
    const list = web.lists.find(l => l.id === listid); //get the list in the web


    return list.fields;

  }
  private handleChange(event) {

    this.props.onChange(event);
  }

  public render() {

    const { value} = this.props;


    return (
      <select value={value} onChange={this.handleChange} >
        {this.getFields().map( (field)=> {
          return (
            <option key={field.id} value={field.internalName + "#;" + field.name}  >{field.name}</option>
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
)(FieldEditor);