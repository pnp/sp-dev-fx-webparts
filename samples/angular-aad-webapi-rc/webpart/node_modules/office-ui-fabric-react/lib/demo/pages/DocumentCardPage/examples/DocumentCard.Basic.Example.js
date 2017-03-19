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
var DocumentCardBasicExample = (function (_super) {
    __extends(DocumentCardBasicExample, _super);
    function DocumentCardBasicExample() {
        _super.apply(this, arguments);
    }
    DocumentCardBasicExample.prototype.render = function () {
        var previewProps = {
            previewImages: [
                {
                    name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
                    url: 'http://bing.com',
                    previewImageSrc: 'dist/document-preview.png',
                    iconSrc: 'dist/icon-ppt.png',
                    imageFit: index_1.ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f'
                }
            ],
        };
        return (React.createElement(index_1.DocumentCard, {onClickHref: 'http://bing.com'}, 
            React.createElement(index_1.DocumentCardPreview, __assign({}, previewProps)), 
            React.createElement(index_1.DocumentCardTitle, {title: 'Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_it_needs_truncating.pptx', shouldTruncate: true}), 
            React.createElement(index_1.DocumentCardActivity, {activity: 'Created a few minutes ago', people: [
                { name: 'Annie Lindqvist', profileImageSrc: 'images/persona-female.png' }
            ]})));
    };
    return DocumentCardBasicExample;
}(React.Component));
exports.DocumentCardBasicExample = DocumentCardBasicExample;

//# sourceMappingURL=DocumentCard.Basic.Example.js.map
