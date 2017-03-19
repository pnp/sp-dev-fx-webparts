"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var PivotLargeExample = (function (_super) {
    __extends(PivotLargeExample, _super);
    function PivotLargeExample() {
        _super.apply(this, arguments);
    }
    PivotLargeExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Pivot, {linkSize: index_1.PivotLinkSize.large}, 
                React.createElement(index_1.PivotItem, {linkText: 'My Files'}, 
                    React.createElement(index_1.Label, null, "Pivot #1")
                ), 
                React.createElement(index_1.PivotItem, {linkText: 'Recent'}, 
                    React.createElement(index_1.Label, null, "Pivot #2")
                ), 
                React.createElement(index_1.PivotItem, {linkText: 'Shared with me'}, 
                    React.createElement(index_1.Label, null, "Pivot #3")
                ))
        ));
    };
    return PivotLargeExample;
}(React.Component));
exports.PivotLargeExample = PivotLargeExample;

//# sourceMappingURL=Pivot.Large.Example.js.map
