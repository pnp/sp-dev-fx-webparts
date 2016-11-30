import * as React from "react";

export const SharePointLookupCellFormatter = React.createClass<{ value: string }, void>({
  render(): JSX.Element {
    let displayValue = this.props.value.substring(this.props.value.indexOf("#;") + 2);
    return <div title={displayValue}>{displayValue}</div>;
  }
});

