"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var PivotTabsExample = (function (_super) {
    __extends(PivotTabsExample, _super);
    function PivotTabsExample() {
        _super.apply(this, arguments);
    }
    PivotTabsExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Pivot, {linkFormat: index_1.PivotLinkFormat.tabs}, 
                React.createElement(index_1.PivotItem, {linkText: 'Foo'}, 
                    React.createElement(index_1.Label, null, "Pivot #1")
                ), 
                React.createElement(index_1.PivotItem, {linkText: 'Bar'}, 
                    React.createElement(index_1.Label, null, "Pivot #2")
                ), 
                React.createElement(index_1.PivotItem, {linkText: 'Bas'}, 
                    React.createElement(index_1.Label, null, "Pivot #3")
                ), 
                React.createElement(index_1.PivotItem, {linkText: 'Biz'}, 
                    React.createElement(index_1.Label, null, "Pivot #4")
                ))
        ));
    };
    return PivotTabsExample;
}(React.Component));
exports.PivotTabsExample = PivotTabsExample;

//# sourceMappingURL=Pivot.Tabs.Example.js.map
