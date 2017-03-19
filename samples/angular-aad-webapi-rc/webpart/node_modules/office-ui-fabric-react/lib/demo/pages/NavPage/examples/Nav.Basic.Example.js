"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
require('./Nav.Basic.Example.scss');
var NavBasicExample = (function (_super) {
    __extends(NavBasicExample, _super);
    function NavBasicExample(props) {
        _super.call(this, props);
        this._onClickHandler = this._onClickHandler.bind(this);
    }
    NavBasicExample.prototype.render = function () {
        return (React.createElement("div", {className: 'ms-NavExample-LeftPane'}, 
            React.createElement(index_1.Nav, {groups: [
                {
                    links: [
                        {
                            name: 'Home',
                            url: 'http://example.com',
                            links: [{
                                    name: 'Activity',
                                    url: 'http://msn.com',
                                    key: 'key1'
                                },
                                {
                                    name: 'News',
                                    url: 'http://msn.com',
                                    key: 'key2'
                                }],
                            isExpanded: true
                        },
                        { name: 'Documents', url: 'http://example.com', key: 'key3', isExpanded: true },
                        { name: 'Pages', url: 'http://msn.com', key: 'key4' },
                        { name: 'Notebook', url: 'http://msn.com', key: 'key5' },
                        { name: 'Long Name Test for elipse', url: 'http://msn.com', key: 'key6' },
                        {
                            name: 'Edit',
                            url: 'http://cnn.com',
                            onClick: this._onClickHandler2,
                            icon: 'Edit',
                            key: 'key8'
                        }
                    ]
                }
            ], expandedStateText: 'expanded', collapsedStateText: 'collapsed', selectedKey: 'key3'})
        ));
    };
    NavBasicExample.prototype._onClickHandler = function (e) {
        alert('test');
        return false;
    };
    NavBasicExample.prototype._onClickHandler2 = function (e) {
        return false;
    };
    return NavBasicExample;
}(React.Component));
exports.NavBasicExample = NavBasicExample;

//# sourceMappingURL=Nav.Basic.Example.js.map
