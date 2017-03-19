"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
require('./Dialog.scss');
var DialogFooter = (function (_super) {
    __extends(DialogFooter, _super);
    function DialogFooter() {
        _super.apply(this, arguments);
    }
    DialogFooter.prototype.render = function () {
        return (React.createElement("div", {className: 'ms-Dialog-actions'}, 
            React.createElement("div", {className: 'ms-Dialog-actionsRight'}, this._renderChildrenAsActions())
        ));
    };
    DialogFooter.prototype._renderChildrenAsActions = function () {
        return React.Children.map(this.props.children, function (child) {
            return React.createElement("span", {className: 'ms-Dialog-action'}, child);
        });
    };
    return DialogFooter;
}(React.Component));
exports.DialogFooter = DialogFooter;

//# sourceMappingURL=DialogFooter.js.map
