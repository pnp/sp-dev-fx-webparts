"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var PanelSmallRightExample = (function (_super) {
    __extends(PanelSmallRightExample, _super);
    function PanelSmallRightExample() {
        _super.call(this);
        this.state = {
            showPanel: false
        };
    }
    PanelSmallRightExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Button, {description: 'Opens the Sample Panel', onClick: this._showPanel.bind(this)}, "Open Panel"), 
            React.createElement(index_1.Panel, {isOpen: this.state.showPanel, type: index_1.PanelType.smallFixedFar, onDismiss: this._closePanel.bind(this), headerText: 'Panel - Small, right-aligned, fixed'}, 
                React.createElement("span", {className: 'ms-font-m'}, "Content goes here.")
            )));
    };
    PanelSmallRightExample.prototype._showPanel = function () {
        this.setState({ showPanel: true });
    };
    PanelSmallRightExample.prototype._closePanel = function () {
        this.setState({ showPanel: false });
    };
    return PanelSmallRightExample;
}(React.Component));
exports.PanelSmallRightExample = PanelSmallRightExample;

//# sourceMappingURL=Panel.SmallRight.Example.js.map
