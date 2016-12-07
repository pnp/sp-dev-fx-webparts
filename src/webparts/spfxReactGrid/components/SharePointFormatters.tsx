import * as React from "react";

export const SharePointLookupCellFormatter = React.createClass<{ value: string, onFocus: any,entityid:string, columnid:string }, void>({
  render(): JSX.Element {
    if (this.props.value == null) {
      return ((<a href="#" onFocus={this.props.onFocus} key={this.props.entityid+this.props.columnid}>

      </a>))
    }

    let displayValue = this.props.value.substring(this.props.value.indexOf("#;") + 2);
    return (<a href="#" onFocus={this.props.onFocus} key={this.props.entityid+this.props.columnid}>
      {displayValue}
    </a>)

  }
});

