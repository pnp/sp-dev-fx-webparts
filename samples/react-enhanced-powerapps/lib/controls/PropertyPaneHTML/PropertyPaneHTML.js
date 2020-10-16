import * as React from 'react';
import * as ReactDom from 'react-dom';
import { PropertyPaneFieldType } from "@microsoft/sp-property-pane";
import PropertyPaneHTMLHost from './PropertyPaneHTMLHost';
var PropertyPaneHTMLBuilder = /** @class */ (function () {
    function PropertyPaneHTMLBuilder(properties) {
        this.type = PropertyPaneFieldType.Custom;
        this.properties = {
            key: properties.key,
            html: properties.html,
            onRender: this.onRender.bind(this),
            onDispose: this.onDispose.bind(this)
        };
    }
    PropertyPaneHTMLBuilder.prototype.render = function () {
        if (!this.elem) {
            return;
        }
        this.onRender(this.elem);
    };
    PropertyPaneHTMLBuilder.prototype.onDispose = function (element) {
        ReactDom.unmountComponentAtNode(element);
    };
    PropertyPaneHTMLBuilder.prototype.onRender = function (elem) {
        if (!this.elem) {
            this.elem = elem;
        }
        var content = {
            __dangerousHTML: this.properties.html
        };
        var element = React.createElement(PropertyPaneHTMLHost, {
            html: this.properties.html
        });
        ReactDom.render(element, elem);
    };
    return PropertyPaneHTMLBuilder;
}());
export { PropertyPaneHTMLBuilder };
export function PropertyPaneHTML(properties) {
    return new PropertyPaneHTMLBuilder(properties);
}
//# sourceMappingURL=PropertyPaneHTML.js.map