"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var PivotRemoveExample = (function (_super) {
    __extends(PivotRemoveExample, _super);
    function PivotRemoveExample(props) {
        _super.call(this, props);
        this._shouldShowFirstPivotItem = true;
        this.state = {
            shouldShowFirstPivotItem: true
        };
        this._handleClick = this._handleClick.bind(this);
    }
    PivotRemoveExample.prototype.render = function () {
        var pivotArray = [];
        if (this.state.shouldShowFirstPivotItem) {
            pivotArray.push(React.createElement(index_1.PivotItem, {linkText: 'Foo', itemKey: 'Foo', key: 'Foo'}, 
                React.createElement(index_1.Label, null, "Click the button below to show/hide this pivot item."), 
                React.createElement(index_1.Label, null, "The selected item will not change when the number of pivot items changes."), 
                React.createElement(index_1.Label, null, "If the selected item was removed, the new first item will be selected.")));
        }
        pivotArray = pivotArray.concat((React.createElement(index_1.PivotItem, {linkText: 'Bar', itemKey: 'Bar', key: 'Bar'}, 
            React.createElement(index_1.Label, null, "Pivot #2")
        )), (React.createElement(index_1.PivotItem, {linkText: 'Bas', itemKey: 'Bas', key: 'Bas'}, 
            React.createElement(index_1.Label, null, "Pivot #3")
        )), (React.createElement(index_1.PivotItem, {linkText: 'Biz', itemKey: 'Biz', key: 'Biz'}, 
            React.createElement(index_1.Label, null, "Pivot #4")
        )));
        return (React.createElement("div", null, 
            React.createElement(index_1.Pivot, {linkSize: index_1.PivotLinkSize.large, linkFormat: index_1.PivotLinkFormat.tabs}, pivotArray), 
            React.createElement("div", null, 
                React.createElement(index_1.Button, {onClick: this._handleClick}, (this.state.shouldShowFirstPivotItem ? 'Hide' : 'Show') + " First Pivot Item")
            )));
    };
    PivotRemoveExample.prototype._handleClick = function () {
        this._shouldShowFirstPivotItem = !this._shouldShowFirstPivotItem;
        this.setState({
            shouldShowFirstPivotItem: this._shouldShowFirstPivotItem
        });
    };
    return PivotRemoveExample;
}(React.Component));
exports.PivotRemoveExample = PivotRemoveExample;

//# sourceMappingURL=Pivot.Remove.Example.js.map
