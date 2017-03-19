"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hoist_1 = require('../hoist');
var BaseComponent_1 = require('../../common/BaseComponent');
var BaseDecorator = (function (_super) {
    __extends(BaseDecorator, _super);
    function BaseDecorator() {
        _super.call(this);
        this._updateComposedComponentRef = this._updateComposedComponentRef.bind(this);
    }
    /**
     * Updates the ref to the component composed by the decorator, which will also take care of hoisting
     * (and unhoisting as appropriate) methods from said component.
     *
     * Pass this method as the argument to the 'ref' property of the composed component.
     */
    BaseDecorator.prototype._updateComposedComponentRef = function (composedComponentInstance) {
        this._composedComponentInstance = composedComponentInstance;
        if (composedComponentInstance) {
            this._hoisted = hoist_1.hoistMethods(this, composedComponentInstance);
        }
        else if (this._hoisted) {
            hoist_1.unhoistMethods(this, this._hoisted);
        }
    };
    return BaseDecorator;
}(BaseComponent_1.BaseComponent));
exports.BaseDecorator = BaseDecorator;

//# sourceMappingURL=BaseDecorator.js.map
