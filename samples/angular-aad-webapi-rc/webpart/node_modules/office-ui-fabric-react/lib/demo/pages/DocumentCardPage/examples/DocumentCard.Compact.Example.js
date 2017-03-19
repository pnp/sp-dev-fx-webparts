"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require('react');
var index_1 = require('../../../../index');
var DocumentCardCompactExample = (function (_super) {
    __extends(DocumentCardCompactExample, _super);
    function DocumentCardCompactExample() {
        _super.apply(this, arguments);
    }
    DocumentCardCompactExample.prototype.render = function () {
        var previewProps = {
            getOverflowDocumentCountText: function (overflowCount) { return ("+" + overflowCount + " more"); },
            previewImages: [
                {
                    name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
                    url: 'http://bing.com',
                    previewImageSrc: 'dist/document-preview.png',
                    iconSrc: 'dist/icon-ppt.png',
                    width: 144
                },
                {
                    name: 'New Contoso Collaboration for Conference Presentation Draft',
                    url: 'http://bing.com',
                    previewImageSrc: 'dist/document-preview2.png',
                    iconSrc: 'dist/icon-ppt.png',
                    width: 144
                },
                {
                    name: 'Spec Sheet for design',
                    url: 'http://bing.com',
                    previewImageSrc: 'dist/document-preview3.png',
                    iconSrc: 'dist/icon-ppt.png',
                    width: 144
                },
                {
                    name: 'Contoso Marketing Presentation',
                    url: 'http://bing.com',
                    previewImageSrc: 'dist/document-preview.png',
                    iconSrc: 'dist/icon-ppt.png',
                    width: 144
                },
            ],
        };
        return (React.createElement("div", null, 
            React.createElement(index_1.DocumentCard, {type: index_1.DocumentCardType.compact, onClickHref: 'http://bing.com', accentColor: '#ce4b1f'}, 
                React.createElement(index_1.DocumentCardPreview, __assign({}, previewProps)), 
                React.createElement("div", {className: 'ms-DocumentCard-details'}, 
                    React.createElement(index_1.DocumentCardTitle, {title: '4 files were uploaded', shouldTruncate: true}), 
                    React.createElement(index_1.DocumentCardActivity, {activity: 'Created a few minutes ago', people: [
                        { name: 'Kat Larrson', profileImageSrc: 'images/persona-female.png' }
                    ]}))), 
            React.createElement("p", null), 
            React.createElement(index_1.DocumentCard, {type: index_1.DocumentCardType.compact, onClickHref: 'http://bing.com', accentColor: '#ce4b1f'}, 
                React.createElement(index_1.DocumentCardPreview, {previewImages: [previewProps.previewImages[0]]}), 
                React.createElement("div", {className: 'ms-DocumentCard-details'}, 
                    React.createElement(index_1.DocumentCardTitle, {title: 'Revenue stream proposal fiscal year 2016 version02.pptx', shouldTruncate: true}), 
                    React.createElement(index_1.DocumentCardActivity, {activity: 'Created a few minutes ago', people: [
                        { name: 'Kat Larrson', profileImageSrc: 'images/persona-female.png' }
                    ]})))));
    };
    return DocumentCardCompactExample;
}(React.Component));
exports.DocumentCardCompactExample = DocumentCardCompactExample;

//# sourceMappingURL=DocumentCard.Compact.Example.js.map
