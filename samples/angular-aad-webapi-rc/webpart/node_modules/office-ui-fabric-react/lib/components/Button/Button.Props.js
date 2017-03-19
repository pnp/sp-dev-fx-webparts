"use strict";
(function (ElementType) {
    /** <button> element. */
    ElementType[ElementType["button"] = 0] = "button";
    /** <a> element. */
    ElementType[ElementType["anchor"] = 1] = "anchor";
})(exports.ElementType || (exports.ElementType = {}));
var ElementType = exports.ElementType;
(function (ButtonType) {
    ButtonType[ButtonType["normal"] = 0] = "normal";
    ButtonType[ButtonType["primary"] = 1] = "primary";
    ButtonType[ButtonType["hero"] = 2] = "hero";
    ButtonType[ButtonType["compound"] = 3] = "compound";
    ButtonType[ButtonType["command"] = 4] = "command";
    ButtonType[ButtonType["icon"] = 5] = "icon";
})(exports.ButtonType || (exports.ButtonType = {}));
var ButtonType = exports.ButtonType;

//# sourceMappingURL=Button.Props.js.map
