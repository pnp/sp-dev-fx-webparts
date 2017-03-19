"use strict";
var interfaces_1 = require('./interfaces');
var SelectionLayout = (function () {
    function SelectionLayout(direction) {
        this._direction = direction;
    }
    SelectionLayout.prototype.getItemIndexAbove = function (focusIndex, items) {
        return (this._direction === interfaces_1.SelectionDirection.vertical) ? Math.max(0, focusIndex - 1) : focusIndex;
    };
    SelectionLayout.prototype.getItemIndexBelow = function (focusIndex, items) {
        return (this._direction === interfaces_1.SelectionDirection.vertical) ? Math.min(items.length - 1, focusIndex + 1) : focusIndex;
    };
    SelectionLayout.prototype.getItemIndexLeft = function (focusIndex, items) {
        return (this._direction === interfaces_1.SelectionDirection.vertical) ? focusIndex : Math.max(0, focusIndex - 1);
    };
    SelectionLayout.prototype.getItemIndexRight = function (focusIndex, items) {
        return (this._direction === interfaces_1.SelectionDirection.vertical) ? focusIndex : Math.min(items.length - 1, focusIndex + 1);
    };
    return SelectionLayout;
}());
exports.SelectionLayout = SelectionLayout;

//# sourceMappingURL=SelectionLayout.js.map
