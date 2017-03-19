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
var DocumentCard_Props_1 = require('./DocumentCard.Props');
var css_1 = require('../../utilities/css');
require('./DocumentCard.scss');
var autobind_1 = require('../../utilities/autobind');
var DocumentCard = (function (_super) {
    __extends(DocumentCard, _super);
    function DocumentCard() {
        _super.apply(this, arguments);
    }
    DocumentCard.prototype.render = function () {
        var _a = this.props, onClick = _a.onClick, onClickHref = _a.onClickHref, children = _a.children, className = _a.className, type = _a.type, accentColor = _a.accentColor;
        var actionable = (onClick || onClickHref) ? true : false;
        // Override the border color if an accent color was provided (compact card only)
        var style;
        if (type === DocumentCard_Props_1.DocumentCardType.compact && accentColor) {
            style = {
                borderBottomColor: accentColor
            };
        }
        return (React.createElement("div", {className: css_1.css('ms-DocumentCard', {
            'ms-DocumentCard--actionable': actionable,
            'ms-DocumentCard--compact': type === DocumentCard_Props_1.DocumentCardType.compact ? true : false
        }, className), onClick: actionable ? this._onClick : null, style: style}, children));
    };
    DocumentCard.prototype._onClick = function (ev) {
        var _a = this.props, onClick = _a.onClick, onClickHref = _a.onClickHref;
        if (onClick) {
            onClick(ev);
        }
        else if (!onClick && onClickHref) {
            // If no onClick Function was provided and we do have an onClickHref, redirect to the onClickHref
            window.location.href = onClickHref;
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    DocumentCard.defaultProps = {
        type: DocumentCard_Props_1.DocumentCardType.normal
    };
    __decorate([
        autobind_1.autobind
    ], DocumentCard.prototype, "_onClick", null);
    return DocumentCard;
}(React.Component));
exports.DocumentCard = DocumentCard;

//# sourceMappingURL=DocumentCard.js.map
