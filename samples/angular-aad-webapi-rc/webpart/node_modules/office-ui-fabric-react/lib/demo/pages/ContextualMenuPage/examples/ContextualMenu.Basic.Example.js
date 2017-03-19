"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
require('./ContextualMenuExample.scss');
var ContextualMenuBasicExample = (function (_super) {
    __extends(ContextualMenuBasicExample, _super);
    function ContextualMenuBasicExample() {
        _super.call(this);
        this.state = { isContextMenuVisible: false };
        this._onClick = this._onClick.bind(this);
        this._onDismiss = this._onDismiss.bind(this);
    }
    ContextualMenuBasicExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Button, {onClick: this._onClick, id: 'ContextualMenuButton1'}, " Click for ContextualMenu "), 
            this.state.isContextMenuVisible ? (React.createElement(index_1.ContextualMenu, {shouldFocusOnMount: true, target: this.state.target, onDismiss: this._onDismiss, directionalHint: index_1.getRTL() ? index_1.DirectionalHint.bottomRightEdge : index_1.DirectionalHint.bottomLeftEdge, items: [
                {
                    key: 'newItem',
                    iconProps: {
                        iconName: index_1.IconName.Add
                    },
                    items: [
                        {
                            key: 'emailMessage',
                            name: 'Email message',
                            title: 'Create an email'
                        },
                        {
                            key: 'calendarEvent',
                            name: 'Calendar event',
                            title: 'Create a calendar event',
                        }
                    ],
                    name: 'New'
                },
                {
                    key: 'upload',
                    iconProps: {
                        iconName: index_1.IconName.Upload,
                        style: {
                            color: 'salmon'
                        }
                    },
                    name: 'Upload (Custom Color)',
                    title: 'Upload a file'
                },
                {
                    key: 'divider_1',
                    name: '-',
                },
                {
                    key: 'rename',
                    name: 'Rename'
                },
                {
                    key: 'properties',
                    name: 'Properties'
                },
                {
                    key: 'disabled',
                    name: 'Disabled item',
                    disabled: true,
                },
                {
                    key: 'divider_2',
                    name: '-',
                },
                {
                    key: 'share',
                    iconProps: {
                        iconName: index_1.IconName.Share
                    },
                    items: [
                        {
                            key: 'sharetoemail',
                            name: 'Share to Email',
                            iconProps: {
                                iconName: index_1.IconName.Mail
                            },
                        },
                        {
                            key: 'sharetofacebook',
                            name: 'Share to Facebook',
                        },
                        {
                            key: 'sharetotwitter',
                            name: 'Share to Twitter',
                            iconProps: {
                                iconName: index_1.IconName.Share
                            },
                            items: [
                                {
                                    key: 'sharetoemail_1',
                                    name: 'Share to Email',
                                    title: 'Share to Email',
                                    iconProps: {
                                        iconName: index_1.IconName.Mail
                                    },
                                },
                                {
                                    key: 'sharetofacebook_1',
                                    name: 'Share to Facebook',
                                    title: 'Share to Facebook',
                                },
                                {
                                    key: 'sharetotwitter_1',
                                    name: 'Share to Twitter',
                                    title: 'Share to Twitter',
                                    iconProps: {
                                        iconName: index_1.IconName.Share
                                    }
                                },
                            ],
                        },
                    ],
                    name: 'Share'
                },
                {
                    key: 'print',
                    iconProps: {
                        iconName: index_1.IconName.Print
                    },
                    name: 'Print'
                },
                {
                    key: 'music',
                    iconProps: {
                        iconName: index_1.IconName.MusicInCollectionFill
                    },
                    name: 'Music',
                },
                {
                    key: 'divider_3',
                    name: '-',
                },
                {
                    key: 'Bing',
                    name: 'Go to Bing',
                    href: 'http://www.bing.com'
                },
            ]})) : (null)));
    };
    ContextualMenuBasicExample.prototype._onClick = function (event) {
        this.setState({ target: event.nativeEvent, isContextMenuVisible: true });
    };
    ContextualMenuBasicExample.prototype._onDismiss = function (event) {
        this.setState({ isContextMenuVisible: false });
    };
    return ContextualMenuBasicExample;
}(React.Component));
exports.ContextualMenuBasicExample = ContextualMenuBasicExample;

//# sourceMappingURL=ContextualMenu.Basic.Example.js.map
