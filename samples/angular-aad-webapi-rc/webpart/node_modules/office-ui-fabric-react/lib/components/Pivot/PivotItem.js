"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var PivotItem = (function (_super) {
    __extends(PivotItem, _super);
    function PivotItem() {
        _super.apply(this, arguments);
    }
    PivotItem.prototype.render = function () {
        return (React.createElement("div", null, this.props.children));
    };
    return PivotItem;
}(React.Component));
exports.PivotItem = PivotItem;

//# sourceMappingURL=PivotItem.js.map
