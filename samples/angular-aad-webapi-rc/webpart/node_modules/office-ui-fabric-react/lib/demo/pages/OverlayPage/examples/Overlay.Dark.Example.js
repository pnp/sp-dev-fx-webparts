"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
require('./Overlay.Example.scss');
var OverlayDarkExample = (function (_super) {
    __extends(OverlayDarkExample, _super);
    function OverlayDarkExample() {
        _super.call(this);
        this._onClick = this._onClick.bind(this);
        this.state = {
            isOverlayVisible: false
        };
    }
    OverlayDarkExample.prototype.render = function () {
        var isOverlayVisible = this.state.isOverlayVisible;
        return (React.createElement("div", null, 
            React.createElement(index_1.Button, {onClick: this._onClick}, "Show the overlay"), 
            isOverlayVisible && (React.createElement(index_1.Overlay, {isDarkThemed: true, onClick: this._onClick}, 
                React.createElement("div", {className: 'OverlayExample-content'}, 
                    React.createElement("p", null, "I am content within the overlay.")
                )
            ))));
    };
    OverlayDarkExample.prototype._onClick = function () {
        this.setState({
            isOverlayVisible: !this.state.isOverlayVisible
        });
    };
    return OverlayDarkExample;
}(React.Component));
exports.OverlayDarkExample = OverlayDarkExample;

//# sourceMappingURL=Overlay.Dark.Example.js.map
