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
  selectedValue: string;
  selectionChanged(newValue): void
  webs:Array<Web>
}
function Option(displayname, value, selectedOption): JSX.Element {
  if (selectedOption === value) {
    return (<option value={value} selected >displayname</option>);
  } else {
    return (<option value={value}>displayname</option>);
  }

}

class WebEditor extends React.Component<IWebEditorProps, void> {

  public render() {
    const { selectedValue } = this.props;


    return (
      <select >
        {this.props.webs.map(function (web) {
          return (
            <Option value={web.id+"#;"+web.title} displayname={web.title} selectedOption={selectedValue} />
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