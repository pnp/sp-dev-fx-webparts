"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var PivotTabsLargeExample = (function (_super) {
    __extends(PivotTabsLargeExample, _super);
    function PivotTabsLargeExample() {
        _super.apply(this, arguments);
    }
    PivotTabsLargeExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Pivot, {linkFormat: index_1.PivotLinkFormat.tabs, linkSize: index_1.PivotLinkSize.large}, 
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
                ), 
                React.createElement("div", null, "content not in a PivotItem"))
        ));
    };
    return PivotTabsLargeExample;
}(React.Component));
exports.PivotTabsLargeExample = PivotTabsLargeExample;

//# sourceMappingURL=Pivot.TabsLarge.Example.js.map
