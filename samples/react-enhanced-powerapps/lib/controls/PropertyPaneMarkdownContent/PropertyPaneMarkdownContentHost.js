var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import Markdown from 'markdown-to-jsx';
var PropertyPaneMarkdownContentHost = /** @class */ (function (_super) {
    __extends(PropertyPaneMarkdownContentHost, _super);
    function PropertyPaneMarkdownContentHost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropertyPaneMarkdownContentHost.prototype.render = function () {
        return (React.createElement("div", { className: this.props.className },
            this.props.description && this.props.description !== '' &&
                React.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.description } }),
            React.createElement(Markdown, { options: this.props.markdownProps }, this.props.markdown)));
    };
    return PropertyPaneMarkdownContentHost;
}(React.Component));
export default PropertyPaneMarkdownContentHost;
//# sourceMappingURL=PropertyPaneMarkdownContentHost.js.map