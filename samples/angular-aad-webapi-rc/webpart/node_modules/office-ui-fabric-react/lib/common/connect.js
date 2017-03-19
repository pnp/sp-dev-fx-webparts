"use strict";
var React = require('react');
var ConnectedHost_1 = require('./ConnectedHost');
function connect(component, storesToSubscribe, getProps) {
    return function (props) { return (React.createElement(ConnectedHost_1.ConnectedHost, {component: component, componentProps: props, getProps: getProps, storesToSubscribe: storesToSubscribe})); };
}
exports.connect = connect;

//# sourceMappingURL=connect.js.map
