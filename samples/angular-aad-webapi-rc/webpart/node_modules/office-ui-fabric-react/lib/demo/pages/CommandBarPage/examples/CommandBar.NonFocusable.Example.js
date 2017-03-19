"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var data_nonFocusable_1 = require('./data-nonFocusable');
var CommandBarNonFocusableItemsExample = (function (_super) {
    __extends(CommandBarNonFocusableItemsExample, _super);
    function CommandBarNonFocusableItemsExample() {
        _super.apply(this, arguments);
    }
    CommandBarNonFocusableItemsExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.CommandBar, {isSearchBoxVisible: false, items: data_nonFocusable_1.itemsNonFocusable, farItems: data_nonFocusable_1.farItemsNonFocusable})
        ));
    };
    return CommandBarNonFocusableItemsExample;
}(React.Component));
exports.CommandBarNonFocusableItemsExample = CommandBarNonFocusableItemsExample;

//# sourceMappingURL=CommandBar.NonFocusable.Example.js.map
