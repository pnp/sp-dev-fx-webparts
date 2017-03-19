"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var BaseComponent_1 = require('../../../../common/BaseComponent');
var index_1 = require('../../../../index');
var TooltipBasicExample = (function (_super) {
    __extends(TooltipBasicExample, _super);
    function TooltipBasicExample() {
        _super.apply(this, arguments);
    }
    TooltipBasicExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.TooltipHost, {content: 'This is the tooltip', id: 'myID'}, 
                React.createElement(index_1.Button, {"aria-describedby": 'myID'}, "Hover Over Me")
            )
        ));
    };
    return TooltipBasicExample;
}(BaseComponent_1.BaseComponent));
exports.TooltipBasicExample = TooltipBasicExample;

//# sourceMappingURL=Tooltip.Basic.Example.js.map
