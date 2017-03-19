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
/* tslint:disable:no-unused-variable */
var React = require('react');
var BaseComponent_1 = require('../../common/BaseComponent');
var autobind_1 = require('../../utilities/autobind');
require('./DocumentCardTitle.scss');
var TRUNCATION_SEPARATOR = '&hellip;';
var TRUNCATION_MINIMUM_LENGTH = 40; // This is the length we know can fit into the min width of DocumentCard.
var TRUNCATION_MAXIMUM_LENGTH = 90 - TRUNCATION_SEPARATOR.length;
var TRUNCATION_FIRST_PIECE_LONGER_BY = 10;
var TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD = 5;
var DocumentCardTitle = (function (_super) {
    __extends(DocumentCardTitle, _super);
    function DocumentCardTitle(props) {
        _super.call(this, props);
        this.state = {
            truncatedTitleFirstPiece: '',
            truncatedTitleSecondPiece: ''
        };
    }
    DocumentCardTitle.prototype.componentDidMount = function () {
        var _a = this.props, title = _a.title, shouldTruncate = _a.shouldTruncate;
        if (shouldTruncate && title && title.length > TRUNCATION_MINIMUM_LENGTH) {
            if (this._doesTitleOverflow()) {
                this._startTruncation(this.props);
            }
            this._events.on(window, 'resize', this._updateTruncation);
        }
    };
    DocumentCardTitle.prototype.componentWillReceiveProps = function (newProps) {
        this._events.off(window, 'resize');
        this._isTruncated = false;
        if (newProps.shouldTruncate && newProps.title && newProps.title.length > TRUNCATION_MINIMUM_LENGTH) {
            this._startTruncation(newProps);
            this._events.on(window, 'resize', this._updateTruncation);
        }
    };
    DocumentCardTitle.prototype.componentDidUpdate = function () {
        // If we're truncating, make sure the title fits
        if (this.props.shouldTruncate) {
            this._shrinkTitle();
        }
    };
    DocumentCardTitle.prototype.render = function () {
        var _a = this.props, title = _a.title, shouldTruncate = _a.shouldTruncate;
        var _b = this.state, truncatedTitleFirstPiece = _b.truncatedTitleFirstPiece, truncatedTitleSecondPiece = _b.truncatedTitleSecondPiece;
        var documentCardTitle;
        if (shouldTruncate && this._isTruncated) {
            documentCardTitle = (React.createElement("div", {className: 'ms-DocumentCardTitle', ref: this._resolveRef('_titleElement'), title: title}, 
                truncatedTitleFirstPiece, 
                "…", 
                truncatedTitleSecondPiece));
        }
        else {
            documentCardTitle = (React.createElement("div", {className: 'ms-DocumentCardTitle', ref: this._resolveRef('_titleElement'), title: title}, title));
        }
        return documentCardTitle;
    };
    DocumentCardTitle.prototype._startTruncation = function (props) {
        var originalTitle = props.title;
        this._isTruncated = false;
        // If the title is really short, there's no need to truncate it
        if (originalTitle && originalTitle.length >= TRUNCATION_MINIMUM_LENGTH) {
            // Break the text into two pieces for assembly later
            if (originalTitle.length > TRUNCATION_MAXIMUM_LENGTH) {
                // The text is really long, so we can take a chunk out of the middle so the two pieces combine for the maximum length
                this._isTruncated = true;
                this.setState({
                    truncatedTitleFirstPiece: originalTitle.slice(0, TRUNCATION_MAXIMUM_LENGTH / 2 + TRUNCATION_FIRST_PIECE_LONGER_BY),
                    truncatedTitleSecondPiece: originalTitle.slice(originalTitle.length - (TRUNCATION_MAXIMUM_LENGTH / 2 - TRUNCATION_FIRST_PIECE_LONGER_BY))
                });
            }
            else {
                // The text is not so long, so we'll just break it into two pieces
                this.setState({
                    truncatedTitleFirstPiece: originalTitle.slice(0, Math.ceil(originalTitle.length / 2) + TRUNCATION_FIRST_PIECE_LONGER_BY),
                    truncatedTitleSecondPiece: originalTitle.slice(originalTitle.length - Math.floor(originalTitle.length / 2) + TRUNCATION_FIRST_PIECE_LONGER_BY)
                });
            }
        }
        // Save the width we just started truncation at, so that later we will only update truncation if necessary
        this._truncatedTitleAtWidth = this._titleElement.clientWidth;
    };
    DocumentCardTitle.prototype._shrinkTitle = function () {
        if (this._doesTitleOverflow()) {
            var _a = this.state, truncatedTitleFirstPiece = _a.truncatedTitleFirstPiece, truncatedTitleSecondPiece = _a.truncatedTitleSecondPiece;
            this._isTruncated = true;
            if (!truncatedTitleFirstPiece && !truncatedTitleSecondPiece) {
                this._startTruncation(this.props);
            }
            this.setState({
                truncatedTitleFirstPiece: truncatedTitleFirstPiece.slice(0, truncatedTitleFirstPiece.length - 1),
                truncatedTitleSecondPiece: truncatedTitleSecondPiece.slice(1)
            });
        }
    };
    DocumentCardTitle.prototype._doesTitleOverflow = function () {
        var titleElement = this._titleElement;
        return titleElement.scrollHeight > titleElement.clientHeight + TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD || titleElement.scrollWidth > titleElement.clientWidth;
    };
    DocumentCardTitle.prototype._updateTruncation = function () {
        // Only update truncation if the title's size has changed since the last time we truncated
        if (this._titleElement.clientWidth !== this._truncatedTitleAtWidth) {
            // Throttle truncation so that it doesn't happen during a window resize
            clearTimeout(this._scrollTimerId);
            this._scrollTimerId = this._async.setTimeout(this._startTruncation.bind(this, this.props), 250);
        }
    };
    __decorate([
        autobind_1.autobind
    ], DocumentCardTitle.prototype, "_startTruncation", null);
    return DocumentCardTitle;
}(BaseComponent_1.BaseComponent));
exports.DocumentCardTitle = DocumentCardTitle;

//# sourceMappingURL=DocumentCardTitle.js.map
