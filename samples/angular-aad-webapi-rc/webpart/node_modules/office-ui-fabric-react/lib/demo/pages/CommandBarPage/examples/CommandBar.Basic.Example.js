"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var CommandBar_1 = require('../../../../CommandBar');
var Toggle_1 = require('../../../../Toggle');
var object_1 = require('../../../../utilities/object');
var CommandBarBasicExample = (function (_super) {
    __extends(CommandBarBasicExample, _super);
    function CommandBarBasicExample(props) {
        _super.call(this, props);
        this.state = {
            isSearchBoxVisible: true,
            areNamesVisible: true,
            areIconsVisible: true
        };
    }
    CommandBarBasicExample.prototype.render = function () {
        var _this = this;
        var _a = this.props, items = _a.items, farItems = _a.farItems;
        var _b = this.state, searchBoxVisible = _b.isSearchBoxVisible, iconsVisible = _b.areIconsVisible, namesVisible = _b.areNamesVisible;
        var filteredItems = items.map(function (item) { return object_1.assign({}, item, {
            name: namesVisible ? item.name : '',
            icon: iconsVisible ? item.icon : ''
        }); });
        var filteredFarItems = farItems.map(function (item) { return object_1.assign({}, item, {
            name: namesVisible ? item.name : '',
            icon: iconsVisible ? item.icon : ''
        }); });
        return (React.createElement("div", null, 
            React.createElement(Toggle_1.Toggle, {label: 'Show search box', checked: searchBoxVisible, onChanged: function (isSearchBoxVisible) { return _this.setState({ isSearchBoxVisible: isSearchBoxVisible }); }, onText: 'Visible', offText: 'Hidden'}), 
            React.createElement(Toggle_1.Toggle, {label: 'Show names', checked: namesVisible, onChanged: function (areNamesVisible) { return _this.setState({ areNamesVisible: areNamesVisible }); }, onText: 'Visible', offText: 'Hidden'}), 
            React.createElement(Toggle_1.Toggle, {label: 'Show icons', checked: iconsVisible, onChanged: function (areIconsVisible) { return _this.setState({ areIconsVisible: areIconsVisible }); }, onText: 'Visible', offText: 'Hidden'}), 
            React.createElement(CommandBar_1.CommandBar, {isSearchBoxVisible: searchBoxVisible, searchPlaceholderText: 'Search...', elipisisAriaLabel: 'More options', items: filteredItems, farItems: filteredFarItems})));
    };
    return CommandBarBasicExample;
}(React.Component));
exports.CommandBarBasicExample = CommandBarBasicExample;

//# sourceMappingURL=CommandBar.Basic.Example.js.map
