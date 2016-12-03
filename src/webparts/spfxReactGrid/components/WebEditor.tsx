import * as React from "react";
const connect = require("react-redux").connect;
import { addColumn, removeColumn, saveColumn } from "../actions/columnActions";
import {Web} from "../model/Web";
import Column from "../model/Column";
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

export interface IWebEditorProps extends React.Props<any> {
  value: string;
  onChange(event): void
  webs:Array<Web>
  listid:string,
  columnid:string
}

class WebEditor extends React.Component<IWebEditorProps, void> {
  constructor(){
    super();
    debugger;
    this.handleChange=this.handleChange.bind(this);
  }
 handleChange(event) {
   debugger;
   this.props.onChange(event);
  }

  public render() {
    debugger;
    const { value ,listid,columnid} = this.props;


    return (
      <select  value={value} onChange={this.handleChange}   data-listid={this.props.listid}
            data-columnid={this.props.columnid}>
        {this.props.webs.map(function (web) {
          return (
            <option key={web.id} value={web.id+"#;"+web.title}  >{web.title}</option>
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
)(WebEditor);