import * as React from "react";
const connect = require("react-redux").connect;
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
  //entityid: string;
  //columnid: string;
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
    const {  value, onChange, getChoices} = this.props;
    return (
      <select value={value} onChange={this.handleChange}        >
        {this.props.getChoices().map(function (choice) {
          return (
            <option key={choice.value} value={choice.value + "#;" + choice.name}   >{choice.name}</option>
          );
        }, this)
        }
      </select >
    );
  };
}
