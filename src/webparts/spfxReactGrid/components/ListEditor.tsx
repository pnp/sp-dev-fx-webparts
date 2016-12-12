import * as React from "react";
export interface KeyValue {
  value: any;
  displayName: string;
}
export interface IListEditorProps extends React.Props<any> {
  selectedValue?: string;
  onChange(event): void;
  lists: Array<{ id: string, title: string }>;
}
export default class ListEditor extends React.Component<IListEditorProps, void> {
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
        {this.props.lists.map((list) => {
          return (
            <option key={list.id} value={list.id + "#;" + list.title}  >{list.title}</option>
          );
        }, this)
        }
      </select >
    );
  };
}
