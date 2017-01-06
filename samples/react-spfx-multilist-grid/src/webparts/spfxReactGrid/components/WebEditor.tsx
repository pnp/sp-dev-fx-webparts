import * as React from "react";
import { Web } from "../model/Site";
export interface KeyValue {
  value: any;
  displayName: string;
}
import { Dropdown, IDropdownOption } from "office-ui-fabric-react";
export interface IWebEditorProps extends React.Props<any> {
  selectedValue?: string;
  onChange(event): void;
  webs: Array<Web>;
}
export default class WebEditor extends React.Component<IWebEditorProps, void> {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  private handleChange(selectedItem:IDropdownOption) {
    this.props.onChange(selectedItem.key);
  }
  public render() {
    const { selectedValue, webs} = this.props;

    let options: Array<IDropdownOption> = webs.map((web) => {
      return ({
        key: web.url + "#;" + web.title,
        text: web.title
      });
    });
    options.unshift({ key: null, text: "..Select One" });
    return (
      <Dropdown label="" selectedKey={selectedValue} options={options}  onChanged={this.handleChange} >
      </Dropdown >
    );
  }


}

