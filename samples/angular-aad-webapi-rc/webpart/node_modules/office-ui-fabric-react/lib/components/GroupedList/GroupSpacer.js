"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
require('./GroupSpacer.scss');
var SPACER_WIDTH = 36;
exports.GroupSpacer = function (props) {
    return props.count > 0 && React.createElement("span", {className: 'ms-GroupSpacer', style: { width: props.count * SPACER_WIDTH }});
};

//# sourceMappingURL=GroupSpacer.js.map
