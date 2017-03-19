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
var DirectionalHint_1 = require('../../../../common/DirectionalHint');
var index_1 = require('../../../../index');
var TooltipBottomExample = (function (_super) {
    __extends(TooltipBottomExample, _super);
    function TooltipBottomExample() {
        _super.apply(this, arguments);
    }
    TooltipBottomExample.prototype.render = function () {
        return (React.createElement(index_1.TooltipHost, {content: 'This is the tooltip', delay: index_1.TooltipDelay.zero, id: 'bottomID', directionalHint: DirectionalHint_1.DirectionalHint.bottomCenter}, 
            React.createElement(index_1.Button, {"aria-describedby": 'bottomID'}, "Hover Over Me")
        ));
    };
    return TooltipBottomExample;
}(BaseComponent_1.BaseComponent));
exports.TooltipBottomExample = TooltipBottomExample;

//# sourceMappingURL=Tooltip.Bottom.Example.js.map
