"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var PivotBasicExample = (function (_super) {
    __extends(PivotBasicExample, _super);
    function PivotBasicExample() {
        _super.apply(this, arguments);
    }
    PivotBasicExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Pivot, null, 
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
    return PivotBasicExample;
}(React.Component));
exports.PivotBasicExample = PivotBasicExample;

//# sourceMappingURL=Pivot.Basic.Example.js.map
