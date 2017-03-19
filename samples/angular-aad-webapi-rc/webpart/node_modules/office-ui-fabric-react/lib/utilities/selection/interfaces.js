"use strict";
exports.SELECTION_CHANGE = 'change';
(function (SelectionMode) {
    SelectionMode[SelectionMode["none"] = 0] = "none";
    SelectionMode[SelectionMode["single"] = 1] = "single";
    SelectionMode[SelectionMode["multiple"] = 2] = "multiple";
})(exports.SelectionMode || (exports.SelectionMode = {}));
var SelectionMode = exports.SelectionMode;
(function (SelectionDirection) {
    SelectionDirection[SelectionDirection["horizontal"] = 0] = "horizontal";
    SelectionDirection[SelectionDirection["vertical"] = 1] = "vertical";
})(exports.SelectionDirection || (exports.SelectionDirection = {}));
var SelectionDirection = exports.SelectionDirection;

//# sourceMappingURL=interfaces.js.map
