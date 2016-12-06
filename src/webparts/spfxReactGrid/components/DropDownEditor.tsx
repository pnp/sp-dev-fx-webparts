import * as React from "react";
const connect = require("react-redux").connect;
import { addColumn, removeColumn, saveColumn } from "../actions/columnActions";
import { Web } from "../model/Web";
import ColumnRef from "../model/Column";
import Container from "../components/container";
import ListItemView from "../components/listitemview";
import * as ReactDataGrid from "react-data-grid";
import * as ReactDataGridPlugins from "react-data-grid/addons";
export interface ISelectChoices {
  value: any;
  name: string;
}
export interface IDropDownEditorProps extends React.Props<any> {
  value: string;
  onChange(event): void;
  getChoices(): Array<ISelectChoices>;
  entityid: string;
  columnid: string;
}
export class DropDownEditor extends React.Component<IDropDownEditorProps, void> {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.onChange(event);
  }
  public render() {
    const {  value,  onChange,  getChoices,  entityid,  columnid} = this.props;
    return (
      <select value={value} onChange={this.handleChange} data-entityid={this.props.entityid}
        data-columnid={this.props.columnid}>
        {this.props.getChoices().map(function (choice) {
          return (
            <option key={choice.value} value={choice.value}  >{choice.name}</option>
          );
        }, this)
        }
      </select >
    );
  };
}
