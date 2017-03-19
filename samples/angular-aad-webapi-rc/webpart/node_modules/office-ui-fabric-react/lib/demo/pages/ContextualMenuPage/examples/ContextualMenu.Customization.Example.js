"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var css_1 = require('../../../../utilities/css');
var index_1 = require('../../../../index');
require('./ContextualMenuExample.scss');
var ContextualMenuCustomizationExample = (function (_super) {
    __extends(ContextualMenuCustomizationExample, _super);
    function ContextualMenuCustomizationExample() {
        _super.call(this);
        this._onClick = this._onClick.bind(this);
        this._onDismiss = this._onDismiss.bind(this);
        this.state = {
            selection: {},
            isContextMenuVisible: false
        };
    }
    ContextualMenuCustomizationExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Button, {onClick: this._onClick, className: 'ContextualMenuButton3'}, " Click for ContextualMenu "), 
            this.state.isContextMenuVisible ? (React.createElement(index_1.ContextualMenu, {target: '.ContextualMenuButton3', shouldFocusOnMount: false, onDismiss: this._onDismiss, directionalHint: index_1.DirectionalHint.bottomLeftEdge, className: 'ms-ContextualMenu-customizationExample', items: [
                {
                    key: 'newItem',
                    icon: 'Add',
                    items: [
                        {
                            key: 'emailMessage',
                            name: 'Email message',
                        },
                        {
                            key: 'calendarEvent',
                            name: 'Calendar event',
                        }
                    ],
                    name: 'New'
                },
                {
                    key: 'upload',
                    icon: 'Upload',
                    name: 'Upload'
                },
                {
                    key: 'divider_1',
                    name: '-',
                },
                {
                    key: 'charm',
                    name: 'Charm',
                    className: 'Charm-List',
                    items: [
                        {
                            key: 'none',
                            name: 'None'
                        },
                        {
                            key: 'bulb',
                            name: 'Lightbulb',
                            onRender: this._renderCharmMenuItem,
                            className: 'ms-ContextualMenu-customizationExample-item'
                        },
                        {
                            key: 'run',
                            name: 'Running',
                            onRender: this._renderCharmMenuItem,
                            className: 'ms-ContextualMenu-customizationExample-item'
                        },
                        {
                            key: 'plane',
                            name: 'Airplane',
                            onRender: this._renderCharmMenuItem,
                            className: 'ms-ContextualMenu-customizationExample-item'
                        },
                        {
                            key: 'page',
                            name: 'Page',
                            onRender: this._renderCharmMenuItem,
                            className: 'ms-ContextualMenu-customizationExample-item'
                        },
                        {
                            key: 'cake',
                            name: 'Cake',
                            onRender: this._renderCharmMenuItem,
                            className: 'ms-ContextualMenu-customizationExample-item'
                        },
                        {
                            key: 'soccer',
                            name: 'Soccer',
                            onRender: this._renderCharmMenuItem,
                            className: 'ms-ContextualMenu-customizationExample-item'
                        },
                        {
                            key: 'home',
                            name: 'Home',
                            onRender: this._renderCharmMenuItem,
                            className: 'ms-ContextualMenu-customizationExample-item'
                        },
                        {
                            key: 'emoji',
                            name: 'Emoji2',
                            onRender: this._renderCharmMenuItem,
                            className: 'ms-ContextualMenu-customizationExample-item'
                        },
                        {
                            key: 'work',
                            name: 'Work',
                            onRender: this._renderCharmMenuItem,
                            className: 'ms-ContextualMenu-customizationExample-item'
                        },
                        {
                            key: 'coffee',
                            name: 'Coffee',
                            onRender: this._renderCharmMenuItem,
                            className: 'ms-ContextualMenu-customizationExample-item'
                        },
                        {
                            key: 'people',
                            name: 'People',
                            onRender: this._renderCharmMenuItem,
                            className: 'ms-ContextualMenu-customizationExample-item'
                        },
                        {
                            key: 'stopwatch',
                            name: 'Stopwatch',
                            onRender: this._renderCharmMenuItem,
                            className: 'ms-ContextualMenu-customizationExample-item'
                        },
                        {
                            key: 'music',
                            name: 'MusicInCollectionFill',
                            onRender: this._renderCharmMenuItem,
                            className: 'ms-ContextualMenu-customizationExample-item'
                        },
                        {
                            key: 'lock',
                            name: 'Lock',
                            onRender: this._renderCharmMenuItem,
                            className: 'ms-ContextualMenu-customizationExample-item'
                        }
                    ]
                },
                {
                    key: 'categories',
                    name: 'Categorize',
                    items: [
                        {
                            key: 'categories',
                            name: 'categories',
                            categoryList: [
                                {
                                    name: 'Personal',
                                    color: 'yellow'
                                },
                                {
                                    name: 'Work',
                                    color: 'green'
                                },
                                {
                                    name: 'Birthday',
                                    color: 'blue'
                                },
                                {
                                    name: 'Spam',
                                    color: 'grey'
                                },
                                {
                                    name: 'Urgent',
                                    color: 'red'
                                },
                                {
                                    name: 'Hobbies',
                                    color: 'black'
                                },
                            ],
                            onRender: this._renderCategoriesList
                        },
                        {
                            key: 'divider_1',
                            name: '-',
                        },
                        {
                            key: 'clear',
                            name: 'Clear categories'
                        },
                        {
                            key: 'manage',
                            name: 'Manage categories'
                        }
                    ]
                }
            ]})) : null));
    };
    ContextualMenuCustomizationExample.prototype._renderCharmMenuItem = function (item) {
        return React.createElement("i", {className: css_1.css('ms-Icon', 'ms-ContextualMenu-customizationExample-icon', 'ms-Icon--' + item.name)});
    };
    ContextualMenuCustomizationExample.prototype._renderCategoriesList = function (item) {
        return (React.createElement("ul", {className: 'ms-ContextualMenu-customizationExample-categoriesList'}, 
            React.createElement("li", {className: 'ms-ContextualMenu-item'}, item.categoryList.map(function (category) {
                return React.createElement("button", {className: 'ms-ContextualMenu-link', role: 'menuitem'}, 
                    React.createElement("div", null, 
                        React.createElement("span", {className: 'ms-ContextualMenu-icon ms-ContextualMenu-customizationExample-categorySwatch', style: { backgroundColor: category.color }}), 
                        React.createElement("span", {className: 'ms-ContextualMenu-itemText ms-font-m ms-font-weight-regular'}, category.name))
                );
            }))
        ));
    };
    ContextualMenuCustomizationExample.prototype._onClick = function (event) {
        this.setState({ isContextMenuVisible: true });
    };
    ContextualMenuCustomizationExample.prototype._onDismiss = function (event) {
        this.setState({ isContextMenuVisible: false });
    };
    return ContextualMenuCustomizationExample;
}(React.Component));
exports.ContextualMenuCustomizationExample = ContextualMenuCustomizationExample;

//# sourceMappingURL=ContextualMenu.Customization.Example.js.map
