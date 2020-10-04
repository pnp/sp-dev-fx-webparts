import * as React from 'react';
import * as ReactDom from 'react-dom';
import PropertyPaneMarkdownContentHost from './PropertyPaneMarkdownContentHost';
import { PropertyPaneFieldType } from "@microsoft/sp-property-pane";
var PropertyPaneMarkdownContentBuilder = /** @class */ (function () {
    function PropertyPaneMarkdownContentBuilder(_properties) {
        this.type = PropertyPaneFieldType.Custom;
        this.properties = {
            key: _properties.key,
            label: _properties.label,
            markdown: _properties.markdown,
            markdownProps: _properties.markdownProps,
            onRender: this.onRender.bind(this),
        };
    }
    PropertyPaneMarkdownContentBuilder.prototype.render = function () {
        if (!this.elem) {
            return;
        }
        this.onRender(this.elem);
    };
    PropertyPaneMarkdownContentBuilder.prototype.onRender = function (elem, ctx, changeCallback) {
        if (!this.elem) {
            this.elem = elem;
        }
        var element = React.createElement(PropertyPaneMarkdownContentHost, {
            description: this.properties.label,
            markdown: this.properties.markdown,
            markdownProps: this.properties.markdownProps
        });
        ReactDom.render(element, elem);
    };
    return PropertyPaneMarkdownContentBuilder;
}());
/**
 * Creates a property pane section that displays read-only markdown content.
 * Use this property pane control to display additional instructions, help
 * screens, etc.
 *
 * @param properties
 */
export function PropertyPaneMarkdownContent(properties) {
    return new PropertyPaneMarkdownContentBuilder(properties);
}
//# sourceMappingURL=PropertyPaneMarkdownContent.js.map