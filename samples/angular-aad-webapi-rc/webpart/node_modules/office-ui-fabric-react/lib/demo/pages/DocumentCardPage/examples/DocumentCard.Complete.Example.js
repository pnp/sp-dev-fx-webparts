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
var DocumentCardActions_1 = require('../../../../components/DocumentCard/DocumentCardActions');
var DocumentCardActivity_1 = require('../../../../components/DocumentCard/DocumentCardActivity');
var DocumentCardLocation_1 = require('../../../../components/DocumentCard/DocumentCardLocation');
var DocumentCardPreview_1 = require('../../../../components/DocumentCard/DocumentCardPreview');
var DocumentCardTitle_1 = require('../../../../components/DocumentCard/DocumentCardTitle');
var DocumentCardCompleteExample = (function (_super) {
    __extends(DocumentCardCompleteExample, _super);
    function DocumentCardCompleteExample() {
        _super.apply(this, arguments);
    }
    DocumentCardCompleteExample.prototype.render = function () {
        var previewProps = {
            getOverflowDocumentCountText: function (overflowCount) { return ("+" + overflowCount + " more"); },
            previewImages: [
                {
                    name: '2016 Conference Presentation',
                    url: 'http://bing.com',
                    previewImageSrc: 'dist/document-preview.png',
                    iconSrc: 'dist/icon-ppt.png',
                    imageFit: index_1.ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f'
                },
                {
                    name: 'New Contoso Collaboration for Conference Presentation Draft',
                    url: 'http://bing.com',
                    previewImageSrc: 'dist/document-preview2.png',
                    iconSrc: 'dist/icon-ppt.png',
                    imageFit: index_1.ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f'
                },
                {
                    name: 'Spec Sheet for design',
                    url: 'http://bing.com',
                    previewImageSrc: 'dist/document-preview3.png',
                    iconSrc: 'dist/icon-ppt.png',
                    imageFit: index_1.ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f'
                },
                {
                    name: 'Contoso Marketing Presentation',
                    url: 'http://bing.com',
                    previewImageSrc: 'dist/document-preview.png',
                    iconSrc: 'dist/icon-ppt.png',
                    imageFit: index_1.ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f'
                },
                {
                    name: 'Notes from Ignite conference',
                    url: 'http://bing.com',
                    previewImageSrc: 'dist/document-preview2.png',
                    iconSrc: 'dist/icon-ppt.png',
                    imageFit: index_1.ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f'
                },
                {
                    name: 'FY17 Cost Projections',
                    url: 'http://bing.com',
                    previewImageSrc: 'dist/document-preview3.png',
                    iconSrc: 'dist/icon-ppt.png',
                    imageFit: index_1.ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f'
                }
            ],
        };
        return (React.createElement(index_1.DocumentCard, {onClick: function () { console.log('You clicked the card.'); }}, 
            React.createElement(DocumentCardPreview_1.DocumentCardPreview, __assign({}, previewProps)), 
            React.createElement(DocumentCardLocation_1.DocumentCardLocation, {location: 'Marketing Documents', locationHref: 'http://microsoft.com', ariaLabel: 'Location, Marketing Documents'}), 
            React.createElement(DocumentCardTitle_1.DocumentCardTitle, {title: '6 files were uploaded'}), 
            React.createElement(DocumentCardActivity_1.DocumentCardActivity, {activity: 'Created Feb 23, 2016', people: [
                { name: 'Annie Lindqvist', profileImageSrc: 'images/persona-female.png' },
                { name: 'Roko Kolar', profileImageSrc: '', initials: 'JH' },
                { name: 'Greta Lundberg', profileImageSrc: 'images/persona-female.png' }
            ]}), 
            React.createElement(DocumentCardActions_1.DocumentCardActions, {actions: [
                {
                    icon: 'Share',
                    onClick: function (ev) {
                        console.log('You clicked the share action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                    ariaLabel: 'share action'
                },
                {
                    icon: 'Pin',
                    onClick: function (ev) {
                        console.log('You clicked the pin action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                    ariaLabel: 'pin action'
                },
                {
                    icon: 'Ringer',
                    onClick: function (ev) {
                        console.log('You clicked the ringer action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                    ariaLabel: 'ringer action'
                },
            ], views: 432})));
    };
    return DocumentCardCompleteExample;
}(React.Component));
exports.DocumentCardCompleteExample = DocumentCardCompleteExample;

//# sourceMappingURL=DocumentCard.Complete.Example.js.map
