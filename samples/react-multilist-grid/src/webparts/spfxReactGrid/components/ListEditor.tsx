import * as React from "react";
export interface KeyValue {
  value: any;
  displayName: string;
}
import { Dropdown, IDropdownOption } from "office-ui-fabric-react";
export interface IListEditorProps extends React.Props<any> {
  selectedValue?: string;
  onChange(event): void;
  lists: Array<{ id: string, title: string }>;
}
export default class ListEditor extends React.Component<IListEditorProps, void> {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  private handleChange(selectedItem: IDropdownOption) {
    this.props.onChange(selectedItem.key);
  }
  public render() {
    const { selectedValue, lists} = this.props;

    let options: Array<IDropdownOption> = lists.map((list) => {
      return ({
        key: list.id + "#;" + list.title,
        text: list.title
      });
    });
    options.unshift({ key: null, text: "..Select One" });
    return (
      <Dropdown label="" selectedKey={selectedValue} options={options} onChanged={this.handleChange} >
      </Dropdown >
    );
  }
}



