"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var PanelNonModalExample = (function (_super) {
    __extends(PanelNonModalExample, _super);
    function PanelNonModalExample() {
        _super.call(this);
        this.state = {
            showPanel: false
        };
    }
    PanelNonModalExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Button, {description: 'Opens the Sample Panel', onClick: this._showPanel.bind(this)}, "Open Panel"), 
            React.createElement(index_1.Panel, {isBlocking: false, isOpen: this.state.showPanel, onDismiss: this._closePanel.bind(this), type: index_1.PanelType.medium, headerText: 'Non-Modal Panel', closeButtonAriaLabel: 'Close'}, 
                React.createElement("span", {className: 'ms-font-m'}, "Content goes here.")
            )));
    };
    PanelNonModalExample.prototype._showPanel = function () {
        this.setState({ showPanel: true });
    };
    PanelNonModalExample.prototype._closePanel = function () {
        this.setState({ showPanel: false });
    };
    return PanelNonModalExample;
}(React.Component));
exports.PanelNonModalExample = PanelNonModalExample;

//# sourceMappingURL=Panel.NonModal.Example.js.map
