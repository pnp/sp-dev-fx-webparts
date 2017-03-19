"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var DocumentCard_Basic_Example_1 = require('./examples/DocumentCard.Basic.Example');
var DocumentCard_Complete_Example_1 = require('./examples/DocumentCard.Complete.Example');
var DocumentCard_Compact_Example_1 = require('./examples/DocumentCard.Compact.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var DocumentCardBasicExampleCode = require('./examples/DocumentCard.Basic.Example.tsx');
var DocumentCardCompleteExampleCode = require('./examples/DocumentCard.Complete.Example.tsx');
var DocumentCardCompactExampleCode = require('./examples/DocumentCard.Compact.Example.tsx');
var DocumentCardPage = (function (_super) {
    __extends(DocumentCardPage, _super);
    function DocumentCardPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'DocumentCard');
    }
    DocumentCardPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'DocumentCard', componentName: 'DocumentCardExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'DocumentCard Basic', code: DocumentCardBasicExampleCode}, 
                React.createElement("p", null, "The default configuration for a card represents a single file, with space to denote the last significant event and the person involved."), 
                React.createElement(DocumentCard_Basic_Example_1.DocumentCardBasicExample, null)), 
            React.createElement(index_1.ExampleCard, {title: 'DocumentCard Complete', code: DocumentCardCompleteExampleCode}, 
                React.createElement("p", null, "This example shows a couple of optional abilities, including being able to have a card represent multiple items, being able to expose up to three relevant commands, and showing the number of views in the bottom right corner."), 
                React.createElement(DocumentCard_Complete_Example_1.DocumentCardCompleteExample, null)), 
            React.createElement(index_1.ExampleCard, {title: 'DocumentCard Compact Layout', code: DocumentCardCompactExampleCode}, 
                React.createElement("p", null, "When showing a card on a mobile device or a similarly narrow layout, you may choose this Compact layout which helps the filename remain scannable while giving roomy space for a preview thumbnail."), 
                React.createElement(DocumentCard_Compact_Example_1.DocumentCardCompactExample, null))), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'DocumentCard'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "A DocumentCard is a card representation of a file. This is usually richer than just seeing the file in a grid view, as the card can contain additional metadata or actions.")
        ), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use this control to represent Office documents or other user-relevant files in aggregate views, such as when you are showing the user’s most trending document."), 
                React.createElement("li", null, "Incorporate metadata that is relevant and useful in this particular view. A card can be specialized to be about the document’s latest changes, or about the document’s popularity, as you see fit."), 
                React.createElement("li", null, "Use the DocumentCard when you are illustrating an event that encompasses multiple files. For example, a card can be configured to represent a single upload action that consisted in adding more than one file."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Don’t use the DocumentCard in views where the user is likely to be performing bulk operations in files, or when the list may get very long. Specifically, if you are showing all the items inside an actual folder, a card may be overkill because the majority of the items in the folder may not have interesting metadata."), 
                React.createElement("li", null, "Don’t use the DocumentCard if space is at a premium or you can’t show relevant and timely commands or metadata. Cards are useful because they can expose on-item interactions like “Share” buttons or view counts. If your app does not need this, show a simple grid or list of items instead, which are easier to scan."))
        ), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return DocumentCardPage;
}(React.Component));
exports.DocumentCardPage = DocumentCardPage;

//# sourceMappingURL=DocumentCardPage.js.map
