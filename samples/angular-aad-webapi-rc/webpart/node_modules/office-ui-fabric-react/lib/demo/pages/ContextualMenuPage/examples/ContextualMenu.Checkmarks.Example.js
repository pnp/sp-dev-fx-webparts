"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
require('./ContextualMenuExample.scss');
var keys = ['newItem', 'share', 'mobile', 'enablePrint', 'enableMusic', 'newSub', 'emailMessage', 'calendarEvent'];
var ContextualMenuCheckmarksExample = (function (_super) {
    __extends(ContextualMenuCheckmarksExample, _super);
    function ContextualMenuCheckmarksExample() {
        _super.call(this);
        this._onToggleSelect = this._onToggleSelect.bind(this);
        this._onClick = this._onClick.bind(this);
        this._onDismiss = this._onDismiss.bind(this);
        this.state = {
            selection: {},
            isContextMenuVisible: false
        };
    }
    ContextualMenuCheckmarksExample.prototype.render = function () {
        var selection = this.state.selection;
        return (React.createElement("div", null, 
            React.createElement(index_1.Button, {onClick: this._onClick, id: 'ContextualMenuButton2'}, " Click for ContextualMenu "), 
            this.state.isContextMenuVisible ? (React.createElement(index_1.ContextualMenu, {target: '#ContextualMenuButton2', shouldFocusOnMount: false, onDismiss: this._onDismiss, directionalHint: index_1.DirectionalHint.bottomLeftEdge, items: [
                {
                    key: keys[0],
                    name: 'New',
                    canCheck: true,
                    isChecked: selection[keys[0]],
                    onClick: this._onToggleSelect
                },
                {
                    key: keys[1],
                    name: 'Share',
                    canCheck: true,
                    isChecked: selection[keys[1]],
                    onClick: this._onToggleSelect
                },
                {
                    key: keys[2],
                    name: 'Mobile',
                    canCheck: true,
                    isChecked: selection[keys[2]],
                    onClick: this._onToggleSelect
                },
                {
                    key: 'divider_1',
                    name: '-',
                },
                {
                    key: keys[3],
                    name: 'Print',
                    canCheck: true,
                    isChecked: selection[keys[3]],
                    onClick: this._onToggleSelect
                },
                {
                    key: keys[4],
                    name: 'Music',
                    canCheck: true,
                    isChecked: selection[keys[4]],
                    onClick: this._onToggleSelect
                },
                {
                    key: keys[5],
                    items: [
                        {
                            key: keys[6],
                            name: 'Email message',
                            canCheck: true,
                            isChecked: selection[keys[6]],
                            onClick: this._onToggleSelect
                        },
                        {
                            key: keys[7],
                            name: 'Calendar event',
                            canCheck: true,
                            isChecked: selection[keys[7]],
                            onClick: this._onToggleSelect
                        }
                    ],
                    name: 'New'
                },
            ]})) : (null)));
    };
    ContextualMenuCheckmarksExample.prototype._onToggleSelect = function (ev, item) {
        var selection = this.state.selection;
        selection[item.key] = !selection[item.key];
        this.setState({
            selection: selection
        });
    };
    ContextualMenuCheckmarksExample.prototype._onClick = function (event) {
        this.setState({ isContextMenuVisible: true });
    };
    ContextualMenuCheckmarksExample.prototype._onDismiss = function () {
        this.setState({ isContextMenuVisible: false });
    };
    return ContextualMenuCheckmarksExample;
}(React.Component));
exports.ContextualMenuCheckmarksExample = ContextualMenuCheckmarksExample;

//# sourceMappingURL=ContextualMenu.Checkmarks.Example.js.map
