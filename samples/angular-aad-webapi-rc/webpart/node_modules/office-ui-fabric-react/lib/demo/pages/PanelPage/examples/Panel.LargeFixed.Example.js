"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var PanelLargeFixedExample = (function (_super) {
    __extends(PanelLargeFixedExample, _super);
    function PanelLargeFixedExample() {
        _super.call(this);
        this.state = {
            showPanel: false
        };
    }
    PanelLargeFixedExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Button, {description: 'Opens the Sample Panel', onClick: this._showPanel.bind(this)}, "Open Panel"), 
            React.createElement(index_1.Panel, {isOpen: this.state.showPanel, onDismiss: this._closePanel.bind(this), type: index_1.PanelType.largeFixed, headerText: 'Large Panel'}, 
                React.createElement("span", {className: 'ms-font-m'}, "Content goes here.")
            )));
    };
    PanelLargeFixedExample.prototype._showPanel = function () {
        this.setState({ showPanel: true });
    };
    PanelLargeFixedExample.prototype._closePanel = function () {
        this.setState({ showPanel: false });
    };
    return PanelLargeFixedExample;
}(React.Component));
exports.PanelLargeFixedExample = PanelLargeFixedExample;

//# sourceMappingURL=Panel.LargeFixed.Example.js.map
