import * as React from "react";
const connect = require("react-redux").connect;

import { Web } from "../model/Web";




export interface KeyValue {
  value: any;
  displayName: string;
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
  onChange(event): void;
  webs: Array<Web>;
  listid: string;
  columnid: string;
}

class WebEditor extends React.Component<IWebEditorProps, void> {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {

    this.props.onChange(event);
  }

  public render() {

    const { value} = this.props;


    return (
      <select value={value} onChange={this.handleChange} >
        {this.props.webs.map(function (web) {
          return (
            <option key={web.id} value={web.id + "#;" + web.title}  >{web.title}</option>
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