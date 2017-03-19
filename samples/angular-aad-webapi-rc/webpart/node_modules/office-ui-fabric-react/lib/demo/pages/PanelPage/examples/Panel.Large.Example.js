"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var PanelLargeExample = (function (_super) {
    __extends(PanelLargeExample, _super);
    function PanelLargeExample() {
        _super.call(this);
        this.state = {
            showPanel: false
        };
    }
    PanelLargeExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Button, {description: 'Opens the Sample Panel', onClick: this._showPanel.bind(this)}, "Open Panel"), 
            React.createElement(index_1.Panel, {isOpen: this.state.showPanel, onDismiss: this._closePanel.bind(this), type: index_1.PanelType.large, headerText: 'Large Panel'}, 
                React.createElement("span", {className: 'ms-font-m'}, "Content goes here.")
            )));
    };
    PanelLargeExample.prototype._showPanel = function () {
        this.setState({ showPanel: true });
    };
    PanelLargeExample.prototype._closePanel = function () {
        this.setState({ showPanel: false });
    };
    return PanelLargeExample;
}(React.Component));
exports.PanelLargeExample = PanelLargeExample;

//# sourceMappingURL=Panel.Large.Example.js.map
