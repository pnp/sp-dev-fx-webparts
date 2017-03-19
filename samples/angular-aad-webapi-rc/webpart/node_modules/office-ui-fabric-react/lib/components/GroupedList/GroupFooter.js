"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var Link_1 = require('../../Link');
var GroupSpacer_1 = require('./GroupSpacer');
var autobind_1 = require('../../utilities/autobind');
require('./GroupFooter.scss');
var GroupFooter = (function (_super) {
    __extends(GroupFooter, _super);
    function GroupFooter() {
        _super.apply(this, arguments);
    }
    GroupFooter.prototype.render = function () {
        var _a = this.props, group = _a.group, groupLevel = _a.groupLevel, showAllLinkText = _a.showAllLinkText;
        return group && (React.createElement("div", {className: 'ms-groupFooter'}, 
            GroupSpacer_1.GroupSpacer({ count: groupLevel }), 
            React.createElement(Link_1.Link, {onClick: this._onSummarizeClick}, showAllLinkText)));
    };
    GroupFooter.prototype._onSummarizeClick = function (ev) {
        this.props.onToggleSummarize(this.props.group);
        ev.stopPropagation();
        ev.preventDefault();
    };
    __decorate([
        autobind_1.autobind
    ], GroupFooter.prototype, "_onSummarizeClick", null);
    return GroupFooter;
}(React.Component));
exports.GroupFooter = GroupFooter;

//# sourceMappingURL=GroupFooter.js.map
