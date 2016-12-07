import * as React from "react";

export const SharePointLookupCellFormatter = React.createClass<{ value: string, onFocus: any}, void>({
  render(): JSX.Element {
    if (this.props.value == null) {
      return (<a href="#"  data-entityid={this.props.entityid}
        data-columnid={this.props.columnid} onFocus={this.props.onFocus} >

      </a>)
    }

    let displayValue = this.props.value.substring(this.props.value.indexOf("#;") + 2);
    return (<a href="#"   onFocus={this.props.onFocus}>
      {displayValue}
    </a>)

  }
});

