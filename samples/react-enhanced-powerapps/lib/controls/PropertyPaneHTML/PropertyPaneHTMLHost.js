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
var PropertyPaneHTMLHost = /** @class */ (function (_super) {
    __extends(PropertyPaneHTMLHost, _super);
    function PropertyPaneHTMLHost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropertyPaneHTMLHost.prototype.render = function () {
        return (React.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.html } }));
    };
    return PropertyPaneHTMLHost;
}(React.Component));
export default PropertyPaneHTMLHost;
//# sourceMappingURL=PropertyPaneHTMLHost.js.map