import * as React from "react";
export interface ISelectChoices {
  value: any;
  name: string;
}
export interface IDropDownEditorProps extends React.Props<any> {
  value: string;
  onChange(event): void;
  choices: Array<ISelectChoices>;
}
export class DropDownEditor extends React.Component<IDropDownEditorProps, void> {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  private handleChange(event) {
    this.props.onChange(event);
  }
  public render() {
    const {  value} = this.props;
    return (
      <select value={value} onChange={this.handleChange}        >
        {this.props.choices.map((choice) => {
          return (
            <option key={choice.value} value={choice.value + "#;" + choice.name}   >{choice.name}</option>
          );
        }, this)
        }
      </select >
    );
  };
}
