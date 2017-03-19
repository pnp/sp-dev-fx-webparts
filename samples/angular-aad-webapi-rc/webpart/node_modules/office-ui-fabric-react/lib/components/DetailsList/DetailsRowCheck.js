"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var Check_1 = require('../../Check');
exports.DetailsRowCheck = function (props) {
    var selected = props.isSelected || props.selected;
    return (React.createElement("button", {type: 'button', className: 'ms-DetailsRow-check', role: 'button', "aria-pressed": selected, "data-selection-toggle": true, "data-automationid": 'DetailsRowCheck', "aria-label": props.ariaLabel}, props.canSelect ?
        React.createElement(Check_1.Check, {checked: selected}) :
        React.createElement("div", {className: 'ms-DetailsRow-checkSpacer'})));
};

//# sourceMappingURL=DetailsRowCheck.js.map
