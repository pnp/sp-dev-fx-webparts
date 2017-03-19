"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
require('./DocumentCardLocation.scss');
var DocumentCardLocation = (function (_super) {
    __extends(DocumentCardLocation, _super);
    function DocumentCardLocation() {
        _super.apply(this, arguments);
    }
    DocumentCardLocation.prototype.render = function () {
        var _a = this.props, location = _a.location, locationHref = _a.locationHref, ariaLabel = _a.ariaLabel, onClick = _a.onClick;
        return (React.createElement("a", {className: 'ms-DocumentCardLocation', href: locationHref, onClick: onClick, "aria-label": ariaLabel}, location));
    };
    return DocumentCardLocation;
}(React.Component));
exports.DocumentCardLocation = DocumentCardLocation;

//# sourceMappingURL=DocumentCardLocation.js.map
