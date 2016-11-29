import * as React from "react";

export const SharePointLookupCellFormatter = React.createClass({
  propTypes: {
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired
  },

  render(): JSX.Element {
    let displayValue = this.props.value.substring(this.props.value.indexOf("#;") + 2);
    return <div title={displayValue}>{displayValue}</div>;
  }
});

