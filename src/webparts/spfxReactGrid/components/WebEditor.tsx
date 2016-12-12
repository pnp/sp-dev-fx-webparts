import * as React from "react";
import { Web } from "../model/Site";
export interface KeyValue {
  value: any;
  displayName: string;
}
export interface IWebEditorProps extends React.Props<any> {
  selectedValue?: string;
  onChange(event): void;
  webs: Array<Web>;
}
export default class WebEditor extends React.Component<IWebEditorProps, void> {
  constructor() {
    super();
    debugger;
    this.handleChange = this.handleChange.bind(this);
  }
  private handleChange(event) {
    this.props.onChange(event);
  }
  public render() {
    const { selectedValue} = this.props;
    return (
      <select value={selectedValue} onChange={this.handleChange} >
        {this.props.webs.map((web) => {
          return (
            <option key={web.id} value={web.id + "#;" + web.title}  >{web.title}</option>
          );
        }, this)
        }
      </select >
    );
  };
}
