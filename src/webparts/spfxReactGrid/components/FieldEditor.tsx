import * as React from "react";

export interface KeyValue {
  value: any;
  displayName: string;
}
export interface IListEditorProps extends React.Props<any> {
  selectedValue?: string;
  onChange(event): void;
  fields: Array<{ internalName: string, name: string }>;
}
export default class FieldEditor extends React.Component<IListEditorProps, void> {
  constructor() {
    debugger;
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  private handleChange(event) {
    this.props.onChange(event);
  }
  public render() {
    return (
      <select value={this.props.selectedValue} onChange={this.handleChange} >
        {this.props.fields.map((field) => {
          return (
            <option key={field.internalName} value={field.internalName + "#;" + field.name}  >{field.name}</option>
          );
        }, this)
        }
      </select >
    );
  };
}
